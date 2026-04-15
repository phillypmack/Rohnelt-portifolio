import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Experiments } from "@/components/experiments"
import { TechStack } from "@/components/tech-stack"
import { Certificates } from "@/components/certificates"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Rohnelt - Engenheiro de Software",
  description:
    "Portfólio de Rohnelt - Engenheiro de Software especializado em automação industrial, integração ERP Sankhya, Oracle Database e aplicação de IA em manufatura.",
}

export default function GreenHome() {
  return (
    <main className="min-h-screen bg-background theme-green">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experiments />
      <TechStack />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  )
}
