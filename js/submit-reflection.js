import { getMeetingById, createReflection } from "./api.js";

function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

function showModal(title, message) {
  const modalEl = document.getElementById("appModal");
  const titleEl = document.getElementById("appModalTitle");
  const bodyEl = document.getElementById("appModalBody");
  titleEl.textContent = title;
  bodyEl.textContent = message;

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

function setStatus(text, type) {
  const el = document.getElementById("submitStatus");
  el.textContent = text;
  el.className = "alert";
  el.classList.add(type);
}

function getFormData(form, meetingId) {
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd.entries());

  return {
    meeting_id: meetingId,
    student_name: String(obj.student_name || "").trim(),
    class_name: String(obj.class_name || "").trim(),
    content: String(obj.content || "").trim(),
    gain: String(obj.gain || "").trim() || null,
    question: String(obj.question || "").trim() || null,
  };
}

function normalizeTitle(title) {
  return String(title ?? "").replaceAll("(新)", "").replaceAll("（新）", "").trim();
}

async function init() {
  const meetingId = qs("meeting_id");
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const formWrap = document.getElementById("formWrap");
  const form = document.getElementById("reflectionForm");
  const submitBtn = document.getElementById("submitBtn");

  loadingEl.classList.remove("d-none");
  errorEl.classList.add("d-none");
  formWrap.classList.add("d-none");

  if (!meetingId) {
    loadingEl.classList.add("d-none");
    errorEl.classList.remove("d-none");
    errorEl.textContent = "缺少参数：meeting_id";
    return;
  }

  try {
    const meeting = await getMeetingById(meetingId);
    if (!meeting) {
      throw new Error("分享会不存在或已被删除");
    }

    document.getElementById("meetingTitle").textContent = normalizeTitle(meeting.title);
    document.getElementById("meetingTopic").textContent = meeting.discussion_topic || "";

    const topic = (meeting.discussion_topic || "").trim();
    if (!topic) {
      errorEl.classList.remove("d-none");
      errorEl.textContent = "本场分享会暂未发布主题讨论，暂不支持提交心得。";
      return;
    }

    formWrap.classList.remove("d-none");
    setStatus("待提交", "alert-secondary");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        showModal("提交失败", "请先完善必填信息。");
        return;
      }

      const payload = getFormData(form, meetingId);

      submitBtn.disabled = true;
      submitBtn.textContent = "提交中...";

      try {
        await createReflection(payload);
        showModal("提交成功", "提交成功，你的心得已公开展示，其他同学现在就可以看到。");
        setStatus("提交成功", "alert-success");
        form.reset();
        form.classList.remove("was-validated");
      } catch {
        showModal("提交失败", "提交失败，请检查网络或稍后重试。");
        setStatus("待提交", "alert-secondary");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "提交";
      }
    });
  } catch (e) {
    errorEl.classList.remove("d-none");
    errorEl.textContent = e?.message || String(e);
  } finally {
    loadingEl.classList.add("d-none");
  }
}

init();
