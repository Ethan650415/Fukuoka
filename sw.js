# 跨裝置備註同步設定

目前 app 已支援 Supabase 雲端備註。設定完成後，iPhone、Android、平板看到的備註會是同一份。

## 1. 建立 Supabase 專案

到 https://supabase.com/ 建立新專案。

## 2. 建立資料表

在 Supabase SQL Editor 執行：

```sql
create table public.trip_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.trip_notes enable row level security;

create policy "Trip notes are readable by trip members"
on public.trip_notes
for select
to anon
using (true);

create policy "Trip members can add notes"
on public.trip_notes
for insert
to anon
with check (true);

create policy "Trip members can delete notes"
on public.trip_notes
for delete
to anon
using (true);
```

這是內部旅伴用的簡化設定。只要知道 app 網址的人都可以讀取、新增、刪除備註。

## 3. 填入 config.js

在 `config.js` 填入：

```js
window.TRIP_APP_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT_ID.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  notesTable: "trip_notes",
};
```

Supabase 的 Project URL 和 anon public key 可以在：

`Project Settings` > `API`

找到。

## 4. 重新上傳 GitHub Pages

把更新後的所有檔案重新上傳到 GitHub，開啟：

`https://ethan650415.github.io/Fukuoka/?v=11`

如果設定成功，備註頁會顯示「雲端同步模式」。
