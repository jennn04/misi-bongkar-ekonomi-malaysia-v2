import React, { useState } from 'react';
import { X, QrCode, CheckCircle2 } from 'lucide-react';
import { CroppedScrapbookAsset } from './PaperCraftPrimitives';
import { ASSET_CROPS, GASHAPON_QUESTIONS } from '../data/bookContent';
import { QrModalPayload } from './pages/CoverAndObjektif';
import { paperSound } from '../utils/sound';

interface QrPreviewModalProps {
  payload: QrModalPayload | null;
  onClose: () => void;
}

export const QrPreviewModal: React.FC<QrPreviewModalProps> = ({ payload, onClose }) => {
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  if (!payload) return null;

  const asset = ASSET_CROPS[payload.cropKey];
  const currentQ = GASHAPON_QUESTIONS[quizIdx % GASHAPON_QUESTIONS.length];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#1c1b19] border border-stone-700 text-stone-100 p-5 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-800 pb-3">
          <div>
            <h3 className="font-display font-bold text-lg text-amber-300">{payload.title}</h3>
            <p className="text-xs text-stone-400 mt-0.5">{payload.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
            aria-label="Tutup tetingkap"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          {/* Left: High-Contrast Original Scannable QR Code */}
          <div className="sm:col-span-5 flex flex-col items-center">
            <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-amber-300">
              <CroppedScrapbookAsset
                src={asset.src}
                crop={asset.crop}
                alt={payload.title}
                className="w-44 h-44 rounded"
              />
            </div>
            <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-stone-300">
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
              <span>Imbas menggunakan kamera telefon</span>
            </span>
          </div>

          {/* Right: Interactive Companion Notes or Mini Quiz */}
          <div className="sm:col-span-7 bg-stone-900/90 border border-stone-800 rounded-xl p-4 space-y-3">
            {payload.mode === 'maklumat' || payload.mode === 'perindustrian' ? (
              <>
                <h4 className="font-display font-bold text-sm text-lime-300">
                  Ringkasan Pantas Misi Ekonomi
                </h4>
                <ul className="space-y-2 text-xs text-stone-200 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Pertanian:</strong> Pengeluaran makanan ruji (padi) & komoditi utama
                      (kelapa sawit, getah).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Perindustrian:</strong> Pembuatan kereta nasional (Proton Saga 1985,
                      Perodua), elektrik & elektronik, serta minyak & gas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Perdagangan & Pelancongan:</strong> Menjana pendapatan negara melalui
                      eksport antarabangsa dan kehadiran pelancong dunia.
                    </span>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">
                    Latihan Interaktif ({quizIdx + 1}/{GASHAPON_QUESTIONS.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      paperSound.playFlap();
                      setPicked(null);
                      setQuizIdx((i) => (i + 1) % GASHAPON_QUESTIONS.length);
                    }}
                    className="text-xs text-sky-300 hover:underline cursor-pointer"
                  >
                    Soalan Seterusnya →
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {currentQ.question}
                </p>
                <div className="space-y-1.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = picked === idx;
                    const isCorrect = idx === currentQ.correctIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          paperSound.playStickerPop(isCorrect);
                          setPicked(idx);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500 text-stone-950 font-bold'
                              : 'bg-rose-600 text-white'
                            : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <p className="text-[11px] text-amber-200 pt-1">
                    <strong>Nota Jawapan:</strong> {currentQ.sampleAnswer}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
