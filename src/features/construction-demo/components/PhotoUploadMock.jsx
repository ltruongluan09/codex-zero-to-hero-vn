import { Camera, X } from "lucide-react";
import ConstructionImage from "./ConstructionImage";

const pool = [
  "concrete formwork construction",
  "electrical wiring construction site",
  "steel frame roof construction",
  "construction site meeting",
];

export default function PhotoUploadMock({ photos, onChange }) {
  function addPhoto() {
    if (photos.length >= 4) return;
    onChange([...photos, pool[photos.length % pool.length]]);
  }

  return (
    <div>
      <button
        type="button"
        onClick={addPhoto}
        className="flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition duration-200 ease-out hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-[0_14px_40px_rgba(79,70,229,0.12)] active:scale-[0.99]"
      >
        <Camera className="text-indigo-600" size={28} />
        <span className="mt-3 text-sm font-bold text-slate-900">Chụp ảnh hoặc chọn từ thư viện</span>
        <span className="mt-1 text-xs font-medium text-slate-500">Demo sẽ thêm ảnh mẫu để minh họa</span>
      </button>
      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <div key={`${photo}-${index}`} className="relative">
              <ConstructionImage seed={photo} alt={`Ảnh ${index + 1}`} compact />
              <button
                type="button"
                onClick={() => onChange(photos.filter((_, itemIndex) => itemIndex !== index))}
                className="absolute right-2 top-2 rounded-full bg-white p-1 text-slate-700 shadow-sm transition hover:scale-105 hover:text-red-600"
                aria-label="Xóa ảnh"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
