import { MapPin, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { projectImages } from "../data/mockData";
import ProgressBar from "./ProgressBar";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex gap-4">
        <img
          src={projectImages[project.id]}
          alt=""
          className="hidden h-28 w-32 rounded-xl object-cover md:block"
        />
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
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
              <UserRound size={16} /> Phụ trách: {project.manager}
            </span>
            {project.lateTasks > 0 && (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                {project.lateTasks} việc trễ
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
