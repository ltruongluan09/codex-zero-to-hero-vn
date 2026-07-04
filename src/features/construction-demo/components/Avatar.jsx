import { useState } from "react";

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function avatarSvg(name = "") {
  const label = initials(name) || "SF";
  const hue = Array.from(name).reduce((total, char) => total + char.charCodeAt(0), 0) % 360;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="hsl(${hue}, 82%, 72%)"/>
          <stop offset="100%" stop-color="hsl(${(hue + 44) % 360}, 78%, 58%)"/>
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="30" fill="url(#g)"/>
      <circle cx="48" cy="38" r="16" fill="rgba(255,255,255,.9)"/>
      <path d="M22 82c6-18 18-27 26-27s20 9 26 27" fill="rgba(255,255,255,.86)"/>
      <text x="48" y="88" text-anchor="middle" font-size="16" font-family="Arial, sans-serif" font-weight="700" fill="rgba(15,23,42,.72)">${label}</text>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function Avatar({ name, size = "md" }) {
  const [failed, setFailed] = useState(false);
  const sizes = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  if (failed) {
    return (
      <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700 ${sizes}`}>
        {initials(name)}
      </span>
    );
  }

  return (
    <img
      src={avatarSvg(name || "SiteFlow")}
      alt={name}
      loading="eager"
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-full border border-white bg-indigo-50 object-cover shadow-sm ${sizes}`}
    />
  );
}
