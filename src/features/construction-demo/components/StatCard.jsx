export default function StatCard({ icon: Icon, label, value, tone = "default" }) {
  const toneClass = tone === "danger" ? "text-red-600 bg-red-50 border-red-100" : "text-indigo-600 bg-indigo-50 border-indigo-100";
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border ${toneClass}`}>
        <Icon size={20} />
      </div>
      <p className="text-4xl font-bold tracking-tight text-slate-950 md:text-[40px]">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </article>
  );
}
