import { useEffect, useRef, useState } from "react";
import LumiFeedbackCard from "../../components/lumi/LumiFeedbackCard";

const documentAnalysisTypes = [
  { id: "contract", label: "Hợp đồng", hint: "Tìm rủi ro trước khi ký" },
  { id: "quote", label: "Báo giá", hint: "Soát giá, điều kiện, bảo hành" },
  { id: "finance", label: "Số liệu", hint: "Nhìn nhanh điểm bất thường" },
  { id: "report", label: "Báo cáo", hint: "Tóm tắt ý chính dễ hiểu" },
];

const sampleDocumentResult = {
  document_type: "Chưa đọc được nội dung thật",
  summary:
    "DocScan đã nhận file, nhưng chưa phân tích được nội dung thật của tài liệu này. Kết quả bên dưới chỉ là trạng thái an toàn, không phải nhận xét về file của bạn.",
  key_points: [
    {
      label: "Trạng thái",
      value: "File đã được chọn, nhưng AI chưa trả về bản phân tích bám theo nội dung thật.",
      importance: "high",
    },
    {
      label: "Nên làm gì",
      value: "Hãy thử lại với file PDF, Word, Excel hoặc ảnh rõ nét hơn. Nếu vẫn lỗi, Lumi Labs cần kiểm tra kết nối AI.",
      importance: "medium",
    },
  ],
  risks_or_notes: [
    {
      title: "Chưa có nhận xét từ nội dung thật",
      detail: "Lumi Bot chưa đọc được nội dung bên trong file, nên chưa thể chỉ ra điểm cần chú ý cụ thể.",
      severity: "medium",
    },
  ],
  suggested_questions: [
    "File này có đúng định dạng được hỗ trợ không?",
    "Tài liệu có bị mờ, scan lệch hoặc quá nặng không?",
    "Nếu thử lại vẫn lỗi, Lumi Labs có cần kiểm tra kết nối AI không?",
  ],
  action_items: [
    "Thử upload lại file rõ hơn hoặc nhỏ hơn 20MB.",
    "Nếu vẫn chưa được, hãy thử lại sau ít phút.",
  ],
  score: 0,
  verdict: "Chưa đọc được nội dung thật của file.",
  verdict_icon: "🔒",
  risks: [
    {
      level: "medium",
      title: "Chưa có nhận xét từ nội dung thật",
      body: "Lumi Bot chưa đọc được nội dung bên trong file, nên chưa thể chỉ ra điểm cần chú ý cụ thể.",
    },
  ],
  keyPoints: [
    "File đã được chọn nhưng chưa có bản phân tích thật.",
    "Không hiển thị rủi ro giả nếu AI chưa đọc được tài liệu.",
  ],
  questions: [
    "File này có đúng định dạng được hỗ trợ không?",
    "Nếu thử lại vẫn lỗi, Lumi Labs có cần kiểm tra kết nối AI không?",
  ],
  plainSummary:
    "DocScan đã nhận file nhưng chưa đọc được nội dung thật, nên chưa đưa ra nhận xét cụ thể.",
};

export default function DocScanAISection({ profile = null }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [source, setSource] = useState("sample");
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [filePickerHint, setFilePickerHint] = useState(false);
  const [pickerNudge, setPickerNudge] = useState(false);
  const [rawTextOpen, setRawTextOpen] = useState(false);
  const [rawTextCopied, setRawTextCopied] = useState(false);

  const steps = ["Đọc tài liệu", "Tìm điểm chính", "Nhận diện điểm cần chú ý", "Gợi ý bước tiếp theo"];
  const allowedExtensions = [".pdf", ".docx", ".xlsx", ".xls", ".csv", ".txt", ".png", ".jpg", ".jpeg", ".webp"];
  const getFriendlyFileName = (nextFile) => {
    if (!nextFile?.name) return "";
    const name = nextFile.name;
    const ext = name.match(/\.([a-z0-9]+)$/i)?.[1]?.toUpperCase();
    const base = name.replace(/\.[^.]+$/, "");
    const isCameraName = /^[0-9_\-\s]{12,}$/.test(base) || /^(img|image|photo|zalo|messenger|screenshot|pxl|dsc|dcim)[_\-\s0-9]+$/i.test(base);
    if (nextFile.type?.startsWith("image/")) {
      return ext ? `Ảnh tài liệu (${ext})` : "Ảnh tài liệu";
    }
    if (isCameraName) {
      return ext ? `Tài liệu vừa chọn (${ext})` : "Tài liệu vừa chọn";
    }
    return name.length > 42 ? `${name.slice(0, 26)}...${name.slice(-10)}` : name;
  };
  const friendlyFileName = getFriendlyFileName(file);
  const fileMeta = file
    ? `${file.type?.startsWith("image/") ? "Ảnh chụp" : "File"} · ${Math.max(1, Math.round(file.size / 1024))}KB`
    : "";
  const uploadStatus = loading
    ? "Đang đọc tài liệu..."
    : error
      ? "Cần thử lại"
      : result
        ? "Đọc xong"
        : file
          ? "Đã nhận file"
          : "Chưa chọn file";

  useEffect(() => {
    if (!loading) return undefined;
    const timer = setInterval(() => setStepIndex((value) => (value + 1) % steps.length), 800);
    return () => clearInterval(timer);
  }, [loading]);

  const toBase64 = (nextFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
      reader.onerror = () => reject(new Error("Không đọc được file."));
      reader.readAsDataURL(nextFile);
    });

  const processFile = (nextFile) => {
    if (!nextFile) return;
    setPickerNudge(false);
    const fileName = nextFile.name || "";
    const lowerName = fileName.toLowerCase();
    const supported = allowedExtensions.some((ext) => lowerName.endsWith(ext));
    if (!supported) {
      setFile(null);
      setResult(null);
      setSource("sample");
      setError("File này chưa được hỗ trợ. Bạn dùng PDF, Word, Excel, CSV, TXT hoặc ảnh nhé.");
      return;
    }
    if (nextFile.size > 20 * 1024 * 1024) {
      setFile(null);
      setResult(null);
      setSource("sample");
      setError("File hơi lớn rồi. Bạn chọn file dưới 20MB giúp mình nhé.");
      return;
    }
    setFile(nextFile);
    setResult(null);
    setSource("sample");
    setError("");
    analyze(nextFile);
  };

  const selectFile = (event) => {
    setFilePickerHint(false);
    const nextFile = event.target.files?.[0];
    if (!nextFile) {
      setPickerNudge(true);
      window.setTimeout(() => setPickerNudge(false), 5200);
      return;
    }
    processFile(nextFile);
    event.target.value = "";
  };

  const openFilePicker = () => {
    if (loading) return;
    setPickerNudge(false);
    setFilePickerHint(true);
    fileInputRef.current?.click();
    window.setTimeout(() => {
      setFilePickerHint(false);
      if (!fileInputRef.current?.files?.length && !file && !loading) {
        setPickerNudge(true);
        window.setTimeout(() => setPickerNudge(false), 5200);
      }
    }, 2600);
  };

  const showSampleResult = () => {
    setFile(null);
    setError("");
    setCopied(false);
    setRawTextOpen(false);
    setRawTextCopied(false);
    setPickerNudge(false);
    setFilePickerHint(false);
    setSource("demo");
    setResult({
      document_type: "Kết quả mẫu DocScan",
      summary: "Đây là ví dụ để bạn thấy DocScan sẽ trả về gì sau khi đọc một tài liệu thật.",
      one_line_answer: "DocScan tóm tắt ý chính, chỉ ra phần nên kiểm tra và gợi ý câu nên hỏi lại.",
      verdict: "Bản mẫu giúp người mới hiểu cách dùng trước khi upload file thật.",
      verdict_icon: "✨",
      top_3_takeaways: [
        {
          title: "Nội dung chính",
          detail: "AI gom tài liệu dài thành vài ý dễ đọc, không bắt bạn tự dò từng dòng.",
        },
        {
          title: "Điểm cần chú ý",
          detail: "Những chỗ như deadline, chi phí, điều kiện hoặc phần đánh dấu sẽ được nhắc lại.",
        },
        {
          title: "Việc nên làm tiếp",
          detail: "Bạn nhận được câu hỏi nên xác nhận trước khi gửi tiếp hoặc ra quyết định.",
        },
      ],
      red_flags: [
        {
          title: "Cần kiểm tra phần quan trọng",
          detail: "Nếu tài liệu có số tiền, thời hạn, điều kiện hoặc cam kết, DocScan sẽ nhắc bạn xem kỹ.",
        },
      ],
      questions_to_ask: [
        "Thông tin quan trọng đã đủ rõ để mình quyết định chưa?",
        "Có phần nào cần hỏi lại người gửi tài liệu không?",
      ],
      next_actions: [
        "Sau khi xem mẫu, hãy thử upload ảnh, PDF, Word hoặc Excel của bạn.",
      ],
      copy_ready_summary: "DocScan AI: Kết quả mẫu gồm tóm tắt nội dung chính, điểm cần chú ý và câu nên hỏi lại.",
      extracted_text: "",
    });
  };

  const handleUploadKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openFilePicker();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    processFile(event.dataTransfer.files?.[0]);
  };

  const analyze = async (selectedFile = file) => {
    if (!selectedFile) return;
    setLoading(true);
    setCopied(false);
    setRawTextOpen(false);
    setRawTextCopied(false);
    setError("");
    const startedAt = Date.now();

    try {
      const fileBase64 = await toBase64(selectedFile);
      const response = await fetch("/api/analyze-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64,
          mimeType: selectedFile.type || "application/octet-stream",
          fileName: selectedFile.name,
        }),
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        data = null;
      }
      if (response.status === 429) {
        setError(data?.error || "Hôm nay bạn đã dùng hết lượt AI miễn phí. Bạn quay lại sau nhé.");
        setResult(null);
        return;
      }
      if (!response.ok) throw new Error(data?.error || "Chưa đọc được file.");
      const elapsed = Date.now() - startedAt;
      if (elapsed < 1100) {
        await new Promise((resolve) => setTimeout(resolve, 1100 - elapsed));
      }
      setResult(data.data || sampleDocumentResult);
      setSource(data.source || "fallback");
    } catch (nextError) {
      console.warn("DocScan fallback", nextError);
      const elapsed = Date.now() - startedAt;
      if (elapsed < 900) {
        await new Promise((resolve) => setTimeout(resolve, 900 - elapsed));
      }
      setResult(sampleDocumentResult);
      setSource("fallback");
    } finally {
      setLoading(false);
      setStepIndex(0);
    }
  };

  const copySummary = async () => {
    if (!result) return;
    const text = result.copy_ready_summary || [
      `Loại tài liệu: ${result.document_type || "Tài liệu"}`,
      `Kết luận nhanh: ${result.one_line_answer || result.summary || result.verdict}`,
      "",
      "Bạn cần biết ngay:",
      ...(result.top_3_takeaways || result.key_points || []).map((item) => `- ${item.title || item.label}: ${item.detail || item.value}`),
      "",
      "Điểm cần chú ý:",
      ...(result.red_flags || result.risks || []).map((item) => `- ${item.title}: ${item.detail || item.body}`),
      "",
      "Thông tin còn thiếu:",
      ...(result.missing_information || []).map((item) => `- ${item}`),
      "",
      "Câu nên hỏi lại:",
      ...(result.questions_to_ask || result.questions || []).map((item) => `- ${item}`),
      "",
      "Việc nên làm tiếp:",
      ...(result.next_actions || result.action_items || []).map((item) => `- ${item}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const rawText = result?.extracted_text?.trim() || "";
  const docscanRisks = (result?.red_flags || result?.risks || []).filter(Boolean);
  const docscanMissingInfo = (result?.missing_information || []).filter(Boolean);
  const docscanQuestions = (result?.questions_to_ask || result?.questions || result?.suggested_questions || []).filter(Boolean);
  const docscanNextActions = (result?.next_actions || result?.action_items || []).filter(Boolean);
  const docscanEvidence = (result?.evidence_snippets || []).filter(Boolean);
  const hasDocscanAttention = Boolean(
    docscanRisks.length ||
    docscanMissingInfo.length ||
    docscanQuestions.length ||
    docscanNextActions.length ||
    docscanEvidence.length,
  );

  const copyRawText = async () => {
    if (!rawText) return;
    try {
      await navigator.clipboard.writeText(rawText);
      setRawTextCopied(true);
      setTimeout(() => setRawTextCopied(false), 2000);
    } catch {
      setRawTextCopied(false);
    }
  };

  const downloadRawText = () => {
    if (!rawText) return;
    const baseName = (file?.name || "docscan")
      .replace(/\.[^.]+$/, "")
      .replace(/[\\/:*?"<>|]/g, "-")
      .trim() || "docscan";
    const blob = new Blob([rawText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}_text.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="docscan-page">
      <div className="docscan-shell" data-reveal>
        <header className="docscan-top">
          <div className="docscan-brand">
            <span className="docscan-logo">▰</span>
            <div>
              <h1>DocScan <em>AI</em></h1>
              <p>AI đọc tài liệu và chỉ ra điểm cần chú ý.</p>
            </div>
          </div>
          <div className="docscan-helper">
            <img src="/lumi-bot.png" alt="" />
            <div>
              <strong>AI sẽ giúp bạn hiểu tài liệu</strong>
              <span>An toàn và bảo mật tuyệt đối.</span>
            </div>
          </div>
        </header>

        <div className={result ? "docscan-grid has-result" : "docscan-grid"}>
          <section id="docscan-upload" className="docscan-card docscan-upload-card">
            <div
              role="button"
              tabIndex={0}
              aria-label="Chọn tài liệu để DocScan AI phân tích"
              className={[
                "docscan-drop",
                file ? "has-file" : "",
                loading ? "is-analyzing" : "",
                error ? "has-error" : "",
                filePickerHint ? "is-picking" : "",
                dragActive ? "is-dragging" : "",
              ].filter(Boolean).join(" ")}
              onClick={openFilePicker}
              onKeyDown={handleUploadKeyDown}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                data-clarity-mask="True"
                type="file"
                accept=".pdf,.docx,.xlsx,.xls,.csv,.txt,.png,.jpg,.jpeg,.webp"
                onChange={selectFile}
                onClick={(event) => event.stopPropagation()}
              />
              <span className="docscan-file-icon"><i>+</i></span>
              <strong>{file ? friendlyFileName : "Tải tài liệu lên"}</strong>
              <p>
                {loading
                  ? "Lumi Bot đang đọc file. Bạn cứ chờ ở màn hình này nhé."
                  : filePickerHint
                    ? "Đang mở hộp chọn file..."
                  : file
                    ? "Đã nhận file. Kết quả sẽ hiện ở khung bên phải sau vài giây."
                    : "Bấm vào khung này, dấu cộng hoặc nút bên dưới để chọn file."}
              </p>
              <small>{file ? fileMeta : "PDF, Word, Excel hoặc ảnh"}</small>
              {error && <em className="docscan-error">{error}</em>}
              {!file && !loading && (
                <div className="docscan-mini-steps" aria-label="Cách dùng DocScan">
                  <span>1. Chọn file</span>
                  <span>2. AI đọc</span>
                  <span>3. Nhận tóm tắt</span>
                </div>
              )}
              {pickerNudge && !file && !loading && (
                <em className="docscan-picker-nudge">Bạn chưa chọn file nào. Có thể chọn lại hoặc xem thử kết quả mẫu trước.</em>
              )}
              <div className="docscan-upload-actions">
                <button type="button" onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}>
                  {loading ? "Đang phân tích..." : file ? "Chọn file khác" : "⇧ Chọn file"}
                </button>
                {!loading && !file && (
                  <button
                    className="docscan-sample-button"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      showSampleResult();
                    }}
                  >
                    Xem kết quả mẫu
                  </button>
                )}
              </div>
            </div>
            <div className="docscan-guidance">
              <img src="/lumi-bot.png" alt="" />
              <div>
                <strong>Lumi gợi ý</strong>
                <p>Ảnh chụp rõ chữ, PDF, Word hoặc Excel đều được. Chọn file xong DocScan tự đọc, không cần bấm thêm.</p>
              </div>
            </div>
            <div className={error ? "docscan-upload-state error" : loading ? "docscan-upload-state loading" : result ? "docscan-upload-state success" : "docscan-upload-state"}>
              <span>{uploadStatus}</span>
              <small>
                {error
                  ? "Không sao, bạn có thể chọn lại file khác ngay."
                  : loading
                    ? steps[stepIndex]
                    : result
                      ? "Bạn có thể copy kết quả hoặc thử file khác."
                      : "Một lần chọn file là DocScan tự bắt đầu đọc."}
              </small>
            </div>
            <div className="docscan-safe-note">
              <span>♙</span>
              <div>
              <strong>Tài liệu của bạn được xử lý an toàn.</strong>
                <p>{source === "fallback" && result ? "Chưa đọc được nội dung thật, nên DocScan không đưa ra nhận xét giả." : "Không lưu trữ sau khi hoàn tất."}</p>
              </div>
            </div>
          </section>

          <section className="docscan-card docscan-result-card">
            {loading ? (
              <div className="docscan-loading">
                <img src="/lumi-bot.png" alt="" />
              <h2>{steps[stepIndex]}...</h2>
                <p>Lumi Bot đang đọc trong một lần, rồi gom lại phần quan trọng nhất cho bạn.</p>
                <div>{steps.map((step, index) => <span key={step} className={index <= stepIndex ? "active" : ""} />)}</div>
              </div>
            ) : result ? (
              <div className="docscan-result-ready" data-lumi-sensitive>
                <div className="docscan-score-mini">
                  <span>{result.verdict_icon}</span>
                  <div>
                    <small>{source === "gemini" ? "Đã đọc bằng AI" : source === "demo" ? "Kết quả mẫu" : "Chưa đọc nội dung thật"}</small>
                    <h2>{result.document_type || "Đã đọc xong"}</h2>
                    <p>{result.one_line_answer || result.summary || result.verdict}</p>
                  </div>
                </div>
                {(result.top_3_takeaways || result.key_points || []).length > 0 && (
                  <div className="docscan-keypoints">
                    {(result.top_3_takeaways || result.key_points).slice(0, 3).map((point) => (
                      <span key={`${point.title || point.label}-${point.detail || point.value}`}>
                        <b>{point.title || point.label}</b>
                        {point.detail || point.value}
                      </span>
                    ))}
                  </div>
                )}
                <div className="docscan-result-list">
                  <h3>Điểm cần chú ý</h3>
                  {docscanRisks.slice(0, 3).map((risk) => (
                    <article key={risk.title || risk.label}>
                      <strong>{risk.title || risk.label}</strong>
                      <p>{risk.detail || risk.body || risk.value}</p>
                    </article>
                  ))}
                  {docscanMissingInfo.length > 0 && (
                    <article className="docscan-missing-info">
                      <strong>Thông tin còn thiếu</strong>
                      <p>{docscanMissingInfo.slice(0, 3).join(" ")}</p>
                    </article>
                  )}
                  {docscanQuestions.length > 0 && (
                    <article className="docscan-questions">
                      <strong>Câu nên hỏi lại</strong>
                      <p>{docscanQuestions.slice(0, 3).join(" ")}</p>
                    </article>
                  )}
                  {docscanNextActions.length > 0 && (
                    <article className="docscan-next-actions">
                      <strong>Việc nên làm tiếp</strong>
                      <p>{docscanNextActions.slice(0, 3).join(" ")}</p>
                    </article>
                  )}
                  {docscanEvidence.length > 0 && (
                    <article className="docscan-evidence">
                      <strong>Căn cứ DocScan nhìn thấy</strong>
                      <p>{docscanEvidence.slice(0, 3).map((item) => `“${item}”`).join(" ")}</p>
                    </article>
                  )}
                  {!hasDocscanAttention && rawText && (
                    <article className="docscan-neutral-note">
                      <strong>Chưa thấy cảnh báo rõ</strong>
                      <p>DocScan đã đọc được văn bản, nhưng chưa thấy điểm nào đủ rõ để cảnh báo. Nếu dùng tài liệu này để làm việc, bạn vẫn nên kiểm tra lại mục tiêu chính, deadline, chi phí và người phụ trách trước khi gửi tiếp.</p>
                    </article>
                  )}
                </div>
                {rawText && (
                  <section className={rawTextOpen ? "docscan-raw-text open" : "docscan-raw-text"}>
                    <button
                      className="docscan-raw-toggle"
                      type="button"
                      onClick={() => setRawTextOpen((value) => !value)}
                      aria-expanded={rawTextOpen}
                    >
                      <span>📄 Văn bản gốc</span>
                      <b>{rawTextOpen ? "Ẩn" : "Xem"}</b>
                    </button>
                    {rawTextOpen && (
                      <div className="docscan-raw-body">
                        <textarea data-clarity-mask="True" readOnly value={rawText} />
                        <div>
                          <button type="button" onClick={copyRawText}>
                            {rawTextCopied ? "Đã copy!" : "Copy text"}
                          </button>
                          <button type="button" onClick={downloadRawText}>
                            Tải về .txt
                          </button>
                        </div>
                      </div>
                    )}
                  </section>
                )}
                <LumiFeedbackCard
                  project="docscan-ai"
                  projectLabel="DocScan AI"
                  context="Sau khi đọc tài liệu"
                  profile={profile}
                  metadata={{
                    source,
                    fileType: file?.type || "",
                    fileSize: file?.size || 0,
                    hasRawText: Boolean(rawText),
                    attentionCount: docscanRisks.length + docscanMissingInfo.length + docscanQuestions.length + docscanNextActions.length,
                  }}
                />
              </div>
            ) : (
              <div className="docscan-empty">
                <span>▤</span>
                <h2>Kết quả sẽ hiển thị ở đây</h2>
                <p>Sau khi bạn tải tài liệu lên, AI sẽ đọc và chỉ ra những điểm cần chú ý và gợi ý câu hỏi nên làm rõ.</p>
                <ul>
                  <li>Phân tích tự động</li>
                  <li>Dễ hiểu, dễ áp dụng</li>
                  <li>Dễ dàng copy và sử dụng</li>
                </ul>
                <button className="docscan-empty-sample" type="button" onClick={showSampleResult}>
                  Xem thử kết quả mẫu
                </button>
              </div>
            )}
          </section>
        </div>

        <footer className="docscan-summary">
          <div>
            <span>▣</span>
            <div>
              <strong>Tóm tắt để sử dụng</strong>
              <p>Bạn có thể copy toàn bộ kết quả để lưu lại hoặc gửi cho người khác.</p>
            </div>
          </div>
          <div className="docscan-summary-actions">
            <a href="/project-02-docscan-ai.html">Xem hành trình build</a>
            <button type="button" onClick={copySummary} disabled={!result}>
              {copied ? "Đã copy" : "Copy kết quả"}
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}

