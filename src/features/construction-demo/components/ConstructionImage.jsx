import { useState } from "react";
import { imageMap, projectImages } from "../data/mockData";

export const fallbackImage = "/images/construction/fallback.jpg";

const imageSources = { ...projectImages, ...imageMap };

export function getConstructionImageSrc(seed) {
  return imageSources[seed] || fallbackImage;
}

export default function ConstructionImage({
  seed,
  alt = "Ảnh công trình",
  compact = false,
  onOpen,
}) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(getConstructionImageSrc(seed));
  const heightClass = compact ? "h-32 md:h-28" : "h-64 md:h-80";
  const Wrapper = onOpen ? "button" : "div";

  function handleError() {
    if (src !== fallbackImage) setSrc(fallbackImage);
  }

  return (
    <Wrapper
      {...(onOpen ? { type: "button", onClick: onOpen } : {})}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-200 ease-out ${heightClass} ${
        onOpen ? "cursor-zoom-in hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.13)]" : "cursor-default"
      }`}
      {...(onOpen ? { "aria-label": "Phóng to ảnh hiện trường" } : {})}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-100 via-white to-slate-200" />
      )}
      <img
        src={src}
        alt={alt}
        loading="eager"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`h-full w-full object-cover transition duration-500 ${
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
        } ${onOpen ? "group-hover:scale-[1.03]" : ""}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/5 to-white/0 opacity-80" />
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur">
          {alt}
        </span>
        {onOpen && (
          <span className="hidden rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur sm:inline-flex">
            Xem ảnh
          </span>
        )}
      </div>
    </Wrapper>
  );
}
