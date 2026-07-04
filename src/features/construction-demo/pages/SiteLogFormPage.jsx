import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PhotoUploadMock from "../components/PhotoUploadMock";
import { projects, tasks } from "../data/mockData";
import { useSiteFlow } from "../SiteFlowDemo";

export default function SiteLogFormPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addLog } = useSiteFlow();
  const initialProjectId = searchParams.get("projectId") || projects[0]?.id || "";
  const [projectId, setProjectId] = useState(initialProjectId);
  const [photos, setPhotos] = useState([]);
  const [note, setNote] = useState("");
  const [relatedTask, setRelatedTask] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const projectTasks = useMemo(
    () => tasks.filter((task) => task.projectId === projectId),
    [projectId]
  );

  function handleProjectChange(nextProjectId) {
    setProjectId(nextProjectId);
    setRelatedTask("");
    setError("");
  }

  function submitLog(event) {
    event.preventDefault();
    if (!projectId) {
      setError("Vui lòng chọn công trình trước khi gửi nhật ký.");
      return;
    }
    if (photos.length === 0 && note.trim().length === 0) {
      setError("Thêm ít nhất một ảnh hoặc một ghi chú hiện trường.");
      return;
    }

    setError("");
    setSubmitting(true);
    window.setTimeout(() => {
      const selectedProject = projects.find((project) => project.id === projectId);
      addLog({
        id: `L${Date.now()}`,
        projectId,
        author: "Nguyễn Văn An",
        date: "2026-07-04 09:30",
        note: note.trim() || "Đã cập nhật hình ảnh hiện trường mới từ đội giám sát.",
        relatedTask: relatedTask || null,
        imageQuery: "construction site meeting",
        photo: photos[0],
        projectName: selectedProject?.name,
      });
      setSubmitting(false);
      setSuccess(true);
      window.setTimeout(() => navigate("/logs"), 1500);
    }, 800);
  }

  return (
    <form onSubmit={submitLog} className="space-y-5">
      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-bold text-indigo-600">Nhật ký hiện trường</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Thêm ghi nhận mới</h1>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          Chọn công trình, thêm ảnh và ghi chú để đội quản lý nắm tình hình ngay.
        </p>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <label className="text-sm font-bold text-slate-900" htmlFor="projectId">
          Chọn công trình
        </label>
        <select
          id="projectId"
          value={projectId}
          onChange={(event) => handleProjectChange(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition hover:bg-white focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <h2 className="text-sm font-bold text-slate-900">Thêm ảnh hiện trường</h2>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Trong bản demo, bấm vào khung ảnh để thêm ảnh minh họa.
        </p>
        <div className="mt-3">
          <PhotoUploadMock photos={photos} onChange={setPhotos} />
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <label className="text-sm font-bold text-slate-900" htmlFor="note">
          Ghi chú hiện trường
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={5}
          placeholder="Mô tả tình hình thi công hôm nay..."
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:bg-white focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        />
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        <label className="text-sm font-bold text-slate-900" htmlFor="relatedTask">
          Công việc liên quan <span className="text-slate-400">(không bắt buộc)</span>
        </label>
        <select
          id="relatedTask"
          value={relatedTask}
          onChange={(event) => setRelatedTask(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition hover:bg-white focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        >
          <option value="">Không chọn công việc</option>
          {projectTasks.map((task) => (
            <option key={task.id} value={task.name}>
              {task.name}
            </option>
          ))}
        </select>
      </section>

      {error && (
        <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {error}
        </p>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          <CheckCircle2 className="mr-2 inline" size={18} />
          Đã gửi nhật ký hiện trường thành công!
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || success}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {submitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        {submitting ? "Đang gửi..." : "Gửi nhật ký"}
      </button>
    </form>
  );
}
