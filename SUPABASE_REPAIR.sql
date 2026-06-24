-- Run this entire script in Supabase > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.trip_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.trip_notes enable row level security;

grant usage on schema public to anon;
grant select, insert, delete on table public.trip_notes to anon;

drop policy if exists "Trip notes are readable by trip members" on public.trip_notes;
drop policy if exists "Trip members can add notes" on public.trip_notes;
drop policy if exists "Trip members can delete notes" on public.trip_notes;

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

notify pgrst, 'reload schema';
