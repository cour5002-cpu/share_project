import { getMeetingById, getSelectedReflectionsByMeetingId } from "./api.js";

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

    setText("title", meeting.title);
    setText("speaker", meeting.speaker);
    setText("speakerRole", meeting.speaker_role || "");
    setText("date", meeting.date);
    setText("description", meeting.description || "");
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

    const discussionWrap = document.getElementById("discussionWrap");
    const topic = (meeting.discussion_topic || "").trim();
    if (topic) {
      discussionWrap.innerHTML = `
        <div class="alert alert-info" role="alert">
          <div class="fw-semibold mb-1">主题讨论</div>
          <div class="mb-2">${escapeHtml(topic)}</div>
          <a class="btn btn-success" href="submit-reflection.html?meeting_id=${encodeURIComponent(meeting.id)}">提交心得</a>
        </div>
      `;
    } else {
      discussionWrap.innerHTML = `
        <div class="alert alert-secondary" role="alert">
          本场分享会暂未发布主题讨论。
        </div>
      `;
    }

    const reflectionsEl = document.getElementById("reflections");
    const reflections = await getSelectedReflectionsByMeetingId(meeting.id);

    if (!reflections.length) {
      reflectionsEl.innerHTML = `<div class="text-secondary">暂无精选观点。</div>`;
    } else {
      reflectionsEl.innerHTML = reflections
        .map((r) => {
          return `
            <div class="reflection-item mb-3">
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                <div class="fw-semibold">${escapeHtml(r.student_name)}（${escapeHtml(r.class_name)}）</div>
              </div>
              <div class="mb-2">
                <div class="kv-label">我的观点</div>
                <div class="kv-value">${escapeHtml(r.content)}</div>
              </div>
              <div class="mb-2">
                <div class="kv-label">我的收获</div>
                <div class="kv-value">${escapeHtml(r.gain || "")}</div>
              </div>
              <div>
                <div class="kv-label">我的疑问</div>
                <div class="kv-value">${escapeHtml(r.question || "")}</div>
              </div>
            </div>
          `;
        })
        .join("");
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
