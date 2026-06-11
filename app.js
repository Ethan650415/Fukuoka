const searchLink = (query) =>
  `https://www.google.com/search?q=${encodeURIComponent(query)}`;

const mapLink = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The app still works in browsers that block service workers.
    });
  });
}

const images = {
  airport: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fukuoka_Airport_Domestic_Terminal.jpg/250px-Fukuoka_Airport_Domestic_Terminal.jpg",
    alt: "福岡機場國內線航廈外觀",
  },
  hakata: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Hakata_Station_illuminations.JPG/250px-Hakata_Station_illuminations.JPG",
    alt: "博多站與 JR Hakata City 夜間外觀",
  },
  canal: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Canal_city_hakata_fukuoka2.jpg/120px-Canal_city_hakata_fukuoka2.jpg",
    alt: "Canal City Hakata 商場內部水道",
  },
  yatai: {
    src: "https://www.hennnahotel.com/hakata/wp-content/uploads/2023/09/image0.jpeg",
    alt: "福岡中洲與天神一帶的屋台",
  },
  ohori: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/%E5%A4%A7%E6%BF%A0%E5%85%AC%E5%9C%92_%283360365578%29.jpg/250px-%E5%A4%A7%E6%BF%A0%E5%85%AC%E5%9C%92_%283360365578%29.jpg",
    alt: "大濠公園湖邊步道",
  },
  momochi: {
    src: "https://www.city.fukuoka.lg.jp/nishiku/c-shinko/charm/event/images/futamigaura.JPG",
    alt: "百道海濱公園海岸與福岡塔周邊",
  },
  dazaifu: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/20100719_Dazaifu_Tenmangu_Shrine_3328.jpg/250px-20100719_Dazaifu_Tenmangu_Shrine_3328.jpg",
    alt: "太宰府天滿宮本殿",
  },
  yanagawa: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Yanagawa-kawakudari.jpg/250px-Yanagawa-kawakudari.jpg",
    alt: "柳川水鄉遊船",
  },
  itoshima: {
    src: "https://www.city.fukuoka.lg.jp/nishiku/c-shinko/charm/event/images/futamigaura.JPG",
    alt: "糸島二見浦夫婦岩與白色鳥居",
  },
};

const itinerary = [
  {
    date: "6/25",
    weekday: "Day 1",
    title: "抵達福岡 + 博多 / 天神 / 中洲屋台",
    theme: "第一天不要排太滿，熟悉交通、吃第一碗拉麵",
    photos: [
      { ...images.airport, caption: "福岡機場" },
      { ...images.hakata, caption: "博多站" },
      { ...images.canal, caption: "Canal City" },
      { ...images.yatai, caption: "中洲屋台" },
    ],
    items: [
      {
        time: "抵達後",
        title: "福岡機場到市區",
        body: "福岡機場離博多、天神都很近，入境後先啟用網路、確認交通卡或地鐵路線，再去飯店放行李。",
        links: [
          { label: "機場交通", url: searchLink("福岡機場 到 博多 交通") },
          { label: "地圖", url: mapLink("福岡機場") },
        ],
      },
      {
        time: "下午",
        title: "博多站、櫛田神社、Canal City",
        body: "放完行李後先在市區活動。博多站適合熟悉交通與購物，櫛田神社是市區代表神社，Canal City 適合逛街和吃飯。",
        links: [
          { label: "博多站", url: mapLink("博多站") },
          { label: "櫛田神社", url: mapLink("櫛田神社 福岡") },
          { label: "Canal City", url: mapLink("Canal City Hakata") },
        ],
      },
      {
        time: "晚上",
        title: "天神或中洲屋台",
        body: "第一晚重點是感受福岡市區氣氛。可以選天神商圈吃飯，或去中洲屋台吃拉麵、串燒、小吃。",
        links: [
          { label: "中洲屋台", url: mapLink("中洲 屋台 福岡") },
          { label: "天神美食", url: searchLink("福岡 天神 美食 拉麵 屋台") },
        ],
      },
    ],
  },
  {
    date: "6/26",
    weekday: "Day 2",
    title: "福岡市區慢玩",
    theme: "大濠公園、福岡城跡、百道海濱或天神",
    photos: [
      { ...images.ohori, caption: "大濠公園" },
      { ...images.momochi, caption: "百道海濱" },
      { ...images.hakata, caption: "市區購物" },
    ],
    items: [
      {
        time: "上午",
        title: "大濠公園、福岡城跡",
        body: "大濠公園適合湖邊散步和慢早餐，福岡城跡就在附近，可以用低交通成本完成市區文化散步。",
        links: [
          { label: "大濠公園", url: mapLink("大濠公園") },
          { label: "福岡城跡", url: mapLink("福岡城跡") },
        ],
      },
      {
        time: "下午",
        title: "百道海濱、福岡塔，或回天神逛街",
        body: "天氣好可以去海邊與福岡塔；若太熱或下雨，就回天神逛街，節奏更好控制。",
        links: [
          { label: "百道海濱", url: mapLink("百道海濱公園") },
          { label: "福岡塔", url: mapLink("福岡塔") },
          { label: "天神地下街", url: mapLink("天神地下街") },
        ],
      },
      {
        time: "晚上",
        title: "明太子、牛腸鍋、拉麵",
        body: "這天 CP 值高，景點不用跑遠，晚上可以安排福岡代表美食：明太子、牛腸鍋或拉麵。",
        links: [
          { label: "牛腸鍋", url: searchLink("福岡 牛腸鍋 推薦") },
          { label: "明太子", url: searchLink("福岡 明太子 餐廳 推薦") },
          { label: "拉麵", url: searchLink("福岡 拉麵 推薦") },
        ],
      },
    ],
  },
  {
    date: "6/27",
    weekday: "Day 3",
    title: "太宰府 + 柳川",
    theme: "天滿宮、參道小吃、柳川遊船與鰻魚飯",
    photos: [
      { ...images.dazaifu, caption: "太宰府天滿宮" },
      { ...images.yanagawa, caption: "柳川遊船" },
    ],
    items: [
      {
        time: "上午",
        title: "太宰府天滿宮與參道",
        body: "早上去太宰府天滿宮。參道可以吃梅枝餅、逛小店，氣氛比單純市區更有短途旅行感。",
        links: [
          { label: "太宰府天滿宮", url: mapLink("太宰府天滿宮") },
          { label: "梅枝餅", url: searchLink("太宰府 梅枝餅 推薦") },
        ],
      },
      {
        time: "下午",
        title: "柳川搭船",
        body: "下午移動到柳川。柳川以河道遊船聞名，適合坐船看水鄉街景，節奏和市區完全不同。",
        links: [
          { label: "柳川遊船", url: searchLink("柳川 遊船 福岡") },
          { label: "柳川地圖", url: mapLink("柳川 福岡") },
        ],
      },
      {
        time: "晚餐",
        title: "柳川鰻魚飯",
        body: "柳川名物是鰻魚飯，這天可以把晚餐重點放在鰻魚飯，再回福岡市區休息。",
        links: [
          { label: "鰻魚飯", url: searchLink("柳川 鰻魚飯 推薦") },
          { label: "回程交通", url: searchLink("柳川 回 福岡 交通") },
        ],
      },
    ],
  },
  {
    date: "6/28",
    weekday: "Day 4",
    title: "糸島一日遊",
    theme: "看海、咖啡廳、二見浦夫婦岩，交通要先安排",
    photos: [
      { ...images.itoshima, caption: "二見浦夫婦岩" },
      { ...images.momochi, caption: "海邊備案" },
    ],
    items: [
      {
        time: "上午",
        title: "前往糸島",
        body: "天氣好就去糸島。糸島比較吃交通安排，若不租車，要先查好電車、公車與回程時間。",
        links: [
          { label: "糸島交通", url: searchLink("福岡 到 糸島 交通 公車 電車") },
          { label: "糸島地圖", url: mapLink("糸島 福岡") },
        ],
      },
      {
        time: "下午",
        title: "二見浦夫婦岩、海景咖啡",
        body: "糸島適合看海、拍照和放慢節奏。二見浦夫婦岩是經典點，旁邊可搭配海景咖啡廳。",
        links: [
          { label: "夫婦岩", url: mapLink("櫻井二見浦夫婦岩") },
          { label: "海景咖啡", url: searchLink("糸島 海景 咖啡廳 推薦") },
        ],
      },
      {
        time: "備案",
        title: "改市區美食購物、海中道或百道海濱",
        body: "如果天氣不好、交通懶得研究，這天可改成福岡市區美食購物日，或排海中道、百道海濱這種比較好控制的點。",
        links: [
          { label: "海中道", url: mapLink("海中道海濱公園") },
          { label: "百道海濱", url: mapLink("百道海濱公園") },
        ],
      },
    ],
  },
  {
    date: "6/29",
    weekday: "Day 5",
    title: "市區彈性補位",
    theme: "把沒吃到、沒逛到、天氣備案集中處理",
    photos: [
      { ...images.hakata, caption: "博多補買" },
      { ...images.canal, caption: "雨天購物" },
      { ...images.yatai, caption: "美食補清單" },
    ],
    items: [
      {
        time: "上午",
        title: "博多或天神自由補位",
        body: "原行程是 5 個主題日，但 6/25-6/30 有 6 天。這天先保留成彈性日，可補市區購物、咖啡或前幾天沒去成的點。",
        links: [
          { label: "博多購物", url: searchLink("博多站 購物 伴手禮") },
          { label: "天神購物", url: searchLink("福岡 天神 購物") },
        ],
      },
      {
        time: "下午",
        title: "美食補清單",
        body: "補吃明太子、牛腸鍋、拉麵、甜點或咖啡。若隔天早班機，這天也適合先打包行李。",
        links: [
          { label: "福岡咖啡", url: searchLink("福岡 咖啡廳 推薦") },
          { label: "福岡甜點", url: searchLink("福岡 甜點 推薦") },
        ],
      },
      {
        time: "晚上",
        title: "最後一晚晚餐",
        body: "建議選交通方便、回住宿不麻煩的餐廳，避免隔天退房與去機場太趕。",
        links: [
          { label: "博多晚餐", url: searchLink("博多 晚餐 推薦") },
          { label: "天神晚餐", url: searchLink("天神 晚餐 推薦") },
        ],
      },
    ],
  },
  {
    date: "6/30",
    weekday: "Day 6",
    title: "博多 / 天神補買 + 去機場",
    theme: "最後一天不要排遠，確認行李重量、護照、航班時間",
    photos: [
      { ...images.hakata, caption: "車站伴手禮" },
      { ...images.airport, caption: "福岡機場" },
    ],
    items: [
      {
        time: "上午",
        title: "博多 / 天神補買",
        body: "最後一天不要排遠。福岡適合買明太子、拉麵、零食、藥妝和車站限定商品。",
        links: [
          { label: "博多站伴手禮", url: searchLink("博多站 伴手禮 明太子 拉麵") },
          { label: "福岡藥妝", url: searchLink("福岡 藥妝 天神 博多") },
        ],
      },
      {
        time: "出發前",
        title: "整理行李與航班資料",
        body: "確認行李重量、護照、機票、航班時間、航廈與托運規定。福岡機場近，但仍建議保留緩衝。",
        links: [
          { label: "航班查詢", url: searchLink("福岡機場 航班 查詢") },
          { label: "福岡機場", url: mapLink("福岡機場") },
        ],
      },
      {
        time: "返程",
        title: "慢慢去機場",
        body: "從市區移動到福岡機場通常很快，適合把最後時間留給補買和從容移動。",
        links: [
          { label: "博多到機場", url: searchLink("博多 到 福岡機場 地鐵") },
          { label: "天神到機場", url: searchLink("天神 到 福岡機場 地鐵") },
        ],
      },
    ],
  },
];

const places = [
  {
    name: "福岡機場",
    type: "交通",
    area: "機場",
    image: images.airport,
    body: "距離市區很近，是福岡行程的優勢。抵達日不用完全報廢，回程日也能先補買再去機場。",
    links: [
      { label: "地圖", url: mapLink("福岡機場") },
      { label: "交通", url: searchLink("福岡機場 到 博多 天神 交通") },
    ],
  },
  {
    name: "博多站",
    type: "市區",
    area: "博多",
    image: images.hakata,
    body: "交通樞紐、購物與餐廳集中，適合當集合點，也適合最後一天買伴手禮。",
    links: [
      { label: "地圖", url: mapLink("博多站") },
      { label: "伴手禮", url: searchLink("博多站 伴手禮 推薦") },
    ],
  },
  {
    name: "櫛田神社",
    type: "景點",
    area: "博多",
    image: images.dazaifu,
    body: "福岡市區代表神社，鄰近川端商店街與 Canal City，適合抵達日輕鬆散步。",
    links: [
      { label: "地圖", url: mapLink("櫛田神社 福岡") },
      { label: "查找", url: searchLink("櫛田神社 福岡") },
    ],
  },
  {
    name: "Canal City Hakata",
    type: "購物",
    area: "博多",
    image: images.canal,
    body: "大型複合商場，有購物、餐廳、拉麵相關店鋪，適合第一天下午或雨天備案。",
    links: [
      { label: "地圖", url: mapLink("Canal City Hakata") },
      { label: "查找", url: searchLink("Canal City Hakata 福岡") },
    ],
  },
  {
    name: "中洲屋台",
    type: "美食",
    area: "中洲",
    image: images.yatai,
    body: "福岡夜晚代表體驗。可吃拉麵、串燒與小吃，注意營業日、排隊與現金。",
    links: [
      { label: "地圖", url: mapLink("中洲 屋台 福岡") },
      { label: "查找", url: searchLink("中洲屋台 福岡 推薦") },
    ],
  },
  {
    name: "大濠公園",
    type: "景點",
    area: "中央區",
    image: images.ohori,
    body: "湖邊公園，適合早上散步、慢早餐與拍照，可順路去福岡城跡。",
    links: [
      { label: "地圖", url: mapLink("大濠公園") },
      { label: "查找", url: searchLink("大濠公園 福岡") },
    ],
  },
  {
    name: "福岡城跡",
    type: "景點",
    area: "中央區",
    image: images.ohori,
    body: "位於大濠公園、舞鶴公園附近，適合市區文化散步，不需要拉太長交通時間。",
    links: [
      { label: "地圖", url: mapLink("福岡城跡") },
      { label: "查找", url: searchLink("福岡城跡") },
    ],
  },
  {
    name: "百道海濱與福岡塔",
    type: "景點",
    area: "西新 / 百道",
    image: images.momochi,
    body: "市區可達的海邊與展望塔，天氣好時適合看海、拍照，下午安排很順。",
    links: [
      { label: "百道海濱", url: mapLink("百道海濱公園") },
      { label: "福岡塔", url: mapLink("福岡塔") },
    ],
  },
  {
    name: "太宰府天滿宮",
    type: "近郊",
    area: "太宰府",
    image: images.dazaifu,
    body: "福岡近郊經典景點。參道有梅枝餅和小店，適合和柳川排成同一天。",
    links: [
      { label: "地圖", url: mapLink("太宰府天滿宮") },
      { label: "交通", url: searchLink("福岡 到 太宰府天滿宮 交通") },
    ],
  },
  {
    name: "柳川",
    type: "近郊",
    area: "柳川",
    image: images.yanagawa,
    body: "水鄉城市，可搭船遊河，名物是鰻魚飯。比硬塞熊本或長崎更適合第一次福岡短旅行。",
    links: [
      { label: "地圖", url: mapLink("柳川 福岡") },
      { label: "遊船", url: searchLink("柳川 遊船 鰻魚飯") },
    ],
  },
  {
    name: "糸島",
    type: "近郊",
    area: "福岡西側",
    image: images.itoshima,
    body: "看海、咖啡廳、二見浦夫婦岩，適合拍照和放慢節奏。交通要先安排，租車最自由。",
    links: [
      { label: "地圖", url: mapLink("糸島 福岡") },
      { label: "交通", url: searchLink("福岡 到 糸島 交通") },
    ],
  },
  {
    name: "海中道海濱公園",
    type: "備案",
    area: "東區",
    image: images.momochi,
    body: "若糸島交通不想研究，可改排較好控制的海中道或百道海濱，適合天氣好的半日行程。",
    links: [
      { label: "地圖", url: mapLink("海中道海濱公園") },
      { label: "查找", url: searchLink("海中道海濱公園 福岡") },
    ],
  },
];

const navTabs = document.querySelectorAll(".nav-tab");
const views = document.querySelectorAll(".view");
const dateSwitcher = document.querySelector("#dateSwitcher");
const dayPanel = document.querySelector("#dayPanel");
const placeFilters = document.querySelector("#placeFilters");
const placesGrid = document.querySelector("#placesGrid");
const toast = document.querySelector("#toast");
const noteForm = document.querySelector("#noteForm");
const noteList = document.querySelector("#noteList");

let selectedDay = 0;
let selectedType = "全部";
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function renderLinks(links) {
  if (!links?.length) return "";

  return `
    <div class="link-row">
      ${links
        .map(
          (link) =>
            `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`,
        )
        .join("")}
    </div>
  `;
}

function renderPhotos(photos) {
  if (!photos?.length) return "";

  return `
    <div class="day-photo-grid" aria-label="今日相關圖片">
      ${photos
        .map(
          (photo) => `
            <figure class="photo-card">
              <img src="${photo.src}" alt="${photo.alt}" loading="lazy" />
              <figcaption>${photo.caption}</figcaption>
            </figure>
          `,
        )
        .join("")}
    </div>
  `;
}

navTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    navTabs.forEach((item) => item.classList.remove("is-active"));
    views.forEach((view) => view.classList.remove("is-visible"));
    tab.classList.add("is-active");
    document.querySelector(`#${tab.dataset.view}`).classList.add("is-visible");
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast("已複製到剪貼簿");
    } catch {
      showToast("瀏覽器未允許複製");
    }
  });
});

function renderDateSwitcher() {
  dateSwitcher.innerHTML = itinerary
    .map(
      (day, index) => `
        <button class="date-button ${index === selectedDay ? "is-active" : ""}" data-day="${index}">
          ${day.date}
        </button>
      `,
    )
    .join("");

  dateSwitcher.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDay = Number(button.dataset.day);
      renderDateSwitcher();
      renderDayPanel();
    });
  });
}

function renderDayPanel() {
  const day = itinerary[selectedDay];
  dayPanel.innerHTML = `
    <div class="day-title">
      <div>
        <p class="eyebrow">${day.weekday} · ${day.date}</p>
        <h4>${day.title}</h4>
      </div>
      <span class="tag">${day.theme}</span>
    </div>
    ${renderPhotos(day.photos)}
    <div class="timeline">
      ${day.items
        .map(
          (item) => `
            <article class="timeline-item">
              <div class="timeline-time">${item.time}</div>
              <div>
                <h5>${item.title}</h5>
                <p>${item.body}</p>
                ${renderLinks(item.links)}
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderPlaceFilters() {
  const filters = ["全部", ...new Set(places.map((place) => place.type))];
  placeFilters.innerHTML = filters
    .map(
      (filter) => `
        <button class="filter-pill ${filter === selectedType ? "is-active" : ""}" data-filter="${filter}">
          ${filter}
        </button>
      `,
    )
    .join("");

  placeFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedType = button.dataset.filter;
      renderPlaceFilters();
      renderPlaces();
    });
  });
}

function renderPlaces() {
  const visiblePlaces =
    selectedType === "全部"
      ? places
      : places.filter((place) => place.type === selectedType);

  placesGrid.innerHTML = visiblePlaces
    .map(
      (place) => `
        <article class="place-card">
          ${
            place.image
              ? `<img class="place-image" src="${place.image.src}" alt="${place.image.alt}" />`
              : ""
          }
          <span class="card-kicker">${place.area}</span>
          <h4>${place.name}</h4>
          <p>${place.body}</p>
          <div class="tag-row">
            <span class="tag">${place.type}</span>
          </div>
          ${renderLinks(place.links)}
        </article>
      `,
    )
    .join("");
}

function getNotes() {
  return JSON.parse(localStorage.getItem("fukuoka-trip-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("fukuoka-trip-notes", JSON.stringify(notes));
}

function renderNotes() {
  const notes = getNotes();
  noteList.innerHTML = notes.length
    ? notes
        .map(
          (note, index) => `
            <article class="note-card">
              <h4>${note.title}</h4>
              <p>${note.body}</p>
              <button data-delete-note="${index}">刪除</button>
            </article>
          `,
        )
        .join("")
    : `<article class="note-card"><h4>尚無備註</h4><p>可以先新增餐廳訂位、分工、購物清單或交通提醒。</p></article>`;

  noteList.querySelectorAll("[data-delete-note]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextNotes = getNotes().filter(
        (_, index) => index !== Number(button.dataset.deleteNote),
      );
      saveNotes(nextNotes);
      renderNotes();
    });
  });
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(noteForm);
  const notes = getNotes();
  notes.unshift({
    title: String(formData.get("title")).trim(),
    body: String(formData.get("body")).trim(),
  });
  saveNotes(notes);
  noteForm.reset();
  renderNotes();
  showToast("備註已新增");
});

renderDateSwitcher();
renderDayPanel();
renderPlaceFilters();
renderPlaces();
renderNotes();
