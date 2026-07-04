import { BarChart3, Building2, ClipboardList, Home, Plus, Settings, UserRound } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import Avatar from "../components/Avatar";

const navItems = [
  { to: "/", label: "Dashboard", icon: BarChart3, end: true },
  { to: "/projects", label: "Công trình", icon: Building2 },
  { to: "/logs", label: "Nhật ký hiện trường", icon: ClipboardList },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white/95 px-5 py-6 shadow-[12px_0_35px_rgba(15,23,42,0.04)] backdrop-blur lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-200">
            <Building2 size={22} />
          </div>
          <div>
            <p className="text-lg font-bold">SiteFlow</p>
            <p className="text-xs font-medium text-slate-500">Quản lý công trình</p>
          </div>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition duration-200 ease-out ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-[0_10px_30px_rgba(79,70,229,0.12)] ring-1 ring-indigo-100"
                    : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
          <span className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300">
            <Settings size={18} />
            Cài đặt
          </span>
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/88 px-4 py-3 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden">
              <p className="text-lg font-bold">SiteFlow</p>
              <p className="text-xs font-medium text-slate-500">Demo dữ liệu mẫu</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-slate-500">SiteFlow Demo</p>
              <p className="text-xs text-slate-400">Dữ liệu mẫu để minh họa quy trình vận hành</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.07)]">
              <Avatar name="Nguyễn Văn An" size="sm" />
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold">Nguyễn Văn An</p>
                <p className="text-xs font-medium text-slate-500">Quản lý dự án</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 pb-24 md:px-8 md:py-8 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-14px_35px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <NavLink to="/" end className={({ isActive }) => `flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-bold transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}>
          <Home size={18} /> Trang chủ
        </NavLink>
        <NavLink to="/logs" className={({ isActive }) => `flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-bold transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}>
          <ClipboardList size={18} /> Nhật ký
        </NavLink>
        <NavLink to="/logs/new" className="flex flex-col items-center gap-1 rounded-xl bg-indigo-600 py-2 text-xs font-semibold text-white">
          <Plus size={18} /> + Thêm
        </NavLink>
        <span className="flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-semibold text-slate-400">
          <UserRound size={18} /> Cá nhân
        </span>
      </nav>
    </div>
  );
}
