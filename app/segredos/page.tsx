import type { Metadata } from "next"
import { TerminalPage } from "@/components/terminal/terminal-page"

export const metadata: Metadata = {
  title: "Rohnelt - Terminal Secrets",
  description:
    "Descubra os projetos escondidos no codigo. Um puzzle interativo.",
}

export default function SegredosPage() {
  return <TerminalPage />
}
