import StatusBadge from "./StatusBadge";

export default function TaskListItem({ task }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1.4fr_1fr_.8fr_auto] md:items-center">
      <div>
        <p className="font-bold text-slate-900">{task.name}</p>
        <p className="mt-1 text-sm font-medium text-slate-500">Người phụ trách: {task.assignee}</p>
      </div>
      <p className="text-sm font-semibold text-slate-600">Hạn chót: {task.dueDate}</p>
      <StatusBadge>{task.status}</StatusBadge>
    </div>
  );
}
