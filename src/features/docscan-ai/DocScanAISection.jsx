import { useEffect, useRef, useState } from "react";

const documentAnalysisTypes = [
  { id: "contract", label: "Hợp đồng", hint: "Tìm rủi ro trước khi ký" },
  { id: "quote", label: "Báo giá", hint: "Soát giá, điều kiện, bảo hành" },
  { id: "finance", label: "Số liệu", hint: "Nhìn nhanh điểm bất thường" },
  { id: "report", label: "Báo cáo", hint: "Tóm tắt ý chính dễ hiểu" },
];

const zaloCommunityUrl = "https://zalo.me/g/sf1nek4pce9gkmvz5cos";

const docscanLeadOptions = ["Báo giá", "Hợp đồng", "CV/JD", "Báo cáo", "Ảnh chụp", "Khác"];

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
  const [leadIntent, setLeadIntent] = useState("");
  const [leadNote, setLeadNote] = useState("");
  const [leadStatus, setLeadStatus] = useState("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const [sampleQuestionsCopied, setSampleQuestionsCopied] = useState(false);
  const [analysisSeconds, setAnalysisSeconds] = useState(0);

  const steps = [
    "Lumi đang đọc từng dòng",
    "Đang tìm số tiền và deadline",
    "Đang lọc điểm dễ bỏ sót",
    "Đang viết lại cho dễ hiểu",
  ];
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

  useEffect(() => {
    if (!loading) {
      setAnalysisSeconds(0);
      return undefined;
    }
    const timer = setInterval(() => setAnalysisSeconds((value) => value + 1), 1000);
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
    setSampleQuestionsCopied(false);
    setRawTextOpen(false);
    setRawTextCopied(false);
    setPickerNudge(false);
    setFilePickerHint(false);
    setSource("demo");
    setResult({
      document_type: "Hợp đồng thuê văn phòng",
      sample_file: {
        name: "Hop-dong-thue-van-phong-Q3-2026.pdf",
        meta: "8 trang · Bạn mất ~25 phút để đọc · DocScan xong trong 42 giây",
        status: "Hoàn tất",
      },
      metrics: [
        { label: "Giá thuê/tháng", value: "45.000.000 đ" },
        { label: "Thời hạn", value: "24 tháng" },
        { label: "Đặt cọc", value: "3 tháng" },
        { label: "Bắt đầu", value: "01/09/2026" },
      ],
      summary: "Hợp đồng thuê văn phòng tầng 7, tòa nhà Saigon Tower, diện tích 120m². Giá thuê cố định 12 tháng đầu, tăng 8% từ tháng 13. Chi phí điện, nước, phí quản lý tính riêng.",
      one_line_answer: "DocScan không chỉ tóm tắt. Nó chỉ ra chỗ có thể làm bạn mất tiền.",
      verdict: "Rủi ro lớn nhất: chấm dứt sớm có thể mất 135.000.000 đ tiền phạt và mất thêm tiền cọc.",
      verdict_icon: "✨",
      top_3_takeaways: [
        {
          title: "Giá thuê/tháng",
          detail: "45.000.000 đ, chưa gồm phí quản lý, điện, nước và chi phí phát sinh khác.",
        },
        {
          title: "Thời hạn thuê",
          detail: "24 tháng. Giá tăng 8% từ tháng 13, tương đương thêm 3.600.000 đ/tháng.",
        },
        {
          title: "Đặt cọc",
          detail: "3 tháng tiền thuê. Cần hỏi rõ điều kiện hoàn cọc trước khi ký.",
        },
      ],
      red_flags: [
        {
          severity: "high",
          label: "ĐỎ - Rủi ro cao",
          title: "Chấm dứt sớm phạt 135.000.000 đ + mất cọc",
          detail: "Hợp đồng không ghi ngoại lệ bất khả kháng. Nếu công ty phải chuyển văn phòng sớm, chi phí thoát hợp đồng rất lớn.",
        },
        {
          severity: "medium",
          label: "CAM - Lưu ý",
          title: "Phải thông báo gia hạn trước 60 ngày",
          detail: "Nếu trễ thời hạn này, bên thuê có thể mất quyền gia hạn dù vẫn muốn ở tiếp.",
        },
        {
          severity: "medium",
          label: "CAM - Lưu ý",
          title: "Tăng 8% từ tháng 13",
          detail: "Tăng thêm 3.600.000 đ/tháng. Hợp đồng chưa giới hạn mức tăng nếu gia hạn lần 2.",
        },
      ],
      questions_to_ask: [
        "Phí quản lý hàng tháng là bao nhiêu và có thay đổi theo năm không?",
        "Có điều khoản chấm dứt sớm trong trường hợp bất khả kháng không?",
        "Mức tăng giá khi gia hạn lần 2 được xác định như thế nào?",
        "Có được cải tạo văn phòng không? Có phải hoàn trả nguyên trạng không?",
      ],
      next_actions: [
        "Copy 4 câu hỏi và gửi cho bên cho thuê trước khi đặt cọc.",
        "Nhờ kế toán tính lại chi phí thuê từ tháng 13 trở đi.",
        "Nếu có phụ lục bàn giao hoặc phí quản lý, hãy upload tiếp để DocScan đọc cùng.",
      ],
      copy_ready_summary: "DocScan AI - Hợp đồng thuê văn phòng Q3/2026\n\nFile mẫu: Hop-dong-thue-van-phong-Q3-2026.pdf\n\nCác con số chính:\n- Giá thuê/tháng: 45.000.000 đ\n- Thời hạn: 24 tháng\n- Đặt cọc: 3 tháng\n- Bắt đầu: 01/09/2026\n\nTóm tắt: Hợp đồng thuê văn phòng tầng 7, tòa nhà Saigon Tower, diện tích 120m². Giá thuê cố định 12 tháng đầu, tăng 8% từ tháng 13. Chi phí điện, nước, phí quản lý tính riêng.\n\nĐiểm cần chú ý:\n- Rủi ro cao: Chấm dứt sớm phạt 3 tháng tiền thuê (135.000.000 đ) + mất cọc. Không có ngoại lệ bất khả kháng.\n- Lưu ý: Phải thông báo gia hạn trước 60 ngày. Trễ thì mất quyền gia hạn.\n- Lưu ý: Tăng 8% từ tháng 13 = thêm 3.600.000 đ/tháng. Không giới hạn mức tăng nếu gia hạn lần 2.\n\nCâu nên hỏi lại:\n- Phí quản lý hàng tháng là bao nhiêu và có thay đổi theo năm không?\n- Có điều khoản chấm dứt sớm trong trường hợp bất khả kháng không?\n- Mức tăng giá khi gia hạn lần 2 được xác định như thế nào?\n- Có được cải tạo văn phòng không? Có phải hoàn trả nguyên trạng không?",
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
    setAnalysisSeconds(0);
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
  const isDemoResult = source === "demo";
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

  const copySampleQuestions = async () => {
    if (!docscanQuestions.length) return;
    try {
      await navigator.clipboard.writeText(docscanQuestions.map((item, index) => `${index + 1}. ${item}`).join("\n"));
      setSampleQuestionsCopied(true);
      setTimeout(() => setSampleQuestionsCopied(false), 1600);
    } catch {
      setSampleQuestionsCopied(false);
    }
  };

  const sendDocscanLeadSignal = async ({ intent = leadIntent, channel = "inline" } = {}) => {
    const nextIntent = intent || "Chưa chọn";
    if (leadStatus === "sending") return;
    setLeadIntent(nextIntent);
    setLeadStatus("sending");
    setLeadMessage("Lumi đang ghi nhận để ưu tiên đúng loại tài liệu bạn cần...");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: "docscan-ai",
          rating: "good",
          comment: [
            `Nhu cầu DocScan: ${nextIntent}`,
            leadNote ? `Ghi chú: ${leadNote}` : "",
            channel === "zalo" ? "Người dùng bấm vào Zalo community." : "",
          ].filter(Boolean).join("\n"),
          page_path: `${window.location.pathname}${window.location.search}`,
          profile: profile ? { name: profile.name, email: profile.email } : {},
          metadata: {
            context: source === "demo" ? "docscan-sample-lead" : "docscan-result-lead",
            intent: nextIntent,
            leadNote,
            channel,
            source,
            fileType: file?.type || "",
            fileSize: file?.size || 0,
            hasRawText: Boolean(rawText),
            attentionCount: docscanRisks.length + docscanMissingInfo.length + docscanQuestions.length + docscanNextActions.length,
          },
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) throw new Error(data.message || "Chưa gửi được tín hiệu.");
      setLeadStatus("sent");
      setLeadMessage("Lumi nhận rồi. Mình sẽ ưu tiên làm DocScan tốt hơn cho nhóm tài liệu này.");
    } catch {
      setLeadStatus("sent");
      setLeadMessage("Lumi đã ghi nhận trên màn hình này. Nếu muốn nói kỹ hơn, bạn vào Zalo gửi trực tiếp nhé.");
    }
  };

  return (
    <section className="docscan-page">
      <div className="docscan-shell" data-reveal>
        <header className="docscan-top">
          <div className="docscan-brand">
            <span className="docscan-logo">▰</span>
            <div>
              <h1>DocScan <em>AI</em></h1>
              <p>Đưa tài liệu vào. Lumi đọc giúp và chỉ ra chỗ cần chú ý.</p>
            </div>
          </div>
          <div className="docscan-helper">
            <img src="/lumi-bot.png" alt="" />
            <div>
              <strong>AI sẽ giúp bạn hiểu tài liệu</strong>
              <span>File được xử lý bởi Google Gemini và không lưu lại sau khi phân tích.</span>
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
              <strong>{file ? friendlyFileName : "Chọn tài liệu để Lumi đọc"}</strong>
              <p>
                {loading
                  ? "Bạn cứ để màn hình này. Lumi đang đọc kỹ để không bỏ sót phần quan trọng."
                  : filePickerHint
                    ? "Đang mở hộp chọn file..."
                  : file
                    ? "Đã nhận file. Kết quả sẽ hiện ở khung bên phải sau vài giây."
                    : "Bấm một lần. DocScan tự đọc và trả về: tóm tắt, điểm cần chú ý, câu nên hỏi lại."}
              </p>
              <small>{file ? fileMeta : "PDF, Word, Excel hoặc ảnh rõ chữ"}</small>
              {error && <em className="docscan-error">{error}</em>}
              {pickerNudge && !file && !loading && (
                <em className="docscan-picker-nudge">Bạn chưa chọn file nào. Bấm lại nút chọn file hoặc xem mẫu bên phải trước.</em>
              )}
              <div className={file || loading ? "docscan-upload-actions" : "docscan-upload-actions is-empty"}>
                <button type="button" onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}>
                  {loading ? "Lumi đang đọc..." : file ? "Chọn file khác" : "Chọn file"}
                </button>
              </div>
            </div>
            {(file || loading || error || result) && (
              <div className={error ? "docscan-upload-state error" : loading ? "docscan-upload-state loading" : result ? "docscan-upload-state success" : "docscan-upload-state"}>
                <span>{uploadStatus}</span>
                <small>
                  {error
                    ? "Không sao, bạn có thể chọn lại file khác ngay."
                    : loading
                      ? steps[stepIndex]
                      : result
                        ? "Bạn có thể copy kết quả hoặc thử file khác."
                        : "Đã sẵn sàng đọc tài liệu này."}
                </small>
              </div>
            )}
            <div className="docscan-safe-note">
              <span>♙</span>
              <div>
                <strong>Không lưu file sau khi phân tích.</strong>
                <p>{source === "fallback" && result ? "Chưa đọc được nội dung thật, nên DocScan không đưa ra nhận xét giả." : "File được xử lý bởi Google Gemini."}</p>
              </div>
            </div>
          </section>

          <section className="docscan-card docscan-result-card">
            {loading ? (
              <div className="docscan-loading">
                <img src="/lumi-bot.png" alt="" />
                <small className="docscan-loading-time">Đang phân tích · {analysisSeconds < 10 ? `0${analysisSeconds}` : analysisSeconds}s</small>
                <h2>{steps[stepIndex]}...</h2>
                <p>
                  {analysisSeconds > 45
                    ? "File này hơi nhiều chữ. Lumi vẫn đang đọc tiếp để không bỏ sót phần quan trọng."
                    : "Ảnh chụp/PDF nhiều chữ có thể mất 30-60 giây. Lumi đọc kỹ để kết quả đáng tin hơn."}
                </p>
                <ul>
                  <li>Không bịa nếu chưa đọc đủ nội dung.</li>
                  <li>Ưu tiên số tiền, ngày tháng và điều khoản quan trọng.</li>
                </ul>
                <div>{steps.map((step, index) => <span key={step} className={index <= stepIndex ? "active" : ""} />)}</div>
              </div>
            ) : result ? (
              <div className="docscan-result-ready" data-lumi-sensitive>
                {isDemoResult && result.sample_file && (
                  <div className="docscan-sample-filebar">
                    <div className="docscan-sample-thumb" aria-hidden="true">
                      <i></i>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div>
                      <small>File mẫu vừa được đọc</small>
                      <strong>{result.sample_file.name}</strong>
                      <p>{result.sample_file.meta}</p>
                    </div>
                    <b>{result.sample_file.status}</b>
                  </div>
                )}
                <div className="docscan-score-mini">
                  <span>{result.verdict_icon}</span>
                  <div>
                    <small>{source === "gemini" ? "Đã đọc bằng AI" : source === "demo" ? "Kết quả mẫu" : "Chưa đọc nội dung thật"}</small>
                    <h2>{result.document_type || "Đã đọc xong"}</h2>
                    <p>{result.one_line_answer || result.summary || result.verdict}</p>
                  </div>
                </div>
                {isDemoResult && result.metrics?.length > 0 && (
                  <div className="docscan-metric-grid">
                    {result.metrics.map((metric) => (
                      <span key={metric.label}>
                        <small>{metric.label}</small>
                        <b>{metric.value}</b>
                      </span>
                    ))}
                  </div>
                )}
                {isDemoResult && (
                  <button className="docscan-try-own-file" type="button" onClick={openFilePicker}>
                    Thử file của bạn ngay
                  </button>
                )}
                {isDemoResult && result.summary && (
                  <section className="docscan-sample-summary">
                    <small>Lumi tóm tắt</small>
                    <p>{result.summary}</p>
                  </section>
                )}
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
                  <h3>3 điều cần biết ngay</h3>
                  {docscanRisks.slice(0, 3).map((risk) => (
                    <article key={risk.title || risk.label} className={risk.severity ? `risk-${risk.severity}` : ""}>
                      {risk.label && <em>{risk.label}</em>}
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
                      <div className="docscan-questions-head">
                        <strong>Câu nên hỏi lại</strong>
                        {isDemoResult && (
                          <button type="button" onClick={copySampleQuestions}>
                            {sampleQuestionsCopied ? "Đã copy" : "Copy câu hỏi"}
                          </button>
                        )}
                      </div>
                      {isDemoResult ? (
                        <ol>
                          {docscanQuestions.map((question) => <li key={question}>{question}</li>)}
                        </ol>
                      ) : (
                        <p>{docscanQuestions.slice(0, 3).join(" ")}</p>
                      )}
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
                <section className="docscan-lead-card" aria-label="Góp ý nhanh cho DocScan AI">
                  <div className="docscan-lead-bot" aria-hidden="true">
                    <span></span>
                    <img src="/lumi-bot.png" alt="" />
                  </div>
                  <div className="docscan-lead-copy">
                    <small>Lumi hỏi thêm 10 giây</small>
                    <h3>
                      {source === "demo"
                        ? "Bạn hay phải đọc loại tài liệu nào nhất?"
                        : "Bạn muốn DocScan đọc loại tài liệu nào tốt hơn?"}
                    </h3>
                    <p>Chọn một nhóm tài liệu bạn hay gặp. Mình dùng tín hiệu này để ưu tiên bản DocScan tiếp theo cho đúng việc thật.</p>
                  </div>
                  <div className="docscan-lead-options">
                    {docscanLeadOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={leadIntent === option ? "active" : ""}
                        onClick={() => sendDocscanLeadSignal({ intent: option })}
                        disabled={leadStatus === "sending"}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <textarea
                    data-clarity-mask="True"
                    value={leadNote}
                    onChange={(event) => setLeadNote(event.target.value)}
                    placeholder="Ví dụ: báo giá nhà cung cấp, hợp đồng thuê mặt bằng, CV ứng viên..."
                    rows="2"
                  />
                  <div className="docscan-lead-actions">
                    <a
                      href={zaloCommunityUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sendDocscanLeadSignal({ intent: leadIntent || "Zalo community", channel: "zalo" })}
                    >
                      Vào Zalo góp ý trực tiếp
                    </a>
                    <button type="button" onClick={() => sendDocscanLeadSignal({})} disabled={leadStatus === "sending"}>
                      {leadStatus === "sending" ? "Đang gửi..." : "Gửi tín hiệu cho Lumi"}
                    </button>
                  </div>
                  {leadMessage && <p className={leadStatus === "sent" ? "docscan-lead-status done" : "docscan-lead-status"}>{leadMessage}</p>}
                </section>
              </div>
            ) : (
              <div className="docscan-empty docscan-sample-preview">
                <div className="docscan-preview-filebar">
                  <div className="docscan-sample-thumb" aria-hidden="true">
                    <i></i>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div>
                    <small>Kết quả mẫu</small>
                    <strong>Hop-dong-thue-van-phong-Q3-2026.pdf</strong>
                    <p>8 trang · Đọc thường ~25 phút · DocScan xong trong 42 giây</p>
                  </div>
                </div>
                <h2>DocScan phát hiện rủi ro có thể mất 135.000.000 đ</h2>
                <p>Trong hợp đồng thuê văn phòng mẫu, điều khoản chấm dứt sớm có thể làm bên thuê mất 3 tháng tiền thuê và mất thêm cọc.</p>
                <div className="docscan-preview-metrics" aria-label="Các con số chính trong hợp đồng mẫu">
                  <span><small>Giá thuê</small><b>45.000.000 đ</b></span>
                  <span><small>Thời hạn</small><b>24 tháng</b></span>
                  <span><small>Đặt cọc</small><b>3 tháng</b></span>
                  <span><small>Bắt đầu</small><b>01/09/2026</b></span>
                </div>
                <article className="docscan-preview-risk">
                  <em>ĐỎ - Rủi ro cao</em>
                  <strong>Chấm dứt sớm phạt 3 tháng tiền thuê + mất cọc</strong>
                  <p>Không thấy ngoại lệ bất khả kháng trong điều khoản mẫu.</p>
                </article>
                <button className="docscan-empty-sample" type="button" onClick={showSampleResult}>
                  Xem mẫu đầy đủ
                </button>
              </div>
            )}
          </section>
        </div>

        {result && (
          <footer className="docscan-summary">
            <div>
              <span>▣</span>
              <div>
                <strong>Lưu lại để dùng ngay</strong>
                <p>Copy tóm tắt, gửi cho sếp/đồng nghiệp hoặc lưu vào ghi chú của bạn.</p>
              </div>
            </div>
            <div className="docscan-summary-actions">
              <a href="/project-02-docscan-ai.html">Xem hành trình build</a>
              <button type="button" onClick={copySummary} disabled={!result}>
                {copied ? "Đã copy" : "Copy kết quả"}
              </button>
            </div>
          </footer>
        )}
      </div>
    </section>
  );
}

