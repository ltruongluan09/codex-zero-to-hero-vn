import { imageMap, projects } from "../data/mockData";

export default function SiteLogCard({ log, compact = false }) {
  const project = projects.find((item) => item.id === log.projectId);
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img src={imageMap[log.imageQuery]} alt="" className={compact ? "h-28 w-full object-cover" : "h-52 w-full object-cover"} />
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">{project?.name}</p>
        <p className="mt-1 text-sm font-semibold text-slate-500">{log.date} · {log.author}</p>
        <p className="mt-3 text-sm leading-6 text-slate-700">{log.note}</p>
        {log.relatedTask && (
          <span className="mt-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            {log.relatedTask}
          </span>
        )}
      </div>
    </article>
  );
}
