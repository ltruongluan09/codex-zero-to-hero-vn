import { useState } from "react";

export default function LumiFeedbackCard({ project, projectLabel, context = "", profile = null, metadata = {} }) {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const ratingOptions = [
    {
      id: "good",
      icon: "😍",
      label: "Hữu ích",
      note: "Đúng thứ mình cần",
    },
    {
      id: "okay",
      icon: "🙂",
      label: "Tạm ổn",
      note: "Cần chỉnh thêm",
    },
    {
      id: "bad",
      icon: "😢",
      label: "Chưa đúng",
      note: "Lumi cần học lại",
    },
  ];

  const submitFeedback = async (nextRating = rating) => {
    if (!nextRating || status === "sending") return;
    setStatus("sending");
    setMessage("Lumi đang ghi nhận góp ý của bạn...");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project,
          rating: nextRating,
          comment,
          page_path: `${window.location.pathname}${window.location.search}`,
          profile: profile ? { name: profile.name, email: profile.email } : {},
          metadata: {
            context,
            ...metadata,
          },
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "Chưa gửi được góp ý.");
      }
      setStatus("sent");
      setMessage(
        nextRating === "good"
          ? "Cảm ơn bạn. Lumi sẽ học từ những lần dùng thật như thế này."
          : "Cảm ơn bạn. Góp ý này giúp Lumi biết cần sửa đúng chỗ nào."
      );
    } catch {
      setStatus("sent");
      setMessage("Cảm ơn bạn. Lumi đã nhận tín hiệu này, mình sẽ kiểm tra lại phần lưu góp ý.");
    }
  };

  const chooseRating = (nextRating) => {
    setRating(nextRating);
    setMessage("");
    if (nextRating === "good") {
      submitFeedback(nextRating);
    } else {
      setStatus("idle");
    }
  };

  return (
    <section className="lumi-feedback-card" aria-label={`Góp ý cho ${projectLabel}`}>
      <div className="lumi-feedback-bot" aria-hidden="true">
        <span></span>
        <img src="/lumi-bot.png" alt="" />
      </div>
      <div className="lumi-feedback-copy">
        <span className="lumi-feedback-kicker">Lumi hỏi nhanh nhé</span>
        <h3>Kết quả này có giúp bạn không?</h3>
        <p>Chỉ một chạm thôi. Lumi Labs sẽ dựa vào phản hồi thật để làm tool này dễ dùng hơn cho mọi người.</p>
      </div>
      <div className="lumi-feedback-actions">
        {ratingOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={rating === option.id ? "active" : ""}
            onClick={() => chooseRating(option.id)}
            disabled={status === "sending"}
          >
            <span>{option.icon}</span>
            <strong>{option.label}</strong>
            <small>{option.note}</small>
          </button>
        ))}
      </div>
      {rating && rating !== "good" && (
        <div className="lumi-feedback-comment">
          <label>
            Bạn muốn Lumi làm tốt hơn chỗ nào?
            <textarea
              data-clarity-mask="True"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Ví dụ: đọc thiếu nội dung, tóm tắt chưa đúng, caption chưa giống giọng người Việt..."
              rows="3"
            />
          </label>
          <button type="button" onClick={() => submitFeedback()} disabled={status === "sending"}>
            {status === "sending" ? "Đang gửi..." : "Gửi góp ý"}
          </button>
        </div>
      )}
      {message && <p className={status === "sent" ? "lumi-feedback-status done" : "lumi-feedback-status"}>{message}</p>}
    </section>
  );
}

