import ConstructionImage from "./ConstructionImage";
import { projects } from "../data/mockData";

export default function SiteLogCard({ log, compact = false }) {
  const project = projects.find((item) => item.id === log.projectId);
  return (
    <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
      <ConstructionImage seed={log.imageQuery} alt={log.relatedTask || "Ảnh hiện trường"} compact={compact} />
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">{project?.name}</p>
        <p className="mt-1 text-sm font-semibold text-slate-500">{log.date} · {log.author}</p>
        <p className="mt-3 text-sm leading-6 text-slate-700">{log.note}</p>
        {log.relatedTask && (
          <span className="mt-3 inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            {log.relatedTask}
          </span>
        )}
      </div>
    </article>
  );
}
