// Constants untuk aplikasi - Clean Code Practice
// Memisahkan data konfigurasi dari logika bisnis

export const ROUTES = {
  "Jakarta-Bandung": {
    from: "Jakarta",
    to: "Bandung",
    price: 100000,
    duration: "3h 30m",
    distance: "150 km",
  },
  "Jakarta-Yogyakarta": {
    from: "Jakarta",
    to: "Yogyakarta",
    price: 150000,
    duration: "7h 45m",
    distance: "560 km",
  },
  "Jakarta-Surabaya": {
    from: "Jakarta",
    to: "Surabaya",
    price: 200000,
    duration: "10h 15m",
    distance: "730 km",
  },
  "Surabaya-Malang": {
    from: "Surabaya",
    to: "Malang",
    price: 75000,
    duration: "2h 15m",
    distance: "90 km",
  },
  "Bandung-Cirebon": {
    from: "Bandung",
    to: "Cirebon",
    price: 80000,
    duration: "2h 45m",
    distance: "130 km",
  },
  "Yogyakarta-Solo": {
    from: "Yogyakarta",
    to: "Solo",
    price: 50000,
    duration: "1h 30m",
    distance: "65 km",
  },
} as const

export const CLASSES = {
  Ekonomi: {
    multiplier: 1.0,
    description: "Kursi standar dengan fasilitas dasar",
    features: ["AC", "Toilet", "Kursi Standar"],
  },
  Bisnis: {
    multiplier: 1.5,
    description: "Kursi lebih nyaman dengan makanan ringan",
    features: ["AC", "Toilet", "Kursi Reclining", "Snack", "Selimut"],
  },
  Eksekutif: {
    multiplier: 2.0,
    description: "Kursi premium dengan layanan lengkap",
    features: ["AC", "Toilet", "Kursi Premium", "Makanan", "Entertainment", "WiFi"],
  },
} as const

export const BOOKING_STEPS = [
  { key: "route", label: "Pilih Rute", description: "Pilih rute perjalanan yang diinginkan" },
  { key: "class", label: "Pilih Kelas", description: "Pilih kelas kereta sesuai kebutuhan Anda" },
  { key: "passenger", label: "Data Penumpang", description: "Masukkan data penumpang dengan lengkap" },
  { key: "payment", label: "Konfirmasi", description: "Periksa kembali data pemesanan Anda" },
  { key: "confirmation", label: "Selesai", description: "Tiket Anda telah berhasil dipesan" },
] as const

export const VALIDATION_RULES = {
  passengerName: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    pattern: /^(\+62|62|0)[0-9]{9,13}$/,
    minLength: 10,
    maxLength: 15,
  },
} as const

export const ERROR_MESSAGES = {
  ROUTE_REQUIRED: "Rute harus dipilih",
  CLASS_REQUIRED: "Kelas harus dipilih",
  NAME_REQUIRED: "Nama penumpang harus diisi",
  NAME_INVALID: "Nama hanya boleh berisi huruf dan spasi",
  EMAIL_REQUIRED: "Email harus diisi",
  EMAIL_INVALID: "Format email tidak valid",
  PHONE_REQUIRED: "Nomor telepon harus diisi",
  PHONE_INVALID: "Format nomor telepon tidak valid",
  DATE_REQUIRED: "Tanggal keberangkatan harus dipilih",
  DATE_INVALID: "Tanggal keberangkatan tidak boleh di masa lalu",
  SYSTEM_ERROR: "Terjadi kesalahan sistem, silakan coba lagi",
} as const

export const APP_CONFIG = {
  name: "RailBooker",
  version: "1.0.0",
  description: "Platform pemesanan tiket kereta api terpercaya di Indonesia",
  author: "Sabrina Nur Afifah",
  nim: "2211104046",
  class: "SE06-2",
  github: "https://github.com/Brinaafifh",
  supportEmail: "info@railbooker.com",
  supportPhone: "(021) 123-4567",
  supportWhatsApp: "+62 812-3456-7890",
} as const
