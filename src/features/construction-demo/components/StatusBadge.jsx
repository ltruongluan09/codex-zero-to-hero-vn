const statusClass = {
  "Đang thi công": "border-blue-100 bg-blue-50 text-blue-700",
  "Tạm dừng": "border-amber-100 bg-amber-50 text-amber-700",
  "Hoàn thành": "border-emerald-100 bg-emerald-50 text-emerald-700",
  "Trễ hạn": "border-red-100 bg-red-50 text-red-700",
  "Đang làm": "border-violet-100 bg-violet-50 text-violet-700",
  "Chưa bắt đầu": "border-slate-200 bg-slate-100 text-slate-700",
  Cao: "border-red-100 bg-red-50 text-red-700",
  "Trung bình": "border-amber-100 bg-amber-50 text-amber-700",
};

export default function StatusBadge({ children }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-bold ${statusClass[children] || "border-slate-200 bg-slate-100 text-slate-700"}`}>
      {children}
    </span>
  );
}
