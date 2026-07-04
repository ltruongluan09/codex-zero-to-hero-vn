import { X } from "lucide-react";
import { useState } from "react";
import Avatar from "./Avatar";
import ConstructionImage, { fallbackImage, getConstructionImageSrc } from "./ConstructionImage";
import { projects } from "../data/mockData";

export default function SiteLogFeedItem({ log }) {
  const [isOpen, setIsOpen] = useState(false);
  const project = projects.find((item) => item.id === log.projectId);
  const imageLabel = log.relatedTask || "Ảnh hiện trường";

  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_24px_70px_rgba(15,23,42,0.13)]">
      <div className="mb-4 flex items-start gap-3">
        <Avatar name={log.author} />
        <div>
          <p className="font-bold text-slate-900">{log.author} <span className="font-medium text-slate-500">đã ghi nhật ký tại</span></p>
          <p className="text-sm font-semibold text-indigo-700">{project?.name}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">{log.date}</p>
        </div>
      </div>
      <ConstructionImage seed={log.imageQuery} alt={imageLabel} onOpen={() => setIsOpen(true)} />
      <p className="mt-4 text-sm leading-6 text-slate-700">{log.note}</p>
      {log.relatedTask && (
        <p className="mt-4 text-sm font-semibold text-slate-600">
          Công việc liên quan: <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">{log.relatedTask}</span>
        </p>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_35px_100px_rgba(15,23,42,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-lg transition hover:scale-105 hover:text-slate-950"
              aria-label="Đóng ảnh"
            >
              <X size={18} />
            </button>
            <img
              src={getConstructionImageSrc(log.imageQuery)}
              alt={imageLabel}
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
              className="max-h-[82vh] w-full object-cover"
            />
          </div>
        </div>
      )}
    </article>
  );
}
