-- Cart items: one row per user per product, quantity can be updated.
-- Run this in Supabase SQL Editor if cart_items does not exist yet.

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete cascade,
  quantity int not null default 1 check (quantity > 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, product_id)
);

create index if not exists cart_items_user_id_idx on public.cart_items(user_id);

alter table public.cart_items enable row level security;

create policy "Users can manage own cart"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
