import { AlertTriangle, Building2, ClipboardCheck, HardHat, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertItem from "../components/AlertItem";
import ProgressBar from "../components/ProgressBar";
import SiteLogCard from "../components/SiteLogCard";
import StatCard from "../components/StatCard";
import { alerts, projects, staff, tasks } from "../data/mockData";
import { useSiteFlow } from "../SiteFlowDemo";

function SkeletonCard() {
  return <div className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white" />;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const { logs } = useSiteFlow();
  const lateTasks = tasks.filter((task) => task.status === "Trễ hạn");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <p className="text-sm font-semibold text-indigo-600">SiteFlow Demo</p>
        <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Tổng quan công trình hôm nay</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Theo dõi tiến độ, cảnh báo trễ hạn và nhật ký hiện trường từ một màn hình duy nhất.
            </p>
          </div>
          <Link to="/logs/new" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700">
            + Thêm nhật ký
          </Link>
        </div>
      </section>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Building2} label="Công trình đang thi công" value={projects.length} />
          <StatCard icon={ClipboardCheck} label="Công việc hôm nay" value={tasks.length} />
          <StatCard icon={AlertTriangle} label="Công việc trễ hạn" value={lateTasks.length} tone="danger" />
          <StatCard icon={UsersRound} label="Nhân sự hiện trường" value={staff.length} />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Tiến độ các công trình</h2>
              <p className="text-sm font-medium text-slate-500">Top công trình đang được theo dõi</p>
            </div>
            <Link to="/projects" className="text-sm font-bold text-indigo-600">Xem tất cả →</Link>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="block rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-slate-50">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">{project.name}</p>
                    <p className="text-sm font-medium text-slate-500">{project.manager}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} />
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex items-center gap-2">
            <HardHat className="text-red-500" size={20} />
            <h2 className="text-xl font-bold">Cảnh báo cần chú ý</h2>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => <AlertItem key={alert.id} alert={alert} />)}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Nhật ký hiện trường gần đây</h2>
            <p className="text-sm font-medium text-slate-500">Ảnh và ghi chú mới nhất từ đội hiện trường</p>
          </div>
          <Link to="/logs" className="text-sm font-bold text-indigo-600">Xem tất cả →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {logs.slice(0, 3).map((log) => (
            <Link key={log.id} to="/logs">
              <SiteLogCard log={log} compact />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
