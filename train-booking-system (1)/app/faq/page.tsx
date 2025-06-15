"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Train, ArrowLeft, Search, ChevronDown, ChevronRight, HelpCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const FAQ_DATA = [
  {
    category: "Pemesanan Tiket",
    questions: [
      {
        question: "Bagaimana cara memesan tiket kereta api?",
        answer:
          "Untuk memesan tiket, klik tombol 'Pesan Tiket' di halaman utama, pilih rute perjalanan, pilih kelas kereta, isi data penumpang, dan konfirmasi pembayaran. Anda akan mendapatkan kode booking setelah pembayaran berhasil.",
      },
      {
        question: "Apakah bisa memesan tiket untuk orang lain?",
        answer:
          "Ya, Anda bisa memesan tiket untuk orang lain. Pastikan data penumpang yang diisi sesuai dengan identitas yang akan digunakan saat perjalanan.",
      },
      {
        question: "Berapa lama sebelum keberangkatan saya bisa memesan tiket?",
        answer:
          "Anda bisa memesan tiket hingga 2 jam sebelum keberangkatan untuk pemesanan online. Untuk pemesanan di hari yang sama, disarankan datang langsung ke stasiun.",
      },
      {
        question: "Apakah ada biaya tambahan untuk pemesanan online?",
        answer:
          "Tidak ada biaya tambahan untuk pemesanan online. Harga yang ditampilkan sudah final dan sesuai dengan tarif resmi kereta api.",
      },
    ],
  },
  {
    category: "Pembayaran",
    questions: [
      {
        question: "Metode pembayaran apa saja yang tersedia?",
        answer:
          "Kami menerima pembayaran melalui transfer bank, kartu kredit/debit, e-wallet (GoPay, OVO, DANA), dan virtual account dari berbagai bank.",
      },
      {
        question: "Apakah pembayaran aman?",
        answer:
          "Ya, semua transaksi pembayaran menggunakan enkripsi SSL dan bekerja sama dengan payment gateway terpercaya untuk menjamin keamanan data Anda.",
      },
      {
        question: "Berapa lama batas waktu pembayaran?",
        answer:
          "Batas waktu pembayaran adalah 2 jam setelah pemesanan dibuat. Jika tidak dibayar dalam waktu tersebut, pemesanan akan otomatis dibatalkan.",
      },
    ],
  },
  {
    category: "Pembatalan & Refund",
    questions: [
      {
        question: "Bagaimana cara membatalkan tiket?",
        answer:
          "Untuk membatalkan tiket, kunjungi halaman 'Batalkan Tiket', masukkan kode booking dan email yang digunakan saat pemesanan, lalu ikuti instruksi selanjutnya.",
      },
      {
        question: "Apakah ada biaya pembatalan?",
        answer:
          "Ya, ada biaya administrasi pembatalan sebesar 10% dari harga tiket. Pembatalan harus dilakukan minimal 4 jam sebelum keberangkatan.",
      },
      {
        question: "Berapa lama proses refund?",
        answer:
          "Proses refund akan diproses dalam 3-7 hari kerja setelah pembatalan disetujui, tergantung metode pembayaran yang digunakan.",
      },
      {
        question: "Apakah bisa mengubah jadwal perjalanan?",
        answer:
          "Ya, Anda bisa mengubah jadwal perjalanan dengan menghubungi customer service. Perubahan jadwal dikenakan biaya administrasi dan selisih harga tiket jika ada.",
      },
    ],
  },
  {
    category: "Perjalanan",
    questions: [
      {
        question: "Dokumen apa yang perlu dibawa saat perjalanan?",
        answer:
          "Anda perlu membawa tiket (cetak atau digital) dan kartu identitas yang sesuai dengan data pemesanan (KTP/SIM/Paspor).",
      },
      {
        question: "Berapa batas bagasi yang diperbolehkan?",
        answer:
          "Setiap penumpang diperbolehkan membawa bagasi kabin maksimal 7kg dan bagasi besar maksimal 20kg. Bagasi berlebih akan dikenakan biaya tambahan.",
      },
      {
        question: "Apakah ada fasilitas makanan di kereta?",
        answer:
          "Ya, tersedia layanan katering di kereta untuk kelas Bisnis dan Eksekutif. Untuk kelas Ekonomi, Anda bisa membeli makanan dari pedagang yang naik di stasiun-stasiun tertentu.",
      },
      {
        question: "Bagaimana jika terlambat naik kereta?",
        answer:
          "Jika terlambat naik kereta, tiket akan hangus dan tidak bisa direfund. Pastikan tiba di stasiun minimal 30 menit sebelum keberangkatan.",
      },
    ],
  },
  {
    category: "Teknis",
    questions: [
      {
        question: "Bagaimana jika lupa kode booking?",
        answer:
          "Jika lupa kode booking, Anda bisa menghubungi customer service dengan menyebutkan nama penumpang, rute, dan tanggal perjalanan untuk bantuan pencarian tiket.",
      },
      {
        question: "Apakah bisa akses website dari mobile?",
        answer:
          "Ya, website RailBooker sudah responsive dan bisa diakses dengan baik dari smartphone, tablet, maupun desktop.",
      },
      {
        question: "Bagaimana jika website error saat pemesanan?",
        answer:
          "Jika mengalami error, coba refresh halaman atau clear cache browser. Jika masih bermasalah, hubungi customer service untuk bantuan.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQ = FAQ_DATA.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  })).filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Train className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RailBooker</span>
            </div>
          </div>
          <Badge variant="outline">FAQ</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan seputar layanan RailBooker
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Cari Pertanyaan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Ketik kata kunci untuk mencari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {filteredFAQ.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {category.questions.map((faq, faqIndex) => {
                    const itemId = `${categoryIndex}-${faqIndex}`
                    const isOpen = openItems.includes(itemId)

                    return (
                      <Collapsible key={faqIndex}>
                        <CollapsibleTrigger
                          className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => toggleItem(itemId)}
                        >
                          <span className="font-medium">{faq.question}</span>
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-3 text-gray-600 bg-white border-l-4 border-blue-200 ml-4">
                          {faq.answer}
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  })}
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {filteredFAQ.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Pertanyaan Tidak Ditemukan</h3>
              <p className="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
            </motion.div>
          )}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                <h2 className="text-2xl font-bold mb-4">Tidak Menemukan Jawaban?</h2>
                <p className="text-blue-100 mb-6">Tim customer service kami siap membantu Anda 24/7</p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Hubungi Customer Service</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
