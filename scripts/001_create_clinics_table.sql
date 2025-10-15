-- Create clinics table matching CSV structure
create table if not exists public.clinics (
  id uuid primary key default gen_random_uuid(),
  no integer unique not null,
  clinic_name text not null,
  url text,
  prefecture text not null,
  municipalities text not null,
  station text not null,
  address text not null,
  non_medical_response text,
  featured_subjects text,
  clinic_spec text,
  corp_tel text,
  slug text unique not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes for faster queries
create index if not exists idx_clinics_station on public.clinics(station);
create index if not exists idx_clinics_prefecture on public.clinics(prefecture);
create index if not exists idx_clinics_municipalities on public.clinics(municipalities);
create index if not exists idx_clinics_slug on public.clinics(slug);
create index if not exists idx_clinics_no on public.clinics(no);

-- Enable Row Level Security
alter table public.clinics enable row level security;

-- Allow public read access (this is a public directory)
create policy "Allow public read access to clinics"
  on public.clinics for select
  using (true);

-- Only authenticated users can insert/update/delete (for admin purposes)
create policy "Allow authenticated insert"
  on public.clinics for insert
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated update"
  on public.clinics for update
  using (auth.role() = 'authenticated');

create policy "Allow authenticated delete"
  on public.clinics for delete
  using (auth.role() = 'authenticated');

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
