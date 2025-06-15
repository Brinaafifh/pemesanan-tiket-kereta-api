import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RailBooker - Pemesanan Tiket Kereta Api",
  description:
    "Platform pemesanan tiket kereta api terpercaya di Indonesia. Pesan tiket dengan mudah, cepat, dan aman.",
  keywords: "tiket kereta api, booking kereta, pemesanan tiket, kereta api indonesia",
  authors: [{ name: "Sabrina Nur Afifah", url: "https://github.com/Brinaafifh" }],
  openGraph: {
    title: "RailBooker - Pemesanan Tiket Kereta Api",
    description: "Platform pemesanan tiket kereta api terpercaya di Indonesia",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
