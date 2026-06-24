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
- 部署後可用 `?v=18` 強制檢查最新版。

## 6/24 行程調整

- 6/27：太宰府＋柳川
- 6/28：糸島自駕一日遊


## v19 修正

### 景點清單
瀏覽器不再直接抓 Google Maps。上傳全部檔案後，到 GitHub repository 的 **Actions** 頁面，執行 **Refresh Google Maps places**。工作完成後會自動更新 `places.json`，GitHub Pages 隨後顯示收藏地點。

### Supabase 備註
到 Supabase 的 **SQL Editor** 執行 `SUPABASE_REPAIR.sql` 全部內容，重新補上資料表、GRANT 與 RLS policies。

部署後請用網址尾端 `?v=19` 開啟。

## v20：Google Maps 收藏清單更新

v20 不再安裝不存在的 `gmaps-list` 套件，改用 Playwright + Chromium 開啟公開清單並產生 `places.json`。

1. 上傳完整專案後，到 `Actions`。
2. 選擇 `Refresh Google Maps places`。
3. 點 `Run workflow`。
4. 成功後，repository 會出現由 `github-actions[bot]` 更新的 `places.json`。
5. 若失敗，執行頁面底部會提供 `google-maps-debug` artifact，可下載除錯畫面。
