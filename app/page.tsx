import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Experiments } from "@/components/experiments"
import { TechStack } from "@/components/tech-stack"
import { Certificates } from "@/components/certificates"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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
