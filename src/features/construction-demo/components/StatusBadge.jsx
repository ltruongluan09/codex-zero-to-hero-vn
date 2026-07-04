const statusClass = {
  "Đang thi công": "bg-blue-50 text-blue-700",
  "Tạm dừng": "bg-amber-50 text-amber-700",
  "Hoàn thành": "bg-emerald-50 text-emerald-700",
  "Trễ hạn": "bg-red-50 text-red-700",
  "Đang làm": "bg-violet-50 text-violet-700",
  "Chưa bắt đầu": "bg-slate-100 text-slate-700",
  Cao: "bg-red-50 text-red-700",
  "Trung bình": "bg-amber-50 text-amber-700",
};

export default function StatusBadge({ children }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[children] || "bg-slate-100 text-slate-700"}`}>
      {children}
    </span>
  );
}
