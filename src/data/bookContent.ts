import popupPertanianImg from '../assets/images/popup_pertanian_paddy_1793673812214.jpg';
import popupPerindustrianImg from '../assets/images/popup_perindustrian_factory_1793673815028.jpg';
import popupPerdaganganImg from '../assets/images/popup_perdagangan_port_1793673815616.jpg';
import popupPelanconganImg from '../assets/images/popup_pelancongan_landmarks_1793673816921.jpg';

export interface CropRect {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  w: number; // percentage 0-100
  h: number; // percentage 0-100
}

const BASE_URL = import.meta.env.BASE_URL || './';

export const ORIGINAL_PHOTOS = {
  mukaHadapan: `${BASE_URL}assets/aistudio/Muka_hadapan_ebfa7b6c.jpeg`,
  objektif1: `${BASE_URL}assets/aistudio/Objektif_page_1_fa81e0c6.jpeg`,
  objektif2: `${BASE_URL}assets/aistudio/Objektif_page_2_2ff9816c.jpeg`,
  pertanian1: `${BASE_URL}assets/aistudio/Pertanian_page_1_b63b4477.jpeg`,
  pertanian2: `${BASE_URL}assets/aistudio/Pertanian_page_2_24f4b0a2.jpeg`,
  perindustrian1: `${BASE_URL}assets/aistudio/Perindustrian_page_1_b18339e5.jpeg`,
  perindustrian2: `${BASE_URL}assets/aistudio/Perindustrian_page_2_06d5c2cd.jpeg`,
  perdagangan1: `${BASE_URL}assets/aistudio/Perdagangan_page_1_42621766.jpeg`,
  perdagangan2: `${BASE_URL}assets/aistudio/Perdagangan_page_2_249b7ea9.jpeg`,
  pelancongan1: `${BASE_URL}assets/aistudio/Pelancongan_page_1_ed30ca98.jpeg`,
  pelancongan2: `${BASE_URL}assets/aistudio/Pelancongan_page_2_eb2b2dc4.jpeg`,
  akhir1: `${BASE_URL}assets/aistudio/Halaman_akhir_page_1_3b0f3c27.jpeg`,
  akhir2: `${BASE_URL}assets/aistudio/Halaman_akhir_page_2_9bb9ffd3.jpeg`,
} as const;

export const POPUP_DIORAMAS = {
  pertanian: popupPertanianImg,
  perindustrian: popupPerindustrianImg,
  perdagangan: popupPerdaganganImg,
  pelancongan: popupPelanconganImg,
} as const;

export const ASSET_CROPS: Record<string, { src: string; crop: CropRect }> = {
  qrUjiMinda: {
    src: ORIGINAL_PHOTOS.objektif1,
    crop: { x: 64.8, y: 41.8, w: 20.2, h: 16.5 },
  },
  paddyBowlPhoto: {
    src: ORIGINAL_PHOTOS.pertanian1,
    crop: { x: 40.8, y: 66.8, w: 25.8, h: 13.2 },
  },
  indCarAssembly: {
    src: ORIGINAL_PHOTOS.perindustrian1,
    crop: { x: 68.8, y: 7.0, w: 16.8, h: 13.5 },
  },
  indMicrochip: {
    src: ORIGINAL_PHOTOS.perindustrian1,
    crop: { x: 86.5, y: 8.4, w: 13.0, h: 11.6 },
  },
  indFoodProcess: {
    src: ORIGINAL_PHOTOS.perindustrian2,
    crop: { x: 4.5, y: 0.8, w: 12.2, h: 13.0 },
  },
  indAppliances: {
    src: ORIGINAL_PHOTOS.perindustrian2,
    crop: { x: 17.2, y: 1.8, w: 18.2, h: 12.8 },
  },
  qrPerindustrian: {
    src: ORIGINAL_PHOTOS.perindustrian2,
    crop: { x: 65.4, y: 2.2, w: 24.0, h: 16.2 },
  },
  oilRigPhoto: {
    src: ORIGINAL_PHOTOS.perindustrian2,
    crop: { x: 43.6, y: 67.2, w: 55.0, h: 30.2 },
  },
  mapSemenanjung: {
    src: ORIGINAL_PHOTOS.pelancongan1,
    crop: { x: 6.5, y: 35.4, w: 76.5, h: 60.6 },
  },
  mapBorneo: {
    src: ORIGINAL_PHOTOS.pelancongan2,
    crop: { x: 7.2, y: 29.8, w: 58.2, h: 63.8 },
  },
  qrMaklumatTambahan: {
    src: ORIGINAL_PHOTOS.akhir1,
    crop: { x: 8.8, y: 3.0, w: 19.8, h: 13.8 },
  },
  qrUjiKehebatan: {
    src: ORIGINAL_PHOTOS.akhir1,
    crop: { x: 56.8, y: 1.8, w: 20.4, h: 13.6 },
  },
};

export interface SpreadMeta {
  id: number;
  shortLabel: string;
  title: string;
  subtitle: string;
  isSingleCover?: boolean;
  originalLeftPhoto: string;
  originalRightPhoto?: string;
}

export const BOOK_SPREADS: SpreadMeta[] = [
  {
    id: 0,
    shortLabel: 'Muka Hadapan',
    title: 'MISI BONGKAR EKONOMI MALAYSIA',
    subtitle: 'Kulit Hadapan Buku Skrap Pop-Up 3D',
    isSingleCover: true,
    originalLeftPhoto: ORIGINAL_PHOTOS.mukaHadapan,
  },
  {
    id: 1,
    shortLabel: 'Objektif',
    title: 'Objektif Pembelajaran & Arahan Misi',
    subtitle: '4 Sektor · 1 Misi · 1 Negara Maju!',
    originalLeftPhoto: ORIGINAL_PHOTOS.objektif1,
    originalRightPhoto: ORIGINAL_PHOTOS.objektif2,
  },
  {
    id: 2,
    shortLabel: 'Pertanian',
    title: 'Sektor 1: Pertanian',
    subtitle: 'Maksud · Kegiatan & Contoh · Sumbangan Kepada Negara',
    originalLeftPhoto: ORIGINAL_PHOTOS.pertanian1,
    originalRightPhoto: ORIGINAL_PHOTOS.pertanian2,
  },
  {
    id: 3,
    shortLabel: 'Perindustrian',
    title: 'Sektor 2: Perindustrian',
    subtitle: 'Maksud · Kanta Rahsia Proton · Sumbangan & Pencapaian',
    originalLeftPhoto: ORIGINAL_PHOTOS.perindustrian1,
    originalRightPhoto: ORIGINAL_PHOTOS.perindustrian2,
  },
  {
    id: 4,
    shortLabel: 'Perdagangan',
    title: 'Sektor 3: Perdagangan',
    subtitle: 'Maksud · Roda Perdagangan · Sumbangan & Pencapaian Ekonomi',
    originalLeftPhoto: ORIGINAL_PHOTOS.perdagangan1,
    originalRightPhoto: ORIGINAL_PHOTOS.perdagangan2,
  },
  {
    id: 5,
    shortLabel: 'Pelancongan',
    title: 'Sektor 4: Pelancongan',
    subtitle: 'Peta Semenanjung · Peta Sarawak & Sabah · Sumbangan & Pencapaian',
    originalLeftPhoto: ORIGINAL_PHOTOS.pelancongan1,
    originalRightPhoto: ORIGINAL_PHOTOS.pelancongan2,
  },
  {
    id: 6,
    shortLabel: 'Uji & Refleksi',
    title: 'Uji Kehebatan & Bintang Refleksi Detektif',
    subtitle: 'Mesin Kapsul Soalan Interaktif · Refleksi Pembelajaran',
    originalLeftPhoto: ORIGINAL_PHOTOS.akhir1,
    originalRightPhoto: ORIGINAL_PHOTOS.akhir2,
  },
];

export const PERTANIAN_TABS = [
  {
    kegiatan: 'Penanaman padi',
    contohLabel: 'Beras & Sawah Padi (Kedah, Perak, Kelantan)',
    useOriginalCrop: true,
    emojiNote: 'Makanan ruji utama rakyat Malaysia.',
  },
  {
    kegiatan: 'Penanaman kelapa sawit',
    contohLabel: 'Buah Kelapa Sawit & Minyak Masak',
    useOriginalCrop: false,
    emojiNote: 'Tanaman komoditi eksport utama negara.',
  },
  {
    kegiatan: 'Penanaman getah & sayur',
    contohLabel: 'Susu Getah, Sayur-sayuran & Buah-buahan',
    useOriginalCrop: false,
    emojiNote: 'Membekalkan bahan mentah industri & makanan segar.',
  },
  {
    kegiatan: 'Penternakan & perikanan',
    contohLabel: 'Ternakan Ayam, Lembu & Hasil Laut',
    useOriginalCrop: false,
    emojiNote: 'Sumber protein segar untuk keperluan tempatan.',
  },
];

export const SEMENANJUNG_LANDMARKS = [
  { id: 'langkawi', name: 'Langkawi', sub: 'Pantai Cenang dan Sky Bridge (Kedah)', x: 22, y: 18 },
  { id: 'alorsetar', name: 'Menara Alor Setar', sub: 'Alor Setar, Kedah', x: 35, y: 24 },
  { id: 'georgetown', name: 'George Town', sub: 'Tapak Warisan Dunia UNESCO (Pulau Pinang)', x: 28, y: 36 },
  { id: 'pcb', name: 'Pantai Cahaya Bulan', sub: 'Kelantan', x: 54, y: 30 },
  { id: 'redang', name: 'Pulau Redang', sub: 'Terengganu', x: 64, y: 42 },
  { id: 'guatempurung', name: 'Gua Tempurung', sub: 'Perak', x: 36, y: 48 },
  { id: 'cameron', name: 'Cameron Highlands', sub: 'Pahang', x: 48, y: 52 },
  { id: 'klcc', name: 'Menara Berkembar Petronas', sub: 'Kuala Lumpur', x: 42, y: 66 },
  { id: 'serimenanti', name: 'Istana Seri Menanti', sub: 'Negeri Sembilan', x: 48, y: 72 },
  { id: 'stadthuys', name: 'Stadthuys & A\'Famosa', sub: 'Melaka Bandaraya Bersejarah', x: 45, y: 79 },
  { id: 'legoland', name: 'Legoland Malaysia', sub: 'Johor', x: 58, y: 86 },
];

export const BORNEO_LANDMARKS = [
  { id: 'kinabalu', name: 'Taman Kinabalu', sub: 'Ranau, Sabah', x: 63, y: 26 },
  { id: 'sipadan', name: 'Pulau Sipadan', sub: 'Tawau, Sabah', x: 82, y: 32 },
  { id: 'masjidsabah', name: 'Masjid Negeri Sabah', sub: 'Kota Kinabalu, Sabah', x: 54, y: 36 },
  { id: 'manukan', name: 'Pulau Manukan', sub: 'Kota Kinabalu, Sabah', x: 50, y: 44 },
  { id: 'semenggoh', name: 'Pusat Pemuliharaan Orang Utan Semenggoh', sub: 'Kuching, Sarawak', x: 34, y: 74 },
  { id: 'bako', name: 'Taman Negara Bako', sub: 'Kuching, Sarawak', x: 38, y: 68 },
  { id: 'rumahpanjang', name: 'Rumah Panjang', sub: 'Sarawak', x: 44, y: 64 },
];

export interface GashaponQuestion {
  id: number;
  question: string; // Exact verbatim Malay from Halaman_akhir_page_1_3b0f3c27.jpeg
  colorClass: string;
  borderClass: string;
  sectorTag: string;
  sampleAnswer: string;
  options: string[];
  correctIndex: number;
}

export const GASHAPON_QUESTIONS: GashaponQuestion[] = [
  {
    id: 1,
    question: 'Namakan satu jenama kereta tempatan di Malaysia.',
    colorClass: 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900',
    borderClass: 'border-slate-300',
    sectorTag: 'Perindustrian',
    sampleAnswer: 'Proton (contoh: Proton Saga, 1985) atau Perodua.',
    options: ['Proton / Perodua', 'Toyota / Honda', 'Ford / Tesla'],
    correctIndex: 0,
  },
  {
    id: 2,
    question: 'Mengapakah kegiatan ekonomi penting kepada negara Malaysia?',
    colorClass: 'bg-gradient-to-br from-orange-100 to-amber-200 text-amber-950',
    borderClass: 'border-amber-300',
    sectorTag: 'Kepentingan Ekonomi',
    sampleAnswer: 'Menjana pendapatan negara, menyediakan peluang pekerjaan kepada rakyat, dan memajukan pembangunan negara.',
    options: [
      'Menjana pendapatan negara & peluang pekerjaan',
      'Mengurangkan jumlah pelancong ke Malaysia',
      'Menghentikan perdagangan antarabangsa',
    ],
    correctIndex: 0,
  },
  {
    id: 3,
    question: 'Namakan satu tempat pelancongan di Malaysia.',
    colorClass: 'bg-gradient-to-br from-teal-100 to-emerald-200 text-teal-950',
    borderClass: 'border-teal-300',
    sectorTag: 'Pelancongan',
    sampleAnswer: 'Pulau Langkawi, Menara Berkembar Petronas, Taman Kinabalu, Pulau Sipadan, George Town, atau Melaka.',
    options: [
      'Menara Berkembar Petronas / Pulau Langkawi',
      'Menara Eiffel, Paris',
      'Gunung Fuji, Tokyo',
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    question: 'Namakan satu hasil pertanian di Malaysia.',
    colorClass: 'bg-gradient-to-br from-sky-200 via-lime-100 to-amber-200 text-slate-900',
    borderClass: 'border-sky-300',
    sectorTag: 'Pertanian',
    sampleAnswer: 'Padi (beras), kelapa sawit, getah, sayur-sayuran, atau buah-buahan tempatan.',
    options: [
      'Padi (beras) dan kelapa sawit',
      'Gandum bersalji dan epal kutub',
      'Bijih besi dan cip mikro',
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    question: 'Apakah maksud eksport?',
    colorClass: 'bg-gradient-to-br from-cyan-100 to-blue-200 text-blue-950',
    borderClass: 'border-blue-300',
    sectorTag: 'Perdagangan',
    sampleAnswer: 'Kegiatan menjual dan menghantar barangan atau perkhidmatan tempatan ke luar negara.',
    options: [
      'Menjual barangan tempatan ke luar negara',
      'Membeli barangan dari luar negara ke dalam negara',
      'Menyimpan barangan di dalam gudang sahaja',
    ],
    correctIndex: 0,
  },
];
