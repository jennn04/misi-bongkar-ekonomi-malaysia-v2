import React, { useState } from 'react';
import { QrCode, BookOpen } from 'lucide-react';
import {
  CutoutWord,
  StitchedPocket,
  CroppedScrapbookAsset,
  CuteBeeSvg,
  BungaRayaSvg,
  GardenSignSvg,
  MushroomHouseSvg,
} from '../PaperCraftPrimitives';
import { ASSET_CROPS } from '../../data/bookContent';
import { paperSound } from '../../utils/sound';

export interface QrModalPayload {
  title: string;
  subtitle: string;
  cropKey: keyof typeof ASSET_CROPS;
  mode: 'ujiminda' | 'perindustrian' | 'maklumat' | 'ujikehebatan';
}

// ============================================================================
// 1. MUKA HADAPAN (FRONT COVER — 4:5 PORTRAIT)
// ============================================================================
export const FrontCoverPage: React.FC<{ onOpenBook: () => void }> = ({ onOpenBook }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const toggleTag = (label: string) => {
    paperSound.playStickerPop();
    setActiveTag((prev) => (prev === label ? null : label));
  };

  return (
    <div className="relative w-full h-full min-h-[580px] scrapbook-black-page p-4 sm:p-6 flex flex-col justify-between gap-3 select-none preserve-3d">
      {/* Subtle Top Lighting Sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/40" />

      {/* Top Cut-Out Title Stack: MISI BONGKAR EKONOMI MALAYSIA */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2 pt-1 preserve-3d">
        <div className="relative w-full flex items-center justify-center">
          {/* Left Bunga Raya */}
          <div
            className="absolute left-1 sm:left-3 top-0 -rotate-12 transition-transform hover:scale-110 cursor-pointer"
            style={{ transform: 'translateZ(24px)' }}
            onClick={() => toggleTag('Bunga Raya — Bunga Kebangsaan Malaysia')}
          >
            <BungaRayaSvg className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <CutoutWord
            text="MISI"
            palette={['#f87171', '#fb923c', '#facc15', '#fde047']}
            archIntensity={5}
            sizeClass="text-2xl sm:text-3xl"
            zDepth={28}
          />

          {/* Right Flying Passenger Airplane */}
          <div
            className="absolute right-0 sm:right-2 -top-1 rotate-[-8deg] transition-transform hover:scale-110 cursor-pointer"
            style={{ transform: 'translateZ(30px)' }}
            onClick={() => toggleTag('Pengangkutan Udara — Menyokong Pelancongan & Perdagangan')}
          >
            <svg viewBox="0 0 120 60" className="w-16 sm:w-22 h-auto diecut-sticker" aria-hidden="true">
              <path
                d="M12 42 L45 34 L22 14 L32 12 L64 28 L96 16 Q112 12 114 20 Q115 27 98 33 L42 48 L18 50 L10 40 Z"
                fill="#f8fafc"
                stroke="#1e293b"
                strokeWidth="2.5"
              />
              <path d="M14 41 L32 37 L20 24 L12 26 Z" fill="#2563eb" />
              <path d="M26 42 L95 23" stroke="#eab308" strokeWidth="2.5" />
              <path d="M52 38 L78 46 L86 44 L68 34 Z" fill="#cbd5e1" stroke="#1e293b" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <CutoutWord
          text="BONGKAR"
          palette={['#d9f99d', '#4ade80', '#2dd4bf', '#38bdf8', '#f472b6', '#fbcfe8', '#c084fc']}
          archIntensity={7}
          sizeClass="text-2xl sm:text-[28px]"
          zDepth={25}
        />

        <CutoutWord
          text="EKONOMI"
          palette={['#fdba74', '#f472b6', '#a8a29e', '#60a5fa', '#86efac', '#22d3ee', '#818cf8']}
          archIntensity={7}
          sizeClass="text-2xl sm:text-[28px]"
          zDepth={25}
        />

        <CutoutWord
          text="MALAYSIA"
          palette={['#ef4444']}
          flagPattern
          archIntensity={8}
          sizeClass="text-xl sm:text-[26px]"
          zDepth={30}
        />
      </div>

      {/* Center & Bottom 3D Die-Cut Malaysian Economic & Landmark Collage */}
      <div className="relative z-10 flex-1 min-h-[340px] sm:min-h-[370px] mt-2 preserve-3d">
        {/* Center Top: Waving Jalur Gemilang */}
        <button
          type="button"
          onClick={() => toggleTag('Jalur Gemilang — Kebanggaan Ekonomi Negara Maju')}
          style={{ transform: 'translateZ(32px)' }}
          className="absolute left-1/2 -translate-x-1/2 top-0 cursor-pointer transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-amber-300"
          aria-label="Jalur Gemilang"
        >
          <svg viewBox="0 0 150 96" className="w-28 sm:w-34 h-auto diecut-sticker">
            <rect x="8" y="6" width="5" height="86" rx="2" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" />
            <path
              d="M13 10 Q48 4 80 12 T142 10 L142 74 Q108 82 76 74 T13 76 Z"
              fill="#ffffff"
              stroke="#1e293b"
              strokeWidth="2.5"
            />
            {/* Red Stripes */}
            {[14, 24, 34, 44, 54, 64].map((y, idx) => (
              <path
                key={idx}
                d={`M13 ${y} Q48 ${y - 4} 80 ${y + 2} T142 ${y} L142 ${y + 5} Q108 ${y + 9} 76 ${y + 5} T13 ${y + 5} Z`}
                fill="#dc2626"
              />
            ))}
            {/* Blue Canton */}
            <path d="M13 10 Q45 6 76 12 L76 46 Q45 42 13 46 Z" fill="#1d4ed8" />
            {/* Yellow Crescent & Star */}
            <circle cx="38" cy="28" r="11" fill="#facc15" />
            <circle cx="42" cy="28" r="9" fill="#1d4ed8" />
            <circle cx="53" cy="28" r="6.5" fill="#facc15" />
          </svg>
        </button>

        {/* Left: Menara Berkembar Petronas (Twin Towers) */}
        <button
          type="button"
          onClick={() => toggleTag('Menara Berkembar Petronas — Mercu Tanda Perdagangan & Pelancongan')}
          style={{ transform: 'translateZ(36px)' }}
          className="absolute left-0 sm:left-1 top-6 cursor-pointer transition-transform hover:scale-105"
          aria-label="Menara Berkembar Petronas"
        >
          <svg viewBox="0 0 110 190" className="w-20 sm:w-24 h-auto diecut-sticker">
            {/* Left Spire */}
            <line x1="30" y1="6" x2="30" y2="28" stroke="#475569" strokeWidth="3" />
            <rect x="20" y="28" width="20" height="22" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            <rect x="15" y="50" width="30" height="45" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
            <rect x="12" y="95" width="36" height="75" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            {/* Right Spire */}
            <line x1="80" y1="6" x2="80" y2="28" stroke="#475569" strokeWidth="3" />
            <rect x="70" y="28" width="20" height="22" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            <rect x="65" y="50" width="30" height="45" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
            <rect x="62" y="95" width="36" height="75" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            {/* Skybridge */}
            <rect x="46" y="102" width="18" height="8" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
            <line x1="42" y1="122" x2="53" y2="110" stroke="#475569" strokeWidth="2.5" />
            <line x1="68" y1="122" x2="57" y2="110" stroke="#475569" strokeWidth="2.5" />
            {/* Window Grid Lines */}
            {[60, 72, 84, 108, 122, 136, 150].map((y) => (
              <g key={y}>
                <line x1="16" y1={y} x2="44" y2={y} stroke="#475569" strokeWidth="1.5" />
                <line x1="66" y1={y} x2="94" y2={y} stroke="#475569" strokeWidth="1.5" />
              </g>
            ))}
            {/* Trees at Base */}
            <path
              d="M8 172 Q18 156 32 168 Q55 158 76 168 Q94 156 102 172 Z"
              fill="#65a30d"
              stroke="#365314"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Right: Menara Kuala Lumpur (KL Tower) + Bunga Raya */}
        <button
          type="button"
          onClick={() => toggleTag('Menara Kuala Lumpur — Telekomunikasi & Pelancongan')}
          style={{ transform: 'translateZ(34px)' }}
          className="absolute right-1 sm:right-2 top-5 cursor-pointer transition-transform hover:scale-105"
          aria-label="Menara Kuala Lumpur"
        >
          <svg viewBox="0 0 90 175" className="w-16 sm:w-20 h-auto diecut-sticker">
            <line x1="42" y1="4" x2="42" y2="34" stroke="#475569" strokeWidth="3.5" />
            <polygon points="24,48 60,48 53,66 31,66" fill="#93c5fd" stroke="#1e293b" strokeWidth="2.2" />
            <ellipse cx="42" cy="46" rx="20" ry="7" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2.2" />
            <polygon points="36,66 48,66 53,154 31,154" fill="#f1f5f9" stroke="#334155" strokeWidth="2.2" />
            <path d="M18 158 Q42 138 74 158 Z" fill="#84cc16" stroke="#3f6212" strokeWidth="2" />
          </svg>
        </button>
        <div
          className="absolute right-0 top-[44%] pointer-events-none"
          style={{ transform: 'translateZ(26px)' }}
        >
          <BungaRayaSvg className="w-9 h-9 sm:w-11 sm:h-11" />
        </div>

        {/* Center Middle: Modern Pink/Purple MRT/LRT Train */}
        <button
          type="button"
          onClick={() => toggleTag('MRT / LRT Moden — Kemajuan Pengangkutan Awam Negara')}
          style={{ transform: 'translateZ(30px)' }}
          className="absolute left-1/2 -translate-x-1/2 top-[39%] cursor-pointer transition-transform hover:scale-105"
          aria-label="Kereta Api LRT MRT"
        >
          <svg viewBox="0 0 180 76" className="w-36 sm:w-44 h-auto diecut-sticker">
            {/* Track */}
            <polygon points="8,44 156,68 172,62 18,38" fill="#78350f" />
            {/* Sleek Aerodynamic Train */}
            <path
              d="M12 34 L126 16 Q160 16 168 44 Q170 58 148 60 L12 42 Z"
              fill="#f5d0fe"
              stroke="#4a044e"
              strokeWidth="2.5"
            />
            <path d="M12 36 L132 28 L138 48 L12 40 Z" fill="#c026d3" opacity="0.7" />
            {/* Front Windshield */}
            <path d="M134 22 Q156 22 162 42 L138 44 Z" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            {/* Passenger Windows */}
            {[26, 48, 72, 98].map((x) => (
              <rect key={x} x={x} y="27" width="16" height="10" rx="2" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
            ))}
          </svg>
        </button>

        {/* Bottom Left: KTM Yellow/Red Train + Palm Bushes */}
        <button
          type="button"
          onClick={() => toggleTag('Kereta Api Kargo & Kelapa Sawit — Pengangkutan Hasil Pertanian & Industri')}
          style={{ transform: 'translateZ(38px)' }}
          className="absolute left-0 bottom-0 cursor-pointer transition-transform hover:scale-105"
          aria-label="Kereta Api KTM dan Kelapa Sawit"
        >
          <svg viewBox="0 0 175 95" className="w-36 sm:w-42 h-auto diecut-sticker">
            {/* Railway */}
            <polygon points="22,78 138,88 150,80 34,72" fill="#78716c" />
            {/* KTM Train Body */}
            <polygon points="28,62 98,22 136,24 136,74 28,72" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
            <polygon points="28,64 98,48 136,48 136,68 28,70" fill="#ea580c" />
            <rect x="103" y="30" width="13" height="12" rx="2" fill="#93c5fd" stroke="#1e293b" strokeWidth="1.8" />
            <rect x="119" y="30" width="13" height="12" rx="2" fill="#93c5fd" stroke="#1e293b" strokeWidth="1.8" />
            {/* Left & Right Palm Bushes */}
            <path
              d="M4 88 Q8 64 26 62 Q22 50 38 56 Q44 48 52 66 Q64 68 56 88 Z"
              fill="#22c55e"
              stroke="#14532d"
              strokeWidth="2"
            />
            <path
              d="M116 88 Q120 62 138 60 Q146 46 156 62 Q172 62 166 88 Z"
              fill="#16a34a"
              stroke="#14532d"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Bottom Right: Container Cargo Ship (Kapal Kontena) */}
        <button
          type="button"
          onClick={() => toggleTag('Kapal Kontena — Eksport & Import Perdagangan Antarabangsa')}
          style={{ transform: 'translateZ(40px)' }}
          className="absolute right-0 bottom-0 cursor-pointer transition-transform hover:scale-105"
          aria-label="Kapal Kontena Perdagangan"
        >
          <svg viewBox="0 0 175 110" className="w-36 sm:w-42 h-auto diecut-sticker">
            {/* Crane */}
            <polyline points="92,46 122,12 152,46" fill="none" stroke="#eab308" strokeWidth="4" />
            <line x1="86" y1="22" x2="160" y2="22" stroke="#facc15" strokeWidth="4.5" />
            {/* Bridge Tower */}
            <rect x="26" y="22" width="28" height="32" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
            {/* Colorful Containers */}
            {[
              { x: 56, y: 36, c: '#fb923c' },
              { x: 76, y: 34, c: '#f472b6' },
              { x: 96, y: 32, c: '#facc15' },
              { x: 116, y: 32, c: '#60a5fa' },
              { x: 56, y: 48, c: '#a78bfa' },
              { x: 76, y: 46, c: '#4ade80' },
              { x: 96, y: 44, c: '#f87171' },
              { x: 116, y: 44, c: '#fbbf24' },
            ].map((b, i) => (
              <rect key={i} x={b.x} y={b.y} width="19" height="12" fill={b.c} stroke="#1e293b" strokeWidth="1.5" />
            ))}
            {/* Hull */}
            <polygon points="12,58 164,50 148,88 24,88" fill="#a855f7" stroke="#3b0764" strokeWidth="2.5" />
            <polygon points="20,76 153,73 148,88 24,88" fill="#ef4444" />
            {/* Ocean Waves */}
            <path d="M8 88 Q45 80 88 88 T168 88 L168 98 L8 98 Z" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.8" />
          </svg>
        </button>

        {/* Interactive Pop-up Tag Toast on Cover */}
        {activeTag && (
          <div
            style={{ transform: 'translateZ(52px)' }}
            className="absolute inset-x-3 bottom-24 bg-amber-50/95 text-stone-900 border-2 border-stone-900 rounded-lg px-3 py-1.5 text-center text-xs font-semibold shadow-xl"
          >
            {activeTag}
          </div>
        )}
      </div>

      {/* Bottom Open Cover Prompt */}
      <div className="relative z-20 pt-2 flex justify-center" style={{ transform: 'translateZ(35px)' }}>
        <button
          type="button"
          onClick={() => {
            paperSound.playPageFlip();
            onOpenBook();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-300 hover:bg-amber-200 text-stone-950 font-display font-bold text-xs sm:text-sm border-2 border-stone-950 shadow-[0_3px_0_#78350f,0_10px_18px_rgba(0,0,0,0.6)] transition-transform active:translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>Buka Buku Pop-Up 3D</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// 2. OBJEKTIF PEMBELAJARAN (LEFT PAGE OF SPREAD 1)
// ============================================================================
export const ObjektifLeftPage: React.FC<{
  onJumpSpread: (id: number) => void;
  onOpenQrModal: (payload: QrModalPayload) => void;
}> = ({ onJumpSpread, onOpenQrModal }) => {
  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-3 select-none preserve-3d">
      {/* Top: Bee + OBJEKTIF PEMBELAJARAN Cloud Board + Honeycomb + Daisy */}
      <div className="relative bg-white p-2 rounded-[26px] paper-raised-md" style={{ transform: 'translateZ(22px)' }}>
        {/* Pastel Yellow Daisy Flower Sticker Top-Right */}
        <div className="absolute -right-2 -top-3 w-12 h-12 rounded-full bg-white p-1 shadow-md">
          <div className="w-full h-full rounded-full bg-amber-200 flex items-center justify-center border border-amber-300">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
          </div>
        </div>

        <div className="rounded-[20px] bg-gradient-to-br from-[#f3c68f] via-[#eeb877] to-[#e9ae67] p-3 sm:p-3.5 border-2 border-[#b47b38] relative">
          <h2 className="font-display font-extrabold text-center text-base sm:text-lg tracking-wide text-[#fef08a] drop-shadow-[0_2px_0_#451a03] uppercase">
            OBJEKTIF PEMBELAJARAN
          </h2>

          <div className="mt-1.5 flex items-center gap-2">
            <CuteBeeSvg className="w-14 h-14 shrink-0" />
            <div className="text-[11px] sm:text-xs leading-snug text-white font-semibold drop-shadow-[0_1px_1px_rgba(69,26,3,0.65)]">
              <p className="mb-1">Pada akhir pembelajaran, murid dapat:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Menyenaraikan kegiatan ekonomi yang menyumbang kepada kemajuan negara.</li>
                <li>Menjelaskan pencapaian ekonomi negara.</li>
              </ul>
            </div>
          </div>

          {/* Honeycomb Hexagons Bottom-Right */}
          <div className="mt-1 flex justify-end gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="inline-block w-4 h-4 bg-amber-200 border border-amber-700 rotate-45 rounded-[2px]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row: PERTANIAN Stitched Pocket + UJI MINDA QR Code */}
      <div className="grid grid-cols-12 gap-3 items-center my-2 preserve-3d">
        <div className="col-span-7">
          <StitchedPocket
            label="PERTANIAN"
            summaryText="Sektor pengeluaran bahan makanan (padi, sayur) & bahan mentah (kelapa sawit, getah)."
            targetSpreadId={2}
            onJumpSpread={onJumpSpread}
          />
        </div>

        <div className="col-span-5 flex flex-col items-center preserve-3d" style={{ transform: 'translateZ(24px)' }}>
          <span className="font-display font-bold text-xs sm:text-sm text-amber-300 tracking-wide mb-1">
            UJI MINDA
          </span>
          <button
            type="button"
            onClick={() => {
              paperSound.playStickerPop();
              onOpenQrModal({
                title: 'UJI MINDA — Imbas Kod QR & Kuiz Pantas',
                subtitle: 'Kod QR asal daripada halaman Objektif Pembelajaran',
                cropKey: 'qrUjiMinda',
                mode: 'ujiminda',
              });
            }}
            className="group bg-[#e4f53a] p-1.5 rounded-xl border-2 border-lime-600 shadow-[0_4px_0_#65a30d,0_10px_18px_rgba(0,0,0,0.65)] cursor-pointer transition-transform hover:scale-105"
            title="Klik untuk besarkan Kod QR atau jawab Uji Minda"
          >
            <div className="bg-[#5ec246] p-1 rounded-lg">
              <CroppedScrapbookAsset
                src={ASSET_CROPS.qrUjiMinda.src}
                crop={ASSET_CROPS.qrUjiMinda.crop}
                alt="Kod QR Uji Minda"
                className="w-20 h-22 sm:w-23 sm:h-25 rounded bg-white"
              />
            </div>
            <span className="mt-1 flex items-center justify-center gap-1 text-[9px] font-bold text-stone-900">
              <QrCode className="w-2.5 h-2.5" />
              <span>Imbas / Uji</span>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Wooden GARDEN Sign + PERINDUSTRIAN Stitched Pocket */}
      <div className="grid grid-cols-12 gap-3 items-end preserve-3d">
        <div className="col-span-5 flex justify-center" style={{ transform: 'translateZ(20px)' }}>
          <GardenSignSvg className="w-24 h-24 sm:w-28 sm:h-28" />
        </div>
        <div className="col-span-7">
          <StitchedPocket
            label="PERINDUSTRIAN"
            summaryText="Sektor memproses bahan mentah & menghasilkan barangan siap menggunakan teknologi."
            targetSpreadId={3}
            onJumpSpread={onJumpSpread}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. ARAHAN MISI (RIGHT PAGE OF SPREAD 1)
// ============================================================================
export const ObjektifRightPage: React.FC<{ onJumpSpread: (id: number) => void }> = ({
  onJumpSpread,
}) => {
  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-3 select-none preserve-3d">
      {/* Top Row: Cute Pink Flower + ARAHAN MISI Bee Board */}
      <div className="grid grid-cols-12 gap-2 items-start preserve-3d">
        <div className="col-span-3 flex flex-col items-center pt-2" style={{ transform: 'translateZ(20px)' }}>
          {/* Smiling Pink Flower Sticker */}
          <svg viewBox="0 0 80 95" className="w-14 h-16 diecut-sticker" aria-hidden="true">
            <path d="M40 52 L40 88" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="30" cy="74" rx="9" ry="5" fill="#4ade80" />
            <ellipse cx="50" cy="74" rx="9" ry="5" fill="#4ade80" />
            {[0, 60, 120, 180, 240, 300].map((d) => (
              <circle
                key={d}
                cx={40 + 15 * Math.cos((d * Math.PI) / 180)}
                cy={34 + 15 * Math.sin((d * Math.PI) / 180)}
                r="11"
                fill="#f9a8d4"
                stroke="#db2777"
                strokeWidth="1.5"
              />
            ))}
            <circle cx="40" cy="34" r="10" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="37" cy="32" r="1.5" fill="#1e293b" />
            <circle cx="43" cy="32" r="1.5" fill="#1e293b" />
            <path d="M37 37 Q40 40 43 37" fill="none" stroke="#1e293b" strokeWidth="1.5" />
          </svg>
          {/* Dashed Bee Trail */}
          <svg viewBox="0 0 80 30" className="w-16 h-6 mt-1">
            <path
              d="M6 6 Q24 28 42 14 T76 20"
              fill="none"
              stroke="rgba(226,232,240,0.75)"
              strokeWidth="2.2"
              strokeDasharray="5 5"
            />
          </svg>
        </div>

        <div className="col-span-9 bg-white p-2 rounded-2xl paper-raised-md" style={{ transform: 'translateZ(22px)' }}>
          <h2 className="font-display font-extrabold text-center text-base sm:text-lg text-[#facc15] drop-shadow-[0_2px_0_#451a03] tracking-wide">
            ARAHAN MISI
          </h2>
          <div className="mt-1 rounded-xl bg-[#efc576] p-2.5 sm:p-3 border border-[#c5933e] relative">
            <p className="text-[11px] sm:text-xs text-center font-semibold leading-snug text-white drop-shadow-[0_1px_1px_rgba(69,26,3,0.68)]">
              Mari kita terokai empat sektor ekonomi, kenal pasti kegiatan ekonominya dan bongkar
              sumbangannya kepada kemajuan Malaysia!
            </p>
            <div className="mt-1 flex justify-start">
              <CuteBeeSvg className="w-12 h-12 -ml-1 -mb-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: PERDAGANGAN Pocket + Stepped Slogan Badges */}
      <div className="grid grid-cols-12 gap-3 items-center my-2 preserve-3d">
        <div className="col-span-6">
          <StitchedPocket
            label="PERDAGANGAN"
            summaryText="Kegiatan jual beli barangan dan perkhidmatan antara individu, perniagaan atau negara."
            targetSpreadId={4}
            onJumpSpread={onJumpSpread}
          />
        </div>

        <div
          className="col-span-6 flex flex-col gap-2 items-end preserve-3d"
          style={{ transform: 'translateZ(24px)' }}
        >
          <div className="bg-[#65d442] p-1 rounded-lg shadow-md self-end">
            <div className="bg-[#f4f135] px-3 py-1 rounded font-display font-extrabold text-xs sm:text-sm text-stone-900 whitespace-nowrap">
              4 Sektor,
            </div>
          </div>
          <div className="bg-[#65d442] p-1 rounded-lg shadow-md self-start">
            <div className="bg-[#f4f135] px-3 py-1 rounded font-display font-extrabold text-xs sm:text-sm text-stone-900 whitespace-nowrap">
              1 Misi,
            </div>
          </div>
          <div className="bg-[#65d442] p-1 rounded-lg shadow-md self-end">
            <div className="bg-[#f4f135] px-3 py-1 rounded font-display font-extrabold text-xs sm:text-sm text-stone-900 whitespace-nowrap">
              1 Negara Maju !
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Fairytale Mushroom House + PELANCONGAN Pocket */}
      <div className="grid grid-cols-12 gap-3 items-end preserve-3d">
        <div className="col-span-5 flex justify-center" style={{ transform: 'translateZ(20px)' }}>
          <MushroomHouseSvg className="w-26 h-26 sm:w-30 sm:h-30" />
        </div>
        <div className="col-span-7">
          <StitchedPocket
            label="PELANCONGAN"
            summaryText="Kegiatan membawa pelawat mengunjungi destinasi menarik di Semenanjung, Sabah & Sarawak."
            targetSpreadId={5}
            onJumpSpread={onJumpSpread}
          />
        </div>
      </div>
    </div>
  );
};
