import React, { useState } from 'react';
import { Sparkles, ExternalLink, RotateCw } from 'lucide-react';
import { CropRect } from '../data/bookContent';
import { paperSound } from '../utils/sound';

// 1. Pixel-accurate crop viewer for original scrapbook QR codes, illustrated maps & photos
interface CroppedAssetProps {
  src: string;
  crop: CropRect;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const CroppedScrapbookAsset: React.FC<CroppedAssetProps> = ({
  src,
  crop,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-stone-800 text-stone-200 p-3 text-center text-xs font-medium ${className}`}
      >
        <Sparkles className="w-5 h-5 mb-1 text-amber-300" />
        <span>{fallbackLabel || alt}</span>
      </div>
    );
  }

  const scaleW = 10000 / crop.w;
  const scaleH = 10000 / crop.h;
  const leftPct = -(crop.x / crop.w) * 100;
  const topPct = -(crop.y / crop.h) * 100;

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        draggable={false}
        style={{
          position: 'absolute',
          width: `${scaleW}%`,
          height: `${scaleH}%`,
          maxWidth: 'none',
          left: `${leftPct}%`,
          top: `${topPct}%`,
        }}
      />
    </div>
  );
};

// 2. Handcrafted Cut-Out Scrapbook Word (Arched or Straight, White Sticker Die-Cut Border)
interface CutoutWordProps {
  text: string;
  palette: string[];
  archIntensity?: number; // degrees/pixels of curve
  sizeClass?: string;
  flagPattern?: boolean; // For MALAYSIA Jalur Gemilang pattern on cover
  className?: string;
  zDepth?: number;
}

export const CutoutWord: React.FC<CutoutWordProps> = ({
  text,
  palette,
  archIntensity = 8,
  sizeClass = 'text-2xl sm:text-3xl',
  flagPattern = false,
  className = '',
  zDepth = 22,
}) => {
  const chars = text.split('');
  const mid = (chars.length - 1) / 2;

  return (
    <div
      className={`inline-flex items-center justify-center gap-0.5 sm:gap-1 select-none preserve-3d ${className}`}
      style={{ transform: `translateZ(${zDepth}px)` }}
      aria-label={text}
    >
      {chars.map((ch, idx) => {
        if (ch === ' ') {
          return <span key={idx} className="w-2 sm:w-3" />;
        }
        const norm = mid === 0 ? 0 : (idx - mid) / mid; // -1 to 1
        const yOffset = norm * norm * archIntensity;
        const rot = norm * (archIntensity * 1.15);
        const bgColor = palette[idx % palette.length];

        return (
          <span
            key={idx}
            aria-hidden="true"
            style={{
              transform: `translateY(${yOffset.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`,
            }}
            className="inline-block bg-white p-[2.5px] rounded-md shadow-[0_3px_0_#d1d5db,0_8px_14px_rgba(0,0,0,0.65)] transition-transform duration-200 hover:-translate-y-1"
          >
            <span
              style={
                flagPattern
                  ? {
                      backgroundImage:
                        idx % 2 === 0
                          ? 'repeating-linear-gradient(135deg, #dc2626 0px, #dc2626 5px, #ffffff 5px, #ffffff 10px)'
                          : 'linear-gradient(135deg, #1d4ed8 0%, #1d4ed8 48%, #facc15 48%, #dc2626 78%, #ffffff 78%)',
                    }
                  : { backgroundColor: bgColor }
              }
              className={`block px-1.5 sm:px-2 py-0.5 rounded-[4px] border-2 border-stone-950 font-display font-extrabold leading-none tracking-tight text-stone-950 ${sizeClass}`}
            >
              <span
                className={
                  flagPattern
                    ? 'drop-shadow-[0_1px_0_rgba(255,255,255,0.95)] text-stone-950'
                    : ''
                }
              >
                {ch}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
};

// 3. Pertanian Green Rounded Letter Tiles (P E R T | A N I A N)
export const GreenLetterTiles: React.FC<{ letters: string[]; colors: string[] }> = ({
  letters,
  colors,
}) => {
  return (
    <div
      className="flex items-center justify-between gap-1.5 sm:gap-2 px-1 select-none preserve-3d"
      style={{ transform: 'translateZ(20px)' }}
    >
      {letters.map((letter, idx) => (
        <div
          key={idx}
          style={{ transform: `rotate(${idx % 2 === 0 ? -2.5 : 2.5}deg)` }}
          className="bg-[#5dbb3c] p-1 sm:p-1.5 rounded-2xl border-2 border-[#397c21] shadow-[0_3px_0_#2b5e18,0_8px_14px_rgba(0,0,0,0.55)]"
        >
          <div className="bg-[#d9f3c4] px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#8fd16a]">
            <span
              style={{ color: colors[idx % colors.length] }}
              className="font-display font-extrabold text-xl sm:text-2xl leading-none drop-shadow-[0_1.5px_0_#111]"
            >
              {letter}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Interactive Black Cardstock Envelope Pocket with White/Blue Hand-Drawn Stitching
interface StitchedPocketProps {
  label: string;
  summaryText: string;
  targetSpreadId: number;
  onJumpSpread: (spreadId: number) => void;
}

export const StitchedPocket: React.FC<StitchedPocketProps> = ({
  label,
  summaryText,
  targetSpreadId,
  onJumpSpread,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePocket = () => {
    paperSound.playFlap();
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="relative w-full preserve-3d select-none"
      style={{ transform: 'translateZ(18px)' }}
    >
      {/* Pull-out Mission Card inside the pocket */}
      <div
        className={`transition-all duration-300 ease-out mx-auto w-[90%] rounded-t-lg bg-amber-50 border-2 border-amber-300 px-2.5 py-2 text-stone-900 shadow-lg ${
          isOpen
            ? '-translate-y-3 opacity-100 max-h-36 pointer-events-auto'
            : 'translate-y-4 opacity-0 max-h-0 overflow-hidden pointer-events-none'
        }`}
      >
        <p className="text-[11px] leading-snug font-medium text-stone-800">{summaryText}</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            paperSound.playPageFlip();
            onJumpSpread(targetSpreadId);
          }}
          className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-lime-600 hover:bg-lime-700 text-white text-[10px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Buka Halaman {label}</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Main Black Stitched Envelope Body */}
      <button
        type="button"
        onClick={togglePocket}
        aria-expanded={isOpen}
        className="group relative w-full h-24 sm:h-28 rounded-md bg-[#1a1c20] border-2 border-dashed border-sky-200/75 shadow-[0_4px_0_#0b0c0e,0_12px_20px_rgba(0,0,0,0.68)] flex flex-col items-center justify-end pb-3.5 px-2 cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-lime-400"
      >
        {/* Top Triangular Stitched V-Flap */}
        <div
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top center',
            transform: isOpen ? 'rotateX(155deg)' : 'rotateX(0deg)',
          }}
          className="absolute top-0 inset-x-0 h-11 bg-[#23262d] border-t border-sky-200/60 transition-transform duration-300 shadow-md flex items-start justify-center pt-1"
        >
          <svg viewBox="0 0 200 50" className="w-full h-full overflow-visible pointer-events-none">
            <polyline
              points="6,4 100,44 194,4"
              fill="none"
              stroke="rgba(186,230,253,0.8)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Lime-green hand-marker sector title */}
        <span className="font-display font-extrabold tracking-wide text-sm sm:text-base text-[#a3e635] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          {label}
        </span>
        <span className="text-[10px] text-sky-200/70 mt-0.5 group-hover:text-lime-300 transition-colors">
          {isOpen ? 'Tutup poket ▴' : 'Klik buka poket ▾'}
        </span>
      </button>
    </div>
  );
};

// 5. Standing 3D Hinged Paper Pop-Up Diorama Stage
interface PopUpDioramaStageProps {
  imageSrc: string;
  caption: string;
  accentColor?: string;
  popUpActive: boolean;
}

export const PopUpDioramaStage: React.FC<PopUpDioramaStageProps> = ({
  imageSrc,
  caption,
  accentColor = 'border-amber-200',
  popUpActive,
}) => {
  const [folded, setFolded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const isStanding = popUpActive && !folded;

  return (
    <div
      className="relative w-full preserve-3d select-none my-1"
      style={{ transform: 'translateZ(26px)' }}
    >
      {/* Base shadow crease on page */}
      <div className="relative rounded-xl bg-stone-950/90 p-1.5 border border-white/15 shadow-inner">
        <div
          style={{
            transformOrigin: 'bottom center',
            transform: isStanding
              ? 'perspective(900px) rotateX(12deg) translateZ(18px) translateY(-4px)'
              : 'perspective(900px) rotateX(0deg) translateZ(2px)',
          }}
          className={`relative rounded-lg overflow-hidden border-[3px] bg-stone-900 ${accentColor} shadow-[0_14px_26px_rgba(0,0,0,0.78)] transition-transform duration-500`}
        >
          {!imgErr ? (
            <img
              src={imageSrc}
              alt={caption}
              referrerPolicy="no-referrer"
              onError={() => setImgErr(true)}
              className="w-full aspect-[16/10] object-cover block"
            />
          ) : (
            <div className="w-full aspect-[16/10] bg-gradient-to-br from-stone-800 to-stone-900 flex flex-col items-center justify-center p-4 text-center">
              <Sparkles className="w-6 h-6 text-amber-300 mb-1" />
              <span className="text-xs font-semibold text-stone-200">{caption}</span>
            </div>
          )}

          {/* Subtle gradient scrim + interactive fold toggle */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2.5 py-1.5 flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[11px] font-semibold text-amber-100 truncate">
              Diorama Pop-Up 3D: {caption}
            </span>
            <button
              type="button"
              onClick={() => {
                paperSound.playFlap();
                setFolded((f) => !f);
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-[10px] font-medium text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCw className="w-2.5 h-2.5" />
              <span>{isStanding ? 'Lipat' : 'Tegakkan 3D'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Cute Handcrafted SVG Mascots & Stickers (Bee, Bunga Raya, Mushroom House, Garden Sign, Smiling Star)
export const CuteBeeSvg: React.FC<{ className?: string; flip?: boolean }> = ({
  className = 'w-14 h-14',
  flip = false,
}) => (
  <svg
    viewBox="0 0 90 80"
    className={`${className} diecut-sticker ${flip ? '-scale-x-100' : ''}`}
    aria-hidden="true"
  >
    {/* Wings */}
    <ellipse cx="36" cy="22" rx="14" ry="10" transform="rotate(-20 36 22)" fill="#e0f2fe" stroke="#1e293b" strokeWidth="2.5" />
    <ellipse cx="52" cy="21" rx="13" ry="9" transform="rotate(15 52 21)" fill="#f0f9ff" stroke="#1e293b" strokeWidth="2.5" />
    {/* Body */}
    <ellipse cx="46" cy="46" rx="28" ry="20" fill="#facc15" stroke="#1e293b" strokeWidth="3" />
    {/* Stripes */}
    <path d="M30 29 C28 46, 28 52, 30 63" stroke="#1e293b" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M43 26 C41 46, 41 54, 43 66" stroke="#1e293b" strokeWidth="6" fill="none" strokeLinecap="round" />
    {/* Stinger */}
    <polygon points="18,46 9,49 18,52" fill="#1e293b" />
    {/* Eyes & Smile */}
    <circle cx="58" cy="42" r="5" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
    <circle cx="59" cy="42" r="2.3" fill="#0f172a" />
    <circle cx="69" cy="43" r="4.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
    <circle cx="70" cy="43" r="2.1" fill="#0f172a" />
    <path d="M60 51 Q65 56 70 51" fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
    {/* Antennae */}
    <path d="M58 28 Q60 16 66 16" fill="none" stroke="#1e293b" strokeWidth="2.3" strokeLinecap="round" />
    <circle cx="67" cy="16" r="2.5" fill="#1e293b" />
    <path d="M65 30 Q69 19 75 20" fill="none" stroke="#1e293b" strokeWidth="2.3" strokeLinecap="round" />
    <circle cx="76" cy="20" r="2.5" fill="#1e293b" />
  </svg>
);

export const BungaRayaSvg: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg viewBox="0 0 80 80" className={`${className} diecut-sticker`} aria-hidden="true">
    {/* Leaves */}
    <ellipse cx="22" cy="58" rx="14" ry="8" transform="rotate(-30 22 58)" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
    <ellipse cx="58" cy="58" rx="14" ry="8" transform="rotate(30 58 58)" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
    {/* 5 Red Petals */}
    {[0, 72, 144, 216, 288].map((deg) => (
      <ellipse
        key={deg}
        cx="40"
        cy="22"
        rx="13"
        ry="18"
        transform={`rotate(${deg} 40 40)`}
        fill="#ef4444"
        stroke="#991b1b"
        strokeWidth="2"
      />
    ))}
    <circle cx="40" cy="40" r="6" fill="#b91c1c" />
    {/* Stamen */}
    <path d="M40 40 Q48 25 56 18" fill="none" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="57" cy="17" r="3.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
  </svg>
);

export const GardenSignSvg: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 120 120" className={`${className} diecut-sticker`} aria-hidden="true">
    {/* Post */}
    <rect x="50" y="20" width="20" height="88" rx="3" fill="#b47b48" stroke="#6b4423" strokeWidth="3" />
    {/* Board */}
    <rect x="10" y="34" width="100" height="42" rx="6" fill="#eab676" stroke="#7c4d25" strokeWidth="3" />
    <text
      x="60"
      y="62"
      textAnchor="middle"
      fill="#854d27"
      fontWeight="800"
      fontSize="19"
      fontFamily="Bricolage Grotesque, sans-serif"
    >
      GARDEN
    </text>
    {/* Grass */}
    <path
      d="M34 108 L40 93 L47 105 L56 90 L64 105 L73 92 L80 105 L86 96 L88 108 Z"
      fill="#4ade80"
      stroke="#166534"
      strokeWidth="2.5"
    />
  </svg>
);

export const MushroomHouseSvg: React.FC<{ className?: string }> = ({ className = 'w-28 h-28' }) => (
  <svg viewBox="0 0 130 130" className={`${className} diecut-sticker`} aria-hidden="true">
    {/* Grass Base */}
    <ellipse cx="65" cy="112" rx="48" ry="10" fill="#86efac" stroke="#166534" strokeWidth="2.5" />
    {/* Stem House */}
    <path d="M36 62 L32 108 L96 108 L90 62 Z" fill="#fef3c7" stroke="#57534e" strokeWidth="2.5" />
    {/* Mini side mushrooms */}
    <path d="M22 88 L20 108 L36 108 L35 88 Z" fill="#fef3c7" stroke="#57534e" strokeWidth="2" />
    <path d="M12 90 Q27 68 42 90 Z" fill="#f87171" stroke="#7f1d1d" strokeWidth="2" />
    <path d="M92 84 L92 108 L108 108 L106 84 Z" fill="#fef3c7" stroke="#57534e" strokeWidth="2" />
    <path d="M84 86 Q100 64 115 86 Z" fill="#f87171" stroke="#7f1d1d" strokeWidth="2" />
    {/* Main Roof */}
    <path d="M20 65 Q65 18 108 65 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" />
    <circle cx="45" cy="48" r="5" fill="#fff" />
    <circle cx="82" cy="50" r="6" fill="#fff" />
    <circle cx="66" cy="36" r="4.5" fill="#fff" />
    {/* Arched Wooden Door */}
    <path d="M51 108 L51 82 Q64 70 77 82 L77 108 Z" fill="#fdba74" stroke="#7c2d12" strokeWidth="2.5" />
    <circle cx="71" cy="95" r="2" fill="#7c2d12" />
    {/* Roof Dormer Window */}
    <path d="M55 55 Q64 42 73 55 Z" fill="#fef08a" stroke="#78350f" strokeWidth="2.2" />
  </svg>
);

export const SmilingStarSvg: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 64 64" className={`${className} drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]`} aria-hidden="true">
    <polygon
      points="32,4 40,21 59,23 45,36 49,55 32,46 15,55 19,36 5,23 24,21"
      fill="#fef08a"
      stroke="#ffffff"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <circle cx="25" cy="30" r="2.2" fill="#422006" />
    <circle cx="39" cy="30" r="2.2" fill="#422006" />
    <circle cx="21" cy="34" r="2.5" fill="#fca5a5" opacity="0.7" />
    <circle cx="43" cy="34" r="2.5" fill="#fca5a5" opacity="0.7" />
    <path d="M28 35 Q32 39 36 35" fill="none" stroke="#422006" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
