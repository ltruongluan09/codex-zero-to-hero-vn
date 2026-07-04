import { SearchX } from "lucide-react";

export default function EmptyState({ text = "Không có dữ liệu phù hợp." }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
      <SearchX className="mx-auto text-slate-400" size={32} />
      <p className="mt-3 text-sm font-semibold text-slate-600">{text}</p>
    </div>
  );
}
