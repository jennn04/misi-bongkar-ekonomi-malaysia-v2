import React, { useState } from 'react';
import { RotateCw, Camera, MapPin, Plane, Ship } from 'lucide-react';
import {
  CutoutWord,
  CroppedScrapbookAsset,
  PopUpDioramaStage,
} from '../PaperCraftPrimitives';
import {
  ASSET_CROPS,
  BORNEO_LANDMARKS,
  POPUP_DIORAMAS,
  SEMENANJUNG_LANDMARKS,
} from '../../data/bookContent';
import { paperSound } from '../../utils/sound';

const WHEEL_SEGMENTS = [
  {
    title: 'Perdagangan Tempatan',
    detail: 'Jual beli dalam negara seperti kedai runcit, pasar tani, pasar raya & borong.',
  },
  {
    title: 'Eksport Antarabangsa',
    detail: 'Menjual barangan Malaysia (minyak sawit, E&E, petroleum) ke luar negara.',
  },
  {
    title: 'Import Antarabangsa',
    detail: 'Membeli barangan atau jentera keperluan dari negara luar ke Malaysia.',
  },
  {
    title: 'E-Dagang & Digital',
    detail: 'Urus niaga moden secara dalam talian merentas negeri dan sempadan.',
  },
];

// ============================================================================
// 1. SEKTOR 3: PERDAGANGAN — LEFT PAGE (P E R D A + CONCENTRIC WHEEL)
// ============================================================================
export const PerdaganganLeftPage: React.FC<{ popUpActive: boolean }> = ({ popUpActive }) => {
  const [wheelStep, setWheelStep] = useState(0);
  const [bookletOpen, setBookletOpen] = useState(false);

  const spinWheel = () => {
    paperSound.playFlap();
    setWheelStep((prev) => (prev + 1) % WHEEL_SEGMENTS.length);
  };

  const activeSegment = WHEEL_SEGMENTS[wheelStep];

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-2.5 select-none preserve-3d">
      {/* Top Row: Plaid Cat MAKSUD + P E R D A Cut-Out Letters */}
      <div className="flex items-center justify-between gap-2 preserve-3d" style={{ transform: 'translateZ(22px)' }}>
        <div className="bg-[#d7ceb8] p-1.5 rounded-xl border-2 border-[#8c785b] -rotate-12 shadow-md">
          <div className="bg-white rounded-lg px-2.5 py-1 border border-[#8c785b]">
            <span className="font-display font-extrabold text-xs text-stone-800">🐱 MAKSUD</span>
          </div>
        </div>

        <CutoutWord
          text="PERDA"
          palette={['#38bdf8', '#6366f1', '#2563eb', '#7c3aed', '#60a5fa']}
          archIntensity={5}
          sizeClass="text-lg sm:text-xl"
          zDepth={24}
        />
      </div>

      {/* Plaid Oval Ginger Cat Definition Card */}
      <div
        className="bg-[#d7ceb8] p-1.5 rounded-[24px] border-2 border-[#8c785b] shadow-lg my-1.5 preserve-3d"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="bg-white rounded-[18px] px-3 py-2 border-2 border-[#8c785b] relative">
          <span className="absolute -top-2 right-3 text-base" aria-hidden="true">
            🐈
          </span>
          <p className="text-[11px] sm:text-xs font-semibold text-stone-800 text-center leading-snug">
            Kegiatan jual beli barang dan perkhidmatan antara individu, perniagaan atau negara.
          </p>
        </div>
      </div>

      {/* Standing 3D Container Port, Crane & Globe Diorama */}
      <PopUpDioramaStage
        imageSrc={POPUP_DIORAMAS.perdagangan}
        caption="Pelabuhan Kontena & Eksport Dunia"
        accentColor="border-cyan-300"
        popUpActive={popUpActive}
      />

      {/* Bottom: Sky-Blue Concentric Rotating Wheel + Black Pull-Tab Booklet */}
      <div
        className="relative rounded-xl bg-[#a9d6ec] border-2 border-sky-900 p-3 shadow-[0_5px_0_#0369a1,0_12px_20px_rgba(0,0,0,0.65)] overflow-hidden preserve-3d"
        style={{ transform: 'translateZ(24px)' }}
      >
        {/* Brown Traditional Geometric Corner Ornaments */}
        <div className="absolute top-0 left-0 w-5 h-5 bg-amber-900/85 border-r-2 border-b-2 border-amber-100 rounded-br" />
        <div className="absolute top-0 right-0 w-5 h-5 bg-amber-900/85 border-l-2 border-b-2 border-amber-100 rounded-bl" />
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-amber-900/85 border-l-2 border-t-2 border-amber-100 rounded-tl" />

        <div className="grid grid-cols-12 gap-2 items-center relative z-10">
          {/* Concentric Blue & Pale-Yellow Rotating Wheel */}
          <div className="col-span-5 flex justify-center">
            <button
              type="button"
              onClick={spinWheel}
              style={{ transform: `rotate(${wheelStep * 90}deg)` }}
              className="w-24 h-24 rounded-full bg-[#1d9bf0] border-2 border-sky-700 shadow-md flex items-center justify-center transition-transform duration-500 cursor-pointer"
              title="Putar roda kegiatan perdagangan"
            >
              <div className="w-16 h-16 rounded-full bg-[#dce8b5] flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#1d9bf0] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#dce8b5] flex items-center justify-center">
                    <RotateCw className="w-2.5 h-2.5 text-sky-950" />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Black Mini Booklet with Angled Pull-Tab + Wheel Readout */}
          <div className="col-span-7 flex flex-col gap-1.5">
            <div className="bg-white/90 rounded-lg p-2 border border-sky-700 text-stone-900 shadow-sm">
              <span className="block font-display font-bold text-[11px] text-sky-900">
                {activeSegment.title}
              </span>
              <p className="text-[10px] leading-snug text-stone-700 mt-0.5">
                {activeSegment.detail}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                paperSound.playFlap();
                setBookletOpen((prev) => !prev);
                spinWheel();
              }}
              className="self-start inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-stone-100 px-2.5 py-1 rounded-md text-[10px] font-semibold shadow cursor-pointer"
            >
              <span>{bookletOpen ? 'Putar Roda Lagi ↻' : 'Buka Kad Hitam & Putar ↻'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. SEKTOR 3: PERDAGANGAN — RIGHT PAGE (G A N G A N + SLIDING CARGO SHIP!)
// ============================================================================
const TRADE_PORTS = [
  'Pelabuhan Klang — Pintu Masuk Maritim Utama Negara',
  'Pelabuhan Tanjung Pelepas — Hab Transhipment Serantau',
  'Pasaran Eksport Utama — ASEAN, China, AS, Jepun & Eropah',
];

export const PerdaganganRightPage: React.FC = () => {
  const [shipProgress, setShipProgress] = useState(18); // 0 to 100 along horizontal slit

  const portIndex = shipProgress < 34 ? 0 : shipProgress < 68 ? 1 : 2;

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-2.5 select-none preserve-3d">
      {/* Top Row: G A N G A N Cut-Out Letters + Export/Import Sticker */}
      <div className="flex items-center justify-between gap-2 preserve-3d" style={{ transform: 'translateZ(24px)' }}>
        <CutoutWord
          text="GANGAN"
          palette={['#2563eb', '#38bdf8', '#6366f1', '#9333ea', '#38bdf8', '#7c3aed']}
          archIntensity={5}
          sizeClass="text-base sm:text-lg"
          zDepth={24}
        />

        <div className="bg-white rounded-xl px-2 py-1 border-2 border-stone-800 shadow-md flex items-center gap-1 text-[10px] font-bold text-stone-900 shrink-0">
          <span>🚢</span>
          <span>EXPORT · IMPORT</span>
        </div>
      </div>

      {/* Ornate Maroon & Gold Frame 1: Capybara Sumbangan kepada negara */}
      <div
        className="rounded-lg bg-[#8c2d2d] p-2 border-2 border-amber-300/80 shadow-[0_4px_0_#450a0a,0_10px_18px_rgba(0,0,0,0.65)] preserve-3d"
        style={{ transform: 'translateZ(22px)' }}
      >
        <div className="bg-stone-950 rounded p-1.5 flex items-center justify-center">
          <div className="bg-[#f5efe6] rounded px-3 py-1.5 border border-amber-700/40 flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              🦫💻
            </span>
            <span className="font-display font-bold text-xs sm:text-sm text-amber-900 leading-tight">
              Sumbangan kepada negara
            </span>
          </div>
        </div>
      </div>

      {/* Two Verbatim Sky-Blue Strips */}
      <div className="space-y-1.5 pl-2 preserve-3d" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center gap-1.5">
          <span className="text-lime-300 font-bold text-xs">↳</span>
          <div className="flex-1 bg-[#4cc3f7] text-stone-950 rounded-md px-2.5 py-1 text-[11px] font-bold shadow">
            Meluaskan pasaran barangan tempatan.
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-lime-300 font-bold text-xs">↳</span>
          <div className="flex-1 bg-[#4cc3f7] text-stone-950 rounded-md px-2.5 py-1 text-[11px] font-bold shadow">
            Menjana pendapatan melalui eksport.
          </div>
        </div>
      </div>

      {/* Ornate Maroon & Gold Frame 2: Snorkel Mascot PENCAPAIAN EKONOMI */}
      <div className="space-y-1.5 preserve-3d" style={{ transform: 'translateZ(22px)' }}>
        <div className="rounded-lg bg-[#8c2d2d] p-2 border-2 border-amber-300/80 shadow-md">
          <div className="bg-stone-950 rounded p-1.5 flex items-center justify-center">
            <div className="bg-[#f5efe6] rounded px-3 py-1.5 border border-amber-700/40 flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                🐻‍❄️🥽
              </span>
              <span className="font-display font-extrabold text-xs sm:text-sm text-amber-900 tracking-wide">
                PENCAPAIAN EKONOMI
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#b7dcf4] text-stone-950 rounded-md px-2.5 py-1.5 border border-sky-300 text-[11px] font-bold leading-snug shadow">
          Malaysia menjalankan perdagangan antarabangsa dengan pelbagai negara.
        </div>
      </div>

      {/* Ornate Maroon & Gold Frame 3: INTERACTIVE SLIDING CARGO SHIP IN HORIZONTAL TRACK! */}
      <div
        className="rounded-lg bg-[#8c2d2d] p-2 border-2 border-amber-300/80 shadow-[0_5px_0_#450a0a,0_12px_20px_rgba(0,0,0,0.7)] preserve-3d"
        style={{ transform: 'translateZ(28px)' }}
      >
        <div className="relative bg-stone-950 rounded h-18 px-3 flex flex-col justify-center overflow-hidden">
          {/* Horizontal Cut Slit Track in Black Cardstock */}
          <div className="w-full h-1.5 bg-black border-y border-stone-700 rounded-full relative" />

          {/* Die-cut Cargo Ship Riding the Slit */}
          <div
            style={{ left: `calc(${shipProgress}% * 0.62 + 6px)` }}
            className="pointer-events-none absolute top-1.5 transition-all duration-150"
          >
            <svg viewBox="0 0 130 58" className="w-26 h-12 diecut-sticker">
              <rect x="14" y="10" width="24" height="16" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
              <rect x="42" y="14" width="14" height="10" fill="#ef4444" />
              <rect x="57" y="14" width="14" height="10" fill="#facc15" />
              <rect x="72" y="14" width="14" height="10" fill="#22c55e" />
              <rect x="48" y="24" width="14" height="8" fill="#3b82f6" />
              <rect x="63" y="24" width="14" height="8" fill="#f97316" />
              <polygon points="6,30 122,28 108,48 16,48" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
              <polygon points="14,42 112,42 108,48 16,48" fill="#ea580c" />
            </svg>
          </div>

          {/* Interactive Range Input Overlay for Smooth Tactile Ship Sliding */}
          <input
            type="range"
            min={0}
            max={100}
            value={shipProgress}
            aria-label="Gerakkan kapal kontena di sepanjang laluan perdagangan"
            onChange={(e) => setShipProgress(Number(e.target.value))}
            onPointerDown={() => paperSound.playFlap()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
          />
        </div>

        <div className="mt-1 flex items-center justify-between text-[9px] text-amber-100 font-medium px-1">
          <span className="inline-flex items-center gap-1 truncate">
            <Ship className="w-3 h-3 text-amber-300 shrink-0" />
            <span className="truncate">{TRADE_PORTS[portIndex]}</span>
          </span>
          <span className="text-amber-300 font-bold shrink-0 ml-2">⇆ Geser Kapal</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. SEKTOR 4: PELANCONGAN — LEFT PAGE (SEMENANJUNG MAP + FLYING AIRPLANE)
// ============================================================================
export const PelanconganLeftPage: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeSpot = SEMENANJUNG_LANDMARKS[selectedIdx];

  const cycleDestination = () => {
    paperSound.playStickerPop();
    setSelectedIdx((prev) => (prev + 1) % SEMENANJUNG_LANDMARKS.length);
  };

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-2.5 select-none preserve-3d">
      {/* Top Arching Rainbow Cut-Out Title: PELANCONGAN */}
      <div className="flex justify-center pt-0.5" style={{ transform: 'translateZ(26px)' }}>
        <CutoutWord
          text="PELANCONGAN"
          palette={[
            '#f87171', '#facc15', '#fde047', '#4ade80', '#f472b6',
            '#818cf8', '#38bdf8', '#d6a27a', '#2dd4bf', '#a3e635', '#fdba74',
          ]}
          archIntensity={9}
          sizeClass="text-base sm:text-lg"
          zDepth={26}
        />
      </div>

      {/* Upper Clipboard Definition Card + Signpost & Car Stickers */}
      <div className="grid grid-cols-12 gap-1.5 items-center my-1.5 preserve-3d" style={{ transform: 'translateZ(22px)' }}>
        <div className="col-span-2 flex flex-col items-center text-[8px] font-bold text-stone-300">
          <span className="border border-stone-500 rounded px-1 py-0.5 mb-0.5">BEACH</span>
          <span className="border border-stone-500 rounded px-1 py-0.5">HOTEL</span>
        </div>

        <div className="col-span-8 bg-white rounded-2xl p-1.5 shadow-md relative">
          {/* Clipboard Clip */}
          <div className="mx-auto -mt-3 mb-1 w-8 h-3 rounded-t-md bg-amber-300 border-2 border-amber-800" />
          <div className="rounded-xl bg-[#f7efe6] border-2 border-[#a67c52] px-2.5 py-2 text-center">
            <p className="text-[10px] sm:text-[11px] font-bold text-stone-800 leading-snug">
              Kegiatan membawa pelawat mengunjungi tempat menarik untuk tujuan rekreasi,
              kebudayaan, pendidikan atau urusan tertentu.
            </p>
          </div>
        </div>

        <div className="col-span-2 flex flex-col items-center gap-1">
          <span className="text-lg diecut-sticker" aria-hidden="true">
            🚗
          </span>
          <span className="text-sm text-amber-300" aria-hidden="true">
            ☀️
          </span>
        </div>
      </div>

      {/* Lower Center: Raised Illustrated Peta Pelancongan Semenanjung Malaysia + Interactive 3D Plane */}
      <div
        className="relative flex-1 rounded-2xl bg-stone-700/75 p-2 border-2 border-stone-500/70 shadow-[0_10px_24px_rgba(0,0,0,0.75)] flex flex-col justify-between preserve-3d"
        style={{ transform: 'translateZ(26px)' }}
      >
        <div
          onClick={cycleDestination}
          className="relative flex-1 min-h-[300px] sm:min-h-[340px] rounded-xl overflow-hidden bg-sky-200 border border-white/60 cursor-pointer group"
          title="Klik peta untuk menerbangkan kapal terbang ke destinasi seterusnya!"
        >
          <CroppedScrapbookAsset
            src={ASSET_CROPS.mapSemenanjung.src}
            crop={ASSET_CROPS.mapSemenanjung.crop}
            alt="Peta Pelancongan Semenanjung Malaysia"
            className="w-full h-full"
          />

          {/* Interactive 3D Die-Cut Paper Airplane Moving to Selected Landmark */}
          <div
            style={{
              left: `${Math.min(78, Math.max(14, activeSpot.x))}%`,
              top: `${Math.min(78, Math.max(14, activeSpot.y))}%`,
            }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20"
          >
            <div className="bg-white rounded-full p-1.5 border-2 border-stone-900 shadow-[0_8px_16px_rgba(0,0,0,0.6)] flex items-center gap-1">
              <Plane className="w-4 h-4 text-sky-600 fill-sky-200" />
            </div>
          </div>
        </div>

        {/* Interactive Landmark Postcard Strip at Bottom of Map */}
        <div className="mt-1.5 bg-stone-900/95 rounded-lg px-2.5 py-1.5 border border-stone-700 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="block font-display font-bold text-[11px] text-amber-300 truncate">
              📍 {activeSpot.name}
            </span>
            <span className="block text-[9px] text-stone-300 truncate">{activeSpot.sub}</span>
          </div>
          <button
            type="button"
            onClick={cycleDestination}
            className="px-2 py-1 rounded bg-sky-500 hover:bg-sky-400 text-stone-950 font-bold text-[10px] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Terbang ({selectedIdx + 1}/{SEMENANJUNG_LANDMARKS.length})
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. SEKTOR 4: PELANCONGAN — RIGHT PAGE (CAMERA + SARAWAK & SABAH MAP + FLAPS)
// ============================================================================
export const PelanconganRightPage: React.FC<{ popUpActive: boolean }> = ({ popUpActive }) => {
  const [showDiorama, setShowDiorama] = useState(true);
  const [borneoIdx, setBorneoIdx] = useState(0);
  const [flap1Open, setFlap1Open] = useState(false);
  const [flap2Open, setFlap2Open] = useState(false);

  const activeBorneo = BORNEO_LANDMARKS[borneoIdx];

  return (
    <div className="relative w-full h-full scrapbook-black-page p-4 sm:p-5 flex flex-col justify-between gap-2.5 select-none preserve-3d">
      {/* Top Row: Pink-Blue-Yellow Paper Camera Flip-Booklet + Travel Doodles */}
      <div className="grid grid-cols-12 gap-2 items-center preserve-3d" style={{ transform: 'translateZ(26px)' }}>
        <div className="col-span-6">
          <button
            type="button"
            onClick={() => {
              paperSound.playStickerPop();
              setShowDiorama((prev) => !prev);
            }}
            className="group relative -rotate-6 bg-[#f5ef42] p-1.5 rounded-xl border-2 border-stone-900 shadow-[0_4px_0_#a16207,0_10px_18px_rgba(0,0,0,0.65)] cursor-pointer transition-transform hover:scale-105 w-full"
            title="Klik kamera kertas untuk tukar pandangan Diorama 3D & Peta!"
          >
            <div className="rounded-lg bg-[#f9a8d4] overflow-hidden border border-stone-800">
              <div className="h-2 bg-[#f9a8d4]" />
              <div className="bg-[#38bdf8] py-2 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-pink-200 border-2 border-[#f5ef42] flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <div className="py-1 bg-[#f9a8d4] text-center text-[9px] font-extrabold text-stone-900">
                {showDiorama ? 'Tutup Lensa 3D' : 'Buka Diorama 3D'}
              </div>
            </div>
          </button>
        </div>

        {/* Right Travel Stickers: Suitcase, Cloud, Boarding Ticket */}
        <div className="col-span-6 flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sky-400 text-base" aria-hidden="true">
              ☁️
            </span>
            <div className="bg-sky-100 text-sky-950 px-2 py-0.5 rounded border border-sky-300 rotate-6 text-[9px] font-extrabold shadow">
              ✈️ BOARDING PASS
            </div>
          </div>
          <span className="text-[10px] text-stone-300 font-medium">🧳 Jom Cuti-Cuti Malaysia</span>
        </div>
      </div>

      {/* Collapsible 3D Malaysian Landmarks Diorama */}
      {showDiorama && (
        <PopUpDioramaStage
          imageSrc={POPUP_DIORAMAS.pelancongan}
          caption="KLCC, Menara KL & Gunung Kinabalu"
          accentColor="border-pink-300"
          popUpActive={popUpActive}
        />
      )}

      {/* Lower Split: Peta Pelancongan Sarawak & Sabah (Left) + SUMBANGAN & PENCAPAIAN (Right) */}
      <div className="grid grid-cols-12 gap-2.5 flex-1 items-stretch mt-1 preserve-3d">
        {/* Left: Sarawak & Sabah Illustrated Map */}
        <div
          className="col-span-7 rounded-xl bg-stone-700/75 p-1.5 border border-stone-500/70 shadow-lg flex flex-col justify-between"
          style={{ transform: 'translateZ(22px)' }}
        >
          <div
            onClick={() => {
              paperSound.playStickerPop();
              setBorneoIdx((prev) => (prev + 1) % BORNEO_LANDMARKS.length);
            }}
            className="relative flex-1 min-h-[210px] rounded-lg overflow-hidden bg-sky-200 cursor-pointer"
            title="Klik peta Sarawak & Sabah untuk lihat destinasi!"
          >
            <CroppedScrapbookAsset
              src={ASSET_CROPS.mapBorneo.src}
              crop={ASSET_CROPS.mapBorneo.crop}
              alt="Peta Pelancongan Sarawak & Sabah"
              className="w-full h-full"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              paperSound.playStickerPop();
              setBorneoIdx((prev) => (prev + 1) % BORNEO_LANDMARKS.length);
            }}
            className="mt-1 bg-stone-900 rounded px-2 py-1 text-left flex items-center justify-between gap-1 cursor-pointer"
          >
            <div className="min-w-0">
              <span className="block text-[9px] font-bold text-lime-300 truncate">
                {activeBorneo.name}
              </span>
              <span className="block text-[8px] text-stone-300 truncate">{activeBorneo.sub}</span>
            </div>
            <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
          </button>
        </div>

        {/* Right: Two Yellow-Tab Lift-Flap SUMBANGAN Windows + PENCAPAIAN EKONOMI Cards */}
        <div
          className="col-span-5 flex flex-col justify-between gap-1.5"
          style={{ transform: 'translateZ(24px)' }}
        >
          {/* Lift-Flap Window 1 */}
          <button
            type="button"
            onClick={() => {
              paperSound.playFlap();
              setFlap1Open((p) => !p);
            }}
            className="rounded-lg bg-stone-900 border border-stone-400 p-1.5 text-center relative shadow cursor-pointer hover:border-amber-300"
          >
            {!flap1Open ? (
              <div className="py-1">
                <span className="text-[10px] text-sky-300 block">✈️ Klik Buka</span>
                <span className="inline-block mt-1 w-5 h-1.5 bg-amber-300 rounded-sm" />
              </div>
            ) : (
              <p className="text-[9px] leading-tight font-semibold text-amber-100">
                Menjana pendapatan negara melalui pelancong tempatan & asing.
              </p>
            )}
          </button>

          <div className="text-center font-display font-extrabold text-xs text-rose-400 tracking-wide">
            SUMBANGAN
          </div>

          {/* Lift-Flap Window 2 */}
          <button
            type="button"
            onClick={() => {
              paperSound.playFlap();
              setFlap2Open((p) => !p);
            }}
            className="rounded-lg bg-stone-900 border border-stone-400 p-1.5 text-center relative shadow cursor-pointer hover:border-amber-300"
          >
            {!flap2Open ? (
              <div className="py-1">
                <span className="text-[10px] text-amber-200 block">🌈 Klik Buka</span>
                <span className="inline-block mt-1 w-5 h-1.5 bg-amber-300 rounded-sm" />
              </div>
            ) : (
              <p className="text-[9px] leading-tight font-semibold text-lime-100">
                Peluang pekerjaan perhotelan, pengangkutan, makanan & kraf.
              </p>
            )}
          </button>

          {/* PENCAPAIAN EKONOMI Header & Two Verbatim White Cards */}
          <div className="space-y-1">
            <div className="text-center font-display font-extrabold text-[10px] text-lime-300 leading-none">
              PENCAPAIAN EKONOMI
            </div>
            <div className="bg-white text-stone-900 rounded-md p-1.5 -rotate-2 shadow text-[8.5px] font-bold leading-tight">
              Malaysia mempunyai pelbagai destinasi pelancongan yang menarik pelawat tempatan dan
              antarabangsa.
            </div>
            <div className="bg-white text-stone-900 rounded-md p-1.5 rotate-1 shadow text-[8.5px] font-bold leading-tight">
              Industri pelancongan menyokong pertumbuhan sektor perkhidmatan.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
