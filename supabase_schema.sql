-- ============================================================
-- FarmGuardian – Supabase Database Schema
-- Run this entire file in the Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. PROFILES TABLE
-- ---------------------------------------------------------
create table if not exists public.profiles (
  id            uuid        primary key references auth.users(id) on delete cascade,
  email         text,
  name          text,
  phone_number  text,
  city          text,
  district      text,
  village       text,
  total_land    numeric,
  crops_grown   text[],
  photo_url     text        default '',
  auth_provider text        default 'email',
  is_profile_complete boolean default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- 2. ROW LEVEL SECURITY
-- ---------------------------------------------------------
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. AUTO-CREATE PROFILE ON SIGN-UP TRIGGER
-- ---------------------------------------------------------
-- This runs whenever a new user is created in auth.users
-- (handles both email/password and OAuth sign-ups)

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, photo_url, auth_provider, is_profile_complete)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    coalesce(new.raw_user_meta_data->>'provider', 'email'),
    false
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop and re-create trigger to avoid duplicates on re-run
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. UPDATED_AT TRIGGER
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
