create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  speaker text not null,
  speaker_role text,
  date date not null,
  description text,
  video_url text,
  ppt_url text,
  discussion_topic text,
  submitter text,
  remark text,
  status text not null default 'published',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

drop trigger if exists trg_meetings_updated_at on public.meetings;
create trigger trg_meetings_updated_at
before update on public.meetings
for each row
execute function public.set_updated_at();

create table if not exists public.reflections (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid references public.meetings(id) on delete cascade,
  student_name text not null,
  class_name text not null,
  content text not null,
  gain text,
  question text,
  status text not null default 'pending',
  created_at timestamp with time zone default now()
);

create index if not exists idx_reflections_meeting_id on public.reflections(meeting_id);
create index if not exists idx_reflections_status on public.reflections(status);
