"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Train, ArrowLeft, Mail, Phone, MessageSquare, MapPin, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulasi pengiriman form
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form setelah 3 detik
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      value: "12sabrinaafifah@gmail.com",
      description: "Kirim email untuk pertanyaan umum",
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Telepon",
      value: "(425) 555-1313",
      description: "Hubungi kami di jam kerja",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-orange-600" />,
      title: "WhatsApp",
      value: "088227334718",
      description: "Chat langsung untuk respon cepat",
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: "Alamat",
      value: "Jakarta, Indonesia",
      description: "Kantor pusat RailBooker",
    },
  ]

  const faqItems = [
    {
      question: "Bagaimana cara memesan tiket?",
      answer: "Klik tombol 'Pesan Tiket', pilih rute dan kelas, isi data penumpang, lalu konfirmasi pembayaran.",
    },
    {
      question: "Apakah bisa membatalkan tiket?",
      answer: "Ya, Anda bisa membatalkan tiket melalui halaman 'Batalkan Tiket' dengan memasukkan kode booking.",
    },
    {
      question: "Bagaimana cara mengecek jadwal kereta?",
      answer: "Gunakan fitur 'Cek Jadwal' untuk melihat jadwal keberangkatan dan kedatangan kereta.",
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
          <Badge variant="outline">Hubungi Kami</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi tim support kami
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Kirim Pesan</CardTitle>
                  <CardDescription>Isi form di bawah ini dan kami akan merespons dalam 24 jam</CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <Alert className="mb-6">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Pesan Anda telah berhasil dikirim! Kami akan merespons segera.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nama Lengkap *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Masukkan nama lengkap"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contoh@email.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subjek *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Subjek pesan"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Pesan *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tulis pesan Anda di sini..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Kontak</CardTitle>
                  <CardDescription>Berbagai cara untuk menghubungi tim RailBooker</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      {info.icon}
                      <div>
                        <h3 className="font-semibold">{info.title}</h3>
                        <p className="font-medium text-blue-600">{info.value}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Jam Operasional</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Senin - Jumat</span>
                      <span className="font-medium">08:00 - 17:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabtu</span>
                      <span className="font-medium">09:00 - 15:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minggu</span>
                      <span className="font-medium">Tutup</span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>WhatsApp 24/7:</strong> Untuk bantuan darurat di luar jam operasional
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pertanyaan yang Sering Diajukan</CardTitle>
                <CardDescription>Temukan jawaban untuk pertanyaan umum seputar RailBooker</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/faq">Lihat Semua FAQ</Link>
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
