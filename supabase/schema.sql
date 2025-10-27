-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text not null,
  body_md text not null,
  repo_url text,
  live_url text,
  cover_url text,
  tech_stack text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create project_images table
create table public.project_images (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  image_url text not null,
  alt text not null,
  position int default 0
);

-- Create articles table
create table public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text not null,
  body_md text not null,
  cover_url text,
  published_at timestamptz,
  status text default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.articles enable row level security;

-- Policies for projects
create policy "Public can view projects"
  on public.projects for select
  using (true);

create policy "Authenticated users can insert projects"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects"
  on public.projects for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects"
  on public.projects for delete
  using (auth.role() = 'authenticated');

-- Policies for project_images
create policy "Public can view project images"
  on public.project_images for select
  using (true);

create policy "Authenticated users can insert project images"
  on public.project_images for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update project images"
  on public.project_images for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete project images"
  on public.project_images for delete
  using (auth.role() = 'authenticated');

-- Policies for articles
create policy "Public can view published articles"
  on public.articles for select
  using (status = 'published');

create policy "Authenticated users can view all articles"
  on public.articles for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert articles"
  on public.articles for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update articles"
  on public.articles for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete articles"
  on public.articles for delete
  using (auth.role() = 'authenticated');

-- Create storage bucket for images
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true);

-- Storage policies
create policy "Public can view images"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');

create policy "Authenticated users can update images"
  on storage.objects for update
  using (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');

create policy "Authenticated users can delete images"
  on storage.objects for delete
  using (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');
