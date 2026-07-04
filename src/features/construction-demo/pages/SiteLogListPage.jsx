import { ClipboardList, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import SiteLogFeedItem from "../components/SiteLogFeedItem";
import { projects } from "../data/mockData";
import { useSiteFlow } from "../SiteFlowDemo";

export default function SiteLogListPage() {
  const { logs } = useSiteFlow();
  const [projectId, setProjectId] = useState("all");

  const filteredLogs = useMemo(() => {
    if (projectId === "all") return logs;
    return logs.filter((log) => log.projectId === projectId);
  }, [logs, projectId]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-600">
              <ClipboardList size={14} /> Nhật ký hiện trường
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Toàn bộ nhật ký thi công</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Theo dõi ảnh, ghi chú hiện trường và công việc liên quan theo từng công trình.
            </p>
          </div>
          <Link
            to="/logs/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} /> Thêm nhật ký
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-bold text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
            >
              <option value="all">Tất cả công trình</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-500">
            {filteredLogs.length} nhật ký
          </span>
        </div>
      </section>

      {filteredLogs.length === 0 ? (
        <EmptyState text="Chưa có nhật ký phù hợp với bộ lọc hiện tại." />
      ) : (
        <section className="space-y-4">
          {filteredLogs.map((log) => (
            <SiteLogFeedItem key={log.id} log={log} />
          ))}
        </section>
      )}

      <Link
        to="/logs/new"
        className="fixed bottom-24 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 md:hidden"
        aria-label="Thêm nhật ký"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}
