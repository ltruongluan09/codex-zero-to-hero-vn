export default function StatCard({ icon: Icon, label, value, tone = "default" }) {
  const toneClass = tone === "danger" ? "text-red-600 bg-red-50" : "text-indigo-600 bg-indigo-50";
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${toneClass}`}>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </article>
  );
}
