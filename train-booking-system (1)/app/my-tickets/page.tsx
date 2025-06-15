"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Train, ArrowLeft, Ticket, Calendar, MapPin, User, Download, Eye, XCircle, Printer } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TicketData {
  id: string
  bookingCode: string
  passengerName: string
  route: string
  class: string
  travelDate: string
  totalPrice: number
  status: "confirmed" | "cancelled" | "completed"
  bookingDate: string
  trainName: string
  departureTime: string
  arrivalTime: string
  seatNumber: string
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulasi load tiket dari localStorage atau database
  useEffect(() => {
    const loadTickets = () => {
      // Dalam implementasi nyata, ini akan fetch dari API/database
      const savedTickets = localStorage.getItem("userTickets")
      if (savedTickets) {
        setTickets(JSON.parse(savedTickets))
      }
      setIsLoading(false)
    }

    setTimeout(loadTickets, 1000) // Simulasi loading
  }, [])

  const handleCancelTicket = async (ticketId: string) => {
    if (!confirm("Apakah Anda yakin ingin membatalkan tiket ini?")) return

    // Update status tiket
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, status: "cancelled" as const } : ticket,
    )

    setTickets(updatedTickets)
    localStorage.setItem("userTickets", JSON.stringify(updatedTickets))

    alert("Tiket berhasil dibatalkan!")
  }

  const handleDownloadTicket = (ticket: TicketData) => {
    // Simulasi download PDF
    const ticketData = `
RAILBOOKER - E-TICKET
=====================
Kode Booking: ${ticket.bookingCode}
Penumpang: ${ticket.passengerName}
Rute: ${ticket.route}
Kereta: ${ticket.trainName}
Kelas: ${ticket.class}
Tanggal: ${ticket.travelDate}
Berangkat: ${ticket.departureTime}
Tiba: ${ticket.arrivalTime}
Kursi: ${ticket.seatNumber}
Total: Rp ${ticket.totalPrice.toLocaleString("id-ID")}
Status: ${ticket.status}
=====================
Terima kasih telah menggunakan RailBooker
    `

    const blob = new Blob([ticketData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ticket-${ticket.bookingCode}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePrintTicket = (ticket: TicketData) => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 2px solid #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #2563eb; margin: 0;">RAILBOOKER</h2>
          <p style="margin: 5px 0;">E-TICKET</p>
        </div>
        <hr style="border: 1px solid #333; margin: 20px 0;">
        <div style="margin-bottom: 15px;">
          <strong>Kode Booking:</strong> ${ticket.bookingCode}<br>
          <strong>Penumpang:</strong> ${ticket.passengerName}<br>
          <strong>Rute:</strong> ${ticket.route}<br>
          <strong>Kereta:</strong> ${ticket.trainName}<br>
          <strong>Kelas:</strong> ${ticket.class}<br>
          <strong>Tanggal:</strong> ${ticket.travelDate}<br>
          <strong>Berangkat:</strong> ${ticket.departureTime}<br>
          <strong>Tiba:</strong> ${ticket.arrivalTime}<br>
          <strong>Kursi:</strong> ${ticket.seatNumber}<br>
          <strong>Total:</strong> Rp ${ticket.totalPrice.toLocaleString("id-ID")}<br>
          <strong>Status:</strong> ${ticket.status}
        </div>
        <hr style="border: 1px solid #333; margin: 20px 0;">
        <p style="text-align: center; font-size: 12px;">Terima kasih telah menggunakan RailBooker</p>
      </div>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Dikonfirmasi"
      case "cancelled":
        return "Dibatalkan"
      case "completed":
        return "Selesai"
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Train className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Memuat tiket Anda...</p>
        </div>
      </div>
    )
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
          <Badge variant="outline">Tiket Saya</Badge>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tiket Saya</h1>
            <p className="text-xl text-gray-600">Kelola semua tiket kereta api Anda</p>
          </motion.div>

          {/* Tickets List */}
          {tickets.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{tickets.length} Tiket Ditemukan</h2>
              {tickets.map((ticket, index) => (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Ticket className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{ticket.bookingCode}</h3>
                          <p className="text-gray-600">{ticket.trainName}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(ticket.status)}>{getStatusText(ticket.status)}</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Penumpang:</span>
                          <span className="font-medium">{ticket.passengerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Rute:</span>
                          <span className="font-medium">{ticket.route}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Train className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Kelas:</span>
                          <span className="font-medium">{ticket.class}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Tanggal:</span>
                          <span className="font-medium">{ticket.travelDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-sm text-gray-600">Total Harga:</span>
                        <span className="font-bold text-lg text-blue-600 ml-2">
                          Rp {ticket.totalPrice.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Detail Tiket</DialogTitle>
                              <DialogDescription>Informasi lengkap tiket {ticket.bookingCode}</DialogDescription>
                            </DialogHeader>
                            {selectedTicket && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <span className="text-gray-600">Kode Booking:</span>
                                  <span className="font-medium">{selectedTicket.bookingCode}</span>
                                  <span className="text-gray-600">Penumpang:</span>
                                  <span className="font-medium">{selectedTicket.passengerName}</span>
                                  <span className="text-gray-600">Kereta:</span>
                                  <span className="font-medium">{selectedTicket.trainName}</span>
                                  <span className="text-gray-600">Rute:</span>
                                  <span className="font-medium">{selectedTicket.route}</span>
                                  <span className="text-gray-600">Kelas:</span>
                                  <span className="font-medium">{selectedTicket.class}</span>
                                  <span className="text-gray-600">Tanggal:</span>
                                  <span className="font-medium">{selectedTicket.travelDate}</span>
                                  <span className="text-gray-600">Berangkat:</span>
                                  <span className="font-medium">{selectedTicket.departureTime}</span>
                                  <span className="text-gray-600">Tiba:</span>
                                  <span className="font-medium">{selectedTicket.arrivalTime}</span>
                                  <span className="text-gray-600">Kursi:</span>
                                  <span className="font-medium">{selectedTicket.seatNumber}</span>
                                  <span className="text-gray-600">Total:</span>
                                  <span className="font-bold text-blue-600">
                                    Rp {selectedTicket.totalPrice.toLocaleString("id-ID")}
                                  </span>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm" onClick={() => handleDownloadTicket(ticket)}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>

                        <Button variant="outline" size="sm" onClick={() => handlePrintTicket(ticket)}>
                          <Printer className="h-4 w-4 mr-1" />
                          Cetak
                        </Button>

                        {ticket.status === "confirmed" && (
                          <Button variant="destructive" size="sm" onClick={() => handleCancelTicket(ticket.id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Batalkan
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center py-12"
            >
              <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Tiket</h3>
              <p className="text-gray-500 mb-6">Anda belum memiliki tiket yang dipesan</p>
              <Button asChild>
                <Link href="/booking">Pesan Tiket Sekarang</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
