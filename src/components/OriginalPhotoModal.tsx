import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOK_SPREADS } from '../data/bookContent';
import { paperSound } from '../utils/sound';

interface OriginalPhotoModalProps {
  isOpen: boolean;
  spreadIndex: number;
  onSelectSpread: (idx: number) => void;
  onClose: () => void;
}

export const OriginalPhotoModal: React.FC<OriginalPhotoModalProps> = ({
  isOpen,
  spreadIndex,
  onSelectSpread,
  onClose,
}) => {
  if (!isOpen) return null;

  const current = BOOK_SPREADS[spreadIndex] || BOOK_SPREADS[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#181715] border border-stone-700 text-stone-100 p-5 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-stone-800 pb-3">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-amber-300">
              Rujukan Foto Buku Skrap Asal: {current.title}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Perbandingan langsung dengan gambar penuh projek buatan tangan asal
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer shrink-0"
            aria-label="Tutup rujukan foto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Full Uncropped Original Scrapbook Photo(s) */}
        <div
          className={`mt-5 grid gap-4 ${
            current.originalRightPhoto
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 max-w-md mx-auto'
          }`}
        >
          <div className="rounded-xl overflow-hidden bg-stone-950 border border-stone-700 shadow-lg">
            <img
              src={current.originalLeftPhoto}
              alt={`${current.title} - Halaman Kiri`}
              referrerPolicy="no-referrer"
              className="w-full max-h-[68vh] object-contain block mx-auto"
            />
            <div className="px-3 py-2 text-xs text-stone-300 font-medium border-t border-stone-800">
              {current.isSingleCover ? 'Muka Hadapan Asal' : 'Halaman Kiri Asal'}
            </div>
          </div>

          {current.originalRightPhoto && (
            <div className="rounded-xl overflow-hidden bg-stone-950 border border-stone-700 shadow-lg">
              <img
                src={current.originalRightPhoto}
                alt={`${current.title} - Halaman Kanan`}
                referrerPolicy="no-referrer"
                className="w-full max-h-[68vh] object-contain block mx-auto"
              />
              <div className="px-3 py-2 text-xs text-stone-300 font-medium border-t border-stone-800">
                Halaman Kanan Asal
              </div>
            </div>
          )}
        </div>

        {/* Spread Navigation Strip */}
        <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={spreadIndex === 0}
            onClick={() => {
              paperSound.playPageFlip();
              onSelectSpread(Math.max(0, spreadIndex - 1));
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-xs font-medium cursor-pointer whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-xs text-stone-400 tabular-nums">
            Bahagian {spreadIndex + 1} / {BOOK_SPREADS.length}
          </span>

          <button
            type="button"
            disabled={spreadIndex === BOOK_SPREADS.length - 1}
            onClick={() => {
              paperSound.playPageFlip();
              onSelectSpread(Math.min(BOOK_SPREADS.length - 1, spreadIndex + 1));
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-xs font-medium cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
