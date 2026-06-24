from __future__ import annotations

import json
from dataclasses import asdict, is_dataclass
from datetime import datetime, timezone
from pathlib import Path

from gmaps_list import fetch_list

LIST_URL = "https://www.google.com/maps/@28.9841821,120.3273365,6z/data=!4m2!11m1!2sv_pThMLtEkPlnOMJG1rJS0XH7w0oSA?entry=ttu&g_ep=EgoyMDI2MDYyMi4wIKXMDSoASAFQAw%3D%3D"
OUTPUT = Path(__file__).resolve().parents[1] / "places.json"


def to_dict(value):
    if is_dataclass(value):
        return asdict(value)
    if hasattr(value, "model_dump"):
        return value.model_dump()
    if hasattr(value, "__dict__"):
        return {k: v for k, v in vars(value).items() if not k.startswith("_")}
    raise TypeError(f"Unsupported place object: {type(value)!r}")


result = fetch_list(LIST_URL)
places = []
for index, place in enumerate(result.places, start=1):
    item = to_dict(place)
    item["order"] = index
    places.append(item)

if not places:
    raise RuntimeError("Google Maps list returned no places; existing places.json was not replaced")

payload = {
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "source_url": LIST_URL,
    "list_name": getattr(result, "list_name", None),
    "owner": getattr(result, "owner", None),
    "count": len(places),
    "places": places,
}
OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Wrote {len(places)} places to {OUTPUT}")
