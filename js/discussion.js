import { getDiscussionMeetings } from "./api.js";

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeTitle(title) {
  return String(title ?? "").replaceAll("(新)", "").replaceAll("（新）", "").trim();
}

async function init() {
  const listEl = document.getElementById("discussionList");
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");

  loadingEl.classList.remove("d-none");
  errorEl.classList.add("d-none");

  try {
    const meetings = await getDiscussionMeetings();
    if (!meetings.length) {
      listEl.innerHTML = `
        <div class="alert alert-secondary" role="alert">
          暂无可参与的心得讨论。
        </div>
      `;
      return;
    }

    listEl.innerHTML = meetings
      .map((m) => {
        return `
          <div class="col-12">
            <div class="card shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center gap-3">
                  <div class="flex-grow-1">
                    <h5 class="card-title mb-2">${escapeHtml(normalizeTitle(m.title))}</h5>
                    <div class="text-secondary small mb-2">
                      <span>${escapeHtml(m.speaker)}</span>
                      <span class="mx-2">|</span>
                      <span>${escapeHtml(m.speaker_role || "")}</span>
                      <span class="mx-2">|</span>
                      <span>${escapeHtml(m.date)}</span>
                    </div>
                    <p class="card-text mb-2">${escapeHtml(m.description || "")}</p>
                    <div class="discussion-topic-preview">${escapeHtml(m.discussion_topic || "")}</div>
                    <div class="discussion-actions mt-3">
                      <a class="btn btn-outline-primary" href="detail.html?id=${encodeURIComponent(m.id)}">查看讨论</a>
                      <a class="btn btn-success" href="submit-reflection.html?meeting_id=${encodeURIComponent(
                        m.id
                      )}">提交心得</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (e) {
    errorEl.classList.remove("d-none");
    errorEl.textContent = `加载失败：${e?.message || e}`;
  } finally {
    loadingEl.classList.add("d-none");
  }
}

init();
