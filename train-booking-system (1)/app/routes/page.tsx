"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Train, MapPin, Clock, ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const ROUTES = {
  "Jakarta-Bandung": { from: "Jakarta", to: "Bandung", price: 100000, duration: "3h 30m", distance: "150 km" },
  "Jakarta-Yogyakarta": { from: "Jakarta", to: "Yogyakarta", price: 150000, duration: "7h 45m", distance: "560 km" },
  "Jakarta-Surabaya": { from: "Jakarta", to: "Surabaya", price: 200000, duration: "10h 15m", distance: "730 km" },
  "Surabaya-Malang": { from: "Surabaya", to: "Malang", price: 75000, duration: "2h 15m", distance: "90 km" },
  "Bandung-Cirebon": { from: "Bandung", to: "Cirebon", price: 80000, duration: "2h 45m", distance: "130 km" },
  "Yogyakarta-Solo": { from: "Yogyakarta", to: "Solo", price: 50000, duration: "1h 30m", distance: "65 km" },
  "Jakarta-Semarang": { from: "Jakarta", to: "Semarang", price: 120000, duration: "5h 30m", distance: "450 km" },
  "Surabaya-Banyuwangi": { from: "Surabaya", to: "Banyuwangi", price: 90000, duration: "4h 15m", distance: "280 km" },
}

export default function RoutesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrigin, setSelectedOrigin] = useState("")

  const filteredRoutes = Object.entries(ROUTES).filter(([key, route]) => {
    const matchesSearch =
      route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.to.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOrigin = selectedOrigin === "" || route.from === selectedOrigin

    return matchesSearch && matchesOrigin
  })

  const origins = [...new Set(Object.values(ROUTES).map((route) => route.from))]

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
          <Badge variant="outline">Daftar Rute</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Daftar Rute Kereta Api</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan rute perjalanan kereta api yang sesuai dengan kebutuhan Anda
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Cari Rute</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">Cari Kota</Label>
                  <Input
                    id="search"
                    placeholder="Masukkan nama kota..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="origin">Kota Asal</Label>
                  <select
                    id="origin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                  >
                    <option value="">Semua Kota</option>
                    {origins.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedOrigin("")
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Reset Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Routes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map(([key, route], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-lg">{route.from}</span>
                      </div>
                      <span className="text-gray-400 text-xl">→</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-lg">{route.to}</span>
                        <MapPin className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {route.distance}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Mulai dari</div>
                          <div className="font-bold text-blue-600 text-lg">
                            Rp {route.price.toLocaleString("id-ID")}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                        <div className="text-center">
                          <div className="font-semibold">Ekonomi</div>
                          <div>Rp {route.price.toLocaleString("id-ID")}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Bisnis</div>
                          <div>Rp {(route.price * 1.5).toLocaleString("id-ID")}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Eksekutif</div>
                          <div>Rp {(route.price * 2).toLocaleString("id-ID")}</div>
                        </div>
                      </div>

                      <Button className="w-full" asChild>
                        <Link href="/booking">Pesan Tiket</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <Train className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Rute Tidak Ditemukan</h3>
              <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter Anda</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Siap Memulai Perjalanan?</h2>
                <p className="text-blue-100 mb-6">Pesan tiket kereta api sekarang dan nikmati perjalanan yang nyaman</p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/booking">
                    <Train className="mr-2 h-5 w-5" />
                    Pesan Tiket Sekarang
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
