"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, MapPin, Clock, Star, Shield, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  const features = [
    {
      icon: <Train className="h-8 w-8 text-blue-600" />,
      title: "Rute Lengkap",
      description: "Tersedia berbagai rute kereta api ke seluruh Indonesia",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Aman & Terpercaya",
      description: "Sistem booking yang aman dengan enkripsi data",
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Booking Cepat",
      description: "Proses pemesanan hanya dalam hitungan menit",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Customer Support",
      description: "Tim support 24/7 siap membantu Anda",
    },
  ]

  const popularRoutes = [
    { from: "Jakarta", to: "Bandung", price: 100000, duration: "3h 30m" },
    { from: "Jakarta", to: "Yogyakarta", price: 150000, duration: "7h 45m" },
    { from: "Surabaya", to: "Malang", price: 75000, duration: "2h 15m" },
    { from: "Bandung", to: "Cirebon", price: 80000, duration: "2h 45m" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Train className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">RailBooker</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <Link href="/routes" className="text-gray-600 hover:text-blue-600 transition-colors">
              Rute
            </Link>
            <Link href="/my-tickets" className="text-gray-600 hover:text-blue-600 transition-colors">
              Tiket Saya
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              Tentang
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Kontak
            </Link>
          </nav>
          <Button asChild>
            <Link href="/booking">Pesan Tiket</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="secondary" className="mb-4">
              <Star className="h-4 w-4 mr-1" />
              Platform Booking Terpercaya
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Pesan Tiket
              <span className="text-blue-600 block">Kereta Api</span>
              dengan Mudah
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nikmati perjalanan yang nyaman dengan sistem pemesanan tiket kereta api yang cepat, aman, dan terpercaya.
              Tersedia berbagai kelas dan rute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/booking">
                  <Train className="mr-2 h-5 w-5" />
                  Mulai Pesan Tiket
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/routes">
                  <MapPin className="mr-2 h-5 w-5" />
                  Lihat Rute
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih RailBooker?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan layanan terbaik untuk perjalanan kereta api Anda
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Rute Populer</h2>
            <p className="text-xl text-gray-600">Pilihan rute favorit para penumpang</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold">{route.from}</span>
                    </div>
                    <span className="text-gray-400">→</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{route.to}</span>
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{route.duration}</span>
                    </div>
                    <Badge variant="secondary">Rp {route.price.toLocaleString("id-ID")}</Badge>
                  </div>
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/booking">Pesan Sekarang</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Memulai Perjalanan Anda?</h2>
          <p className="text-xl mb-8 opacity-90">Pesan tiket kereta api sekarang dan nikmati perjalanan yang nyaman</p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link href="/booking">
              <Train className="mr-2 h-5 w-5" />
              Pesan Tiket Sekarang
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Train className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">RailBooker</span>
              </div>
              <p className="text-gray-400">Platform pemesanan tiket kereta api terpercaya di Indonesia.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/booking" className="hover:text-white transition-colors">
                    Pesan Tiket
                  </Link>
                </li>
                <li>
                  <Link href="/schedule" className="hover:text-white transition-colors">
                    Cek Jadwal
                  </Link>
                </li>
                <li>
                  <Link href="/my-tickets" className="hover:text-white transition-colors">
                    Tiket Saya
                  </Link>
                </li>
                <li>
                  <Link href="/cancel" className="hover:text-white transition-colors">
                    Batalkan Tiket
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Bantuan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/policy" className="hover:text-white transition-colors">
                    Kebijakan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kontak</h3>
              <div className="text-gray-400 space-y-2">
                <p>Email: 12sabrinaafifah@gmail.com</p>
                <p>Telepon: (425) 555-1313</p>
                <p>WhatsApp: 088227334718</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RailBooker - SE-06-2</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
