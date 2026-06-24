from __future__ import annotations

import asyncio
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, unquote, urlparse

from playwright.async_api import Browser, Page, Response, async_playwright

LIST_URL = (
    "https://www.google.com/maps/@28.9841821,120.3273365,6z/"
    "data=!4m2!11m1!2sv_pThMLtEkPlnOMJG1rJS0XH7w0oSA"
    "?entry=ttu&g_ep=EgoyMDI2MDYyMi4wIKXMDSoASAFQAw%3D%3D"
)
EXPECTED_COUNT = 46
OUTPUT = Path(__file__).resolve().parents[1] / "places.json"
DEBUG_DIR = Path(__file__).resolve().parents[1] / "debug-google-maps"

GENERIC_LABELS = {
    "google maps",
    "地圖",
    "地図",
    "路線",
    "導航",
    "directions",
    "website",
    "menu",
    "share",
    "save",
    "saved",
    "photos",
    "photo",
    "更多",
    "詳細資訊",
}


def is_number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def valid_coordinates(latitude: Any, longitude: Any) -> bool:
    return (
        is_number(latitude)
        and is_number(longitude)
        and -90 <= float(latitude) <= 90
        and -180 <= float(longitude) <= 180
    )


def clean_name(value: Any) -> str:
    name = re.sub(r"\s+", " ", str(value or "")).strip()
    name = re.sub(r"^(?:結果|Result)\s*[:：]\s*", "", name, flags=re.I)
    return name


def is_useful_name(name: str) -> bool:
    lowered = name.casefold()
    if not name or len(name) > 180:
        return False
    if lowered in GENERIC_LABELS:
        return False
    if name.startswith("http://") or name.startswith("https://"):
        return False
    return True


def find_string(node: Any, predicate) -> str:
    if isinstance(node, str) and predicate(node):
        return node
    if isinstance(node, list):
        for child in node:
            found = find_string(child, predicate)
            if found:
                return found
    if isinstance(node, dict):
        for child in node.values():
            found = find_string(child, predicate)
            if found:
                return found
    return ""


def parse_google_coordinates(url: str) -> tuple[float | None, float | None]:
    decoded = unquote(url or "")
    patterns = (
        r"/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)",
        r"!3d(-?\d+(?:\.\d+)?).*?!4d(-?\d+(?:\.\d+)?)",
        r"[?&](?:query|destination)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)",
    )
    for pattern in patterns:
        match = re.search(pattern, decoded)
        if match:
            latitude, longitude = map(float, match.groups())
            if valid_coordinates(latitude, longitude):
                return latitude, longitude
    return None, None


def parse_place_id(url: str) -> str:
    decoded = unquote(url or "")
    match = re.search(r"place_id:([^&/?]+)", decoded)
    if match:
        return match.group(1)
    query = parse_qs(urlparse(decoded).query)
    return str(query.get("query_place_id", [""])[0])


def canonical_map_url(url: str) -> str:
    if not url:
        return ""
    decoded = unquote(url)
    if decoded.startswith("/"):
        decoded = "https://www.google.com" + decoded
    return decoded.split("&entry=")[0]


def parse_entity_response(text: str) -> list[dict[str, Any]]:
    cleaned = text.strip()
    if cleaned.startswith(")]}'"):
        cleaned = cleaned[4:].lstrip("\r\n")
    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError:
        return []

    places: list[dict[str, Any]] = []

    def walk(node: Any) -> None:
        if isinstance(node, list):
            # Known Google Maps entitylist entry structure. This internal schema can change.
            try:
                name = clean_name(node[2])
                coords = node[1][5]
                latitude = coords[2]
                longitude = coords[3]
                if is_useful_name(name) and valid_coordinates(latitude, longitude):
                    map_url = find_string(
                        node,
                        lambda value: "google." in value and "/maps" in value,
                    )
                    places.append(
                        {
                            "name": name,
                            "address": "",
                            "latitude": float(latitude),
                            "longitude": float(longitude),
                            "google_maps_url": canonical_map_url(map_url),
                            "google_place_id": parse_place_id(map_url),
                        }
                    )
            except (IndexError, TypeError):
                pass

            for child in node:
                walk(child)
        elif isinstance(node, dict):
            for child in node.values():
                walk(child)

    walk(data)
    return places


def normalize_dom_item(item: dict[str, Any]) -> dict[str, Any] | None:
    name = clean_name(item.get("name"))
    href = canonical_map_url(str(item.get("href") or ""))
    if not is_useful_name(name) or "/maps" not in href:
        return None

    latitude, longitude = parse_google_coordinates(href)
    text_lines = [
        re.sub(r"\s+", " ", line).strip()
        for line in str(item.get("text") or "").splitlines()
    ]
    address = ""
    for line in text_lines:
        if not line or line == name or line.casefold() in GENERIC_LABELS:
            continue
        if len(line) <= 160:
            address = line
            break

    return {
        "name": name,
        "address": address,
        "latitude": latitude,
        "longitude": longitude,
        "google_maps_url": href,
        "google_place_id": parse_place_id(href),
    }


def deduplicate(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    result: list[dict[str, Any]] = []
    seen: set[str] = set()

    for item in items:
        name = clean_name(item.get("name"))
        latitude = item.get("latitude")
        longitude = item.get("longitude")
        place_id = str(item.get("google_place_id") or "")
        url = str(item.get("google_maps_url") or "")

        if place_id:
            key = f"id:{place_id}"
        elif valid_coordinates(latitude, longitude):
            key = f"geo:{name.casefold()}:{float(latitude):.6f}:{float(longitude):.6f}"
        elif url:
            key = f"url:{url.split('?')[0]}"
        else:
            key = f"name:{name.casefold()}"

        if key in seen or not is_useful_name(name):
            continue
        seen.add(key)
        cleaned = {
            "order": len(result) + 1,
            "name": name,
            "address": str(item.get("address") or "").strip(),
            "latitude": latitude if valid_coordinates(latitude, longitude) else None,
            "longitude": longitude if valid_coordinates(latitude, longitude) else None,
            "google_maps_url": url,
            "google_place_id": place_id,
        }
        result.append(cleaned)

    return result


async def accept_consent(page: Page) -> None:
    labels = [
        "Accept all",
        "I agree",
        "同意する",
        "すべて同意",
        "全部接受",
        "我同意",
    ]
    for label in labels:
        try:
            button = page.get_by_role("button", name=re.compile(re.escape(label), re.I)).first
            if await button.is_visible(timeout=700):
                await button.click(timeout=1500)
                await page.wait_for_timeout(1200)
                return
        except Exception:
            continue


async def collect_dom_items(page: Page) -> list[dict[str, Any]]:
    return await page.evaluate(
        """
        () => {
          const selectors = [
            'a.hfpxzc',
            'a[href*="/maps/place/"]',
            'a[href*="/maps/search/"]',
            'a[href*="google.com/maps"]'
          ];
          const anchors = [...document.querySelectorAll(selectors.join(','))];
          return anchors.map((anchor, index) => {
            let card = anchor.closest('.Nv2PK, [role="article"], [data-result-index]');
            if (!card) {
              card = anchor.parentElement?.parentElement?.parentElement || anchor.parentElement;
            }
            return {
              order: index,
              href: anchor.href || anchor.getAttribute('href') || '',
              name: anchor.getAttribute('aria-label') || anchor.getAttribute('title') || anchor.textContent || '',
              text: card?.innerText || anchor.textContent || ''
            };
          });
        }
        """
    )


async def scroll_list(page: Page) -> None:
    await page.evaluate(
        """
        () => {
          const feed = document.querySelector('div[role="feed"]');
          if (feed) {
            feed.scrollTop = feed.scrollHeight;
            return;
          }
          const candidates = [...document.querySelectorAll('div')]
            .filter(el => el.scrollHeight > el.clientHeight + 300 && el.clientHeight > 250)
            .sort((a, b) => b.scrollHeight - a.scrollHeight);
          if (candidates[0]) candidates[0].scrollTop = candidates[0].scrollHeight;
          window.scrollTo(0, document.body.scrollHeight);
        }
        """
    )
    await page.mouse.wheel(0, 2500)


async def save_debug(page: Page, responses: list[str]) -> None:
    DEBUG_DIR.mkdir(parents=True, exist_ok=True)
    try:
        await page.screenshot(path=str(DEBUG_DIR / "page.png"), full_page=True)
    except Exception:
        pass
    try:
        (DEBUG_DIR / "page.html").write_text(await page.content(), encoding="utf-8")
    except Exception:
        pass
    for index, response_text in enumerate(responses, start=1):
        (DEBUG_DIR / f"entitylist-{index}.txt").write_text(response_text, encoding="utf-8")


async def scrape(browser: Browser) -> tuple[list[dict[str, Any]], str]:
    context = await browser.new_context(
        locale="ja-JP",
        timezone_id="Asia/Tokyo",
        viewport={"width": 1440, "height": 1000},
        user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/126.0.0.0 Safari/537.36"
        ),
    )
    page = await context.new_page()
    entity_responses: list[str] = []
    response_tasks: list[asyncio.Task[None]] = []

    async def capture_response(response: Response) -> None:
        if "/maps/preview/entitylist/getlist" not in response.url:
            return
        try:
            entity_responses.append(await response.text())
        except Exception:
            return

    page.on("response", lambda response: response_tasks.append(asyncio.create_task(capture_response(response))))

    try:
        await page.goto(LIST_URL, wait_until="domcontentloaded", timeout=90_000)
        await accept_consent(page)
        await page.wait_for_timeout(6_000)

        collected_dom: list[dict[str, Any]] = []
        stable_rounds = 0
        previous_count = 0

        for _ in range(70):
            collected_dom.extend(await collect_dom_items(page))
            current = deduplicate(
                [item for item in (normalize_dom_item(raw) for raw in collected_dom) if item]
            )
            if len(current) == previous_count:
                stable_rounds += 1
            else:
                stable_rounds = 0
                previous_count = len(current)

            if len(current) >= EXPECTED_COUNT and stable_rounds >= 3:
                break
            await scroll_list(page)
            await page.wait_for_timeout(800)

        if response_tasks:
            await asyncio.gather(*response_tasks, return_exceptions=True)

        entity_items: list[dict[str, Any]] = []
        for response_text in entity_responses:
            entity_items.extend(parse_entity_response(response_text))

        dom_items = [
            item for item in (normalize_dom_item(raw) for raw in collected_dom) if item
        ]
        places = deduplicate(entity_items + dom_items)

        if len(places) < EXPECTED_COUNT:
            await save_debug(page, entity_responses)
            raise RuntimeError(
                f"Only extracted {len(places)} places; expected {EXPECTED_COUNT}. "
                "Download the google-maps-debug artifact to inspect the captured page."
            )

        # Preserve the visual list order from the page. Extra duplicate-like records are
        # retained only when they have a distinct canonical key; the website will report
        # a count mismatch rather than silently discarding user data.
        return places, await page.title()
    finally:
        await context.close()


async def main() -> None:
    DEBUG_DIR.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(
            headless=True,
            args=["--disable-blink-features=AutomationControlled"],
        )
        try:
            places, page_title = await scrape(browser)
        finally:
            await browser.close()

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_url": LIST_URL,
        "list_name": page_title or None,
        "expected_count": EXPECTED_COUNT,
        "count": len(places),
        "places": places,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(places)} places to {OUTPUT}")


if __name__ == "__main__":
    asyncio.run(main())
