const feedbackOptions = [
  { id: "good", icon: "😍", label: "Hữu ích" },
  { id: "okay", icon: "🙂", label: "Tạm ổn" },
  { id: "bad", icon: "😢", label: "Chưa đúng" },
];

function createFeedbackCard(root) {
  const project = root.dataset.feedbackProject || "beginner-article";
  const context = root.dataset.feedbackContext || "";
  const title = root.dataset.feedbackTitle || "Kết quả này có giúp bạn không?";
  const pagePath = `${window.location.pathname}${window.location.search}`;

  root.classList.add("lumi-page-feedback");
  root.innerHTML = `
    <div class="lumi-page-feedback__head">
      <img src="/lumi-bot.png" alt="" />
      <div>
        <span>Lumi hỏi nhanh nhé</span>
        <b>${title}</b>
      </div>
    </div>
    <div class="lumi-page-feedback__actions">
      ${feedbackOptions
        .map((option) => `<button type="button" data-feedback-rating="${option.id}">${option.icon} ${option.label}</button>`)
        .join("")}
    </div>
    <div class="lumi-page-feedback__comment" data-feedback-comment-wrap>
      <textarea data-clarity-mask="True" data-feedback-comment placeholder="Bạn muốn Lumi sửa tốt hơn chỗ nào?"></textarea>
      <button type="button" data-feedback-send>Gửi góp ý</button>
    </div>
    <p class="lumi-page-feedback__status" data-feedback-status></p>
  `;

  const commentWrap = root.querySelector("[data-feedback-comment-wrap]");
  const commentEl = root.querySelector("[data-feedback-comment]");
  const statusEl = root.querySelector("[data-feedback-status]");
  const sendButton = root.querySelector("[data-feedback-send]");
  let selectedRating = "";

  async function sendFeedback(rating, comment = "") {
    statusEl.textContent = "Lumi đang ghi nhận...";
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project,
          rating,
          comment,
          page_path: pagePath,
          metadata: { context },
        }),
      });
      statusEl.textContent = rating === "good" ? "Cảm ơn bạn. Lumi sẽ học từ kết quả tốt này." : "Cảm ơn bạn. Lumi đã ghi nhận để cải thiện.";
    } catch {
      statusEl.textContent = "Cảm ơn bạn. Lumi đã nhận tín hiệu này.";
    }
  }

  root.querySelectorAll("[data-feedback-rating]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedRating = button.dataset.feedbackRating;
      root.querySelectorAll("[data-feedback-rating]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      statusEl.textContent = "";

      if (selectedRating === "good") {
        commentWrap.classList.remove("is-visible");
        sendFeedback(selectedRating);
      } else {
        commentWrap.classList.add("is-visible");
        commentEl.focus();
      }
    });
  });

  sendButton.addEventListener("click", () => {
    if (!selectedRating) return;
    sendFeedback(selectedRating, commentEl.value.trim());
  });
}

document.querySelectorAll("[data-lumi-feedback]").forEach(createFeedbackCard);
