import { getMeetingById } from "./api.js";

function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text ?? "";
}

function normalizeTitle(title) {
  return String(title ?? "").replaceAll("(新)", "").replaceAll("（新）", "").trim();
}

async function init() {
  const id = qs("id");
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const contentEl = document.getElementById("content");

  loadingEl.classList.remove("d-none");
  errorEl.classList.add("d-none");
  contentEl.classList.add("d-none");

  if (!id) {
    loadingEl.classList.add("d-none");
    errorEl.classList.remove("d-none");
    errorEl.textContent = "缺少参数：id";
    return;
  }

  try {
    const meeting = await getMeetingById(id);
    if (!meeting) {
      throw new Error("分享会不存在或已被删除");
    }

    setText("title", normalizeTitle(meeting.title));
    setText("speaker", meeting.speaker);
    setText("speakerRole", meeting.speaker_role || "");
    setText("date", meeting.date);
    setText("description", meeting.description || "");
    setText("discussionTopic", (meeting.discussion_topic || "").trim() || "本场分享会暂未发布主题讨论。");
    setText("remark", meeting.remark || "");

    const videoWrap = document.getElementById("videoWrap");
    const pptWrap = document.getElementById("pptWrap");

    if (meeting.video_url) {
      videoWrap.innerHTML = `<a class="btn btn-primary" href="${escapeHtml(meeting.video_url)}" target="_blank" rel="noopener">打开录屏链接</a>`;
    } else {
      videoWrap.innerHTML = `<span class="text-secondary">暂无录屏链接</span>`;
    }

    if (meeting.ppt_url) {
      pptWrap.innerHTML = `<a class="btn btn-outline-primary" href="${escapeHtml(meeting.ppt_url)}" target="_blank" rel="noopener">打开 PPT/PDF 链接</a>`;
    } else {
      pptWrap.innerHTML = `<span class="text-secondary">暂无 PPT/PDF 链接</span>`;
    }

    contentEl.classList.remove("d-none");
  } catch (e) {
    errorEl.classList.remove("d-none");
    errorEl.textContent = `加载失败：${e?.message || e}`;
  } finally {
    loadingEl.classList.add("d-none");
  }
}

init();
