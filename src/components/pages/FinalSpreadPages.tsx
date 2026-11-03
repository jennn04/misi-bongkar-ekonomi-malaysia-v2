import React, { useState, useEffect } from 'react';
import { QrCode, RotateCw, CheckCircle2, Sparkles, RotateCcw } from 'lucide-react';
import { CroppedScrapbookAsset, SmilingStarSvg } from '../PaperCraftPrimitives';
import { ASSET_CROPS, GASHAPON_QUESTIONS, GashaponQuestion } from '../../data/bookContent';
import { QrModalPayload } from './CoverAndObjektif';
import { paperSound } from '../../utils/sound';

// ============================================================================
// 1. HALAMAN AKHIR LEFT PAGE: QR CODES + 3D CARDBOARD GASHAPON MACHINE
// ============================================================================
export const HalamanAkhirLeftPage: React.FC<{
  onOpenQrModal: (payload: QrModalPayload) => void;
}> = ({ onOpenQrModal }) => {
  const [knobAngle, setKnobAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [dispensedIdx, setDispensedIdx] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const activeQuestion: GashaponQuestion | null =
    dispensedIdx !== null ? GASHAPON_QUESTIONS[dispensedIdx] : null;

  const handleTurnKnob = () => {
    if (isSpinning) return;
    paperSound.playGashaponTurn();
    setIsSpinning(true);
    setSelectedOption(null);
    setKnobAngle((prev) => prev + 360);

    window.setTimeout(() => {
      setDispensedIdx((prev) =>
        prev === null ? 0 : (prev + 1) % GASHAPON_QUESTIONS.length
      );
      setIsSpinning(false);
    }, 360);
  };

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-3 select-none preserve-3d">
      {/* Top Row: Two QR Codes (MAKLUMAT TAMBAHAN & UJI KEHEBATAN) */}
      <div className="grid grid-cols-2 gap-2.5 items-center preserve-3d" style={{ transform: 'translateZ(22px)' }}>
        {/* Left QR: MAKLUMAT TAMBAHAN */}
        <button
          type="button"
          onClick={() => {
            paperSound.playStickerPop();
            onOpenQrModal({
              title: 'MAKLUMAT TAMBAHAN',
              subtitle: 'Kod QR asal rujukan tambahan Misi Bongkar Ekonomi Malaysia',
              cropKey: 'qrMaklumatTambahan',
              mode: 'maklumat',
            });
          }}
          className="flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 p-1.5 rounded-xl border border-stone-700 cursor-pointer transition-transform hover:scale-[1.02] text-left"
        >
          <CroppedScrapbookAsset
            src={ASSET_CROPS.qrMaklumatTambahan.src}
            crop={ASSET_CROPS.qrMaklumatTambahan.crop}
            alt="Kod QR Maklumat Tambahan"
            className="w-14 h-15 rounded bg-white shrink-0"
          />
          <div className="space-y-1 min-w-0">
            <span className="block bg-[#f4f73e] p-0.5 rounded">
              <span className="block bg-sky-400 text-stone-950 font-display font-extrabold text-[9px] px-1.5 py-0.5 rounded text-center truncate">
                MAKLUMAT
              </span>
            </span>
            <span className="block bg-[#f4f73e] p-0.5 rounded">
              <span className="block bg-sky-400 text-stone-950 font-display font-extrabold text-[9px] px-1.5 py-0.5 rounded text-center truncate">
                TAMBAHAN
              </span>
            </span>
          </div>
        </button>

        {/* Right QR: UJI KEHEBATAN */}
        <button
          type="button"
          onClick={() => {
            paperSound.playStickerPop();
            onOpenQrModal({
              title: 'UJI KEHEBATAN',
              subtitle: 'Kod QR asal cabaran kuiz Uji Kehebatan',
              cropKey: 'qrUjiKehebatan',
              mode: 'ujikehebatan',
            });
          }}
          className="flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 p-1.5 rounded-xl border border-stone-700 cursor-pointer transition-transform hover:scale-[1.02] text-left"
        >
          <CroppedScrapbookAsset
            src={ASSET_CROPS.qrUjiKehebatan.src}
            crop={ASSET_CROPS.qrUjiKehebatan.crop}
            alt="Kod QR Uji Kehebatan"
            className="w-14 h-15 rounded bg-white shrink-0"
          />
          <div className="space-y-1 min-w-0">
            <span className="block bg-[#f4f73e] p-0.5 rounded">
              <span className="block bg-[#65c84a] text-stone-950 font-display font-extrabold text-[9px] px-1.5 py-0.5 rounded text-center">
                UJI
              </span>
            </span>
            <span className="block bg-[#f4f73e] p-0.5 rounded">
              <span className="block bg-[#65c84a] text-stone-950 font-display font-extrabold text-[9px] px-1.5 py-0.5 rounded text-center truncate">
                KEHEBATAN
              </span>
            </span>
          </div>
        </button>
      </div>

      {/* Main 3D Raised Beige Cardboard Gashapon Capsule Vending Machine */}
      <div
        className="relative flex-1 mt-1 rounded-xl bg-[#e7d6b5] paper-raised-cardboard border-2 border-[#cbb389] flex flex-col justify-between preserve-3d"
        style={{ transform: 'translateZ(32px)' }}
      >
        {/* Pink Top Strip with Two Black Hearts */}
        <div className="h-6 rounded-t-[10px] bg-[#f7a8ce] border-b-2 border-[#d484ab] px-4 flex items-center justify-end gap-3">
          <span className="text-stone-900 text-sm leading-none">♥</span>
          <span className="text-stone-900 text-xs leading-none">♥</span>
        </div>

        {/* Glossy Clear Window Containing the 5 Verbatim Circular Question Tokens */}
        <div className="mx-3.5 mt-2.5 min-h-[225px] rounded-lg bg-stone-900/95 border-4 border-[#c5ab7c] shadow-inner relative p-3">
          {/* Clear Plastic Window Reflection Sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-white/[0.18] z-20" />

          {/* 5 Verbatim Circular Cardboard Question Tokens */}
          <div className="relative z-10 grid grid-cols-2 gap-2 place-items-center h-full">
            {GASHAPON_QUESTIONS.map((q, idx) => {
              const isSelected = dispensedIdx === idx;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    paperSound.playStickerPop();
                    setDispensedIdx(idx);
                    setSelectedOption(null);
                  }}
                  style={{
                    transform: isSpinning
                      ? `translateY(${idx % 2 === 0 ? '-6px' : '6px'}) rotate(${idx * 28}deg)`
                      : `rotate(${idx % 2 === 0 ? -8 : 7}deg)`,
                  }}
                  className={`w-21 h-21 sm:w-23 sm:h-23 rounded-full p-2 border-[3px] shadow-[0_3px_0_#9ca3af,0_6px_12px_rgba(0,0,0,0.65)] flex items-center justify-center text-center transition-all duration-300 cursor-pointer ${
                    q.colorClass
                  } ${q.borderClass} ${
                    idx === 4 ? 'col-span-2 -mt-2' : ''
                  } ${isSelected ? 'ring-3 ring-rose-500 scale-105' : 'hover:scale-105'}`}
                >
                  <span className="text-[8.5px] sm:text-[9px] font-bold leading-tight">
                    {q.question}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lower Cardboard Control Panel: Rotary Dial Knob (START ① → ② → ③) + Dispenser Slot */}
        <div className="px-3.5 py-2.5 grid grid-cols-12 gap-2 items-center">
          {/* Left: 3D Rotary Cardboard Knob */}
          <div className="col-span-5 flex flex-col items-center">
            <div className="text-[9px] font-extrabold text-pink-600 mb-0.5">♥ ②</div>
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={handleTurnKnob}
                style={{ transform: `rotate(${knobAngle}deg)` }}
                className="w-16 h-16 rounded-full bg-stone-900 p-2.5 shadow-[0_4px_0_#000,0_8px_14px_rgba(0,0,0,0.5)] transition-transform duration-500 cursor-pointer flex items-center justify-center"
                title="Putar tombol START untuk keluarkan kapsul soalan!"
              >
                <div className="w-full h-full rounded-full bg-[#e6d3ad] border-2 border-[#bfa473] relative">
                  <span className="absolute bottom-1.5 right-2 w-2.5 h-2.5 rounded-full bg-stone-900" />
                </div>
              </button>
              <span className="ml-1 text-[10px] font-extrabold text-pink-600 leading-tight">
                ↻<br />③
              </span>
            </div>
            <button
              type="button"
              onClick={handleTurnKnob}
              className="mt-1 inline-flex items-center gap-1 font-display font-extrabold text-xs text-red-700 hover:text-red-800 cursor-pointer"
            >
              <RotateCw className="w-3 h-3" />
              <span>START ①</span>
            </button>
          </div>

          {/* Right: Painted Stars + Smiling Star Sticker + Dispenser Chute / Active Quiz Card */}
          <div className="col-span-7 flex flex-col justify-between h-full">
            {!activeQuestion ? (
              <div className="flex flex-col items-center justify-between h-full py-1">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-lg">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                  <SmilingStarSvg className="w-9 h-9" />
                </div>
                <div className="w-full h-14 rounded-t-lg bg-stone-950 border-x-4 border-t-4 border-[#bfa473] flex items-center justify-center px-2 text-center">
                  <span className="text-[9.5px] text-amber-200/90 font-medium">
                    Putar tombol <strong className="text-amber-300">START</strong> atau klik bulat soalan!
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-lg bg-stone-950 text-stone-100 p-2 border-2 border-amber-400 shadow-inner space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-amber-300">
                    Kapsul #{activeQuestion.id} · {activeQuestion.sectorTag}
                  </span>
                  <button
                    type="button"
                    onClick={handleTurnKnob}
                    className="text-[9px] text-sky-300 hover:underline cursor-pointer"
                  >
                    Soalan Lain ↻
                  </button>
                </div>
                <p className="text-[10px] font-bold leading-snug text-white">
                  {activeQuestion.question}
                </p>
                <div className="space-y-1 pt-0.5">
                  {activeQuestion.options.map((opt, oIdx) => {
                    const isPicked = selectedOption === oIdx;
                    const isRight = oIdx === activeQuestion.correctIndex;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => {
                          paperSound.playStickerPop(isRight);
                          setSelectedOption(oIdx);
                        }}
                        className={`w-full text-left px-2 py-1 rounded text-[9px] font-semibold transition-colors cursor-pointer ${
                          isPicked
                            ? isRight
                              ? 'bg-emerald-500 text-stone-950 font-bold'
                              : 'bg-rose-500 text-white'
                            : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                        }`}
                      >
                        {isPicked && isRight ? '✓ ' : isPicked ? '✗ ' : '• '}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. HALAMAN AKHIR RIGHT PAGE: BINTANG REFLEKSI DETEKTIF + STAR STICKERS
// ============================================================================
const STORAGE_KEY_STARS = 'misi_ekonomi_detektif_stars_v1';
const STORAGE_KEY_NOTE = 'misi_ekonomi_detektif_note_v1';

interface StarCounts {
  tahap1: number;
  tahap2: number;
  tahap3: number;
}

export const HalamanAkhirRightPage: React.FC = () => {
  const [stars, setStars] = useState<StarCounts>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STARS);
      if (raw) return JSON.parse(raw) as StarCounts;
    } catch {
      // ignore storage errors
    }
    return { tahap1: 0, tahap2: 0, tahap3: 2 }; // Matches the 2 stars placed on the original photo!
  });

  const [reflectionNote, setReflectionNote] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_NOTE) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify(stars));
    } catch {
      // ignore
    }
  }, [stars]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTE, reflectionNote);
    } catch {
      // ignore
    }
  }, [reflectionNote]);

  const totalUsed = stars.tahap1 + stars.tahap2 + stars.tahap3;
  const remainingBank = Math.max(0, 15 - totalUsed);

  const toggleTierStar = (tier: keyof StarCounts) => {
    paperSound.playStickerPop();
    setStars((prev) => {
      const current = prev[tier];
      if (current >= 5) {
        return { ...prev, [tier]: 0 };
      }
      if (15 - (prev.tahap1 + prev.tahap2 + prev.tahap3) <= 0) {
        return { ...prev, [tier]: 0 };
      }
      return { ...prev, [tier]: current + 1 };
    });
  };

  const resetStars = () => {
    paperSound.playFlap();
    setStars({ tahap1: 0, tahap2: 0, tahap3: 2 });
  };

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-2.5 select-none preserve-3d">
      {/* Top Margin: Bank of Smiling Pastel-Yellow Star Stickers */}
      <div className="preserve-3d" style={{ transform: 'translateZ(26px)' }}>
        <div className="flex items-center justify-between mb-1 px-0.5">
          <span className="text-[9.5px] font-semibold text-amber-200/90">
            Pelekat Bintang Detektif ({remainingBank} baki — klik tahap di bawah untuk tampal!)
          </span>
          <button
            type="button"
            onClick={resetStars}
            className="inline-flex items-center gap-1 text-[9px] text-stone-400 hover:text-amber-300 cursor-pointer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Set Semula</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-0.5 min-h-[38px]">
          {Array.from({ length: remainingBank }).map((_, idx) => (
            <div
              key={idx}
              style={{ transform: `rotate(${idx % 2 === 0 ? -6 : 6}deg)` }}
              className="transition-transform hover:scale-110"
            >
              <SmilingStarSvg className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Laminated Poster: BINTANG REFLEKSI DETEKTIF */}
      <div
        className="relative flex-1 mt-1 rounded-xl bg-white/20 p-1.5 border border-white/30 shadow-[0_12px_26px_rgba(0,0,0,0.72)] flex flex-col preserve-3d"
        style={{ transform: 'translateZ(22px)' }}
      >
        <div className="flex-1 rounded-lg bg-gradient-to-b from-[#e8f2ff] via-white to-[#e6f3ff] p-3 text-stone-900 flex flex-col justify-between gap-2 relative">
          {/* Header: Detective Boy + Title + Compass Note */}
          <div className="flex items-center justify-between gap-2">
            {/* Cute Purple Detective Mascot Badge */}
            <div className="w-11 h-11 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center text-xl shrink-0 shadow-sm">
              🕵️‍♂️
            </div>

            <div className="text-center flex-1">
              <div className="font-display font-extrabold text-xs sm:text-sm text-sky-900 tracking-wide leading-none">
                BINTANG REFLEKSI
              </div>
              <div className="font-display font-extrabold text-base sm:text-lg text-indigo-950 tracking-wider leading-tight">
                DETEKTIF
              </div>
            </div>

            <div className="bg-amber-50 border border-stone-400 rounded px-1.5 py-1 rotate-3 text-[8px] font-bold text-stone-700 leading-tight text-center shrink-0">
              🧭 Misi Selesai,
              <br />
              Refleksi Bermakna!
            </div>
          </div>

          {/* Blue Ribbon & Magnifying Glass Instruction */}
          <div className="my-1 space-y-1">
            <div className="bg-sky-600 text-white text-center rounded-full py-0.5 px-2 text-[9.5px] font-bold">
              Jom lihat semula apa yang telah kamu pelajari!
            </div>
            <p className="text-[8.5px] sm:text-[9px] text-stone-700 leading-tight font-medium">
              🔍 Pilih satu tahap refleksi yang menggambarkan pemahaman kamu selepas meneroka empat
              sektor ekonomi. Tampalkan pelekat bintang pada ruang yang disediakan.
            </p>
          </div>

          {/* Three Interactive Reflection Tiers (TAHAP 1, TAHAP 2, TAHAP 3) */}
          <div className="space-y-1.5 my-0.5">
            {/* TAHAP 1 */}
            <button
              type="button"
              onClick={() => toggleTierStar('tahap1')}
              className="w-full rounded-lg border border-pink-400 bg-pink-50/70 p-1.5 text-left hover:bg-pink-100/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="bg-pink-500 text-white font-display font-extrabold text-[9px] px-2 py-0.5 rounded">
                  TAHAP 1
                </span>
                <span className="text-[9px] font-semibold text-stone-800">
                  Saya masih memerlukan bimbingan.
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 min-h-[24px] pl-1">
                {[0, 1, 2, 3, 4].map((slot) =>
                  slot < stars.tahap1 ? (
                    <SmilingStarSvg key={slot} className="w-6 h-6" />
                  ) : (
                    <span
                      key={slot}
                      className="w-5 h-5 rounded-full border border-dashed border-pink-300 flex items-center justify-center text-[9px] text-pink-300"
                    >
                      ☆
                    </span>
                  )
                )}
              </div>
            </button>

            {/* TAHAP 2 */}
            <button
              type="button"
              onClick={() => toggleTierStar('tahap2')}
              className="w-full rounded-lg border border-rose-300 bg-rose-50/60 p-1.5 text-left hover:bg-rose-100/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="bg-rose-300 text-stone-900 font-display font-extrabold text-[9px] px-2 py-0.5 rounded">
                  TAHAP 2
                </span>
                <span className="text-[9px] font-semibold text-stone-800">
                  Saya memahami sebahagian isi pelajaran.
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 min-h-[24px] pl-1">
                {[0, 1, 2, 3, 4].map((slot) =>
                  slot < stars.tahap2 ? (
                    <SmilingStarSvg key={slot} className="w-6 h-6" />
                  ) : (
                    <span
                      key={slot}
                      className="w-5 h-5 rounded-full border border-dashed border-rose-300 flex items-center justify-center text-[9px] text-rose-300"
                    >
                      ☆
                    </span>
                  )
                )}
              </div>
            </button>

            {/* TAHAP 3 */}
            <button
              type="button"
              onClick={() => toggleTierStar('tahap3')}
              className="w-full rounded-lg border border-sky-400 bg-sky-100/70 p-1.5 text-left hover:bg-sky-200/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="bg-sky-500 text-white font-display font-extrabold text-[9px] px-2 py-0.5 rounded">
                  TAHAP 3
                </span>
                <span className="text-[9px] font-semibold text-stone-800">
                  Saya sudah menguasai pembelajaran.
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 min-h-[24px] pl-1">
                {[0, 1, 2, 3, 4].map((slot) =>
                  slot < stars.tahap3 ? (
                    <SmilingStarSvg key={slot} className="w-6 h-6" />
                  ) : (
                    <span
                      key={slot}
                      className="w-5 h-5 rounded-full border border-dashed border-sky-400 flex items-center justify-center text-[9px] text-sky-400"
                    >
                      ☆
                    </span>
                  )
                )}
              </div>
            </button>
          </div>

          {/* Bottom Box: Refleksi Saya (Interactive Persistent Note) */}
          <div className="rounded-lg border border-dashed border-sky-400 bg-white/90 p-2">
            <label htmlFor="refleksi-input" className="block">
              <span className="font-display font-bold text-[10px] text-sky-900">
                ✏️ Refleksi Saya
              </span>
              <span className="block text-[8.5px] text-stone-700 mt-0.5">
                Satu perkara baharu yang saya pelajari hari ini ialah :
              </span>
            </label>
            <input
              id="refleksi-input"
              type="text"
              value={reflectionNote}
              onChange={(e) => setReflectionNote(e.target.value)}
              placeholder="Taip refleksi anda di sini (cth: Empat sektor ekonomi memajukan Malaysia)..."
              className="mt-1 w-full border-b border-stone-400 bg-transparent text-[10px] font-medium text-indigo-950 placeholder:text-stone-400 focus:outline-none focus:border-sky-600 pb-0.5"
            />
          </div>

          {/* Footer Banner */}
          <div className="mt-1 text-center">
            <span className="inline-block bg-sky-800 text-white font-display font-bold text-[9px] px-3 py-0.5 rounded-full">
              ★ Terus Meneroka, Terus Belajar! ★
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
