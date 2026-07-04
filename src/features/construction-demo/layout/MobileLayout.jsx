import { ArrowLeft, ClipboardList, Home, Plus, UserRound } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function MobileLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200"
            aria-label="Quay lại"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-lg font-bold">Thêm nhật ký hiện trường</p>
            <p className="text-xs font-medium text-slate-500">SiteFlow Demo</p>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-xl px-4 py-5 pb-24">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-14px_35px_rgba(15,23,42,0.08)] backdrop-blur">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-bold transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}>
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
