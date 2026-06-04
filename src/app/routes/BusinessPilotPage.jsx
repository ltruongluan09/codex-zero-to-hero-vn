import { useState } from "react";

const zaloCommunityUrl = "https://zalo.me/g/sf1nek4pce9gkmvz5cos";

const pilotUseCases = [
  {
    icon: "🏦",
    title: "Tài chính / ngân hàng",
    desc: "Sao kê, bảng giao dịch, báo cáo phí, file đối soát cần chuyển thành Excel để kiểm tra.",
  },
  {
    icon: "🧾",
    title: "Kế toán / vận hành",
    desc: "Hóa đơn, bảng phí, báo giá, bảng tổng hợp cần giảm nhập tay và đánh dấu dòng bất thường.",
  },
  {
    icon: "👥",
    title: "HR / backoffice",
    desc: "Danh sách ứng viên, bảng chấm công, bảng phụ cấp hoặc file nhân sự cần đưa về bảng dễ lọc.",
  },
];

const pilotSteps = [
  "Bạn mô tả loại file đang xử lý",
  "Lumi Labs xem quy trình và đề xuất cách làm pilot",
  "Nếu phù hợp, làm bản thử nhỏ trước khi triển khai sâu",
];

export default function BusinessPilotPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    fileType: "",
    monthlyVolume: "",
    contact: "",
    note: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const submitPilot = async (event) => {
    event.preventDefault();
    if (!form.fileType.trim()) {
      setStatus("error");
      setMessage("Bạn mô tả ngắn loại file đang cần xử lý giúp mình nhé.");
      return;
    }
    if (!form.contact.trim()) {
      setStatus("error");
      setMessage("Bạn để lại email hoặc Zalo để Lumi phản hồi nhé.");
      return;
    }

    setStatus("sending");
    setMessage("Lumi đang ghi nhận yêu cầu...");
    try {
      const response = await fetch("/api/pilot-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "business_pilot_page",
          page_path: window.location.pathname,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) {
        throw new Error(data.message || data.error || "Chưa gửi được yêu cầu.");
      }
      setStatus("sent");
      setMessage(data.message || "Đã nhận yêu cầu. Lumi sẽ phản hồi để trao đổi cách xử lý phù hợp.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Có lỗi nhỏ khi gửi. Bạn thử lại giúp mình nhé.");
    }
  };

  return (
    <section className="business-pilot-page">
      <div className="business-pilot-shell">
        <section className="business-pilot-hero" data-reveal>
          <div>
            <span className="caption-badge">Pilot nhỏ cho doanh nghiệp</span>
            <h1>Team bạn đang nhập tay dữ liệu từ PDF?</h1>
            <p>
              Gửi 1 loại file đang lặp lại trong công việc. Lumi Labs sẽ xem có thể bóc bảng,
              giảm nhập tay và xuất Excel dùng được cho team bạn hay không.
            </p>
            <div className="business-pilot-value">
              <span><b>Đỡ nhập tay</b> giảm việc copy từng dòng</span>
              <span><b>Có kiểm tra</b> đánh dấu dòng chưa chắc</span>
              <span><b>Thử nhỏ trước</b> chưa cần làm hệ thống lớn</span>
            </div>
          </div>

          <aside className="business-pilot-lumi">
            <img src="/lumi-bot.png" alt="Lumi Bot" />
            <div>
              <small>Lumi nói ngắn gọn</small>
              <strong>Không cần gửi file thật ở bước này. Chỉ cần mô tả loại file.</strong>
              <p>Mình sẽ phản hồi cách thử nhỏ, an toàn, không public dữ liệu khách hàng.</p>
            </div>
          </aside>
        </section>

        <section className="business-pilot-grid" data-reveal>
          {pilotUseCases.map((item) => (
            <article key={item.title}>
              <span>{item.icon}</span>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </article>
          ))}
        </section>

        <section className="business-pilot-main" data-reveal>
          <div className="business-pilot-card">
            <span className="section-label">Cách pilot diễn ra</span>
            <h2>Mục tiêu là biết nhanh: có đáng làm tiếp không</h2>
            <ol>
              {pilotSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="business-pilot-pricing">
              <strong>Gợi ý phạm vi thử nghiệm</strong>
              <p>1 loại file mẫu · 1 luồng xử lý · 1 bảng Excel đầu ra · feedback trong 3-5 ngày.</p>
            </div>
          </div>

          <form className="business-pilot-form" onSubmit={submitPilot}>
            <span className="section-label">Gửi yêu cầu pilot</span>
            <h2>Mô tả nhanh bài toán của team bạn</h2>
            <p className="business-pilot-form-intro">Không cần gửi file thật ở đây. Chỉ cần nói loại file, số lượng và cách Lumi liên hệ lại.</p>
            <input
              className="business-pilot-honeypot"
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
              aria-hidden="true"
            />
            <label>
              <span>Loại file đang xử lý *</span>
              <textarea
                data-clarity-mask="True"
                value={form.fileType}
                onChange={(event) => updateField("fileType", event.target.value)}
                placeholder="Ví dụ: sao kê ngân hàng dạng PDF, bảng phí, hóa đơn, file đối soát..."
                rows="3"
              />
            </label>
            <label>
              <span>Mỗi tháng khoảng bao nhiêu file?</span>
              <input
                data-clarity-mask="True"
                value={form.monthlyVolume}
                onChange={(event) => updateField("monthlyVolume", event.target.value)}
                placeholder="Ví dụ: 30 file/tháng"
              />
            </label>
            <label>
              <span>Email hoặc Zalo *</span>
              <input
                data-clarity-mask="True"
                value={form.contact}
                onChange={(event) => updateField("contact", event.target.value)}
                placeholder="Để Lumi phản hồi cách thử phù hợp"
              />
            </label>
            <details className="business-pilot-more">
              <summary>Thêm thông tin nếu có</summary>
              <label>
                <span>Tên của bạn</span>
                <input
                  data-clarity-mask="True"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Ví dụ: Anh Lâm"
                />
              </label>
              <label>
                <span>Công ty / team</span>
                <input
                  data-clarity-mask="True"
                  value={form.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  placeholder="Ví dụ: Team vận hành / kế toán"
                />
              </label>
              <label>
                <span>Vai trò</span>
                <input
                  data-clarity-mask="True"
                  value={form.role}
                  onChange={(event) => updateField("role", event.target.value)}
                  placeholder="Ví dụ: Finance, HR, Admin, Founder"
                />
              </label>
              <label>
                <span>Ghi chú thêm</span>
                <textarea
                  data-clarity-mask="True"
                  value={form.note}
                  onChange={(event) => updateField("note", event.target.value)}
                  placeholder="Bạn đang đau nhất ở bước nào? Nhập tay, sai số, kiểm tra, xuất báo cáo..."
                  rows="3"
                />
              </label>
            </details>
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Đang gửi..." : "Gửi yêu cầu pilot"}
            </button>
            {message && <p className={`business-pilot-message ${status}`}>{message}</p>}
            {status === "error" && (
              <a className="business-pilot-zalo-fallback" href={zaloCommunityUrl} target="_blank" rel="noreferrer">
                Nhắn Zalo cho Lumi Labs
              </a>
            )}
          </form>
        </section>
      </div>
    </section>
  );
}
