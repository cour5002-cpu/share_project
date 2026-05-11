import { createMeeting } from "./api.js";

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

async function init() {
  const form = document.getElementById("meetingForm");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showModal("提交失败", "请先完善必填信息。");
      return;
    }

    const meeting = getFormData(form);

    submitBtn.disabled = true;
    submitBtn.textContent = "提交中...";

    try {
      await createMeeting(meeting);
      showModal("提交成功", "分享会资料已提交。");
      form.reset();
      form.classList.remove("was-validated");
    } catch (e2) {
      showModal("提交失败", e2?.message ? `失败原因：${e2.message}` : "提交失败，请检查网络或稍后重试。");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "提交";
    }
  });
}

init();
