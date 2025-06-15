"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, ArrowLeft, Shield, FileText, Users, Lock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PolicyPage() {
  const policies = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Kebijakan Privasi",
      content: [
        "Kami menghormati privasi pengguna dan berkomitmen melindungi data pribadi Anda.",
        "Data yang dikumpulkan hanya digunakan untuk keperluan pemesanan dan layanan pelanggan.",
        "Kami tidak akan membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan.",
        "Data disimpan dengan sistem keamanan tinggi dan enkripsi yang kuat.",
      ],
    },
    {
      icon: <FileText className="h-6 w-6 text-green-600" />,
      title: "Syarat dan Ketentuan",
      content: [
        "Pengguna harus berusia minimal 17 tahun atau memiliki persetujuan orang tua/wali.",
        "Data yang dimasukkan harus akurat dan sesuai dengan dokumen identitas resmi.",
        "Tiket yang sudah dibeli tidak dapat dipindahtangankan kepada orang lain.",
        "Pengguna bertanggung jawab menjaga kerahasiaan kode booking dan data akun.",
      ],
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Kebijakan Layanan",
      content: [
        "Layanan tersedia 24/7 dengan dukungan customer service di jam kerja.",
        "Kami berhak melakukan maintenance sistem yang akan diinformasikan sebelumnya.",
        "Keluhan dan saran dapat disampaikan melalui berbagai channel yang tersedia.",
        "Kami berkomitmen memberikan layanan terbaik dan terus melakukan perbaikan.",
      ],
    },
    {
      icon: <Lock className="h-6 w-6 text-red-600" />,
      title: "Keamanan Data",
      content: [
        "Semua transaksi menggunakan protokol keamanan SSL/TLS.",
        "Data kartu kredit tidak disimpan di server kami dan langsung diproses oleh payment gateway.",
        "Sistem dilengkapi dengan firewall dan monitoring keamanan 24/7.",
        "Backup data dilakukan secara berkala untuk mencegah kehilangan data.",
      ],
    },
  ]

  const terms = [
    {
      title: "Pemesanan Tiket",
      items: [
        "Pemesanan dapat dilakukan maksimal 90 hari sebelum keberangkatan",
        "Minimal pemesanan adalah 2 jam sebelum keberangkatan",
        "Satu akun dapat memesan maksimal 4 tiket per transaksi",
        "Data penumpang harus sesuai dengan identitas yang akan digunakan",
      ],
    },
    {
      title: "Pembayaran",
      items: [
        "Pembayaran harus diselesaikan dalam 2 jam setelah pemesanan",
        "Harga tiket sudah termasuk pajak dan tidak ada biaya tersembunyi",
        "Refund akan diproses sesuai dengan kebijakan pembatalan",
        "Bukti pembayaran harus disimpan sebagai referensi",
      ],
    },
    {
      title: "Pembatalan",
      items: [
        "Pembatalan dapat dilakukan minimal 4 jam sebelum keberangkatan",
        "Biaya administrasi pembatalan sebesar 10% dari harga tiket",
        "Refund akan diproses dalam 3-7 hari kerja",
        "Pembatalan karena force majeure akan ditangani secara khusus",
      ],
    },
    {
      title: "Perjalanan",
      items: [
        "Penumpang harus hadir di stasiun minimal 30 menit sebelum keberangkatan",
        "Wajib membawa tiket dan identitas yang sesuai dengan data pemesanan",
        "Bagasi berlebih akan dikenakan biaya tambahan sesuai tarif berlaku",
        "Dilarang membawa barang berbahaya dan terlarang",
      ],
    },
  ]

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
          <Badge variant="outline">Kebijakan</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kebijakan & Ketentuan</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Informasi penting mengenai kebijakan privasi, syarat dan ketentuan penggunaan layanan RailBooker
            </p>
          </motion.div>

          {/* Policy Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {policy.icon}
                      <span>{policy.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {policy.content.map((item, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Syarat dan Ketentuan Lengkap</CardTitle>
                <CardDescription>Ketentuan detail yang berlaku untuk semua layanan RailBooker</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {terms.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          {index + 1}
                        </span>
                        {section.title}
                      </h3>
                      <ul className="space-y-2 ml-9">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-center mb-6">Informasi Kontak</h2>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-blue-600">12sabrinaafifah@gmail.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Telepon</h3>
                    <p className="text-blue-600">(425) 555-1313</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">WhatsApp</h3>
                    <p className="text-blue-600">088227334718</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center"
          >
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Kebijakan ini terakhir diperbarui pada: <strong>1 Januari 2025</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Kami berhak mengubah kebijakan ini sewaktu-waktu. Perubahan akan diinformasikan melalui website dan
                  email terdaftar.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/contact">Ada Pertanyaan? Hubungi Kami</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
