"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Train, ArrowLeft, Clock, MapPin, Calendar, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const SCHEDULE_DATA = [
  {
    trainName: "Argo Bromo Anggrek",
    trainNumber: "KA 1",
    route: "Jakarta - Surabaya",
    departure: "07:00",
    arrival: "17:15",
    duration: "10h 15m",
    class: ["Eksekutif", "Bisnis"],
    status: "On Time",
  },
  {
    trainName: "Parahyangan",
    trainNumber: "KA 2",
    route: "Jakarta - Bandung",
    departure: "06:30",
    arrival: "10:00",
    duration: "3h 30m",
    class: ["Eksekutif", "Bisnis", "Ekonomi"],
    status: "On Time",
  },
  {
    trainName: "Taksaka",
    trainNumber: "KA 3",
    route: "Jakarta - Yogyakarta",
    departure: "08:00",
    arrival: "15:45",
    duration: "7h 45m",
    class: ["Eksekutif", "Bisnis"],
    status: "Delayed 15 min",
  },
  {
    trainName: "Malioboro Express",
    trainNumber: "KA 4",
    route: "Yogyakarta - Solo",
    departure: "09:15",
    arrival: "10:45",
    duration: "1h 30m",
    class: ["Eksekutif", "Ekonomi"],
    status: "On Time",
  },
  {
    trainName: "Mutiara Timur",
    trainNumber: "KA 5",
    route: "Surabaya - Malang",
    departure: "14:30",
    arrival: "16:45",
    duration: "2h 15m",
    class: ["Bisnis", "Ekonomi"],
    status: "On Time",
  },
  {
    trainName: "Ciremai Express",
    trainNumber: "KA 6",
    route: "Bandung - Cirebon",
    departure: "11:00",
    arrival: "13:45",
    duration: "2h 45m",
    class: ["Eksekutif", "Bisnis", "Ekonomi"],
    status: "On Time",
  },
]

export default function SchedulePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const filteredSchedule = SCHEDULE_DATA.filter(
    (train) =>
      train.trainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    if (status === "On Time") return "bg-green-100 text-green-800"
    if (status.includes("Delayed")) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

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
          <Badge variant="outline">Jadwal Kereta</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Jadwal Kereta Api</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cek jadwal keberangkatan dan kedatangan kereta api secara real-time
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Cari Jadwal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="search">Cari Kereta/Rute</Label>
                    <Input
                      id="search"
                      placeholder="Nama kereta atau rute..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Tanggal</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedDate(new Date().toISOString().split("T")[0])
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Schedule List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {filteredSchedule.map((train, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      {/* Train Info */}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{train.trainName}</h3>
                        <p className="text-sm text-gray-600">{train.trainNumber}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-600">{train.route}</span>
                        </div>
                      </div>

                      {/* Time Info */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-4">
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{train.departure}</div>
                            <div className="text-xs text-gray-500">Berangkat</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div className="text-xs text-gray-500">{train.duration}</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">{train.arrival}</div>
                            <div className="text-xs text-gray-500">Tiba</div>
                          </div>
                        </div>
                      </div>

                      {/* Class Info */}
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Kelas Tersedia:</div>
                        <div className="flex flex-wrap gap-1">
                          {train.class.map((cls, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Status and Action */}
                      <div className="text-center">
                        <Badge className={`mb-3 ${getStatusColor(train.status)}`}>{train.status}</Badge>
                        <Button className="w-full" size="sm" asChild>
                          <Link href="/booking">Pesan Tiket</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredSchedule.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <Train className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Jadwal Tidak Ditemukan</h3>
              <p className="text-gray-500">Coba ubah kata kunci pencarian atau tanggal</p>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Jadwal Real-time</h3>
                    <p className="text-sm text-gray-600">Informasi jadwal yang selalu update</p>
                  </div>
                  <div>
                    <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Status Terkini</h3>
                    <p className="text-sm text-gray-600">Pantau status keberangkatan secara langsung</p>
                  </div>
                  <div>
                    <Train className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Booking Langsung</h3>
                    <p className="text-sm text-gray-600">Pesan tiket langsung dari jadwal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
