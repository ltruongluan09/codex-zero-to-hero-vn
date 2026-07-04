import { imageMap, projects } from "../data/mockData";

export default function SiteLogFeedItem({ log }) {
  const project = projects.find((item) => item.id === log.projectId);
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
          {log.author.split(" ").at(-1)?.[0]}
        </div>
        <div>
          <p className="font-bold text-slate-900">{log.author} <span className="font-medium text-slate-500">đã ghi nhật ký tại</span></p>
          <p className="text-sm font-semibold text-indigo-700">{project?.name}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">{log.date}</p>
        </div>
      </div>
      <img src={imageMap[log.imageQuery]} alt="" className="h-64 w-full rounded-xl object-cover" />
      <p className="mt-4 text-sm leading-6 text-slate-700">{log.note}</p>
      {log.relatedTask && (
        <p className="mt-4 text-sm font-semibold text-slate-600">
          Công việc liên quan: <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{log.relatedTask}</span>
        </p>
      )}
    </article>
  );
}
