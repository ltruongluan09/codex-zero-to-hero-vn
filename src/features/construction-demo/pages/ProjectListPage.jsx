import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/mockData";

const statuses = ["Tất cả", "Đang thi công", "Tạm dừng", "Hoàn thành"];

export default function ProjectListPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tất cả");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchStatus = status === "Tất cả" || project.status === status;
      const matchQuery =
        !normalizedQuery ||
        project.name.toLowerCase().includes(normalizedQuery) ||
        project.address.toLowerCase().includes(normalizedQuery);
      return matchStatus && matchQuery;
    });
  }, [query, status]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold text-indigo-600">Công trình</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Danh sách công trình</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">Xem tiến độ, người phụ trách và công việc trễ hạn của từng công trình.</p>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo tên công trình hoặc địa chỉ..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
            />
          </label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
          >
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </section>

      {filteredProjects.length === 0 ? (
        <EmptyState text="Không tìm thấy công trình phù hợp." />
      ) : (
        <section className="grid gap-4 xl:grid-cols-2">
          {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </section>
      )}
    </div>
  );
}
