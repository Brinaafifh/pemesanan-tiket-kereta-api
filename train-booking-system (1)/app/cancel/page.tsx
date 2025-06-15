"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CancelPage() {
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
          <Badge variant="outline">Batalkan Tiket</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Batalkan Tiket</h1>
                <p className="text-gray-600 mb-8">
                  Untuk membatalkan tiket, silakan kunjungi halaman "Tiket Saya" dan klik tombol "Batalkan" pada tiket
                  yang ingin dibatalkan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/my-tickets">Lihat Tiket Saya</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Kembali ke Beranda</Link>
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
