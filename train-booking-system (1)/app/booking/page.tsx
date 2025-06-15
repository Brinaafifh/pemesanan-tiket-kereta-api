"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Train,
  MapPin,
  User,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  QrCode,
  Smartphone,
  Building2,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Data dari CLO2 yang sudah ada
const ROUTES = {
  "Jakarta-Bandung": { from: "Jakarta", to: "Bandung", price: 100000, duration: "3h 30m" },
  "Jakarta-Yogyakarta": { from: "Jakarta", to: "Yogyakarta", price: 150000, duration: "7h 45m" },
  "Jakarta-Surabaya": { from: "Jakarta", to: "Surabaya", price: 200000, duration: "10h 15m" },
  "Surabaya-Malang": { from: "Surabaya", to: "Malang", price: 75000, duration: "2h 15m" },
  "Bandung-Cirebon": { from: "Bandung", to: "Cirebon", price: 80000, duration: "2h 45m" },
  "Yogyakarta-Solo": { from: "Yogyakarta", to: "Solo", price: 50000, duration: "1h 30m" },
}

const CLASSES = {
  Ekonomi: { multiplier: 1.0, description: "Kursi standar dengan fasilitas dasar" },
  Bisnis: { multiplier: 1.5, description: "Kursi lebih nyaman dengan makanan ringan" },
  Eksekutif: { multiplier: 2.0, description: "Kursi premium dengan layanan lengkap" },
}

const PAYMENT_METHODS = {
  qris: {
    name: "QRIS",
    icon: <QrCode className="h-6 w-6" />,
    description: "Scan QR Code untuk pembayaran",
    color: "text-purple-600",
  },
  ewallet: {
    name: "E-Wallet",
    icon: <Smartphone className="h-6 w-6" />,
    description: "DANA, GoPay",
    color: "text-green-600",
    options: ["DANA", "GoPay"],
  },
  banking: {
    name: "ATM/Mobile Banking",
    icon: <Building2 className="h-6 w-6" />,
    description: "BRI, BCA, Mandiri, BNI",
    color: "text-blue-600",
    options: ["BRI", "BCA", "Mandiri", "BNI"],
  },
}

type BookingStep = "route" | "class" | "passenger" | "payment" | "payment-detail" | "confirmation"

interface BookingData {
  route: string
  class: string
  passengerName: string
  passengerEmail: string
  passengerPhone: string
  travelDate: string
  paymentMethod: string
  paymentOption: string
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("route")
  const [bookingData, setBookingData] = useState<BookingData>({
    route: "",
    class: "",
    passengerName: "",
    passengerEmail: "",
    passengerPhone: "",
    travelDate: "",
    paymentMethod: "",
    paymentOption: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentTimer, setPaymentTimer] = useState(900) // 15 menit

  const calculateTotalPrice = () => {
    if (!bookingData.route || !bookingData.class) return 0
    const basePrice = ROUTES[bookingData.route as keyof typeof ROUTES]?.price || 0
    const multiplier = CLASSES[bookingData.class as keyof typeof CLASSES]?.multiplier || 1
    return basePrice * multiplier
  }

  const handleNext = () => {
    const steps: BookingStep[] = ["route", "class", "passenger", "payment", "payment-detail", "confirmation"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])

      // Start timer when entering payment-detail step
      if (steps[currentIndex + 1] === "payment-detail") {
        const timer = setInterval(() => {
          setPaymentTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    }
  }

  const handleBack = () => {
    const steps: BookingStep[] = ["route", "class", "passenger", "payment", "payment-detail", "confirmation"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleConfirmPayment = async () => {
    setIsProcessing(true)
    // Simulasi konfirmasi pembayaran
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate ticket data
    const newTicket = {
      id: crypto.randomUUID(),
      bookingCode: `RB${Date.now().toString().slice(-6)}`,
      passengerName: bookingData.passengerName,
      route: `${ROUTES[bookingData.route as keyof typeof ROUTES]?.from} → ${ROUTES[bookingData.route as keyof typeof ROUTES]?.to}`,
      class: bookingData.class,
      travelDate: bookingData.travelDate,
      totalPrice: calculateTotalPrice(),
      status: "confirmed" as const,
      bookingDate: new Date().toISOString().split("T")[0],
      trainName: "Kereta Express",
      departureTime: "08:00",
      arrivalTime: "15:30",
      seatNumber: `${Math.floor(Math.random() * 20) + 1}A`,
      paymentMethod: `${bookingData.paymentMethod}${bookingData.paymentOption ? ` - ${bookingData.paymentOption}` : ""}`,
    }

    // Save to localStorage
    const existingTickets = JSON.parse(localStorage.getItem("userTickets") || "[]")
    existingTickets.push(newTicket)
    localStorage.setItem("userTickets", JSON.stringify(existingTickets))

    setIsProcessing(false)
    setCurrentStep("confirmation")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "route":
        return "Pilih Rute Perjalanan"
      case "class":
        return "Pilih Kelas Kereta"
      case "passenger":
        return "Data Penumpang"
      case "payment":
        return "Pilih Metode Pembayaran"
      case "payment-detail":
        return "Konfirmasi Pembayaran"
      case "confirmation":
        return "Pemesanan Berhasil"
      default:
        return "Pemesanan Tiket"
    }
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
          <Badge variant="outline">{getStepTitle()}</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {["route", "class", "passenger", "payment", "payment-detail", "confirmation"].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step
                        ? "bg-blue-600 text-white"
                        : ["route", "class", "passenger", "payment", "payment-detail", "confirmation"].indexOf(
                              currentStep,
                            ) > index
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {["route", "class", "passenger", "payment", "payment-detail", "confirmation"].indexOf(currentStep) >
                    index ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 5 && (
                    <div
                      className={`w-12 h-1 mx-1 ${
                        ["route", "class", "passenger", "payment", "payment-detail", "confirmation"].indexOf(
                          currentStep,
                        ) > index
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {currentStep === "route" && <MapPin className="h-5 w-5" />}
                  {currentStep === "class" && <Train className="h-5 w-5" />}
                  {currentStep === "passenger" && <User className="h-5 w-5" />}
                  {(currentStep === "payment" || currentStep === "payment-detail") && (
                    <CreditCard className="h-5 w-5" />
                  )}
                  {currentStep === "confirmation" && <CheckCircle className="h-5 w-5" />}
                  <span>{getStepTitle()}</span>
                </CardTitle>
                <CardDescription>
                  {currentStep === "route" && "Pilih rute perjalanan yang diinginkan"}
                  {currentStep === "class" && "Pilih kelas kereta sesuai kebutuhan Anda"}
                  {currentStep === "passenger" && "Masukkan data penumpang dengan lengkap"}
                  {currentStep === "payment" && "Pilih metode pembayaran yang diinginkan"}
                  {currentStep === "payment-detail" && "Lakukan pembayaran sesuai instruksi"}
                  {currentStep === "confirmation" && "Tiket Anda telah berhasil dipesan"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Route Selection */}
                {currentStep === "route" && (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {Object.entries(ROUTES).map(([key, route]) => (
                        <Card
                          key={key}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            bookingData.route === key ? "ring-2 ring-blue-600 bg-blue-50" : ""
                          }`}
                          onClick={() => setBookingData({ ...bookingData, route: key })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
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
                              <div className="text-right">
                                <div className="text-sm text-gray-600">{route.duration}</div>
                                <div className="font-bold text-blue-600">Rp {route.price.toLocaleString("id-ID")}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Class Selection */}
                {currentStep === "class" && (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {Object.entries(CLASSES).map(([key, classInfo]) => (
                        <Card
                          key={key}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            bookingData.class === key ? "ring-2 ring-blue-600 bg-blue-50" : ""
                          }`}
                          onClick={() => setBookingData({ ...bookingData, class: key })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{key}</h3>
                                <p className="text-gray-600 text-sm">{classInfo.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">Multiplier: {classInfo.multiplier}x</div>
                                <div className="font-bold text-blue-600">
                                  Rp{" "}
                                  {(
                                    ROUTES[bookingData.route as keyof typeof ROUTES]?.price * classInfo.multiplier || 0
                                  ).toLocaleString("id-ID")}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Passenger Information */}
                {currentStep === "passenger" && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nama Lengkap *</Label>
                        <Input
                          id="name"
                          value={bookingData.passengerName}
                          onChange={(e) => setBookingData({ ...bookingData, passengerName: e.target.value })}
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingData.passengerEmail}
                          onChange={(e) => setBookingData({ ...bookingData, passengerEmail: e.target.value })}
                          placeholder="contoh@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Nomor Telepon *</Label>
                        <Input
                          id="phone"
                          value={bookingData.passengerPhone}
                          onChange={(e) => setBookingData({ ...bookingData, passengerPhone: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Tanggal Keberangkatan *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingData.travelDate}
                          onChange={(e) => setBookingData({ ...bookingData, travelDate: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Method Selection */}
                {currentStep === "payment" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Ringkasan Pemesanan</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Rute:</span>
                          <span className="font-medium">
                            {ROUTES[bookingData.route as keyof typeof ROUTES]?.from} →{" "}
                            {ROUTES[bookingData.route as keyof typeof ROUTES]?.to}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kelas:</span>
                          <span className="font-medium">{bookingData.class}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Penumpang:</span>
                          <span className="font-medium">{bookingData.passengerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tanggal:</span>
                          <span className="font-medium">{bookingData.travelDate}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-blue-600">Rp {calculateTotalPrice().toLocaleString("id-ID")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Pilih Metode Pembayaran</h3>
                      {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                        <Card
                          key={key}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            bookingData.paymentMethod === key ? "ring-2 ring-blue-600 bg-blue-50" : ""
                          }`}
                          onClick={() => setBookingData({ ...bookingData, paymentMethod: key, paymentOption: "" })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className={method.color}>{method.icon}</div>
                              <div>
                                <h4 className="font-semibold">{method.name}</h4>
                                <p className="text-sm text-gray-600">{method.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Payment Options */}
                    {bookingData.paymentMethod &&
                      PAYMENT_METHODS[bookingData.paymentMethod as keyof typeof PAYMENT_METHODS]?.options && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Pilih Provider</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {PAYMENT_METHODS[bookingData.paymentMethod as keyof typeof PAYMENT_METHODS].options?.map(
                              (option) => (
                                <Card
                                  key={option}
                                  className={`cursor-pointer transition-all hover:shadow-md ${
                                    bookingData.paymentOption === option ? "ring-2 ring-blue-600 bg-blue-50" : ""
                                  }`}
                                  onClick={() => setBookingData({ ...bookingData, paymentOption: option })}
                                >
                                  <CardContent className="p-4 text-center">
                                    <span className="font-medium">{option}</span>
                                  </CardContent>
                                </Card>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* Payment Detail */}
                {currentStep === "payment-detail" && (
                  <div className="space-y-6">
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <span>Selesaikan pembayaran dalam:</span>
                          <span className="font-bold text-red-600">{formatTime(paymentTimer)}</span>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Detail Pembayaran</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Pembayaran:</span>
                          <span className="font-bold text-blue-600 text-lg">
                            Rp {calculateTotalPrice().toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Metode:</span>
                          <span className="font-medium">
                            {PAYMENT_METHODS[bookingData.paymentMethod as keyof typeof PAYMENT_METHODS]?.name}
                            {bookingData.paymentOption && ` - ${bookingData.paymentOption}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Instructions */}
                    <Card className="bg-blue-50">
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4">Instruksi Pembayaran</h4>

                        {bookingData.paymentMethod === "qris" && (
                          <div className="text-center space-y-4">
                            <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center">
                              <QrCode className="h-24 w-24 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">
                              Scan QR Code di atas menggunakan aplikasi pembayaran Anda
                            </p>
                          </div>
                        )}

                        {bookingData.paymentMethod === "ewallet" && (
                          <div className="space-y-3">
                            <p className="text-sm">1. Buka aplikasi {bookingData.paymentOption}</p>
                            <p className="text-sm">2. Pilih menu Transfer/Kirim Uang</p>
                            <p className="text-sm">
                              3. Masukkan nomor:{" "}
                              <span className="font-mono bg-white px-2 py-1 rounded">0812-3456-7890</span>
                            </p>
                            <p className="text-sm">
                              4. Masukkan nominal:{" "}
                              <span className="font-bold">Rp {calculateTotalPrice().toLocaleString("id-ID")}</span>
                            </p>
                            <p className="text-sm">5. Konfirmasi pembayaran</p>
                          </div>
                        )}

                        {bookingData.paymentMethod === "banking" && (
                          <div className="space-y-3">
                            <p className="text-sm">Transfer ke rekening {bookingData.paymentOption}:</p>
                            <div className="bg-white p-3 rounded border">
                              <p className="text-sm">
                                No. Rekening: <span className="font-mono">1234567890</span>
                              </p>
                              <p className="text-sm">
                                Atas Nama: <span className="font-medium">PT RailBooker Indonesia</span>
                              </p>
                              <p className="text-sm">
                                Nominal:{" "}
                                <span className="font-bold">Rp {calculateTotalPrice().toLocaleString("id-ID")}</span>
                              </p>
                            </div>
                            <p className="text-sm text-gray-600">
                              Gunakan kode booking sebagai berita transfer:{" "}
                              <span className="font-mono">RB{Date.now().toString().slice(-6)}</span>
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Setelah melakukan pembayaran, klik tombol "Saya Sudah Bayar" di bawah untuk konfirmasi.
                      </AlertDescription>
                    </Alert>

                    <Button
                      onClick={handleConfirmPayment}
                      disabled={isProcessing || paymentTimer <= 0}
                      className="w-full"
                      size="lg"
                    >
                      {isProcessing
                        ? "Memverifikasi Pembayaran..."
                        : paymentTimer <= 0
                          ? "Waktu Habis"
                          : "Saya Sudah Bayar"}
                    </Button>
                  </div>
                )}

                {/* Confirmation */}
                {currentStep === "confirmation" && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-600 mb-2">Pembayaran Berhasil!</h3>
                      <p className="text-gray-600">
                        Tiket Anda telah berhasil dipesan dan pembayaran telah dikonfirmasi.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-left">
                      <h4 className="font-semibold mb-2">Detail Tiket</h4>
                      <div className="space-y-1 text-sm">
                        <div>
                          Kode Booking: <span className="font-mono">RB{Date.now().toString().slice(-6)}</span>
                        </div>
                        <div>
                          Rute: {ROUTES[bookingData.route as keyof typeof ROUTES]?.from} →{" "}
                          {ROUTES[bookingData.route as keyof typeof ROUTES]?.to}
                        </div>
                        <div>Kelas: {bookingData.class}</div>
                        <div>Penumpang: {bookingData.passengerName}</div>
                        <div>Tanggal: {bookingData.travelDate}</div>
                        <div>
                          Pembayaran: {PAYMENT_METHODS[bookingData.paymentMethod as keyof typeof PAYMENT_METHODS]?.name}
                          {bookingData.paymentOption && ` - ${bookingData.paymentOption}`}
                        </div>
                        <div>Total: Rp {calculateTotalPrice().toLocaleString("id-ID")}</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild>
                        <Link href="/my-tickets">Lihat Tiket Saya</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/">Kembali ke Beranda</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          {currentStep !== "confirmation" && currentStep !== "payment-detail" && (
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === "route"}>
                Kembali
              </Button>

              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === "route" && !bookingData.route) ||
                  (currentStep === "class" && !bookingData.class) ||
                  (currentStep === "passenger" &&
                    (!bookingData.passengerName ||
                      !bookingData.passengerEmail ||
                      !bookingData.passengerPhone ||
                      !bookingData.travelDate)) ||
                  (currentStep === "payment" &&
                    (!bookingData.paymentMethod ||
                      (PAYMENT_METHODS[bookingData.paymentMethod as keyof typeof PAYMENT_METHODS]?.options &&
                        !bookingData.paymentOption)))
                }
              >
                Lanjutkan
              </Button>
            </div>
          )}

          {currentStep === "payment-detail" && (
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Kembali
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
