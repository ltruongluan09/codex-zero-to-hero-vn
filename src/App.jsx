import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const learningPaths = [
  ["Codex Zero To Hero", "Đang xây dựng", "Học cách làm việc với Codex từ số 0 đến deploy app thật."],
  ["Claude Code", "Sắp ra mắt", "Quy trình build và refactor project với AI coding assistant."],
  ["AI Office Tools", "Sắp ra mắt", "Tool cho Excel, tài liệu, báo cáo, email và công việc văn phòng."],
  ["AI Automation", "Sắp ra mắt", "Tự động hóa workflow bằng AI, n8n và các công cụ no-code."],
  ["Prompt Library", "Sắp ra mắt", "Thư viện prompt thực chiến cho người đi làm."],
  ["Demo Projects", "Sắp ra mắt", "Các project mẫu có thể copy, sửa và deploy."],
];

const outcomes = [
  "Tạo landing page",
  "Tạo dashboard",
  "Xử lý Excel/XLSX",
  "Tạo chatbot AI",
  "Tạo automation",
  "Deploy website public",
];

const audiences = ["CEO", "Manager", "BA/PM", "Dân văn phòng", "Người không biết code", "Người muốn build MVP nhanh"];

const codexBullets = [
  "Học từ số 0",
  "Cách làm việc với Codex",
  "Cách prompt",
  "Cách build project đầu tiên",
  "Cách sửa lỗi",
  "Cách deploy Vercel",
];

const heroBadges = ["Build in public", "Không cần giỏi code", "Demo thật mỗi tuần"];

const labLogs = ["Part 1: Landing page", "Part 2: HRM demo", "Part 3: AI assistant", "Part 4: Deploy on Vercel"];

function SectionLabel({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
      <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,.9)]" />
      {children}
    </div>
  );
}

function GlowCard({ children, className = "" }) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}

function ProductMockup() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,.16),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,.14),transparent_36%)] blur-3xl" />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <GlowCard className="relative overflow-hidden p-5 ring-1 ring-cyan-200/10 md:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(103,232,249,.12),transparent_28%)]" />

          <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
              </span>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Builder workspace</span>
            </div>
            <span className="text-xs font-semibold text-slate-400">Built with Codex</span>
          </div>

          <div className="relative mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-[1fr_.78fr]">
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-white">Project tuần này</div>
                    <div className="text-xs text-slate-400">HRM + AI assistant demo</div>
                  </div>
                  <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-100">Part 4</span>
                </div>
                <div className="rounded-2xl border border-cyan-200/15 bg-gradient-to-br from-slate-900 to-slate-950 p-4">
                  <div className="mb-4 h-28 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,.18),rgba(168,85,247,.10)),linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:auto,38px_38px,38px_38px]" />
                  <div className="grid gap-2">
                    <div className="h-3 w-4/5 rounded-full bg-white/18" />
                    <div className="h-3 w-3/5 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {["Part 1", "Part 2", "Part 3", "Part 4", "Part 5"].map((part, index) => (
                  <div key={part} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
                    <span className="text-sm font-black text-white">{part}</span>
                    <span className={index === 3 ? "text-xs font-bold text-cyan-200" : "text-xs font-bold text-slate-500"}>
                      {index < 3 ? "Done" : index === 3 ? "Building" : "Next"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200">Built publicly in Vietnam</span>
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200">Built with Codex</span>
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200">Deploy on Vercel</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Terminal log</span>
                  <span className="text-xs font-bold text-emerald-200">live</span>
                </div>
                <div className="grid gap-2 font-mono text-xs text-slate-300 sm:text-sm">
                  {labLogs.map((log, index) => (
                    <motion.div
                      key={log}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: [0.45, 1, 0.75], x: 0 }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.45, ease: "easeInOut" }}
                    >
                      <span className="text-cyan-300">›</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </motion.div>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.22),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(168,85,247,.24),transparent_30%),linear-gradient(135deg,#020617,#071426_50%,#08051b)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-fuchsia-400 text-lg font-black text-slate-950 shadow-[0_0_36px_rgba(103,232,249,.35)]">
            L
          </span>
          <span className="text-lg font-black tracking-tight">Lumi Labs</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-300 md:flex">
          <a href="#paths" className="hover:text-cyan-200">Learning Paths</a>
          <a href="#codex" className="hover:text-cyan-200">Codex</a>
          <a href="#feedback" className="hover:text-cyan-200">Góp ý</a>
        </nav>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[86vh] w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-8 md:grid-cols-[.92fr_1.08fr] md:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_35%,rgba(37,99,235,.10),transparent_28%),radial-gradient(circle_at_76%_44%,rgba(168,85,247,.10),transparent_32%)]" />

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.75 }}>
          <div className="mb-5 inline-flex items-center rounded-full border border-cyan-200/20 bg-white/[0.055] px-4 py-2 text-sm font-bold text-cyan-100">
            Build publicly in Vietnam
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl md:text-7xl">
            Tôi đang build sản phẩm AI thật bằng Codex.
          </h1>
          <p className="mt-7 max-w-2xl whitespace-pre-line text-xl font-semibold leading-8 text-slate-200 md:text-2xl md:leading-9">
            {`Mỗi tuần tôi chia sẻ một project AI thực tế:
website, HRM, AI assistant, automation và nhiều hơn nữa.
Dễ hiểu cho cả người không biết code.`}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {heroBadges.map((badge) => (
              <span key={badge} className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-bold text-slate-100">
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#paths" className="primary-button">Xem các project</a>
            <a href="#feedback" className="secondary-button">Theo dõi hành trình</a>
          </div>
        </motion.div>

        <ProductMockup />
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <SectionLabel>Lumi Labs là gì?</SectionLabel>
          <h2>Không phải lớp học lập trình truyền thống.</h2>
          <p>
            Lumi Labs là nơi học cách làm việc với AI như một cộng sự kỹ thuật: bạn mô tả mục tiêu, AI hỗ trợ build, bạn kiểm tra và cải thiện từng bước.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Không khô khan", "Ít thuật ngữ, nhiều ví dụ thật, tập trung vào việc tạo được sản phẩm."],
            ["Không cần bắt đầu bằng code", "Bắt đầu bằng vấn đề công việc, prompt rõ và bản demo nhỏ."],
            ["Build in public", "Từng learning path được mở rộng dần theo feedback của người học thật."],
          ].map(([title, body]) => (
            <GlowCard key={title} className="p-6">
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 text-slate-300">{body}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section id="paths" className="section-shell">
        <div className="section-heading">
          <SectionLabel>Learning Paths</SectionLabel>
          <h2>Từ Codex đến hệ sinh thái AI tools.</h2>
          <p>Codex Zero To Hero là module đầu tiên. Sau đó Lumi Labs sẽ mở rộng sang Claude Code, ChatGPT, Gemini, Cursor, n8n và AI Office Tools.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map(([title, status, body], index) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <GlowCard className="group h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/50">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/8 text-lg font-black text-cyan-100 ring-1 ring-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span className={status === "Đang xây dựng" ? "status-live" : "status-soon"}>{status}</span>
                </div>
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-3 text-slate-300">{body}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <SectionLabel>Bạn sẽ làm được gì?</SectionLabel>
          <h2>Tạo ra thứ nhìn thấy được, dùng thử được.</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item) => (
            <GlowCard key={item} className="flex min-h-32 items-end p-6">
              <div>
                <div className="mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
                <h3 className="text-2xl font-black">{item}</h3>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <SectionLabel>Dành cho ai?</SectionLabel>
          <h2>Cho người có ý tưởng, có việc thật, nhưng chưa biết bắt đầu từ code.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {audiences.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-base font-bold text-slate-100 shadow-xl shadow-black/10">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section id="codex" className="section-shell">
        <GlowCard className="relative overflow-hidden p-7 md:p-10">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="relative grid gap-9 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <SectionLabel>Module đầu tiên</SectionLabel>
              <h2>Codex Zero To Hero</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Learning path đầu tiên của Lumi Labs giúp người mới hiểu cách làm việc với Codex, từ prompt đầu tiên đến project chạy được và deploy public.
              </p>
              <a href="/export/chapter-00-visual-preview.html" className="primary-button mt-8 inline-flex">Xem chapter visual</a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {codexBullets.map((item) => (
                <div key={item} className="rounded-2xl border border-cyan-200/15 bg-slate-950/50 p-5">
                  <div className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-cyan-300 text-sm font-black text-slate-950">✓</div>
                  <h3 className="text-lg font-black">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </section>

      <section id="feedback" className="section-shell pb-24">
        <GlowCard className="overflow-hidden p-8 text-center md:p-12">
          <SectionLabel>Góp ý</SectionLabel>
          <h2>Bạn muốn Lumi Labs dễ hiểu hơn?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Tôi đang build in public và rất cần góp ý từ người học thật. Nếu có phần nào khó hiểu, thiếu ví dụ hoặc chưa đủ thực chiến, hãy gửi góp ý.
          </p>
          <a href="https://forms.gle/your-form-link" className="primary-button mt-8 inline-flex" target="_blank" rel="noreferrer">
            Gửi góp ý
          </a>
        </GlowCard>
      </section>
    </main>
  );
}

export default App;
