import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Columns2,
  RectangleVertical,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from 'lucide-react';
import { BOOK_SPREADS } from './data/bookContent';
import {
  FrontCoverPage,
  ObjektifLeftPage,
  ObjektifRightPage,
  QrModalPayload,
} from './components/pages/CoverAndObjektif';
import {
  PertanianLeftPage,
  PertanianRightPage,
  PerindustrianLeftPage,
  PerindustrianRightPage,
} from './components/pages/PertanianAndPerindustrian';
import {
  PerdaganganLeftPage,
  PerdaganganRightPage,
  PelanconganLeftPage,
  PelanconganRightPage,
} from './components/pages/PerdaganganAndPelancongan';
import {
  HalamanAkhirLeftPage,
  HalamanAkhirRightPage,
} from './components/pages/FinalSpreadPages';
import { QrPreviewModal } from './components/QrPreviewModal';
import { OriginalPhotoModal } from './components/OriginalPhotoModal';
import { paperSound } from './utils/sound';

type CameraPreset = 'popup' | 'front' | 'top';

export default function App() {
  const [spreadIdx, setSpreadIdx] = useState<number>(0);
  const [flipDirection, setFlipDirection] = useState<number>(1);
  // View mode: 'spread' shows opened 2-page 3D book with auto-expanding height;
  // 'single' focuses a single full-height page for narrow screens or close reading.
  const [viewMode, setViewMode] = useState<'spread' | 'single'>(() =>
    typeof window !== 'undefined' && window.innerWidth < 920 ? 'single' : 'spread'
  );
  const [singleSide, setSingleSide] = useState<'left' | 'right'>('left');

  // Gentle 3D Studio Camera Tilt so full page height is clearly readable
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 5, ry: -3 });
  const [activePreset, setActivePreset] = useState<CameraPreset>('popup');
  const [popUpActive, setPopUpActive] = useState<boolean>(true);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);

  // Modals
  const [qrModal, setQrModal] = useState<QrModalPayload | null>(null);
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false);

  // Interactive Pointer Drag-to-Tilt on Stage Background
  const dragState = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    baseRx: number;
    baseRy: number;
  }>({ dragging: false, startX: 0, startY: 0, baseRx: 5, baseRy: -3 });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key.toLowerCase() === 'h') {
        setDockCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const goToSpread = (targetIdx: number, preferredSide: 'left' | 'right' = 'left') => {
    const clamped = Math.max(0, Math.min(BOOK_SPREADS.length - 1, targetIdx));
    if (clamped !== spreadIdx) {
      paperSound.playPageFlip();
      setFlipDirection(clamped > spreadIdx ? 1 : -1);
      setSpreadIdx(clamped);
    }
    setSingleSide(preferredSide);
  };

  const handleNext = () => {
    if (viewMode === 'single' && spreadIdx > 0 && singleSide === 'left') {
      paperSound.playPageFlip();
      setFlipDirection(1);
      setSingleSide('right');
      return;
    }
    if (spreadIdx < BOOK_SPREADS.length - 1) {
      goToSpread(spreadIdx + 1, 'left');
    }
  };

  const handlePrev = () => {
    if (viewMode === 'single' && spreadIdx > 0 && singleSide === 'right') {
      paperSound.playPageFlip();
      setFlipDirection(-1);
      setSingleSide('left');
      return;
    }
    if (spreadIdx > 0) {
      const prevIdx = spreadIdx - 1;
      goToSpread(prevIdx, prevIdx === 0 ? 'left' : 'right');
    }
  };

  const applyCameraPreset = (preset: CameraPreset) => {
    setActivePreset(preset);
    if (preset === 'popup') {
      setTilt({ rx: 6, ry: -4 });
    } else if (preset === 'front') {
      setTilt({ rx: 0, ry: 0 });
    } else {
      setTilt({ rx: 14, ry: 4 });
    }
  };

  const toggleSound = () => {
    const nextMuted = !soundMuted;
    paperSound.muted = nextMuted;
    setSoundMuted(nextMuted);
    if (!nextMuted) paperSound.playStickerPop();
  };

  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, input, a, label')) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      baseRx: tilt.rx,
      baseRy: tilt.ry,
    };
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    const nextRy = Math.max(-20, Math.min(20, dragState.current.baseRy + dx * 0.07));
    const nextRx = Math.max(-6, Math.min(22, dragState.current.baseRx - dy * 0.07));
    setTilt({ rx: nextRx, ry: nextRy });
  };

  const handleStagePointerUp = () => {
    dragState.current.dragging = false;
  };

  const renderLeftPage = (idx: number) => {
    switch (idx) {
      case 0:
        return <FrontCoverPage onOpenBook={() => goToSpread(1, 'left')} />;
      case 1:
        return <ObjektifLeftPage onJumpSpread={(id) => goToSpread(id, 'left')} onOpenQrModal={setQrModal} />;
      case 2:
        return <PertanianLeftPage popUpActive={popUpActive} />;
      case 3:
        return <PerindustrianLeftPage popUpActive={popUpActive} />;
      case 4:
        return <PerdaganganLeftPage popUpActive={popUpActive} />;
      case 5:
        return <PelanconganLeftPage />;
      case 6:
        return <HalamanAkhirLeftPage onOpenQrModal={setQrModal} />;
      default:
        return null;
    }
  };

  const renderRightPage = (idx: number) => {
    switch (idx) {
      case 1:
        return <ObjektifRightPage onJumpSpread={(id) => goToSpread(id, 'left')} />;
      case 2:
        return <PertanianRightPage />;
      case 3:
        return <PerindustrianRightPage onOpenQrModal={setQrModal} />;
      case 4:
        return <PerdaganganRightPage />;
      case 5:
        return <PelanconganRightPage popUpActive={popUpActive} />;
      case 6:
        return <HalamanAkhirRightPage />;
      default:
        return null;
    }
  };

  const currentSpread = BOOK_SPREADS[spreadIdx];
  const isSinglePageRender = spreadIdx === 0 || viewMode === 'single';

  return (
    <div className="min-h-screen flex flex-col studio-table-bg text-stone-100 select-none">
      {/* =====================================================================
          STRICT 3-ZONE TOP BAR CONTRACT (Brand — 5 Nav Links — 1 Primary Action)
          ===================================================================== */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-5 sm:px-8 py-3 border-b border-white/10 bg-[#141312]/95">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => goToSpread(0, 'left')}
          className="font-display font-extrabold text-base sm:text-lg tracking-tight text-amber-200 hover:text-amber-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Misi Bongkar Ekonomi Malaysia
        </button>

        {/* Zone 2: 5 Clean Single-Line Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
          <button
            type="button"
            onClick={() => goToSpread(0, 'left')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              spreadIdx === 0 ? 'text-amber-300 border-b-2 border-amber-300' : ''
            }`}
          >
            Muka Hadapan
          </button>
          <button
            type="button"
            onClick={() => goToSpread(1, 'left')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              spreadIdx === 1 ? 'text-amber-300 border-b-2 border-amber-300' : ''
            }`}
          >
            Objektif
          </button>
          <button
            type="button"
            onClick={() => {
              const nextSector = spreadIdx >= 2 && spreadIdx < 5 ? spreadIdx + 1 : 2;
              goToSpread(nextSector, 'left');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              spreadIdx >= 2 && spreadIdx <= 5 ? 'text-amber-300 border-b-2 border-amber-300' : ''
            }`}
          >
            Empat Sektor
          </button>
          <button
            type="button"
            onClick={() => goToSpread(6, 'left')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              spreadIdx === 6 && (viewMode === 'spread' || singleSide === 'left')
                ? 'text-amber-300 border-b-2 border-amber-300'
                : ''
            }`}
          >
            Uji Kehebatan
          </button>
          <button
            type="button"
            onClick={() => goToSpread(6, 'right')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              spreadIdx === 6 && singleSide === 'right' && viewMode === 'single'
                ? 'text-amber-300 border-b-2 border-amber-300'
                : ''
            }`}
          >
            Refleksi Detektif
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => {
              paperSound.playFlap();
              setPhotoModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-stone-950 bg-amber-300 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Foto Skrap Asal</span>
          </button>
        </div>
      </header>

      {/* =====================================================================
          CENTRAL 3D POP-UP BOOK VIEWPORT STAGE (Full Auto-Height, Never Clipped!)
          ===================================================================== */}
      <main
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerUp}
        onPointerCancel={handleStagePointerUp}
        className="relative flex-1 w-full flex flex-col items-center justify-center px-3 sm:px-8 pt-4 pb-8 cursor-grab active:cursor-grabbing"
      >
        {/* Subtle Contextual Header Kicker Above the Book */}
        <div className="mb-3 text-center pointer-events-none">
          <p className="text-xs text-stone-400 tracking-wide">
            <span>{currentSpread.title}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span className="text-stone-300">{currentSpread.subtitle}</span>
          </p>
        </div>

        {/* 3D Perspective Container */}
        <div className="book-perspective w-full flex items-center justify-center py-2">
          <motion.div
            animate={{
              rotateX: tilt.rx,
              rotateY: tilt.ry,
            }}
            transition={{ type: 'spring', stiffness: 130, damping: 22 }}
            className="relative preserve-3d flex items-center justify-center"
          >
            {/* Soft Studio Tabletop Contact Shadow Beneath the Book */}
            <div
              style={{ transform: 'translateZ(-28px) translateY(18px) scale(0.98)' }}
              className="pointer-events-none absolute inset-0 rounded-3xl bg-black/80 blur-2xl"
            />

            <AnimatePresence mode="wait" initial={false}>
              {isSinglePageRender ? (
                /* =============================================================
                   AUTO-HEIGHT SINGLE-PAGE / HARDCOVER 3D BOOK BLOCK
                   ============================================================= */
                <motion.div
                  key={`single-${spreadIdx}-${singleSide}`}
                  initial={{
                    opacity: 0,
                    rotateY: flipDirection > 0 ? 24 : -24,
                    scale: 0.97,
                  }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    rotateY: flipDirection > 0 ? -20 : 20,
                    scale: 0.97,
                  }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="relative preserve-3d flex items-stretch"
                >
                  {/* Left Hardcover Spine Ridge */}
                  <div className="w-3.5 sm:w-4 rounded-l-lg bg-gradient-to-r from-[#0a0a0c] via-[#272930] to-[#111215] border-y border-l border-white/15 shadow-xl" />

                  {/* Main Full-Height Scrapbook Page (No fixed aspect ratio clipping!) */}
                  <div className="relative w-[min(90vw,490px)] min-h-[590px] h-auto bg-[#141518] rounded-r-md border-y-2 border-r-2 border-stone-700/80 shadow-[0_24px_48px_rgba(0,0,0,0.85)] preserve-3d flex flex-col">
                    {spreadIdx === 0 || singleSide === 'left'
                      ? renderLeftPage(spreadIdx)
                      : renderRightPage(spreadIdx)}

                    {/* Inner Spine Gutter Shadow */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/60 to-transparent" />
                  </div>

                  {/* Right Visible Stacked Cardstock Page Thickness */}
                  <div className="w-3 sm:w-3.5 my-1 rounded-r page-stack-right border-y border-r border-stone-600/60 shadow-lg" />

                  {/* Bottom Visible Stacked Cardstock Page Thickness */}
                  <div className="pointer-events-none absolute -bottom-2.5 left-3.5 right-3 h-2.5 rounded-b page-stack-bottom border-x border-b border-stone-700/60" />
                </motion.div>
              ) : (
                /* =============================================================
                   OPENED TWO-PAGE 3D POP-UP SPREAD (FULL AUTO-EXPANDING HEIGHT)
                   ============================================================= */
                <motion.div
                  key={`spread-${spreadIdx}`}
                  initial={{
                    opacity: 0,
                    rotateY: flipDirection > 0 ? 16 : -16,
                    scale: 0.98,
                  }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    rotateY: flipDirection > 0 ? -16 : 16,
                    scale: 0.98,
                  }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="relative preserve-3d flex items-stretch"
                >
                  {/* Outer Left Stacked Cardstock Page Edges */}
                  <div
                    style={{ transform: 'rotateY(4deg)' }}
                    className="w-3 my-1.5 rounded-l page-stack-left border-y border-l border-stone-600/60 shadow-lg"
                  />

                  {/* Left Page (Auto-stretches to match tallest page in spread) */}
                  <div
                    style={{
                      transformOrigin: 'right center',
                      transform: 'rotateY(4deg)',
                    }}
                    className="relative w-[420px] xl:w-[475px] min-h-[590px] h-auto bg-[#141518] rounded-l-md border-y-2 border-l-2 border-stone-700/80 shadow-[-16px_24px_42px_rgba(0,0,0,0.75)] preserve-3d flex flex-col"
                  >
                    {renderLeftPage(spreadIdx)}

                    {/* Realistic Right-Edge Spine Crease Vignette */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/70 via-black/25 to-transparent" />

                    {/* Bottom Page Stack Edge */}
                    <div className="pointer-events-none absolute -bottom-2.5 left-0 right-0 h-2.5 page-stack-bottom border-b border-stone-700/70" />
                  </div>

                  {/* Central Realistic 3D Bookbinding Spine */}
                  <div
                    style={{ transform: 'translateZ(-3px)' }}
                    className="relative z-20 w-4 sm:w-5 bg-gradient-to-r from-[#09090b] via-[#2b2d35] to-[#09090b] border-y border-stone-600/50 shadow-inner flex flex-col justify-evenly items-center py-8"
                  >
                    {[0, 1, 2, 3, 4].map((stitch) => (
                      <span
                        key={stitch}
                        className="w-2.5 h-1 rounded-full bg-stone-400/40 border border-black/60"
                      />
                    ))}
                  </div>

                  {/* Right Page (Auto-stretches to match tallest page in spread) */}
                  <div
                    style={{
                      transformOrigin: 'left center',
                      transform: 'rotateY(-4deg)',
                    }}
                    className="relative w-[420px] xl:w-[475px] min-h-[590px] h-auto bg-[#141518] rounded-r-md border-y-2 border-r-2 border-stone-700/80 shadow-[16px_24px_42px_rgba(0,0,0,0.75)] preserve-3d flex flex-col"
                  >
                    {renderRightPage(spreadIdx)}

                    {/* Realistic Left-Edge Spine Crease Vignette */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

                    {/* Bottom Page Stack Edge */}
                    <div className="pointer-events-none absolute -bottom-2.5 left-0 right-0 h-2.5 page-stack-bottom border-b border-stone-700/70" />
                  </div>

                  {/* Outer Right Stacked Cardstock Page Edges */}
                  <div
                    style={{ transform: 'rotateY(-4deg)' }}
                    className="w-3 my-1.5 rounded-r page-stack-right border-y border-r border-stone-600/60 shadow-lg"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* =====================================================================
          STICKY BOTTOM STUDIO CONTROL DOCK (Sits cleanly below book content, never covers bottom data!)
          ===================================================================== */}
      <footer className="sticky bottom-0 z-30 w-full flex flex-col items-center pb-3 pt-1 px-3 pointer-events-none">
        {/* Collapse / Expand Zen Mode Handle */}
        <button
          type="button"
          onClick={() => setDockCollapsed((c) => !c)}
          className="pointer-events-auto mb-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1e1c]/95 hover:bg-[#2a2825] border border-white/15 text-[11px] font-medium text-stone-300 shadow-lg cursor-pointer whitespace-nowrap"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-amber-300" />
              <span>Papar Kawalan Buku 3D</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              <span>Sembunyi Kawalan</span>
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div className="pointer-events-auto w-[min(980px,96vw)] rounded-2xl bg-[#191816]/95 border border-white/15 px-3 sm:px-4 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-wrap items-center justify-between gap-2.5">
            {/* Page Turn Controls + Spread Quick Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-0.5 sm:pb-0">
              <button
                type="button"
                onClick={handlePrev}
                disabled={spreadIdx === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-35 text-xs font-semibold text-stone-100 cursor-pointer whitespace-nowrap shrink-0"
                title="Halaman Sebelumnya (←)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sebelum</span>
              </button>

              <div className="flex items-center gap-1 bg-stone-900/90 p-1 rounded-lg border border-white/5">
                {BOOK_SPREADS.map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => goToSpread(sp.id, 'left')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      spreadIdx === sp.id
                        ? 'bg-amber-300 text-stone-950 shadow-sm'
                        : 'text-stone-400 hover:text-stone-100'
                    }`}
                  >
                    {sp.shortLabel}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  spreadIdx === BOOK_SPREADS.length - 1 &&
                  (viewMode === 'spread' || singleSide === 'right')
                }
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-35 text-xs font-semibold text-stone-100 cursor-pointer whitespace-nowrap shrink-0"
                title="Halaman Seterusnya (→)"
              >
                <span className="hidden sm:inline">Seterusnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Controls: View Mode (Spread vs Single Page), Camera Angle, Pop-Up & Sound */}
            <div className="flex items-center gap-1.5 ml-auto">
              {/* Spread vs Single Full-Height Page Switcher */}
              <div className="hidden md:flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-white/5">
                <button
                  type="button"
                  onClick={() => setViewMode('spread')}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                    viewMode === 'spread'
                      ? 'bg-stone-700 text-white'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Hamparan Buku 2 Muka Surat"
                >
                  <Columns2 className="w-3 h-3" />
                  <span>Hamparan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('single')}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                    viewMode === 'single'
                      ? 'bg-stone-700 text-white'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Paparan Satu Muka Surat Penuh"
                >
                  <RectangleVertical className="w-3 h-3" />
                  <span>Satu Muka</span>
                </button>
              </div>

              {/* Left/Right Page Toggle when in Single Page Mode on Spreads 1-6 */}
              {viewMode === 'single' && spreadIdx > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    paperSound.playPageFlip();
                    setSingleSide((s) => (s === 'left' ? 'right' : 'left'));
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] font-semibold text-amber-300 cursor-pointer whitespace-nowrap shrink-0"
                >
                  {singleSide === 'left' ? 'Muka Kiri · Ke Kanan →' : '← Muka Kanan'}
                </button>
              )}

              {/* 3D Camera Presets */}
              <div className="hidden sm:flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-white/5">
                {(
                  [
                    ['popup', '3D Pop-Up'],
                    ['front', 'Hadapan'],
                    ['top', 'Atas'],
                  ] as [CameraPreset, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => applyCameraPreset(key)}
                    className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                      activePreset === key
                        ? 'bg-stone-700 text-amber-200'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Pop-Up Diorama Stand Toggle */}
              <button
                type="button"
                onClick={() => {
                  paperSound.playFlap();
                  setPopUpActive((p) => !p);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  popUpActive
                    ? 'bg-lime-400/15 border-lime-400/50 text-lime-300'
                    : 'bg-stone-800 border-stone-700 text-stone-400'
                }`}
                title="Tegakkan atau lipat elemen Pop-Up 3D"
              >
                <Sparkles className="w-3 h-3" />
                <span>Pop-Up</span>
              </button>

              {/* Reset Tilt */}
              <button
                type="button"
                onClick={() => applyCameraPreset('popup')}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer shrink-0"
                title="Set semula sudut kamera 3D"
                aria-label="Set semula sudut kamera 3D"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Sound Effects Mute/Unmute */}
              <button
                type="button"
                onClick={toggleSound}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer shrink-0"
                title={soundMuted ? 'Aktifkan bunyi kertas' : 'Senyapkan bunyi kertas'}
                aria-label={soundMuted ? 'Aktifkan bunyi kertas' : 'Senyapkan bunyi kertas'}
              >
                {soundMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                )}
              </button>
            </div>
          </div>
        )}
      </footer>

      {/* Modals */}
      <QrPreviewModal payload={qrModal} onClose={() => setQrModal(null)} />
      <OriginalPhotoModal
        isOpen={photoModalOpen}
        spreadIndex={spreadIdx}
        onSelectSpread={(idx) => goToSpread(idx, 'left')}
        onClose={() => setPhotoModalOpen(false)}
      />
    </div>
  );
}
