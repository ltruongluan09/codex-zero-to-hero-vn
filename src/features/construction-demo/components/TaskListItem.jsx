import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

export default function TaskListItem({ task }) {
  return (
    <div className="grid gap-3 rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)] md:grid-cols-[1.4fr_1fr_.8fr_auto] md:items-center">
      <div>
        <p className="font-bold text-slate-900">{task.name}</p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
          <Avatar name={task.assignee} size="sm" />
          Người phụ trách: <span className="font-bold text-slate-700">{task.assignee}</span>
        </p>
      </div>
      <p className="text-sm font-semibold text-slate-600">Hạn chót: {task.dueDate}</p>
      <StatusBadge>{task.status}</StatusBadge>
    </div>
  );
}
