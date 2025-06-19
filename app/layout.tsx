import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "MONDO Digital - Beautiful Creative Made with Mondo Can-Do",
  description:
    "We craft exceptional digital experiences that push boundaries and redefine what's possible in the digital realm. Brand Identity, Web Design, Digital Strategy, UI/UX Design, Mobile Apps, Creative Direction.",
  keywords: "digital agency, web design, brand identity, UI/UX design, mobile apps, creative direction, New Zealand",
  authors: [{ name: "MONDO Digital" }],
  creator: "MONDO Digital",
  publisher: "MONDO Digital",
  robots: "index, follow",
  generator: "v0.dev",
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://mondodigital.nz",
    siteName: "MONDO Digital",
    title: "MONDO Digital - Beautiful Creative Made with Mondo Can-Do",
    description:
      "We craft exceptional digital experiences that push boundaries and redefine what's possible in the digital realm.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MONDO Digital - Beautiful Creative Made with Mondo Can-Do",
    description:
      "We craft exceptional digital experiences that push boundaries and redefine what's possible in the digital realm.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://mondodigital.nz" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
