-- 1. すべてのポリシーを削除
DROP POLICY IF EXISTS "Allow public read access to clinics" ON public.clinics;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.clinics;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.clinics;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.clinics;
DROP POLICY IF EXISTS "Allow insert for tsukasa.okimori@gmail.com" ON public.clinics;
DROP POLICY IF EXISTS "Allow update for tsukasa.okimori@gmail.com" ON public.clinics;
DROP POLICY IF EXISTS "Allow delete for tsukasa.okimori@gmail.com" ON public.clinics;

-- 2. トリガーを削除
DROP TRIGGER IF EXISTS set_updated_at ON public.clinics;

-- 3. 関数を削除
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- 4. テーブルを削除
DROP TABLE IF EXISTS public.clinics CASCADE;

-- Create clinics table matching UI expectations
create table public.clinics (
  id uuid primary key default gen_random_uuid(),
  no integer unique not null,
  clinic_name text not null,
  slug text unique not null,
  address text not null,
  prefecture text not null,
  municipalities text not null,
  stations text,
  url text,
  featured_subjects text,
  clinic_spec text,
  corp_tel text,
  non_medical_response text,
  rating numeric,
  review_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes for faster queries
create index if not exists idx_clinics_no on public.clinics(no);
create index if not exists idx_clinics_stations on public.clinics(stations);
create index if not exists idx_clinics_prefecture on public.clinics(prefecture);
create index if not exists idx_clinics_municipalities on public.clinics(municipalities);
create index if not exists idx_clinics_slug on public.clinics(slug);

-- Enable Row Level Security
alter table public.clinics enable row level security;

-- Allow public read access (this is a public directory)
create policy "Allow public read access to clinics"
  on public.clinics for select
  using (true);

-- Only tsukasa.okimori@gmail.com can insert/update/delete
create policy "Allow insert for tsukasa.okimori@gmail.com"
  on public.clinics for insert
  to authenticated
  with check (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

create policy "Allow update for tsukasa.okimori@gmail.com"
  on public.clinics for update
  to authenticated
  using (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

create policy "Allow delete for tsukasa.okimori@gmail.com"
  on public.clinics for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at
  before update on public.clinics
  for each row
  execute function public.handle_updated_at();
