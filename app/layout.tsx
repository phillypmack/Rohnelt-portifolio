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
    default: "Felipe Rohnelt — sistemas em produção",
    template: "%s — Felipe Rohnelt",
  },
  description:
    "Vinte e três sistemas em produção: software de ERP e de indústria rodando dentro da rede de clientes, e catorze serviços públicos num servidor que eu administro de ponta a ponta.",
  authors: [{ name: "Felipe Rohnelt" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Felipe Rohnelt",
    title: "Felipe Rohnelt — sistemas em produção",
    description:
      "Software em produção, operado por quem escreveu. A lista ao vivo de tudo que eu mantenho no ar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe Rohnelt — sistemas em produção",
    description:
      "Software em produção, operado por quem escreveu.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
