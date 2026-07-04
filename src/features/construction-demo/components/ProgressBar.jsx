export default function ProgressBar({ value = 0 }) {
  return (
    <div className="h-2 rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-indigo-600 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
