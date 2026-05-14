import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase 未配置：请在 js/config.js 填写 SUPABASE_URL 与 SUPABASE_ANON_KEY");
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function getPublishedMeetings() {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getDiscussionMeetings() {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("status", "published")
    .not("discussion_topic", "is", null)
    .neq("discussion_topic", "")
    .order("date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getMeetingById(id) {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createMeeting(meeting) {
  const supabase = getClient();
  const payload = {
    title: meeting.title,
    speaker: meeting.speaker,
    speaker_role: meeting.speaker_role ?? null,
    date: meeting.date,
    description: meeting.description ?? null,
    video_url: meeting.video_url ?? null,
    ppt_url: meeting.ppt_url ?? null,
    discussion_topic: meeting.discussion_topic ?? null,
    submitter: meeting.submitter ?? null,
    remark: meeting.remark ?? null,
    status: "published",
  };

  const { data, error } = await supabase.from("meetings").insert(payload).select("*").single();
  if (error) throw error;
  return data;
}

export async function getPublicReflectionsByMeetingId(meetingId) {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("reflections")
    .select("*")
    .eq("meeting_id", meetingId)
    .neq("status", "hidden")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createReflection(reflection) {
  const supabase = getClient();
  const payload = {
    meeting_id: reflection.meeting_id,
    student_name: reflection.student_name,
    class_name: reflection.class_name,
    content: reflection.content,
    gain: reflection.gain ?? null,
    question: reflection.question ?? null,
    status: "public",
  };

  const { data, error } = await supabase.from("reflections").insert(payload).select("*").single();
  if (error) throw error;
  return data;
}

export async function getPendingReflectionsWithMeeting() {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("reflections")
    .select(
      "id, meeting_id, student_name, class_name, content, gain, question, status, created_at, meetings(title, date)"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function updateReflectionStatus(id, status) {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("reflections")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
