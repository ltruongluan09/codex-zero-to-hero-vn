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

const labLogs = ["Deploying Lumi Labs...", "Initializing AI modules...", "AI Agent Active", "Build Complete"];

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
      className="relative mx-auto w-full max-w-2xl perspective-[1200px]"
    >
      <div className="pointer-events-none absolute -inset-16 rounded-[4rem] bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,.34),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,.38),transparent_36%),radial-gradient(circle_at_50%_50%,rgba(37,99,235,.20),transparent_48%)] blur-3xl" />
      <div className="hero-particle left-[9%] top-[16%]" />
      <div className="hero-particle left-[18%] top-[78%] animation-delay-700" />
      <div className="hero-particle right-[8%] top-[24%] animation-delay-1000" />
      <div className="hero-particle right-[20%] bottom-[12%] animation-delay-1500" />

      <motion.div
        animate={{ rotateX: [0, 2.4, 0], rotateY: [-3, 3, -3], y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <GlowCard className="relative min-h-[600px] overflow-hidden p-5 ring-1 ring-cyan-200/10 md:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(103,232,249,.30),transparent_24%),radial-gradient(circle_at_78%_14%,rgba(217,70,239,.22),transparent_26%),linear-gradient(180deg,rgba(255,255,255,.05),transparent_28%,rgba(34,211,238,.06))]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background:linear-gradient(90deg,transparent_0,rgba(103,232,249,.24)_50%,transparent_100%)] animate-scan" />
          <div className="pointer-events-none absolute inset-x-10 top-24 h-20 rounded-[100%] bg-cyan-300/10 blur-2xl" />
          <div className="pointer-events-none absolute inset-x-16 bottom-24 h-10 rounded-[100%] bg-fuchsia-400/10 blur-xl" />

          <div className="relative flex items-center justify-between rounded-2xl border border-cyan-200/15 bg-slate-950/75 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
              </span>
              <span className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200">AI Agent Active</span>
            </div>
            <span className="text-xs font-semibold text-slate-400">Lumi Lab OS · Part 4</span>
          </div>

          <div className="relative mt-7 grid min-h-[485px] place-items-center">
            <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
            <div className="absolute inset-y-10 left-10 w-px bg-gradient-to-b from-transparent via-fuchsia-300/40 to-transparent" />
            <div className="absolute inset-y-10 right-10 w-px bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent" />

            <motion.div
              className="absolute left-0 top-16 hidden w-52 rounded-2xl border border-cyan-200/20 bg-slate-950/75 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl sm:block"
              animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Reality marker</div>
              <div className="text-sm font-semibold text-white">Built publicly in Vietnam</div>
              <div className="mt-3 h-1.5 rounded-full bg-cyan-300/30">
                <div className="h-full w-4/5 rounded-full bg-cyan-300" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-0 hidden w-52 rounded-2xl border border-fuchsia-200/20 bg-slate-950/75 p-4 shadow-2xl shadow-fuchsia-950/20 backdrop-blur-2xl sm:block"
              animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-fuchsia-200">Powered by Codex</div>
              <div className="grid grid-cols-3 gap-2">
                <span className="h-10 rounded-xl bg-cyan-300/20" />
                <span className="h-10 rounded-xl bg-fuchsia-300/20" />
                <span className="h-10 rounded-xl bg-blue-400/20" />
              </div>
              <div className="mt-3 text-sm font-semibold text-white">AI builder workspace</div>
            </motion.div>

            <div className="relative grid h-80 w-80 place-items-center rounded-full md:h-[23rem] md:w-[23rem]">
              <div className="absolute inset-0 rounded-full border border-cyan-200/20 animate-spin-slow shadow-[0_0_80px_rgba(34,211,238,.16)]" />
              <div className="absolute inset-5 rounded-full border border-blue-300/10 animate-spin-reverse" />
              <div className="absolute inset-10 rounded-full border border-dashed border-fuchsia-200/25 animate-spin-reverse" />
              <div className="absolute inset-20 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,.42),rgba(59,130,246,.22)_38%,rgba(168,85,247,.14)_58%,transparent_72%)] blur-sm animate-breathe" />
              <div className="absolute h-[105%] w-[38%] rounded-full border border-cyan-200/15 animate-spin-slow" />
              <div className="absolute h-[38%] w-[105%] rounded-full border border-fuchsia-200/15 animate-spin-reverse" />
              <span className="orbit-dot orbit-dot-a" />
              <span className="orbit-dot orbit-dot-b" />
              <span className="orbit-dot orbit-dot-c" />
              <div className="relative grid h-40 w-40 place-items-center rounded-full border border-cyan-100/50 bg-gradient-to-br from-cyan-200/35 via-blue-500/25 to-fuchsia-400/35 shadow-[0_0_110px_rgba(103,232,249,.55)] backdrop-blur-xl animate-breathe md:h-48 md:w-48">
                <div className="absolute inset-3 rounded-full border border-white/10" />
                <div className="absolute inset-7 rounded-full bg-white/5 blur-sm" />
                <div className="relative text-center">
                  <div className="text-4xl font-black text-white md:text-6xl">AI</div>
                  <div className="mt-1 text-xs font-black uppercase tracking-[0.28em] text-cyan-100">Core</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Live Build Log</span>
                <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[11px] font-black text-emerald-200">running</span>
              </div>
              <div className="grid gap-2 font-mono text-xs text-slate-300 sm:text-sm">
                {labLogs.map((log, index) => (
                  <motion.div
                    key={log}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: [0.35, 1, 0.65], x: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.45, ease: "easeInOut" }}
                  >
                    <span className="text-cyan-300">›</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
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

      <section id="top" className="relative mx-auto grid min-h-[88vh] w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-8 md:grid-cols-[.88fr_1.12fr] md:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_35%,rgba(37,99,235,.18),transparent_28%),radial-gradient(circle_at_76%_44%,rgba(168,85,247,.22),transparent_32%)]" />
        <div className="pointer-events-none absolute left-6 top-20 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_30px_rgba(103,232,249,.95)] animate-float" />
        <div className="pointer-events-none absolute left-[48%] top-16 h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_28px_rgba(217,70,239,.85)] animate-float animation-delay-1000" />
        <div className="pointer-events-none absolute bottom-28 right-10 h-2.5 w-2.5 rounded-full bg-cyan-100/80 shadow-[0_0_28px_rgba(103,232,249,.75)] animate-float animation-delay-1500" />

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.75 }}>
          <SectionLabel>Premium AI Builder Lab</SectionLabel>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl md:text-8xl">
            Từ ý tưởng <span className="gradient-text">→ sản phẩm AI thật.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-bold leading-tight text-cyan-50 sm:text-2xl md:text-3xl">
            Mỗi tuần tôi build và chia sẻ các sản phẩm AI thực tế: website, AI assistant, HRM, automation, content tools và nhiều hơn nữa.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {heroBadges.map((badge) => (
              <span key={badge} className="rounded-full border border-cyan-200/20 bg-white/[0.06] px-4 py-2 text-sm font-bold text-cyan-50 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#codex" className="primary-button">Xem demo mới nhất</a>
            <a href="#paths" className="secondary-button">Tham gia thử thách 21 ngày AI</a>
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
