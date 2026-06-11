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
  coffee: {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    alt: "咖啡杯與咖啡店桌面",
  },
  bakery: {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    alt: "麵包店裡的新鮮麵包",
  },
  seafood: {
    src: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=900&q=80",
    alt: "壽司與海鮮餐點",
  },
  ramen: {
    src: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=900&q=80",
    alt: "拉麵與溏心蛋",
  },
  curry: {
    src: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&w=900&q=80",
    alt: "咖哩餐點",
  },
  sweets: {
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
    alt: "甜點與莓果",
  },
  souvenir: {
    src: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80",
    alt: "包裝精緻的伴手禮",
  },
  cafeCounter: {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    alt: "咖啡店吧台與手沖咖啡",
  },
  croissant: {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    alt: "可頌與烘焙麵包",
  },
  dessertPlate: {
    src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
    alt: "盤中的甜點與糖粉",
  },
  marketSushi: {
    src: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80",
    alt: "市場裡的壽司與海鮮",
  },
  friedSnack: {
    src: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
    alt: "炸物小吃",
  },
  giftBoxes: {
    src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=80",
    alt: "伴手禮盒與包裝",
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

itinerary.splice(
  0,
  itinerary.length,
  {
    date: "6/25",
    weekday: "Day 1",
    title: "抵達福岡 + 博多 / 天神 / 中洲屋台",
    theme: "14:25 台灣起飛，抵達後只排晚餐與輕鬆散步",
    photos: [
      { ...images.airport, caption: "福岡機場" },
      { ...images.hakata, caption: "博多站" },
      { ...images.canal, caption: "Canal City" },
      { ...images.yatai, caption: "中洲屋台" },
    ],
    items: [
      {
        time: "14:25",
        title: "台灣起飛",
        body: "下午 2:25 從台灣起飛。因日本比台灣快 1 小時，抵達福岡通常已接近傍晚，這天不要安排需要門票或長距離移動的景點。",
        links: [
          { label: "航班查詢", url: searchLink("台灣 福岡 航班 14:25") },
          { label: "福岡機場", url: mapLink("福岡機場") },
        ],
      },
      {
        time: "傍晚",
        title: "抵達福岡、入境、前往飯店",
        body: "抵達後先處理入境、eSIM、交通卡與行李。福岡機場離市區近，若一切順利，仍可在晚餐時間前到博多或天神。",
        links: [
          { label: "機場交通", url: searchLink("福岡機場 到 博多 地鐵") },
          { label: "福岡機場", url: mapLink("福岡機場") },
        ],
      },
      {
        time: "晚上",
        title: "飯店周邊晚餐：博多 / 天神 / 中洲",
        body: "第一晚建議只排飯店周邊晚餐。圖上的 The Full Full Hakata、FUK COFFEE、Pain Stock 比較適合改到 Day 5 或 Day 6 白天補吃。",
        links: [
          { label: "博多站", url: mapLink("博多站") },
          { label: "天神地下街", url: mapLink("天神地下街") },
          { label: "中洲屋台", url: mapLink("中洲 屋台 福岡") },
        ],
      },
      {
        time: "可選",
        title: "輕鬆散步：Canal City 或屋台",
        body: "如果入境與交通順利，晚餐後可去 Canal City、川端商店街或中洲散步；若飛機延誤，就直接休息，隔天門司港才不會太累。",
        links: [
          { label: "Canal City", url: mapLink("Canal City Hakata") },
          { label: "川端商店街", url: mapLink("川端商店街 福岡") },
        ],
      },
    ],
  },
  {
    date: "6/26",
    weekday: "Day 2",
    title: "門司港 + 唐戶市場一日遊",
    theme: "圖片 Day 2 保留門司港主軸，宮地嶽改備案",
    photos: [
      { ...images.hakata, caption: "博多出發" },
      { ...images.momochi, caption: "海港散策" },
      { ...images.yatai, caption: "回博多晚餐" },
    ],
    items: [
      {
        time: "上午",
        title: "博多出發到門司港",
        body: "圖片排 08:50 博多出發、10:00 到門司港是合理方向。建議早點出發，把門司港老街、九州鐵道紀念館和海邊散步排成同一區塊。",
        links: [
          { label: "門司港站", url: mapLink("門司港站") },
          { label: "九州鐵道紀念館", url: mapLink("九州鐵道紀念館") },
        ],
      },
      {
        time: "中午",
        title: "唐戶市場午餐",
        body: "唐戶市場適合吃壽司、海鮮與小吃。若遇到市場活動日會更熱鬧，但人也多，請把午餐時間抓鬆一點。",
        links: [
          { label: "唐戶市場", url: mapLink("唐戶市場") },
          { label: "市場資訊", url: searchLink("唐戶市場 活きいき馬関街 營業時間") },
        ],
      },
      {
        time: "下午",
        title: "門司港散步、燒咖哩或海峽甜點",
        body: "回到門司港周邊慢慢逛。圖片的燒咖哩、海峽霜淇淋、鐵道紀念館都適合放這天，不建議再硬接宮地嶽神社。",
        links: [
          { label: "門司港燒咖哩", url: searchLink("門司港 燒咖哩 推薦") },
          { label: "門司港レトロ", url: searchLink("門司港レトロ 観光") },
        ],
      },
      {
        time: "晚上",
        title: "回博多晚餐",
        body: "圖片把宮地嶽、福岡寶可夢中心也塞進同一天，會偏趕。建議晚上直接回博多或天神吃飯，保留體力。",
        links: [
          { label: "博多晚餐", url: searchLink("博多 晚餐 推薦") },
          { label: "博多站", url: mapLink("博多站") },
        ],
      },
    ],
  },
  {
    date: "6/27",
    weekday: "Day 3",
    title: "由布院一日遊",
    theme: "可行，但特急座位與回程時間要先確認",
    photos: [
      { ...images.ohori, caption: "山區慢行" },
      { ...images.canal, caption: "湯之坪街道" },
      { ...images.hakata, caption: "回博多" },
    ],
    items: [
      {
        time: "上午",
        title: "博多出發到由布院",
        body: "圖片排 08:50 出發、11:40 抵達由布院，節奏合理但交通是重點。建議優先訂 JR 特急由布院之森或替代特急座位。",
        links: [
          { label: "由布院交通", url: searchLink("博多 到 由布院 特急 由布院之森 預約") },
          { label: "由布院站", url: mapLink("由布院站") },
        ],
      },
      {
        time: "中午",
        title: "湯之坪街道午餐與散策",
        body: "湯之坪街道有小吃、甜點、雜貨與咖啡。金賞可樂餅、吉吾炸雞、造型甜點都適合當邊走邊吃清單。",
        links: [
          { label: "湯之坪街道", url: mapLink("湯之坪街道 由布院") },
          { label: "金賞可樂餅", url: mapLink("金賞コロッケ 湯布院") },
        ],
      },
      {
        time: "下午",
        title: "金鱗湖、貓頭鷹森林",
        body: "金鱗湖是由布院代表景點，午後散步很舒服。貓頭鷹森林屬於趣味型景點，同行旅伴有興趣再排。",
        links: [
          { label: "金鱗湖", url: mapLink("金鱗湖") },
          { label: "貓頭鷹森林", url: mapLink("湯布院 フクロウの森") },
        ],
      },
      {
        time: "晚上",
        title: "回博多，晚餐排近一點",
        body: "圖片排 17:17 回博多、19:30 一蘭總本店可行，但前提是列車順利。建議晚餐選博多/中洲附近，避免再跨區。",
        links: [
          { label: "一蘭總本店", url: mapLink("一蘭 本社総本店") },
          { label: "JR Kyushu", url: searchLink("JR Kyushu Yufuin no Mori reservation") },
        ],
      },
    ],
  },
  {
    date: "6/28",
    weekday: "Day 4",
    title: "太宰府 + 柳川",
    theme: "圖片太宰府單日偏鬆，建議併柳川更完整",
    photos: [
      { ...images.dazaifu, caption: "太宰府天滿宮" },
      { ...images.yanagawa, caption: "柳川遊船" },
    ],
    items: [
      {
        time: "上午",
        title: "太宰府天滿宮、參道散策",
        body: "圖片的太宰府安排合理，但 10:10 車站與天滿宮同時抵達的標示不太精準。建議抓半天，吃梅枝餅、逛參道、看天滿宮。",
        links: [
          { label: "太宰府天滿宮", url: mapLink("太宰府天滿宮") },
          { label: "梅枝餅", url: searchLink("太宰府 梅枝餅 推薦") },
        ],
      },
      {
        time: "中午",
        title: "太宰府午餐或轉往柳川",
        body: "若想悠閒可在太宰府午餐；若想旅行感更強，午餐後移動到柳川，搭船看水鄉街景。",
        links: [
          { label: "太宰府午餐", url: searchLink("太宰府 午餐 推薦") },
          { label: "太宰府到柳川", url: searchLink("太宰府 到 柳川 交通") },
        ],
      },
      {
        time: "下午",
        title: "柳川遊船、鰻魚飯",
        body: "柳川是這天的加分點。搭船加鰻魚飯會比只回天神商店街購物更有近郊旅行感。",
        links: [
          { label: "柳川遊船", url: searchLink("柳川 遊船 福岡") },
          { label: "柳川鰻魚飯", url: searchLink("柳川 鰻魚飯 推薦") },
        ],
      },
      {
        time: "晚上",
        title: "回福岡市區",
        body: "回程建議直接回天神或博多。若還有體力，可以補麵屋兼虎或天神地下街，但不要排太滿。",
        links: [
          { label: "麵屋兼虎", url: mapLink("麺屋 兼虎 天神") },
          { label: "天神地下街", url: mapLink("天神地下街") },
        ],
      },
    ],
  },
  {
    date: "6/29",
    weekday: "Day 5",
    title: "糸島一日遊，或宮地嶽 + LaLaport 備案",
    theme: "天氣好去糸島；想追圖片路線就改宮地嶽",
    photos: [
      { ...images.itoshima, caption: "糸島二見浦" },
      { ...images.momochi, caption: "海邊備案" },
      { ...images.hakata, caption: "市區補買" },
    ],
    items: [
      {
        time: "上午",
        title: "糸島主方案",
        body: "保留原本的糸島一日遊。天氣好就看海、咖啡廳、二見浦夫婦岩。交通若不租車，要先查公車時間。",
        links: [
          { label: "糸島交通", url: searchLink("福岡 到 糸島 交通 公車 電車") },
          { label: "二見浦夫婦岩", url: mapLink("櫻井二見浦夫婦岩") },
        ],
      },
      {
        time: "備案",
        title: "宮地嶽神社 + 福岡寶可夢中心",
        body: "如果想採用圖片 Day 2 的宮地嶽神社，建議改放這天，不要和門司港同一天。宮地嶽後可回市區或去 LaLaport / 寶可夢中心。",
        links: [
          { label: "宮地嶽神社", url: mapLink("宮地嶽神社") },
          { label: "福岡寶可夢中心", url: mapLink("Pokemon Center Fukuoka") },
        ],
      },
      {
        time: "晚上",
        title: "天神或博多補吃",
        body: "把圖片中的甜點、拉麵、咖啡或前幾天沒吃到的店放這晚。隔天返程，不建議熬太晚。",
        links: [
          { label: "天神晚餐", url: searchLink("天神 晚餐 推薦") },
          { label: "福岡甜點", url: searchLink("福岡 甜點 推薦") },
        ],
      },
    ],
  },
  {
    date: "6/30",
    weekday: "Day 6",
    title: "博多 / 天神補買 + 去機場",
    theme: "17:55 福岡起飛，建議 15:30 前後到機場",
    photos: [
      { ...images.hakata, caption: "博多補買" },
      { ...images.airport, caption: "福岡機場" },
    ],
    items: [
      {
        time: "上午",
        title: "退房、博多站補買",
        body: "退房後把行李寄放在飯店或車站置物櫃。最後補買集中在博多站、天神或機場：明太子、博多通饅頭、二〇加煎餅、如水庵甜點。",
        links: [
          { label: "博多站伴手禮", url: searchLink("博多站 伴手禮 明太子 通りもん 二〇加煎餅") },
          { label: "福太郎", url: mapLink("福太郎 博多") },
        ],
      },
      {
        time: "12:00",
        title: "最後午餐與行李整理",
        body: "午餐後就不要再排景點。確認行李重量、護照、機票、航廈與托運規定，把液體與伴手禮整理好。",
        links: [
          { label: "博多午餐", url: searchLink("博多站 午餐 推薦") },
          { label: "天神午餐", url: searchLink("天神 午餐 推薦") },
        ],
      },
      {
        time: "15:00",
        title: "前往福岡機場",
        body: "17:55 起飛，建議 15:00 左右離開市區、15:30 前後到福岡機場。福岡機場雖近，但退稅、託運、安檢都要留時間。",
        links: [
          { label: "博多到機場", url: searchLink("博多 到 福岡機場 地鐵") },
          { label: "天神到機場", url: searchLink("天神 到 福岡機場 地鐵") },
          { label: "福岡機場", url: mapLink("福岡機場") },
        ],
      },
      {
        time: "17:55",
        title: "福岡起飛回台灣",
        body: "下午 5:55 從福岡回程。若有在機場補買，請先完成託運與安檢，再評估剩餘時間。",
        links: [
          { label: "福岡機場航班", url: searchLink("福岡機場 航班 查詢") },
        ],
      },
    ],
  },
);

places.push(
  {
    name: "門司港レトロ",
    type: "近郊",
    area: "北九州",
    image: images.hakata,
    body: "復古港町街區，適合搭配門司港站、九州鐵道紀念館、燒咖哩與海邊散步。建議獨立一天，不要再硬接宮地嶽。",
    links: [
      { label: "地圖", url: mapLink("門司港レトロ") },
      { label: "查找", url: searchLink("門司港レトロ 観光") },
    ],
  },
  {
    name: "唐戶市場",
    type: "美食",
    area: "下關",
    image: images.yatai,
    body: "門司港可跨海到下關唐戶市場吃壽司與海鮮。市場日人潮多，午餐時間要留彈性。",
    links: [
      { label: "地圖", url: mapLink("唐戶市場") },
      { label: "查找", url: searchLink("唐戶市場 活きいき馬関街") },
    ],
  },
  {
    name: "由布院 / 湯之坪街道",
    type: "近郊",
    area: "大分",
    image: images.ohori,
    body: "一日遊可行，但交通要先訂。湯之坪街道適合小吃、雜貨、咖啡與散策。",
    links: [
      { label: "地圖", url: mapLink("湯之坪街道 由布院") },
      { label: "交通", url: searchLink("博多 到 由布院 特急") },
    ],
  },
  {
    name: "金鱗湖",
    type: "景點",
    area: "由布院",
    image: images.ohori,
    body: "由布院代表景點，湖面與山景很適合散步拍照。早晨霧氣最有名，一日遊則午後順路即可。",
    links: [
      { label: "地圖", url: mapLink("金鱗湖") },
      { label: "查找", url: searchLink("金鱗湖 由布院") },
    ],
  },
  {
    name: "宮地嶽神社",
    type: "備案",
    area: "福津",
    image: images.dazaifu,
    body: "以通往海邊方向的參道景色聞名。建議作為糸島替代或半日備案，不建議和門司港硬排同一天。",
    links: [
      { label: "地圖", url: mapLink("宮地嶽神社") },
      { label: "查找", url: searchLink("宮地嶽神社 光之道") },
    ],
  },
  {
    name: "福岡寶可夢中心",
    type: "購物",
    area: "博多",
    image: images.hakata,
    body: "圖片 Day 2 的購物點。若同行有人想買寶可夢商品，建議放在回市區後或彈性日。",
    links: [
      { label: "地圖", url: mapLink("Pokemon Center Fukuoka") },
      { label: "查找", url: searchLink("Pokemon Center Fukuoka") },
    ],
  },
);

const restaurants = [
  {
    name: "THE FULL FULL HAKATA",
    type: "麵包咖啡",
    area: "博多",
    day: "Day 5 / Day 6",
    image: images.bakery,
    body: "圖片 Day 1 必吃，但因 6/25 下午才從台灣起飛，建議改到彈性日或返程日上午當早餐、輕食或咖啡休息點。",
    links: [
      { label: "地圖", url: mapLink("THE FULL FULL HAKATA") },
      { label: "Google 評論照片", url: mapLink("THE FULL FULL HAKATA") },
      { label: "查找", url: searchLink("THE FULL FULL HAKATA 福岡") },
    ],
  },
  {
    name: "FUK COFFEE",
    type: "咖啡甜點",
    area: "博多 / 天神",
    day: "Day 5 / Day 6",
    image: images.cafeCounter,
    body: "福岡在地咖啡品牌，適合排在市區散步中途。抵達日太晚，建議改到彈性日或最後補買日。",
    links: [
      { label: "地圖", url: mapLink("FUK COFFEE 福岡") },
      { label: "Google 評論照片", url: mapLink("FUK COFFEE 福岡") },
      { label: "查找", url: searchLink("FUK COFFEE 福岡") },
    ],
  },
  {
    name: "Pain Stock",
    type: "麵包咖啡",
    area: "天神 / 箱崎",
    day: "Day 5 / Day 6",
    image: images.bakery,
    body: "圖片推薦麵包店。名氣高，建議當早餐或外帶點心；不要放在抵達日，也不要為它硬拉太遠路線。",
    links: [
      { label: "地圖", url: mapLink("Pain Stock 福岡") },
      { label: "Google 評論照片", url: mapLink("Pain Stock 福岡") },
      { label: "查找", url: searchLink("Pain Stock 福岡") },
    ],
  },
  {
    name: "花柚香 湯咖哩",
    type: "正餐",
    area: "福岡市區",
    day: "Day 1",
    image: images.curry,
    body: "圖片 Day 1 晚餐候選。抵達後若還有體力、且店家營業時間符合，可作為坐下來好好吃飯的替代方案；否則改屋台或飯店附近餐廳。",
    links: [
      { label: "地圖", url: mapLink("花柚香 湯咖哩 福岡") },
      { label: "Google 評論照片", url: mapLink("花柚香 湯咖哩 福岡") },
      { label: "查找", url: searchLink("花柚香 湯咖哩 福岡") },
    ],
  },
  {
    name: "新天町甜點",
    type: "咖啡甜點",
    area: "天神",
    day: "Day 1 / Day 5",
    image: images.dessertPlate,
    body: "新天町商店街好逛，甜點可當彈性補位。適合放在天神地下街、新天町一起走。",
    links: [
      { label: "地圖", url: mapLink("新天町商店街 福岡 甜點") },
      { label: "Google 評論照片", url: mapLink("新天町商店街 福岡 甜點") },
      { label: "查找", url: searchLink("新天町商店街 甜點 福岡") },
    ],
  },
  {
    name: "唐戶市場壽司",
    type: "海鮮",
    area: "唐戶 / 下關",
    day: "Day 2",
    image: images.marketSushi,
    body: "門司港一日遊的午餐重點。市場壽司與海鮮小吃適合多人分食，但熱門時段人潮多。",
    links: [
      { label: "地圖", url: mapLink("唐戶市場") },
      { label: "Google 評論照片", url: mapLink("唐戶市場") },
      { label: "查找", url: searchLink("唐戶市場 壽司 推薦") },
    ],
  },
  {
    name: "門司港燒咖哩",
    type: "正餐",
    area: "門司港",
    day: "Day 2",
    image: images.curry,
    body: "門司港代表美食。若唐戶市場沒有排上，可改吃燒咖哩當午餐或下午早晚餐。",
    links: [
      { label: "地圖", url: mapLink("門司港 燒咖哩") },
      { label: "Google 評論照片", url: mapLink("門司港 燒咖哩") },
      { label: "查找", url: searchLink("門司港 燒咖哩 推薦") },
    ],
  },
  {
    name: "金賞可樂餅",
    type: "小吃",
    area: "由布院",
    day: "Day 3",
    image: images.friedSnack,
    body: "湯之坪街道常見排隊小吃，適合當邊走邊吃，不建議當正餐核心。",
    links: [
      { label: "地圖", url: mapLink("金賞コロッケ 湯布院") },
      { label: "Google 評論照片", url: mapLink("金賞コロッケ 湯布院") },
      { label: "查找", url: searchLink("湯布院 金賞コロッケ") },
    ],
  },
  {
    name: "吉吾炸雞",
    type: "小吃",
    area: "由布院",
    day: "Day 3",
    image: images.friedSnack,
    body: "圖片由布院必吃。適合和可樂餅、甜點一起組成散策小吃線。",
    links: [
      { label: "地圖", url: mapLink("吉吾 湯布院 唐揚げ") },
      { label: "Google 評論照片", url: mapLink("吉吾 湯布院 唐揚げ") },
      { label: "查找", url: searchLink("湯布院 吉吾 炸雞") },
    ],
  },
  {
    name: "貓頭鷹造型甜點",
    type: "咖啡甜點",
    area: "由布院",
    day: "Day 3",
    image: images.sweets,
    body: "偏造型與拍照型甜點，適合喜歡可愛小物的旅伴。若時間緊，金鱗湖優先。",
    links: [
      { label: "地圖", url: mapLink("湯布院 貓頭鷹 甜點") },
      { label: "Google 評論照片", url: mapLink("湯布院 貓頭鷹 甜點") },
      { label: "查找", url: searchLink("湯布院 貓頭鷹 甜點") },
    ],
  },
  {
    name: "一蘭 本社総本店",
    type: "拉麵",
    area: "中洲",
    day: "Day 3 / Day 5",
    image: images.ramen,
    body: "回博多後最穩的晚餐候選之一。若由布院回程延誤，拉麵比訂位餐廳更有彈性。",
    links: [
      { label: "地圖", url: mapLink("一蘭 本社総本店") },
      { label: "Google 評論照片", url: mapLink("一蘭 本社総本店") },
      { label: "官方", url: "https://ichiran.com/" },
    ],
  },
  {
    name: "太宰府梅枝餅",
    type: "小吃",
    area: "太宰府",
    day: "Day 4",
    image: images.dazaifu,
    body: "太宰府參道必吃，外皮烤香、內餡紅豆。多家店可買，不必只鎖定單一店。",
    links: [
      { label: "地圖", url: mapLink("太宰府 梅枝餅") },
      { label: "Google 評論照片", url: mapLink("太宰府 梅枝餅") },
      { label: "查找", url: searchLink("太宰府 梅枝餅 推薦") },
    ],
  },
  {
    name: "麵屋兼虎",
    type: "拉麵",
    area: "天神",
    day: "Day 4 / Day 5",
    image: images.ramen,
    body: "圖片推薦沾麵。適合排在天神晚餐，但熱門時段可能排隊，建議保留備案。",
    links: [
      { label: "地圖", url: mapLink("麺屋 兼虎 天神") },
      { label: "Google 評論照片", url: mapLink("麺屋 兼虎 天神") },
      { label: "查找", url: searchLink("麵屋兼虎 天神") },
    ],
  },
  {
    name: "明太子 / 福太郎",
    type: "伴手禮",
    area: "博多",
    day: "Day 6",
    image: images.giftBoxes,
    body: "福岡經典伴手禮。最後一天可在博多站、機場或福太郎相關店鋪集中購買。",
    links: [
      { label: "地圖", url: mapLink("福太郎 博多 明太子") },
      { label: "Google 評論照片", url: mapLink("福太郎 博多 明太子") },
      { label: "查找", url: searchLink("福太郎 明太子 博多") },
    ],
  },
  {
    name: "博多通饅頭",
    type: "伴手禮",
    area: "博多",
    day: "Day 6",
    image: images.souvenir,
    body: "圖片伴手禮清單之一。適合帶回辦公室或分送，博多站與機場通常容易找到。",
    links: [
      { label: "地圖", url: mapLink("博多 通りもん") },
      { label: "Google 評論照片", url: mapLink("博多 通りもん") },
      { label: "查找", url: searchLink("博多通りもん 伴手禮") },
    ],
  },
  {
    name: "二〇加煎餅",
    type: "伴手禮",
    area: "博多",
    day: "Day 6",
    image: images.giftBoxes,
    body: "福岡經典面具造型煎餅，輕巧好分送。可和明太子、拉麵一起最後補買。",
    links: [
      { label: "地圖", url: mapLink("二〇加煎餅 博多") },
      { label: "Google 評論照片", url: mapLink("二〇加煎餅 博多") },
      { label: "查找", url: searchLink("二〇加煎餅 福岡 伴手禮") },
    ],
  },
  {
    name: "如水庵甜點",
    type: "伴手禮",
    area: "博多",
    day: "Day 6",
    image: images.souvenir,
    body: "圖片伴手禮建議之一。適合買年輪蛋糕、和菓子類甜點，保存期限出發前要確認。",
    links: [
      { label: "地圖", url: mapLink("如水庵 博多") },
      { label: "Google 評論照片", url: mapLink("如水庵 博多") },
      { label: "查找", url: searchLink("如水庵 福岡 伴手禮") },
    ],
  },
];

const navTabs = document.querySelectorAll(".nav-tab");
const views = document.querySelectorAll(".view");
const dateSwitcher = document.querySelector("#dateSwitcher");
const dayPanel = document.querySelector("#dayPanel");
const placeFilters = document.querySelector("#placeFilters");
const placesGrid = document.querySelector("#placesGrid");
const foodFilters = document.querySelector("#foodFilters");
const foodGrid = document.querySelector("#foodGrid");
const toast = document.querySelector("#toast");
const noteForm = document.querySelector("#noteForm");
const noteList = document.querySelector("#noteList");

let selectedDay = 0;
let selectedType = "全部";
let selectedFoodType = "全部";
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

function renderFoodFilters() {
  const filters = ["全部", ...new Set(restaurants.map((restaurant) => restaurant.type))];
  foodFilters.innerHTML = filters
    .map(
      (filter) => `
        <button class="filter-pill ${filter === selectedFoodType ? "is-active" : ""}" data-food-filter="${filter}">
          ${filter}
        </button>
      `,
    )
    .join("");

  foodFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedFoodType = button.dataset.foodFilter;
      renderFoodFilters();
      renderFood();
    });
  });
}

function renderFood() {
  const visibleRestaurants =
    selectedFoodType === "全部"
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.type === selectedFoodType);

  foodGrid.innerHTML = visibleRestaurants
    .map(
      (restaurant) => `
        <article class="place-card food-card">
          ${
            restaurant.image
              ? `<img class="place-image" src="${restaurant.image.src}" alt="${restaurant.image.alt}" />`
              : ""
          }
          <span class="card-kicker">${restaurant.area} · ${restaurant.day}</span>
          <h4>${restaurant.name}</h4>
          <p>${restaurant.body}</p>
          <div class="tag-row">
            <span class="tag">${restaurant.type}</span>
          </div>
          ${renderLinks(restaurant.links)}
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
renderFoodFilters();
renderFood();
renderNotes();
