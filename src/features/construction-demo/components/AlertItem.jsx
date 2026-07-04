import { BellRing } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/mockData";
import StatusBadge from "./StatusBadge";

export default function AlertItem({ alert }) {
  const project = projects.find((item) => item.id === alert.projectId);
  return (
    <Link to={`/projects/${alert.projectId}`} className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-red-200 hover:shadow-sm">
      <div className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <BellRing size={18} />
        </span>
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-slate-900">{alert.title}</h3>
            <StatusBadge>{alert.level}</StatusBadge>
          </div>
          <p className="text-sm font-medium text-slate-500">{project?.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{alert.detail}</p>
        </div>
      </div>
    </Link>
  );
}
