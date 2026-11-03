import React, { useState } from 'react';
import { ChevronRight, Eye, Heart, QrCode, CheckCircle2 } from 'lucide-react';
import {
  GreenLetterTiles,
  CutoutWord,
  CroppedScrapbookAsset,
  PopUpDioramaStage,
} from '../PaperCraftPrimitives';
import { ASSET_CROPS, PERTANIAN_TABS, POPUP_DIORAMAS } from '../../data/bookContent';
import { QrModalPayload } from './CoverAndObjektif';
import { paperSound } from '../../utils/sound';

// ============================================================================
// 1. SEKTOR 1: PERTANIAN — LEFT PAGE (P E R T)
// ============================================================================
export const PertanianLeftPage: React.FC<{ popUpActive: boolean }> = ({ popUpActive }) => {
  const [tabIdx, setTabIdx] = useState(0);
  const currentTab = PERTANIAN_TABS[tabIdx];

  const cycleTab = () => {
    paperSound.playFlap();
    setTabIdx((prev) => (prev + 1) % PERTANIAN_TABS.length);
  };

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-2.5 select-none preserve-3d">
      {/* Top: P E R T Green Tiles */}
      <GreenLetterTiles letters={['P', 'E', 'R', 'T']} colors={['#14532d', '#15803d', '#166534', '#bef264']} />

      {/* Upper: Cute Bunny & Cherries MAKSUD Card */}
      <div className="relative mt-2 preserve-3d" style={{ transform: 'translateZ(20px)' }}>
        {/* Tilted MAKSUD Tag */}
        <div className="inline-block -rotate-12 bg-pink-50 border-2 border-rose-300 rounded-xl px-3 py-1 shadow-md relative z-10 -mb-2 ml-1">
          <span className="font-display font-extrabold text-xs sm:text-sm text-amber-900 tracking-wide">
            🍒 MAKSUD
          </span>
        </div>

        <div className="bg-[#f7dce2] border-2 border-[#eab3c0] rounded-xl p-2.5 sm:p-3 pl-4 shadow-[0_4px_0_#be8a96,0_10px_18px_rgba(0,0,0,0.55)] flex items-center gap-2.5">
          {/* Cute Bunny Illustration */}
          <div className="w-10 h-12 rounded-lg bg-white/80 border border-pink-200 flex items-center justify-center shrink-0 text-xl">
            🐰
          </div>
          <p className="text-[11px] sm:text-xs font-medium leading-snug text-stone-800">
            Kegiatan mengusahakan tanah dan sumber semula jadi untuk menghasilkan bahan makanan
            serta bahan mentah.
          </p>
        </div>
      </div>

      {/* Standing 3D Paddy Field & Oil Palm Diorama */}
      <PopUpDioramaStage
        imageSrc={POPUP_DIORAMAS.pertanian}
        caption="Sawah Padi & Kelapa Sawit"
        accentColor="border-lime-300"
        popUpActive={popUpActive}
      />

      {/* Lower: Scalloped Lime-Green KEGIATAN & CONTOH Interactive Flip Booklet */}
      <div
        className="relative scalloped-lime-mat rounded-xl p-2.5 sm:p-3 preserve-3d"
        style={{ transform: 'translateZ(22px)' }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-display font-extrabold text-xs sm:text-sm text-emerald-900 tracking-wide">
            KEGIATAN
          </span>
          <span className="text-[10px] font-semibold text-emerald-950/80">
            Tab {tabIdx + 1}/{PERTANIAN_TABS.length} · Klik untuk selak
          </span>
        </div>

        <div className="grid grid-cols-12 gap-2 items-center">
          {/* Left Palm Tree Die-Cut Sticker */}
          <div className="col-span-3 flex justify-center">
            <svg viewBox="0 0 80 105" className="w-14 h-18 diecut-sticker" aria-hidden="true">
              <path d="M36 98 Q40 64 43 42 L49 42 Q47 66 44 98 Z" fill="#92400e" />
              <path d="M44 40 Q18 28 8 46 Q26 42 42 44 Z" fill="#16a34a" />
              <path d="M44 40 Q22 14 14 24 Q30 28 44 40 Z" fill="#22c55e" />
              <path d="M45 40 Q72 26 76 46 Q60 40 46 44 Z" fill="#16a34a" />
              <path d="M45 40 Q68 14 72 26 Q56 28 45 40 Z" fill="#22c55e" />
              <circle cx="41" cy="44" r="3.5" fill="#ca8a04" />
              <circle cx="47" cy="45" r="3.5" fill="#ca8a04" />
            </svg>
          </div>

          {/* Interactive Multi-Tab Flip Cards */}
          <div className="col-span-9 space-y-1.5">
            {/* Top Black-Framed Flip Card (KEGIATAN) */}
            <button
              type="button"
              onClick={cycleTab}
              className="w-full relative flex items-center cursor-pointer group text-left"
            >
              <div className="flex-1 bg-stone-900 p-1.5 rounded-lg border border-stone-700 shadow-md">
                <div className="bg-rose-50 rounded-md px-2.5 py-1.5 border border-rose-200 flex items-center justify-between">
                  <span className="font-display font-bold text-xs text-stone-900">
                    {currentTab.kegiatan}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              {/* Stacked paper tabs peeking on the right */}
              <div className="w-1.5 h-9 bg-lime-300 rounded-r border-y border-r border-stone-800" />
              <div className="w-1.5 h-8 bg-stone-900 rounded-r" />
            </button>

            {/* Bottom Green-Framed Photo Flip Card (CONTOH) */}
            <button
              type="button"
              onClick={cycleTab}
              className="w-full bg-[#a3e635] p-1 rounded-lg border-2 border-stone-900 shadow-md flex items-center gap-2 cursor-pointer text-left"
            >
              {currentTab.useOriginalCrop ? (
                <CroppedScrapbookAsset
                  src={ASSET_CROPS.paddyBowlPhoto.src}
                  crop={ASSET_CROPS.paddyBowlPhoto.crop}
                  alt="Contoh Padi dan Beras"
                  className="w-20 h-12 rounded shrink-0 bg-amber-100 border border-stone-700"
                />
              ) : (
                <div className="w-20 h-12 rounded shrink-0 bg-emerald-900 text-lime-200 flex items-center justify-center text-[10px] font-bold px-1 text-center">
                  Hasil Tempatan
                </div>
              )}
              <div className="min-w-0 pr-1">
                <p className="text-[10px] font-bold text-stone-900 leading-tight">
                  {currentTab.contohLabel}
                </p>
                <p className="text-[9px] text-stone-800 leading-tight mt-0.5">
                  {currentTab.emojiNote}
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-1 text-right">
          <span className="font-display font-extrabold text-xs text-emerald-900">CONTOH</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. SEKTOR 1: PERTANIAN — RIGHT PAGE (A N I A N)
// ============================================================================
export const PertanianRightPage: React.FC = () => {
  const [flapOpen, setFlapOpen] = useState(false);
  const [miniCardOpen, setMiniCardOpen] = useState(false);

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-3 select-none preserve-3d">
      {/* Top: A N I A N Green Tiles */}
      <GreenLetterTiles
        letters={['A', 'N', 'I', 'A', 'N']}
        colors={['#facc15', '#fde68a', '#fb923c', '#f87171', '#ef4444']}
      />

      {/* Center: Lift-the-Flap SUMBANGAN KEPADA NEGARA Box */}
      <div className="relative my-auto preserve-3d" style={{ transform: 'translateZ(26px)' }}>
        <div className="rounded-xl bg-[#1e2024] border-2 border-dashed border-stone-300/80 p-3 shadow-[0_12px_24px_rgba(0,0,0,0.7)]">
          {/* Hinged Peach Top Flap */}
          <button
            type="button"
            onClick={() => {
              paperSound.playFlap();
              setFlapOpen((prev) => !prev);
            }}
            style={{
              transformOrigin: 'top center',
              transform: flapOpen ? 'perspective(900px) rotateX(22deg) translateY(-4px)' : 'none',
            }}
            className="w-full rounded-lg bg-[#fbd5bd] hover:bg-[#fcdecb] border-2 border-stone-800 p-4 sm:p-5 text-center shadow-[0_5px_0_#c28e6e,0_10px_18px_rgba(0,0,0,0.45)] transition-all duration-300 cursor-pointer"
          >
            <div className="font-display font-extrabold text-lg sm:text-xl leading-tight tracking-wide text-stone-900 drop-shadow-[0_1.5px_0_#fff]">
              <div>SUMBANGAN</div>
              <div>KEPADA</div>
              <div>NEGARA</div>
            </div>
            <span className="mt-2 inline-block text-[10px] font-semibold text-amber-950/80">
              {flapOpen ? 'Klik untuk tutup lipatan ▴' : 'Klik untuk angkat lipatan kertas ▾'}
            </span>
          </button>

          {/* Revealed Content under the Flap */}
          {flapOpen && (
            <div className="mt-2.5 rounded-lg bg-amber-50 border-2 border-amber-300 p-3 text-stone-900 space-y-1.5 animate-fadeIn">
              <p className="text-[11px] sm:text-xs font-semibold flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Membekalkan sumber makanan utama (sekuriti makanan) kepada rakyat.</span>
              </p>
              <p className="text-[11px] sm:text-xs font-semibold flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Menyediakan peluang pekerjaan dalam bidang perladangan, pertanian & perikanan.</span>
              </p>
              <p className="text-[11px] sm:text-xs font-semibold flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Menghasilkan bahan mentah (kelapa sawit & getah) untuk eksport dan industri.</span>
              </p>
            </div>
          )}

          {/* Bottom Black Pocket Lip with Golden Paddy Stalk Doodle */}
          <div className="mt-2 pt-2 border-t border-dashed border-stone-400/60 flex items-center justify-between px-1">
            <span className="text-[10px] text-stone-300 font-medium">
              Poket Sumbangan Sektor Pertanian
            </span>
            <span className="text-base" aria-hidden="true">
              🌾
            </span>
          </div>
        </div>
      </div>

      {/* Bottom: Oil Palm Fruit Bunch + Oil Palm Tree + Bi-Fold Mini Card (Sawit -> Minyak) */}
      <div className="grid grid-cols-12 gap-2 items-end preserve-3d" style={{ transform: 'translateZ(22px)' }}>
        {/* Left: Oil Palm Fruit Bunch & Tree Stickers */}
        <div className="col-span-6 flex items-end gap-1">
          <svg viewBox="0 0 90 80" className="w-20 h-18 diecut-sticker" aria-label="Buah Kelapa Sawit">
            <path d="M12 36 Q30 10 66 18 M16 44 Q42 18 76 30" stroke="#16a34a" strokeWidth="4" fill="none" />
            {[
              [34, 48], [46, 44], [56, 50], [28, 58], [42, 56], [54, 60], [36, 66], [48, 66],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="7.5" fill="#ea580c" stroke="#7c2d12" strokeWidth="1.8" />
            ))}
          </svg>
          <svg viewBox="0 0 70 90" className="w-14 h-18 diecut-sticker" aria-label="Pokok Kelapa Sawit">
            <rect x="30" y="38" width="10" height="44" rx="2" fill="#78350f" />
            <path d="M35 38 Q12 20 6 38 M35 38 Q58 20 64 38 M35 38 Q16 10 18 24 M35 38 Q54 10 52 24" stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="31" cy="40" r="4" fill="#ea580c" />
            <circle cx="39" cy="40" r="4" fill="#ea580c" />
          </svg>
        </div>

        {/* Right: Bi-fold Black Mini Card (Palm Kernel + Golden Oil Drop) */}
        <div className="col-span-6">
          <button
            type="button"
            onClick={() => {
              paperSound.playFlap();
              setMiniCardOpen((prev) => !prev);
            }}
            className="w-full rounded-lg bg-[#1c1e22] border-2 border-amber-300/70 p-2 shadow-lg cursor-pointer transition-transform hover:-translate-y-0.5 text-left"
          >
            {!miniCardOpen ? (
              <div className="grid grid-cols-2 divide-x divide-amber-200/30 items-center text-center py-1">
                <div className="px-1">
                  <div className="w-8 h-8 mx-auto rounded-full bg-orange-600 border-2 border-white shadow" />
                  <span className="block text-[9px] text-stone-300 mt-1">Biji Sawit</span>
                </div>
                <div className="px-1">
                  <div className="w-7 h-8 mx-auto rounded-b-full rounded-t-sm bg-amber-300 border-2 border-white shadow" />
                  <span className="block text-[9px] text-stone-300 mt-1">Minyak Sawit</span>
                </div>
              </div>
            ) : (
              <div className="bg-amber-100 rounded p-2 text-stone-900">
                <p className="text-[10px] font-bold text-amber-950">Pencapaian Ekonomi:</p>
                <p className="text-[10px] leading-snug mt-0.5">
                  Malaysia terkenal sebagai antara pengeluar & pengeksport minyak sawit berkualiti utama dunia!
                </p>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. SEKTOR 2: PERINDUSTRIAN — LEFT PAGE (WITH RED DECODER LENS!)
// ============================================================================
export const PerindustrianLeftPage: React.FC<{ popUpActive: boolean }> = ({ popUpActive }) => {
  const [decoderActive, setDecoderActive] = useState(false);

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-2.5 select-none preserve-3d">
      {/* Top Row: Puppy MAKSUD Card + Mini Accordion Strip (Part 1) */}
      <div className="grid grid-cols-12 gap-2 items-start preserve-3d" style={{ transform: 'translateZ(20px)' }}>
        <div className="col-span-5 bg-white rounded-xl p-2 border-2 border-pink-200 shadow-md -rotate-6">
          <div className="border border-pink-300 rounded-lg px-2 py-1.5 text-center bg-pink-50/50">
            <span className="font-display font-extrabold text-xs sm:text-sm text-rose-500">
              🐶 MAKSUD 🍦
            </span>
          </div>
        </div>

        {/* Top-Right Accordion Fold-Out Strip: Car Assembly & Electronics */}
        <div className="col-span-7 grid grid-cols-2 gap-1.5 bg-stone-900 p-1.5 rounded-lg border border-stone-700 shadow-lg">
          <div className="bg-stone-950 rounded p-1 text-center">
            <CroppedScrapbookAsset
              src={ASSET_CROPS.indCarAssembly.src}
              crop={ASSET_CROPS.indCarAssembly.crop}
              alt="Pembuatan kereta"
              className="w-full h-11 rounded"
            />
            <span className="mt-1 block bg-stone-100 text-stone-900 rounded px-1 py-0.5 text-[9px] font-bold leading-tight">
              Pembuatan kereta
            </span>
          </div>
          <div className="bg-stone-950 rounded p-1 text-center">
            <CroppedScrapbookAsset
              src={ASSET_CROPS.indMicrochip.src}
              crop={ASSET_CROPS.indMicrochip.crop}
              alt="Pengeluaran barangan elektronik"
              className="w-full h-11 rounded"
            />
            <span className="mt-1 block bg-stone-100 text-stone-900 rounded px-1 py-0.5 text-[9px] font-bold leading-tight">
              Pengeluaran barangan elektronik
            </span>
          </div>
        </div>
      </div>

      {/* Definition Card */}
      <div
        className="bg-rose-50 border-2 border-rose-200 rounded-xl p-2.5 shadow-[0_4px_0_#fda4af,0_8px_16px_rgba(0,0,0,0.55)] my-1.5 preserve-3d"
        style={{ transform: 'translateZ(22px)' }}
      >
        <p className="text-[11px] sm:text-xs font-semibold text-stone-800 text-center leading-snug">
          Kegiatan memproses bahan mentah atau menghasilkan barangan siap dengan menggunakan tenaga
          kerja dan teknologi.
        </p>
      </div>

      {/* Diagonal Cut-Out Banner: PERINDUSTRIAN */}
      <div className="my-0.5 flex justify-center -rotate-3" style={{ transform: 'translateZ(26px)' }}>
        <CutoutWord
          text="PERINDUSTRIAN"
          palette={[
            '#d6a27a', '#cbd5e1', '#fdba74', '#fbcfe8', '#f9a8d4',
            '#fde047', '#94a3b8', '#cbd5e1', '#86efac', '#2dd4bf',
            '#4ade80', '#38bdf8', '#5eead4',
          ]}
          archIntensity={4}
          sizeClass="text-sm sm:text-base"
          zDepth={26}
        />
      </div>

      {/* Standing 3D Factory, National Car & Offshore Rig Pop-Up Diorama */}
      <PopUpDioramaStage
        imageSrc={POPUP_DIORAMAS.perindustrian}
        caption="Kilang, Kereta Nasional & Pelantar"
        accentColor="border-sky-300"
        popUpActive={popUpActive}
      />

      {/* Bottom Interactive Feature: RED CELLOPHANE SECRET DECODER LENS! */}
      <div
        className="grid grid-cols-12 gap-2 items-center pt-1 preserve-3d"
        style={{ transform: 'translateZ(28px)' }}
      >
        {/* Secret Red-Scribbled Card */}
        <div className="col-span-8 relative rounded-lg bg-[#e4f3d8] border-2 border-stone-800 p-2.5 shadow-lg overflow-hidden">
          {/* Underlying Secret Black Handwritten Fact */}
          <p
            className={`text-center font-display font-extrabold text-[11px] sm:text-xs leading-snug transition-all duration-300 ${
              decoderActive ? 'text-stone-950 scale-[1.02]' : 'text-stone-900/75'
            }`}
          >
            Kereta nasional pertama Malaysia (1985) ialah Proton Saga
          </p>

          {/* Red Wavy Camouflage Scribbles (Filtered out when Red Lens covers it!) */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
              decoderActive ? 'opacity-5 bg-red-500/25' : 'opacity-95'
            }`}
          >
            <svg viewBox="0 0 240 80" className="w-full h-full">
              {[10, 20, 30, 40, 50, 60, 70].map((y, idx) => (
                <path
                  key={idx}
                  d={`M 4 ${y} Q 30 ${y - 12}, 56 ${y} T 108 ${y} T 160 ${y} T 212 ${y} T 236 ${y}`}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="3.2"
                />
              ))}
              {[15, 35, 55].map((y, idx) => (
                <path
                  key={`b-${idx}`}
                  d={`M 8 ${y + 8} C 45 ${y - 14}, 95 ${y + 18}, 145 ${y - 8} S 205 ${y + 14}, 234 ${y}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.8"
                />
              ))}
            </svg>
          </div>

          {/* Red Translucent Lens Overlay Effect when active */}
          {decoderActive && (
            <div className="pointer-events-none absolute inset-0 bg-red-600/20 ring-4 ring-inset ring-[#84cc16]" />
          )}
        </div>

        {/* Lime-Green Paddle with Red Cellophane Decoder Lens Button */}
        <div className="col-span-4 flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              paperSound.playStickerPop(!decoderActive);
              setDecoderActive((prev) => !prev);
            }}
            className={`group flex flex-col items-center cursor-pointer transition-transform duration-300 ${
              decoderActive ? '-translate-x-2 scale-105' : 'hover:scale-105'
            }`}
            title="Gunakan kanta penapis merah untuk membaca mesej rahsia!"
          >
            <div className="w-12 h-12 rounded-full bg-[#84cc16] p-1.5 border-2 border-stone-900 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-red-600/85 border border-red-900 flex items-center justify-center">
                <Eye className="w-4 h-4 text-red-100" />
              </div>
            </div>
            <div className="w-3.5 h-5 bg-[#84cc16] border-x-2 border-b-2 border-stone-900 rounded-b-full -mt-0.5" />
            <span className="mt-1 text-[9px] font-bold text-lime-300 text-center leading-tight">
              {decoderActive ? 'Tutup Kanta' : 'Guna Kanta Merah'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. SEKTOR 2: PERINDUSTRIAN — RIGHT PAGE (VELCRO SORTING + WALLET + OIL RIG)
// ============================================================================
interface VelcroItem {
  id: string;
  label: string;
  category: 'automotif' | 'makanan' | 'pembuatan';
}

const VELCRO_BANK: VelcroItem[] = [
  { id: 'proton', label: '🚗 Proton & Perodua', category: 'automotif' },
  { id: 'roti', label: '🥫 Makanan Tin & Roti', category: 'makanan' },
  { id: 'aircond', label: '❄️ Penyaman Udara', category: 'pembuatan' },
];

export const PerindustrianRightPage: React.FC<{
  onOpenQrModal: (payload: QrModalPayload) => void;
}> = ({ onOpenQrModal }) => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [placedIds, setPlacedIds] = useState<string[]>(['aircond']); // Air-conditioner pre-stuck just like the photo!
  const [walletOpen, setWalletOpen] = useState(false);

  const toggleVelcroItem = (id: string) => {
    paperSound.playStickerPop();
    setPlacedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-2.5 select-none preserve-3d">
      {/* Top Row: Accordion Continuation + Petrochemical Sticker + SCAN ME QR */}
      <div className="grid grid-cols-12 gap-2 items-start preserve-3d" style={{ transform: 'translateZ(22px)' }}>
        <div className="col-span-7 grid grid-cols-2 gap-1.5 bg-stone-900 p-1.5 rounded-lg border border-stone-700 shadow-md">
          <div className="bg-stone-950 rounded p-1 text-center">
            <CroppedScrapbookAsset
              src={ASSET_CROPS.indFoodProcess.src}
              crop={ASSET_CROPS.indFoodProcess.crop}
              alt="Pemprosesan makanan"
              className="w-full h-11 rounded"
            />
            <span className="mt-1 block bg-stone-100 text-stone-900 rounded px-1 py-0.5 text-[9px] font-bold leading-tight">
              Pemprosesan makanan
            </span>
          </div>
          <div className="bg-stone-950 rounded p-1 text-center">
            <CroppedScrapbookAsset
              src={ASSET_CROPS.indAppliances.src}
              crop={ASSET_CROPS.indAppliances.crop}
              alt="Pengeluaran barangan elektrik"
              className="w-full h-11 rounded"
            />
            <span className="mt-1 block bg-stone-100 text-stone-900 rounded px-1 py-0.5 text-[9px] font-bold leading-tight">
              Pengeluaran barangan elektrik
            </span>
          </div>
        </div>

        {/* SCAN ME Green QR Card */}
        <div className="col-span-5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              paperSound.playStickerPop();
              onOpenQrModal({
                title: 'Kod QR Sektor Perindustrian',
                subtitle: 'Imbas untuk bahan lanjutan sektor perindustrian Malaysia',
                cropKey: 'qrPerindustrian',
                mode: 'perindustrian',
              });
            }}
            className="bg-white p-1.5 rounded-lg border-2 border-emerald-500 shadow-lg cursor-pointer transition-transform hover:scale-105"
          >
            <CroppedScrapbookAsset
              src={ASSET_CROPS.qrPerindustrian.src}
              crop={ASSET_CROPS.qrPerindustrian.crop}
              alt="Kod QR Perindustrian"
              className="w-20 h-18 rounded"
            />
            <span className="mt-0.5 flex items-center justify-center gap-1 text-[9px] font-bold text-emerald-800">
              <QrCode className="w-2.5 h-2.5" />
              <span>SCAN ME</span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Two-ColumnScrapbook Body */}
      <div className="grid grid-cols-12 gap-2.5 my-2 flex-1 items-center preserve-3d">
        {/* Left Column: 3 Velcro Industry Sorting Cards (Pink, Yellow, Mint-Green) */}
        <div className="col-span-5 flex flex-col gap-2" style={{ transform: 'translateZ(20px)' }}>
          {/* Card 1: INDUSTRI AUTOMOTIF */}
          <button
            type="button"
            onClick={() => toggleVelcroItem('proton')}
            className="rounded-lg bg-[#f9a8d4] border-2 border-stone-900 p-2 text-left shadow-md cursor-pointer hover:brightness-105"
          >
            <span className="block font-display font-extrabold text-[10px] text-stone-900">
              INDUSTRI AUTOMOTIF
            </span>
            <div className="mt-1.5 min-h-[26px] flex items-center justify-center">
              {placedIds.includes('proton') ? (
                <span className="bg-white border border-stone-800 rounded px-1.5 py-0.5 text-[9px] font-bold text-stone-900 shadow-sm">
                  🚗 Proton & Perodua
                </span>
              ) : (
                <div className="flex gap-3">
                  <span className="w-4 h-4 rounded-full bg-white/85 border border-pink-300 shadow-inner" />
                  <span className="w-4 h-4 rounded-full bg-white/85 border border-pink-300 shadow-inner" />
                </div>
              )}
            </div>
          </button>

          {/* Card 2: INDUSTRI MAKANAN */}
          <button
            type="button"
            onClick={() => toggleVelcroItem('roti')}
            className="rounded-lg bg-[#f4f754] border-2 border-stone-900 p-2 text-left shadow-md cursor-pointer hover:brightness-105"
          >
            <span className="block font-display font-extrabold text-[10px] text-stone-900">
              INDUSTRI MAKANAN
            </span>
            <div className="mt-1.5 min-h-[26px] flex items-center justify-center">
              {placedIds.includes('roti') ? (
                <span className="bg-white border border-stone-800 rounded px-1.5 py-0.5 text-[9px] font-bold text-stone-900 shadow-sm">
                  🥫 Makanan Tin & Roti
                </span>
              ) : (
                <div className="flex gap-3">
                  <span className="w-4 h-4 rounded-full bg-amber-50 border border-amber-300 shadow-inner" />
                  <span className="w-4 h-4 rounded-full bg-amber-50 border border-amber-300 shadow-inner" />
                </div>
              )}
            </div>
          </button>

          {/* Card 3: INDUSTRI PEMBUATAN */}
          <button
            type="button"
            onClick={() => toggleVelcroItem('aircond')}
            className="rounded-lg bg-[#d9ecd0] border-2 border-stone-900 p-2 text-left shadow-md cursor-pointer hover:brightness-105"
          >
            <span className="block font-display font-extrabold text-[10px] text-stone-900">
              INDUSTRI PEMBUATAN
            </span>
            <div className="mt-1.5 min-h-[28px] flex items-center justify-center">
              {placedIds.includes('aircond') ? (
                <div className="w-full bg-white border border-stone-400 rounded-md px-2 py-1 shadow-sm flex flex-col items-center">
                  <div className="w-full h-1.5 bg-stone-200 rounded-full mb-0.5" />
                  <span className="text-[9px] font-bold text-stone-800">❄️ Penyaman Udara</span>
                </div>
              ) : (
                <span className="w-4 h-4 rounded-full bg-white/90 border border-emerald-300 shadow-inner" />
              )}
            </div>
          </button>
        </div>

        {/* Right Column: Yellow/Black Stitched Envelope + Yellow Wallet + Offshore Oil Rig */}
        <div className="col-span-7 flex flex-col gap-2" style={{ transform: 'translateZ(24px)' }}>
          {/* Neon-Yellow Envelope with Black Stitched Triangular Flap */}
          <button
            type="button"
            onClick={() => {
              paperSound.playFlap();
              setEnvelopeOpen((prev) => !prev);
              if (!envelopeOpen) {
                setPlacedIds(VELCRO_BANK.map((v) => v.id));
              }
            }}
            className="relative w-full h-16 rounded-md bg-[#d9f928] border-2 border-stone-900 shadow-md overflow-hidden cursor-pointer flex items-end justify-center pb-1"
          >
            <div
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 88%)' }}
              className="absolute inset-x-0 top-0 h-13 bg-stone-900 flex justify-center pt-1"
            >
              <span className="text-[9px] text-stone-200 font-semibold tracking-wider">
                {envelopeOpen ? 'Kad Velcro Dilekatkan!' : 'Klik Poket Kad Velcro'}
              </span>
            </div>
            <span className="text-[9px] font-bold text-stone-900">
              {placedIds.length}/3 Produk Dipadankan
            </span>
          </button>

          {/* Yellow Rounded Wallet Booklet: SUMBANGAN DAN PENCAPAIAN */}
          <button
            type="button"
            onClick={() => {
              paperSound.playFlap();
              setWalletOpen((prev) => !prev);
            }}
            className="relative w-full rounded-xl bg-[#f5e642] border-2 border-stone-900 p-2.5 shadow-[0_4px_0_#a16207,0_10px_18px_rgba(0,0,0,0.6)] text-left cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            {/* Black Heart Clasp Tab */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-stone-900 px-2 py-1 rounded-l-full flex items-center">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            </div>

            {!walletOpen ? (
              <div className="space-y-1 pr-6 text-center">
                <div className="bg-stone-900 rounded px-2 py-0.5 font-display font-extrabold text-xs text-sky-200 tracking-wide">
                  SUMBANGAN
                </div>
                <div className="inline-block bg-stone-900 rounded px-2 py-0.5 font-display font-extrabold text-[11px] text-lime-300">
                  DAN
                </div>
                <div className="bg-stone-900 rounded px-2 py-0.5 font-display font-extrabold text-xs text-rose-300 tracking-wide">
                  PENCAPAIAN
                </div>
              </div>
            ) : (
              <div className="pr-5 text-[10px] leading-snug text-stone-900 font-semibold space-y-1">
                <p>• Menyediakan peluang pekerjaan luas dalam sektor perkilangan.</p>
                <p>• Meningkatkan eksport barangan elektrik, elektronik & automotif (Proton, Perodua).</p>
                <p>• Kemajuan industri petroleum & gas negara melalui PETRONAS.</p>
              </div>
            )}
          </button>

          {/* Bottom-Right Laminated Photo: Pelantar Minyak (Offshore Oil Platform) */}
          <div className="bg-white p-1.5 rounded-md shadow-lg border border-stone-300">
            <CroppedScrapbookAsset
              src={ASSET_CROPS.oilRigPhoto.src}
              crop={ASSET_CROPS.oilRigPhoto.crop}
              alt="Pelantar Minyak Luar Pesisir Malaysia"
              className="w-full h-24 rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
