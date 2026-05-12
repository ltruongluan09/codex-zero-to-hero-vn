import React from "react";
import ReactDOM from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

type Requirement = {
  requested_item: string;
  category: string;
  specification: string;
  quantity: number;
  unit: string;
  brand_required: string;
  notes: string;
};

type Recommendation = {
  line_no: number;
  requirement: Requirement;
  product: {
    sku: string;
    product_name: string;
    category: string;
    brand: string;
    specs: string;
    stock_qty: number;
    cost_price: number;
    warranty: string;
    supplier: string;
  };
  match_score: number;
  stock_qty: number;
  last_sold_price: number | null;
  market_min_price: number;
  market_max_price: number;
  suggested_quote_price: number;
  margin_estimate: number;
  risk_level: string;
  ai_reasoning: string;
};

type Analysis = {
  source: "gemini" | "mock";
  file_name: string;
  rfq_summary: {
    customer_name: string;
    rfq_date: string;
    quotation_deadline: string;
    total_lines: number;
    ai_confidence_score: number;
    total_estimated_value: number;
    missing_information: string[];
    summary: string;
  };
  requirements: Requirement[];
  recommendations: Recommendation[];
  insights: {
    total_requested_products: number;
    good_matches: number;
    low_stock_items: number;
    estimated_margin: string;
    market_risk: string;
    suggested_vendors: string[];
  };
};

const API_URL = import.meta.env.VITE_API_URL || "";
const steps = [
  "Đang đọc tài liệu RFQ...",
  "Đang bóc tách yêu cầu...",
  "Đang đối chiếu catalog nội bộ...",
  "Đang kiểm tra tồn kho...",
  "Đang so sánh giá đã bán...",
  "Đang tham chiếu giá thị trường...",
  "Đang tạo đề xuất báo giá..."
];

function money(value: number | null | undefined) {
  if (!value) return "Chưa có";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
}

function App() {
  const [file, setFile] = React.useState<File | null>(null);
  const [analysis, setAnalysis] = React.useState<Analysis | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!loading) return;
    const timer = window.setInterval(() => setStepIndex((index) => (index + 1) % steps.length), 850);
    return () => window.clearInterval(timer);
  }, [loading]);

  const analyze = async () => {
    setLoading(true);
    setError("");
    setAnalysis(null);
    setStepIndex(0);
    try {
      const form = new FormData();
      if (file) form.append("file", file);
      const response = await fetch(`${API_URL}/api/analyze-rfq`, { method: "POST", body: form });
      if (!response.ok) throw new Error("Phân tích RFQ thất bại");
      setAnalysis(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const exportExcel = async () => {
    if (!analysis) return;
    const response = await fetch(`${API_URL}/api/export-quotation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(analysis)
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotation-draft.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const copySummary = async () => {
    if (!analysis) return;
    const text = `RFQ: ${analysis.rfq_summary.customer_name}
Số dòng yêu cầu: ${analysis.rfq_summary.total_lines}
Giá trị ước tính: ${money(analysis.rfq_summary.total_estimated_value)}
Khớp tốt: ${analysis.insights.good_matches}/${analysis.insights.total_requested_products}
Rủi ro thị trường: ${analysis.insights.market_risk}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const reset = () => {
    setFile(null);
    setAnalysis(null);
    setError("");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(109,124,255,.25),transparent_30%),radial-gradient(circle_at_86%_16%,rgba(56,213,255,.16),transparent_28%),linear-gradient(135deg,#070A12,#0B1020_45%,#05070D)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:36px_36px] opacity-30" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Header />
        <Hero file={file} setFile={setFile} analyze={analyze} loading={loading} />

        <AnimatePresence mode="wait">
          {loading && <Processing key="processing" stepIndex={stepIndex} />}
          {error && <ErrorBox key="error" message={error} />}
          {analysis && <Dashboard key="dashboard" data={analysis} exportExcel={exportExcel} copySummary={copySummary} copied={copied} reset={reset} />}
        </AnimatePresence>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between rounded-3xl border border-white/10 bg-white/[.04] px-4 py-3 backdrop-blur-xl">
      <div>
        <p className="text-sm font-bold text-white">AI Creator Hub</p>
        <p className="text-xs text-slate-400">Module demo procurement</p>
      </div>
      <a href="#upload" className="rounded-2xl bg-neon px-4 py-2 text-sm font-bold text-white shadow-glow">Tải file RFQ</a>
    </header>
  );
}

function Hero({ file, setFile, analyze, loading }: { file: File | null; setFile: (file: File | null) => void; analyze: () => void; loading: boolean }) {
  return (
    <div className="relative z-10 grid flex-1 items-center gap-6 py-10 lg:grid-cols-[.9fr_1.1fr]">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">AI Procurement Copilot</span>
        <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Import RFQ. Match products. Generate quotation with AI.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
          Demo quy trình AI bóc tách yêu cầu mua hàng, đối chiếu catalog, kiểm tra tồn kho, tham chiếu giá và tạo draft báo giá.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-300">
          <span className="pill">Không cần đăng nhập</span>
          <span className="pill">Có mock data</span>
          <span className="pill">Xuất Excel</span>
        </div>
      </motion.div>

      <motion.div id="upload" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }} className="glass p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-3">
          <img src="/lumi-bot.png" alt="Lumi Bot" className="h-14 w-14 rounded-2xl object-cover shadow-glow" />
          <div>
            <p className="text-sm font-bold text-white">Lumi Bot đang sẵn sàng</p>
            <p className="text-xs text-slate-400">Upload RFQ hoặc dùng sample để demo ngay.</p>
          </div>
        </div>
        <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[.035] p-7 text-center transition hover:border-cyan/60 hover:bg-cyan/5">
          <input className="hidden" type="file" accept=".pdf,.xlsx,.xls,.csv,.docx,.txt" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          <div className="mb-3 rounded-2xl bg-neon/15 px-4 py-3 text-2xl">↥</div>
          <p className="font-bold">{file ? file.name : "Kéo thả hoặc chọn file RFQ"}</p>
          <p className="mt-2 text-xs text-slate-400">Hỗ trợ PDF, Excel, CSV, DOCX, TXT. Nếu không có file, app dùng sample RFQ.</p>
        </label>
        <button onClick={analyze} disabled={loading} className="mt-4 w-full rounded-2xl bg-gradient-to-r from-neon to-cyan px-5 py-4 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">
          {loading ? "Đang phân tích..." : "Phân tích bằng AI"}
        </button>
      </motion.div>
    </div>
  );
}

function Processing({ stepIndex }: { stepIndex: number }) {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 mb-10 glass p-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <motion.img src="/lumi-bot.png" alt="Lumi Bot" className="h-20 w-20 rounded-3xl object-cover shadow-glow" animate={{ y: [0, -6, 0], rotate: [0, -2, 2, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} />
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan">AI đang xử lý RFQ</p>
          <h2 className="mt-2 text-2xl font-black">{steps[stepIndex]}</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className={`rounded-2xl border px-3 py-2 text-xs ${index <= stepIndex ? "border-cyan/40 bg-cyan/10 text-white" : "border-white/10 bg-white/[.03] text-slate-500"}`}>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ErrorBox({ message }: { message: string }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 mb-8 rounded-3xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">{message}</motion.div>;
}

function Dashboard({ data, exportExcel, copySummary, copied, reset }: { data: Analysis; exportExcel: () => void; copySummary: () => void; copied: boolean; reset: () => void }) {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-5 pb-10">
      <Summary data={data} />
      <Requirements requirements={data.requirements} />
      <Matches recommendations={data.recommendations} />
      <Insights data={data} />
      <div className="sticky bottom-4 z-20 flex flex-wrap gap-3 rounded-3xl border border-white/10 bg-ink/80 p-3 backdrop-blur-xl">
        <button className="action primary" onClick={exportExcel}>Xuất Excel báo giá</button>
        <button className="action" onClick={copySummary}>{copied ? "Đã copy" : "Copy summary"}</button>
        <button className="action" onClick={() => window.print()}>Tạo draft quotation</button>
        <button className="action danger" onClick={reset}>Reset demo</button>
      </div>
    </motion.section>
  );
}

function Summary({ data }: { data: Analysis }) {
  const s = data.rfq_summary;
  const cards = [
    ["Khách hàng", s.customer_name],
    ["Ngày nhận RFQ", s.rfq_date],
    ["Deadline", s.quotation_deadline || "Chưa rõ"],
    ["Số dòng", String(s.total_lines)],
    ["AI confidence", `${s.ai_confidence_score}%`],
    ["Giá trị ước tính", money(s.total_estimated_value)]
  ];
  return (
    <section className="glass p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan">RFQ Summary</p>
          <h2 className="mt-1 text-2xl font-black">Tóm tắt yêu cầu mua hàng</h2>
        </div>
        <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-bold text-mint">{data.source === "gemini" ? "Gemini AI" : "Mock AI"}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value]) => <Kpi key={label} label={label} value={value} />)}
      </div>
    </section>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-lg font-black">{value}</p></div>;
}

function Requirements({ requirements }: { requirements: Requirement[] }) {
  return (
    <section className="glass overflow-hidden p-5">
      <h2 className="text-xl font-black">Bảng yêu cầu đã bóc tách</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-400"><tr>{["STT", "Tên yêu cầu", "Danh mục", "Thông số", "SL", "ĐVT", "Brand", "Ghi chú"].map((h) => <th className="border-b border-white/10 px-3 py-3" key={h}>{h}</th>)}</tr></thead>
          <tbody>{requirements.map((r, i) => <tr key={`${r.requested_item}-${i}`} className="text-slate-200"><td className="px-3 py-3">{i + 1}</td><td className="px-3 py-3 font-bold text-white">{r.requested_item}</td><td className="px-3 py-3">{r.category}</td><td className="px-3 py-3">{r.specification}</td><td className="px-3 py-3">{r.quantity}</td><td className="px-3 py-3">{r.unit}</td><td className="px-3 py-3">{r.brand_required}</td><td className="px-3 py-3">{r.notes}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

function Matches({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-black">AI đề xuất sản phẩm phù hợp</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {recommendations.map((item) => (
          <article key={item.line_no} className="glass p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">Yêu cầu</p>
                <h3 className="mt-1 text-lg font-black">{item.requirement.requested_item}</h3>
              </div>
              <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-black text-cyan">{item.match_score}% match</span>
            </div>
            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[.035] p-4">
              <p className="text-xs text-slate-400">Best matched product</p>
              <p className="mt-1 font-black text-white">{item.product.product_name}</p>
              <p className="mt-1 text-xs text-slate-400">SKU: {item.product.sku}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Mini label="Tồn kho" value={`${item.stock_qty}`} />
              <Mini label="Giá vốn" value={money(item.product.cost_price)} />
              <Mini label="Giá bán gần nhất" value={money(item.last_sold_price)} />
              <Mini label="Giá thị trường" value={`${money(item.market_min_price)} - ${money(item.market_max_price)}`} />
              <Mini label="Giá đề xuất" value={money(item.suggested_quote_price)} strong />
              <Mini label="Margin" value={`${item.margin_estimate}%`} strong />
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-ink/50 p-3 text-sm leading-6 text-slate-300">
              <b className="text-white">Risk: {item.risk_level}.</b> {item.ai_reasoning}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Mini({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.03] p-3"><p className="text-xs text-slate-500">{label}</p><p className={`mt-1 font-bold ${strong ? "text-cyan" : "text-white"}`}>{value}</p></div>;
}

function Insights({ data }: { data: Analysis }) {
  const insightCards = [
    ["Tổng sản phẩm", String(data.insights.total_requested_products)],
    ["Khớp tốt", String(data.insights.good_matches)],
    ["Thiếu tồn kho", String(data.insights.low_stock_items)],
    ["Margin ước tính", data.insights.estimated_margin],
    ["Market risk", data.insights.market_risk],
    ["Suggested vendors", data.insights.suggested_vendors.join(", ")]
  ];
  return (
    <section className="glass p-5">
      <h2 className="text-xl font-black">Procurement Insights</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {insightCards.map(([label, value]) => <Kpi key={label} label={label} value={value} />)}
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
