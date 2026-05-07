create extension if not exists pgcrypto;

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists app_users_email_idx on public.app_users (email);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.app_users(id) on delete cascade,
  completed_task_ids_json text not null default '[]',
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists user_progress_user_id_idx on public.user_progress (user_id);
