import { TEACHER_REVIEW_CODE } from "./config.js";
import { getPendingReflectionsWithMeeting, updateReflectionStatus } from "./api.js";

function showModal(title, message) {
  const modalEl = document.getElementById("appModal");
  const titleEl = document.getElementById("appModalTitle");
  const bodyEl = document.getElementById("appModalBody");
  titleEl.textContent = title;
  bodyEl.textContent = message;

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function loadList() {
  const listEl = document.getElementById("pendingList");
  const loadingEl = document.getElementById("loading");
  const emptyEl = document.getElementById("empty");

  loadingEl.classList.remove("d-none");
  emptyEl.classList.add("d-none");
  listEl.innerHTML = "";

  try {
    const rows = await getPendingReflectionsWithMeeting();
    if (!rows.length) {
      emptyEl.classList.remove("d-none");
      return;
    }

    listEl.innerHTML = rows
      .map((r) => {
        const meetingTitle = r.meetings?.title || "(未知分享会)";
        return `
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
                <div class="flex-grow-1">
                  <div class="small text-secondary mb-1">分享会：${escapeHtml(meetingTitle)}</div>
                  <div class="fw-semibold mb-2">${escapeHtml(r.student_name)}（${escapeHtml(r.class_name)}）</div>

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

                <div class="d-flex flex-column gap-2">
                  <button class="btn btn-success" data-action="select" data-id="${escapeHtml(r.id)}">设为精选</button>
                  <button class="btn btn-outline-secondary" data-action="hide" data-id="${escapeHtml(r.id)}">隐藏</button>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    listEl.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const action = btn.getAttribute("data-action");
        const status = action === "select" ? "selected" : "hidden";

        btn.disabled = true;
        try {
          await updateReflectionStatus(id, status);
          showModal("操作成功", "已更新该条心得状态。");
          await loadList();
        } catch (e) {
          showModal("操作失败", e?.message ? `失败原因：${e.message}` : "操作失败，请检查网络或稍后重试。");
          btn.disabled = false;
        }
      });
    });
  } finally {
    loadingEl.classList.add("d-none");
  }
}

function init() {
  const gateEl = document.getElementById("gate");
  const appEl = document.getElementById("app");
  const codeInput = document.getElementById("code");
  const enterBtn = document.getElementById("enterBtn");

  gateEl.classList.remove("d-none");
  appEl.classList.add("d-none");

  enterBtn.addEventListener("click", async () => {
    const v = String(codeInput.value || "").trim();
    if (!TEACHER_REVIEW_CODE) {
      showModal("未配置", "请在 js/config.js 中设置 TEACHER_REVIEW_CODE。");
      return;
    }

    if (v !== TEACHER_REVIEW_CODE) {
      showModal("口令错误", "请重新输入。");
      return;
    }

    gateEl.classList.add("d-none");
    appEl.classList.remove("d-none");
    await loadList();
  });
}

init();
