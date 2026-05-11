import { getPublishedMeetings } from "./api.js";

function fmtDate(dateStr) {
  if (!dateStr) return "";
  return dateStr;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function init() {
  const listEl = document.getElementById("meetingList");
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");

  loadingEl.classList.remove("d-none");
  errorEl.classList.add("d-none");

  try {
    const meetings = await getPublishedMeetings();
    if (!meetings.length) {
      listEl.innerHTML = `
        <div class="alert alert-secondary" role="alert">
          暂无已发布的分享会。
        </div>
      `;
      return;
    }

    listEl.innerHTML = meetings
      .map((m) => {
        const hasTopic = !!(m.discussion_topic && String(m.discussion_topic).trim());
        return `
          <div class="col-12">
            <div class="card shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start gap-3">
                  <div class="flex-grow-1">
                    <h5 class="card-title mb-2">${escapeHtml(m.title)}</h5>
                    <div class="text-secondary small mb-2">
                      <span>${escapeHtml(m.speaker)}</span>
                      <span class="mx-2">|</span>
                      <span>${escapeHtml(m.speaker_role || "")}</span>
                      <span class="mx-2">|</span>
                      <span>${escapeHtml(fmtDate(m.date))}</span>
                    </div>
                    <p class="card-text mb-2">${escapeHtml(m.description || "")}</p>
                    <span class="badge ${hasTopic ? "text-bg-primary" : "text-bg-secondary"}">
                      ${hasTopic ? "有主题讨论" : "暂无主题讨论"}
                    </span>
                  </div>
                  <div class="text-end">
                    <a class="btn btn-outline-primary" href="detail.html?id=${encodeURIComponent(m.id)}">查看详情</a>
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
