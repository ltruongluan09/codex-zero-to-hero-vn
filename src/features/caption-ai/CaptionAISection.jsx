import { useState } from "react";
import LumiFeedbackCard from "../../components/lumi/LumiFeedbackCard";

const captionModes = [
  { id: "ban-hang", label: "Bán hàng nhẹ nhàng" },
  { id: "ke-chuyen", label: "Kể chuyện gần gũi" },
  { id: "viral", label: "Ngắn gọn dễ viral" },
];

const captionExamples = [
  {
    label: "Đồ ăn",
    productName: "Bánh biscotti healthy",
    description: "Ít ngọt, nhiều hạt, phù hợp dân văn phòng muốn ăn vặt lành mạnh",
  },
  {
    label: "Mỹ phẩm",
    productName: "Serum phục hồi da ban đêm",
    description: "Dành cho da khô, da yếu sau treatment, chất nhẹ, dễ thấm",
  },
  {
    label: "Dịch vụ",
    productName: "Gói chụp ảnh sản phẩm tại nhà",
    description: "Phù hợp shop online nhỏ, có ảnh đẹp để đăng Facebook và TikTok",
  },
];

function normalizeHashtag(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .join("");
}

function buildCaption({ productName, description, mode }) {
  const name = productName.trim() || "sản phẩm của bạn";
  const desc = description.trim() || "giúp công việc hằng ngày nhẹ hơn, nhanh hơn và dễ bắt đầu hơn";
  const shortName = name.length > 46 ? `${name.slice(0, 46)}...` : name;
  const hashName = normalizeHashtag(name) || "SanPhamViet";

  const variants = {
    "ban-hang": {
      tiktok: `Bạn đang tìm một thứ vừa dễ dùng, vừa giúp tiết kiệm thời gian?\n\n${shortName} được tạo ra cho chuyện đó.\n\n${desc}.\n\nNếu bạn muốn bắt đầu đơn giản hơn, thử lưu lại bài này nhé.`,
      facebook: `${shortName} dành cho những ai muốn một giải pháp đơn giản nhưng dùng được ngay.\n\nĐiểm mình thích nhất: ${desc}.\n\nKhông cần làm mọi thứ phức tạp. Chỉ cần một công cụ đúng lúc, đúng việc, là công việc đã nhẹ hơn rất nhiều.`,
    },
    "ke-chuyen": {
      tiktok: `Có những việc nhỏ nhưng làm mỗi ngày lại rất tốn thời gian.\n\nĐó là lý do mình muốn giới thiệu ${shortName}.\n\n${desc}.\n\nĐơn giản, dễ hiểu, và hợp với người mới bắt đầu.`,
      facebook: `Mình luôn tin rằng một sản phẩm tốt không cần nói quá nhiều.\n\n${shortName} giải quyết một việc rất cụ thể: ${desc}.\n\nNếu bạn từng thấy công việc nhỏ lặp đi lặp lại quá nhiều lần, đây có thể là một cách bắt đầu nhẹ nhàng hơn.`,
    },
    viral: {
      tiktok: `Đừng làm thủ công nữa.\n\nThử ${shortName} nếu bạn muốn: ${desc}.\n\nNhanh hơn. Gọn hơn. Dễ bắt đầu hơn.`,
      facebook: `${shortName} giúp bạn xử lý việc này đơn giản hơn:\n\n${desc}.\n\nMột công cụ nhỏ, nhưng có thể tiết kiệm rất nhiều thời gian nếu dùng đúng lúc.`,
    },
  };

  return {
    ...variants[mode],
    hashtags: [`#${hashName}`, "#AIChoCongViec", "#LumiLabs", "#CongCuAI", "#NguoiVietDungAI"],
  };
}

export default function CaptionAISection({ profile = null }) {
  const [productName, setProductName] = useState(captionExamples[0].productName);
  const [description, setDescription] = useState(captionExamples[0].description);
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [source, setSource] = useState("demo");
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const generate = async (override = null) => {
    const nextProductName = override?.productName ?? productName;
    const nextDescription = override?.description ?? description;
    if (!nextProductName.trim()) return;
    setIsGenerating(true);
    setCopied("");
    setError("");
    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: nextProductName, description: nextDescription, mode: "ban-hang" }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Lumi Bot chưa tạo được caption lúc này. Bạn thử lại sau vài giây nhé.");
        return;
      }
      setResult({
        tiktok: data.tiktok,
        facebook: data.facebook,
        hashtags: data.hashtags,
      });
      setSource(data.source === "gemini" ? "gemini" : "fallback");
    } catch {
      setError("Kết nối hơi chập chờn. Lumi Bot chưa gửi được yêu cầu, bạn thử lại sau vài giây nhé.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyText = async (key, text) => {
    try {
      await navigator.clipboard.writeText(Array.isArray(text) ? text.join(" ") : text);
      setCopied(key);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  };

  const useSample = (sample = captionExamples[0]) => {
    setProductName(sample.productName);
    setDescription(sample.description);
    setResult(null);
    setSource("demo");
    generate(sample);
  };

  const copyAll = () => {
    if (!result) return;
    copyText(
      "all",
      `TikTok:\n${result.tiktok}\n\nFacebook:\n${result.facebook}\n\nHashtag:\n${result.hashtags.join(" ")}`
    );
  };

  return (
    <section id="caption-ai" className="caption-ai-section">
      <div className="caption-shell" data-reveal>
        <div className="caption-intro">
          <span className="caption-badge">Demo đầu tiên · dùng ngay</span>
          <h2>Caption AI</h2>
          <p>
            Viết 1-2 dòng về thứ bạn muốn đăng. Lumi Bot sẽ tự tạo caption TikTok,
            Facebook và hashtag tiếng Việt trong một lần bấm.
          </p>
          <div className="caption-mini-proof">
            <span>Xem cách hoạt động</span>
            <span>Dùng full miễn phí</span>
            <span>Không cần tài khoản</span>
          </div>
          <a className="caption-log-link" href="/project-01-caption-ai.html">
            <span className="caption-log-bot">
              <img src="/lumi-bot.png" alt="" />
            </span>
            <span>
              <strong>Đi cùng Lumi Bot xem câu chuyện thật</strong>
              <small>Từ ý tưởng nhỏ đến tool dùng được →</small>
            </span>
            <i aria-hidden="true">→</i>
          </a>
          <div className="caption-steps-card" aria-label="Caption viral chỉ với 3 bước">
            <strong>Caption viral chỉ với 3 bước</strong>
            <div>
              <span>1<small>Nhập thông tin</small></span>
              <i></i>
              <span>AI<small>AI tạo nội dung</small></span>
              <i></i>
              <span>3<small>Sao chép & đăng</small></span>
            </div>
          </div>
          <div className="caption-progress-card" aria-label="Tiến độ dự án">
            <strong>Project 1/21</strong>
            <span><i></i></span>
            <small>5% hoàn thành</small>
          </div>
        </div>

        <div className="caption-app">
          <div className="caption-window-top">
            <div>
              <span className="live-dot"></span>
              Khu viết caption
            </div>
            <span>Dự án #1</span>
          </div>
          <div className="caption-form">
            <div className="caption-form-head">
              <span>1. Bạn muốn đăng gì?</span>
              <button type="button" className="sample-btn" onClick={() => useSample()}>
                Thử mẫu
              </button>
            </div>
            <label>
              Sản phẩm / dịch vụ
              <input
                data-clarity-mask="True"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="Ví dụ: Bánh chuối ít ngọt"
              />
            </label>
            <label>
              Nói thêm một câu
              <textarea
                data-clarity-mask="True"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ví dụ: Ăn sáng nhanh, phù hợp dân văn phòng, không quá ngọt..."
                rows="4"
              />
            </label>
            <p className="form-helper">Không cần chọn nhiều. Lumi Bot tự viết bản dễ dùng nhất trước.</p>
            <button
              className={!productName.trim() ? "generate-btn idle" : "generate-btn"}
              type="button"
              onClick={generate}
              disabled={isGenerating || !productName.trim()}
            >
              {!productName.trim()
                ? "Nhập sản phẩm để bắt đầu"
                : isGenerating
                  ? "Đang viết caption..."
                  : "Viết caption cho tôi →"}
            </button>
            {error && <em className="caption-error">{error}</em>}
            <p className="caption-source">
              {isGenerating
                ? "AI đang đọc thông tin và viết bản nháp đầu tiên..."
                : source === "gemini"
                ? "Đang dùng Gemini để viết caption thật."
                : source === "fallback"
                  ? "Đang dùng bản demo dự phòng. Thêm Gemini API key để kết quả hay hơn."
                  : "Một lần bấm sẽ có đủ TikTok, Facebook và hashtag."}
            </p>
          </div>

          <div className={result ? "caption-results" : "caption-results empty"} data-lumi-sensitive={result ? "true" : undefined}>
            <div className="caption-result-head">
              <div>
                <strong>2. Kết quả sẵn sàng</strong>
                <small>TikTok, Facebook và hashtag nằm chung một chỗ để bạn copy nhanh.</small>
              </div>
            </div>
            {isGenerating ? (
              <article className="ai-thinking">
                <div className="thinking-orb" aria-hidden="true">
                  <img src="/lumi-bot.png" alt="" />
                </div>
                <span className="thinking-label">AI đang phân tích</span>
                <p className="thinking-speech">Lumi Bot: Mình đang viết bản nháp đầu tiên cho bạn...</p>
                <h3>Đang biến ý tưởng của bạn thành caption có thể đăng ngay...</h3>
                <div className="thinking-steps">
                  <div className="thinking-step active">
                    <span></span>
                    Đọc tên sản phẩm
                  </div>
                  <div className="thinking-step active delay-1">
                    <span></span>
                    Chọn giọng văn phù hợp
                  </div>
                  <div className="thinking-step active delay-2">
                    <span></span>
                    Viết caption TikTok & Facebook
                  </div>
                  <div className="thinking-step active delay-3">
                    <span></span>
                    Tạo hashtag tiếng Việt
                  </div>
                </div>
              </article>
            ) : result ? (
              <>
                <div className="result-toolbar">
                  <span>Sẵn sàng đăng</span>
                  <button type="button" onClick={copyAll}>
                    {copied === "all" ? "Đã copy tất cả" : "Copy tất cả"}
                  </button>
                </div>
                <article>
                  <div>
                    <span>TikTok</span>
                    <button type="button" onClick={() => copyText("tiktok", result.tiktok)}>
                      {copied === "tiktok" ? "Đã copy" : "Copy"}
                    </button>
                  </div>
                  <p>{result.tiktok}</p>
                </article>
                <article>
                  <div>
                    <span>Facebook</span>
                    <button type="button" onClick={() => copyText("facebook", result.facebook)}>
                      {copied === "facebook" ? "Đã copy" : "Copy"}
                    </button>
                  </div>
                  <p>{result.facebook}</p>
                </article>
                <article className="hashtag-card">
                  <div>
                    <span>Hashtag</span>
                    <button type="button" onClick={() => copyText("hashtags", result.hashtags)}>
                      {copied === "hashtags" ? "Đã copy" : "Copy"}
                    </button>
                  </div>
                  <p>{result.hashtags.join(" ")}</p>
                </article>
                <LumiFeedbackCard
                  project="caption-ai"
                  projectLabel="Caption AI"
                  context="Sau khi tao caption"
                  profile={profile}
                  metadata={{ source, productName: productName.slice(0, 80) }}
                />
              </>
            ) : (
              <article className="empty-result">
                <span>2. Xem kết quả</span>
                <h3>Caption sẽ hiện ở đây sau một lần bấm.</h3>
                <p>
                  Nhập sản phẩm, viết thêm một câu nếu muốn, rồi bấm nút tím. Không cần chọn nền tảng trước.
                </p>
                <div className="empty-preview">
                  <span>TikTok caption</span>
                  <span>Facebook caption</span>
                  <span>#Hashtag</span>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

