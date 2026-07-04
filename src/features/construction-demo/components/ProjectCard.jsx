import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import ConstructionImage from "./ConstructionImage";
import ProgressBar from "./ProgressBar";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.07)] transition duration-200 ease-out hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)] active:scale-[0.99]"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full shrink-0 md:w-40">
          <ConstructionImage seed={project.id} alt={project.name} compact />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700">{project.name}</h3>
            <StatusBadge>{project.status}</StatusBadge>
          </div>
          <p className="flex gap-2 text-sm font-medium text-slate-500">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            {project.address}
          </p>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-slate-600">Tiến độ</span>
              <span className="font-bold text-slate-900">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 font-medium text-slate-600">
              <Avatar name={project.manager} size="sm" />
              Phụ trách: <strong className="text-slate-800">{project.manager}</strong>
            </span>
            {project.lateTasks > 0 && (
              <span className="rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                {project.lateTasks} việc trễ
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
