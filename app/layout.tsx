import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Heru AI | Holistic Wealth & Wellness Diagnostic",
  description:
    "Discover your wealth archetype and holistic wellbeing profile. Conscious prosperity through intelligent transformation.",
  keywords: ["wealth management", "wellness", "portfolio", "private client", "conscious investing", "Hong Kong"],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${_geist.className} font-sans antialiased`}
        style={{ backgroundColor: "#0a0a0a", color: "#f5f5f1" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
