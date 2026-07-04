import { ArrowLeft, CalendarDays, ClipboardList, MapPin, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import Avatar from "../components/Avatar";
import ConstructionImage from "../components/ConstructionImage";
import ProgressBar from "../components/ProgressBar";
import SiteLogCard from "../components/SiteLogCard";
import StatusBadge from "../components/StatusBadge";
import TaskListItem from "../components/TaskListItem";
import { projects, tasks } from "../data/mockData";
import { useSiteFlow } from "../SiteFlowDemo";

const tabs = ["Tổng quan", "Công việc", "Nhật ký hiện trường"];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const { logs } = useSiteFlow();
  const project = projects.find((item) => item.id === id);
  const projectTasks = useMemo(() => tasks.filter((task) => task.projectId === id), [id]);
  const projectLogs = useMemo(() => logs.filter((log) => log.projectId === id), [logs, id]);

  if (!project) return <Navigate to="/projects" replace />;

  const doneTasks = projectTasks.filter((task) => task.status === "Hoàn thành").length;

  return (
    <div className="space-y-8">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:-translate-x-0.5">
        <ArrowLeft size={18} /> Quay lại
      </Link>

      <section className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:p-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{project.name}</h1>
              <StatusBadge>{project.status}</StatusBadge>
            </div>
            <p className="flex gap-2 text-sm font-medium text-slate-500"><MapPin size={16} /> {project.address}</p>
          </div>
          <Link to={`/logs/new?projectId=${project.id}`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-[0.98]">
            <Plus size={18} /> Thêm nhật ký
          </Link>
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition ${activeTab === tab ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Tổng quan" && (
        <section className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
          <div className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.07)] md:p-6">
            <ConstructionImage seed={project.id} alt={project.name} />
            <h2 className="text-xl font-bold">Thông tin công trình</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <Info label="Chủ đầu tư" value={project.investor} />
              <Info label="Khởi công" value={project.startDate} />
              <Info label="Dự kiến hoàn thành" value={project.expectedEndDate} />
              <Info label="Người phụ trách" value={<span className="inline-flex items-center justify-end gap-2"><Avatar name={project.manager} size="sm" /> {project.manager}</span>} />
            </dl>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.07)] md:p-6">
            <h2 className="text-xl font-bold">Tiến độ tổng thể</h2>
            <div className="mt-6">
              <div className="mb-3 flex items-end justify-between">
            <span className="text-6xl font-bold tracking-tight text-slate-950">{project.progress}%</span>
                <span className="text-sm font-semibold text-slate-500">Hoàn thành</span>
              </div>
              <ProgressBar value={project.progress} />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <MiniStat label="Công việc" value={`${doneTasks}/${projectTasks.length} hoàn thành`} />
              <MiniStat label="Nhật ký đã ghi" value={`${projectLogs.length} nhật ký`} />
            </div>
          </div>
        </section>
      )}

      {activeTab === "Công việc" && (
        <section className="space-y-3">
          {projectTasks.map((task) => <TaskListItem key={task.id} task={task} />)}
        </section>
      )}

      {activeTab === "Nhật ký hiện trường" && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Nhật ký hiện trường</h2>
            <Link to={`/logs/new?projectId=${project.id}`} className="text-sm font-bold text-indigo-600">+ Thêm nhật ký</Link>
          </div>
          {projectLogs.length === 0 ? (
            <EmptyState text="Chưa có nhật ký hiện trường nào cho công trình này." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projectLogs.map((log) => <SiteLogCard key={log.id} log={log} />)}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0">
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="text-right font-bold text-slate-900">{value}</dd>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-slate-400">
        <CalendarDays size={16} />
        <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-bold text-slate-900">{value}</p>
    </div>
  );
}
