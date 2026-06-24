# 福岡旅伴手冊

6/25-6/30 福岡內部旅伴使用的 PWA app。

## GitHub Pages 部署

1. 在 GitHub 建立一個 repository，例如 `fukuoka-trip-app`。
2. 上傳本資料夾內所有檔案到 repository 根目錄。
3. 到 repository 的 `Settings` > `Pages`。
4. `Build and deployment` 選擇 `Deploy from a branch`。
5. Branch 選 `main`，folder 選 `/root`。
6. 儲存後等待 GitHub Pages 產生網址。

產生的 HTTPS 網址可用於 iOS Safari「加入主畫面」與 Android Chrome 安裝 PWA。


## 2026/06/24 更新

- 每日行程改用 `福岡自由行_2026-06-25至06-30_行程規劃_0624.xlsx`。
- 景點資料會同步指定 Google Maps 公開收藏清單，預期 46 個地點。
- 保留 Supabase 備註跨裝置同步與刪除快取修正。
- 部署後可用 `?v=17` 強制檢查最新版。
