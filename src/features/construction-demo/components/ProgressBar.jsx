export default function ProgressBar({ value = 0 }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 shadow-inner">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-700 via-indigo-500 to-sky-400 shadow-[0_0_18px_rgba(79,70,229,0.25)] transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
