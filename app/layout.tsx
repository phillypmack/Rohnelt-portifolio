import type { Metadata } from "next"
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

const siteUrl = "https://rohnelt.dev"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Felipe Rohnelt — production systems",
    template: "%s — Felipe Rohnelt",
  },
  description:
    "Twenty-three systems in production: ERP and manufacturing software running inside a client network, and fourteen public services on a server I administer end to end.",
  authors: [{ name: "Felipe Rohnelt" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Felipe Rohnelt",
    title: "Felipe Rohnelt — production systems",
    description:
      "Software in production, operated by the person who wrote it. A live roster of every system I run.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe Rohnelt — production systems",
    description:
      "Software in production, operated by the person who wrote it.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
