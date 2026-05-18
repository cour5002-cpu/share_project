import { TEACHER_REVIEW_CODE } from "./config.js";
import { createMeeting, getManageMeetings, updateMeeting } from "./api.js";

function showModal(title, message) {
  const modalEl = document.getElementById("appModal");
  const titleEl = document.getElementById("appModalTitle");
  const bodyEl = document.getElementById("appModalBody");
  titleEl.textContent = title;
  bodyEl.textContent = message;

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

function getFormData(form) {
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd.entries());

  return {
    title: String(obj.title || "").trim(),
    speaker: String(obj.speaker || "").trim(),
    speaker_role: String(obj.speaker_role || "").trim() || null,
    date: String(obj.date || "").trim(),
    description: String(obj.description || "").trim() || null,
    video_url: String(obj.video_url || "").trim() || null,
    ppt_url: String(obj.ppt_url || "").trim() || null,
    discussion_topic: String(obj.discussion_topic || "").trim() || null,
    submitter: String(obj.submitter || "").trim() || null,
    remark: String(obj.remark || "").trim() || null,
  };
}

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

function fillForm(form, meeting) {
  form.elements.title.value = meeting.title ?? "";
  form.elements.speaker.value = meeting.speaker ?? "";
  form.elements.speaker_role.value = meeting.speaker_role ?? "";
  form.elements.date.value = meeting.date ?? "";
  form.elements.submitter.value = meeting.submitter ?? "";
  form.elements.description.value = meeting.description ?? "";
  form.elements.video_url.value = meeting.video_url ?? "";
  form.elements.ppt_url.value = meeting.ppt_url ?? "";
  form.elements.discussion_topic.value = meeting.discussion_topic ?? "";
  form.elements.remark.value = meeting.remark ?? "";
}

async function init() {
  const gateEl = document.getElementById("gate");
  const appEl = document.getElementById("app");
  const managePanelEl = document.getElementById("managePanel");
  const formPanelEl = document.getElementById("formPanel");
  const manageListEl = document.getElementById("manageList");
  const manageLoadingEl = document.getElementById("manageLoading");
  const manageEmptyEl = document.getElementById("manageEmpty");
  const codeInput = document.getElementById("code");
  const enterBtn = document.getElementById("enterBtn");
  const createBtn = document.getElementById("createBtn");
  const backToListBtn = document.getElementById("backToListBtn");
  const formTitleEl = document.getElementById("formTitle");

  const form = document.getElementById("meetingForm");
  const submitBtn = document.getElementById("submitBtn");
  let editingMeetingId = null;

  function showManagePanel() {
    managePanelEl.classList.remove("d-none");
    formPanelEl.classList.add("d-none");
  }

  function showFormPanel() {
    managePanelEl.classList.add("d-none");
    formPanelEl.classList.remove("d-none");
  }

  function resetToCreateMode() {
    editingMeetingId = null;
    form.reset();
    form.classList.remove("was-validated");
    formTitleEl.textContent = "新增分享会资料";
    submitBtn.textContent = "提交";
  }

  async function loadManageList() {
    manageLoadingEl.classList.remove("d-none");
    manageEmptyEl.classList.add("d-none");
    manageListEl.innerHTML = "";

    try {
      const meetings = await getManageMeetings();
      if (!meetings.length) {
        manageEmptyEl.classList.remove("d-none");
        return;
      }

      manageListEl.innerHTML = meetings
        .map((meeting) => {
          return `
            <div class="card shadow-sm">
              <div class="card-body">
                <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
                  <div class="flex-grow-1">
                    <div class="fw-semibold mb-2">${escapeHtml(normalizeTitle(meeting.title))}</div>
                    <div class="text-secondary small mb-2">
                      <span>${escapeHtml(meeting.speaker || "")}</span>
                      <span class="mx-2">|</span>
                      <span>${escapeHtml(meeting.speaker_role || "未填写身份")}</span>
                      <span class="mx-2">|</span>
                      <span>${escapeHtml(meeting.date || "")}</span>
                    </div>
                    <div class="small text-secondary">资料链接可在这里直接修改补充。</div>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary" type="button" data-edit-id="${escapeHtml(meeting.id)}">修改</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      meetings.forEach((meeting) => {
        manageListEl.querySelector(`[data-edit-id="${meeting.id}"]`)?.addEventListener("click", () => {
          editingMeetingId = meeting.id;
          fillForm(form, meeting);
          form.classList.remove("was-validated");
          formTitleEl.textContent = `修改分享会资料：${normalizeTitle(meeting.title)}`;
          submitBtn.textContent = "保存修改";
          showFormPanel();
        });
      });
    } catch (e) {
      manageListEl.innerHTML = `
        <div class="alert alert-danger" role="alert">
          加载资料列表失败：${escapeHtml(e?.message || e)}
        </div>
      `;
    } finally {
      manageLoadingEl.classList.add("d-none");
    }
  }

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
    resetToCreateMode();
    showManagePanel();
    await loadManageList();
  });

  createBtn.addEventListener("click", () => {
    resetToCreateMode();
    showFormPanel();
  });

  backToListBtn.addEventListener("click", async () => {
    resetToCreateMode();
    showManagePanel();
    await loadManageList();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showModal("提交失败", "请先完善必填信息。");
      return;
    }

    const meeting = getFormData(form);

    submitBtn.disabled = true;
    submitBtn.textContent = editingMeetingId ? "保存中..." : "提交中...";

    try {
      if (editingMeetingId) {
        await updateMeeting(editingMeetingId, meeting);
        showModal("保存成功", "分享会资料已更新。");
      } else {
        await createMeeting(meeting);
        showModal("提交成功", "分享会资料已提交。");
      }
      resetToCreateMode();
      showManagePanel();
      await loadManageList();
    } catch (e2) {
      showModal(
        editingMeetingId ? "保存失败" : "提交失败",
        e2?.message ? `失败原因：${e2.message}` : "操作失败，请检查网络或稍后重试。"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = editingMeetingId ? "保存修改" : "提交";
    }
  });
}

init();
