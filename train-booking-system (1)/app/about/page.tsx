"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, ArrowLeft, Users, Shield, Clock, Award, Target, Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Keamanan",
      description: "Kami mengutamakan keamanan data dan transaksi pelanggan dengan teknologi enkripsi terdepan.",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Efisiensi",
      description: "Proses pemesanan yang cepat dan mudah, menghemat waktu berharga Anda.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Pelayanan",
      description: "Tim customer service yang ramah dan siap membantu 24/7.",
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Kualitas",
      description: "Komitmen untuk memberikan layanan terbaik dengan standar kualitas tinggi.",
    },
  ]

  const stats = [
    { number: "100K+", label: "Pengguna Aktif" },
    { number: "50+", label: "Rute Tersedia" },
    { number: "99.9%", label: "Uptime System" },
    { number: "4.8/5", label: "Rating Pengguna" },
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
          <Badge variant="outline">Tentang Kami</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang <span className="text-blue-600">RailBooker</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Platform pemesanan tiket kereta api terpercaya yang menghubungkan perjalanan Anda ke seluruh Indonesia
              dengan mudah, cepat, dan aman.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  <span>Misi Kami</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Menyediakan platform pemesanan tiket kereta api yang mudah digunakan, aman, dan terpercaya untuk
                  memfasilitasi perjalanan masyarakat Indonesia. Kami berkomitmen untuk terus berinovasi dalam
                  memberikan pengalaman terbaik bagi setiap pengguna.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
              <p className="text-gray-600">Prinsip yang menjadi fondasi dalam setiap layanan yang kami berikan</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        {value.icon}
                        <CardTitle className="text-xl">{value.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                <h2 className="text-2xl font-bold mb-4">Tim Pengembang</h2>
                <div className="max-w-2xl mx-auto">
                  <p className="text-blue-100 mb-6">
                    RailBooker dikembangkan sebagai bagian dari Tugas Besar CLO4 dan CLO 2 Konstruksi Perangkat Lunak
                  </p>
                  <div className="bg-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">Sabrina Nur Afifah</h3>
                    <p className="text-blue-200 mb-1">NIM: 2211104046</p>
                    <p className="text-blue-200 mb-4">Kelas: SE-06-2</p>
                    <p className="text-sm text-blue-100">
                      Mahasiswa Rekayasa Perangkat Lunak yang berfokus pada pengembangan aplikasi web dengan menerapkan
                      prinsip-prinsip konstruksi perangkat lunak yang baik.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Bergabunglah dengan Ribuan Pengguna</h2>
                <p className="text-green-100 mb-6">
                  Mulai perjalanan Anda bersama RailBooker dan rasakan kemudahan pemesanan tiket kereta api
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/booking">
                      <Train className="mr-2 h-5 w-5" />
                      Pesan Tiket Sekarang
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100 border-2 border-white"
                    asChild
                  >
                    <Link href="/contact">Hubungi Kami</Link>
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
