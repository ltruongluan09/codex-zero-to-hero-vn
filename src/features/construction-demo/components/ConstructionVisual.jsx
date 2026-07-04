import { Building2, Camera, HardHat, PanelsTopLeft, Wrench } from "lucide-react";

const visualStyles = {
  concrete: {
    bg: "from-indigo-100 via-slate-50 to-sky-100",
    accent: "bg-indigo-600",
    Icon: Building2,
  },
  electrical: {
    bg: "from-amber-100 via-white to-indigo-100",
    accent: "bg-amber-500",
    Icon: Wrench,
  },
  waterproofing: {
    bg: "from-cyan-100 via-white to-indigo-100",
    accent: "bg-cyan-500",
    Icon: PanelsTopLeft,
  },
  steel: {
    bg: "from-slate-200 via-white to-indigo-100",
    accent: "bg-slate-700",
    Icon: HardHat,
  },
  default: {
    bg: "from-indigo-100 via-white to-violet-100",
    accent: "bg-violet-600",
    Icon: Camera,
  },
};

function resolveVariant(seed = "") {
  const text = seed.toLowerCase();
  if (text.includes("concrete") || text.includes("formwork")) return "concrete";
  if (text.includes("electrical") || text.includes("wiring")) return "electrical";
  if (text.includes("waterproof") || text.includes("basement")) return "waterproofing";
  if (text.includes("steel") || text.includes("roof")) return "steel";
  return "default";
}

export default function ConstructionVisual({ seed, label = "Ảnh hiện trường", compact = false }) {
  const style = visualStyles[resolveVariant(seed)] || visualStyles.default;
  const Icon = style.Icon;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${style.bg} ${
        compact ? "h-28" : "h-64"
      } w-full border border-white/70 shadow-inner`}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.75),rgba(255,255,255,.15))]" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute -bottom-12 left-1/3 h-36 w-36 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="absolute inset-x-5 bottom-5 space-y-2">
        <div className="h-2 rounded-full bg-white/70" />
        <div className="h-2 w-4/5 rounded-full bg-white/60" />
        <div className="h-2 w-2/3 rounded-full bg-white/50" />
      </div>

      <div className="absolute left-5 top-5 flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.accent} text-white shadow-lg`}>
          <Icon size={24} />
        </div>
        <div className="rounded-2xl bg-white/80 px-3 py-2 shadow-sm backdrop-blur">
          <p className="text-xs font-bold text-slate-900">{label}</p>
          <p className="text-[11px] font-semibold text-slate-500">Ảnh minh họa ổn định</p>
        </div>
      </div>
    </div>
  );
}
