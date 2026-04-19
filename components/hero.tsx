"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github } from "lucide-react"
import { Typewriter } from "./typewriter"
import { useLiveStats } from "@/hooks/use-live-stats"
import { CodingNowBadge } from "./coding-now-badge"

const FALLBACK_STATS = {
  totalLines: 238190,
  totalProjects: 27,
  productionCount: 0,
  companiesServed: 1,
  lastSync: new Date(0).toISOString(),
  presence: {
    coding: false,
    ide: null,
    lastUpdate: new Date(0).toISOString(),
  },
}

const techBadges = [
  "Python",
  "Next.js",
  "FastAPI",
  "Sankhya",
  "Oracle",
  "Docker",
  "IA",
]

function AnimatedCounter({
  target,
  suffix = "",
  separator = false,
}: {
  target: number
  suffix?: string
  separator?: boolean
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const start = countRef.current
    const end = target
    if (start === end) return
    const distance = Math.abs(end - start)
    const duration = Math.min(2000, Math.max(400, distance * 2))
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + (end - start) * eased)
      setCount(current)
      countRef.current = current
      if (progress >= 1) {
        clearInterval(timer)
        setCount(end)
        countRef.current = end
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target])

  const display = separator ? count.toLocaleString("pt-BR") : count
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function Hero() {
  const stats = useLiveStats(FALLBACK_STATS)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Glowing orb effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-3 h-7">
            <CodingNowBadge presence={stats.presence} />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4">
            Rohnelt
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-6 h-8">
            <Typewriter
              words={[
                "Engenheiro de Software",
                "Arquiteto de I.A.",
                "Especialista em Automação Industrial",
                "Desenvolvedor Full Stack",
                "Integrador ERP Sankhya",
                "Engenheiro de Prompt",
              ]}
              speed={80}
              delayBetweenWords={2000}
              cursor={true}
            />
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8 text-balance"
        >
          Construo ferramentas que automatizam fábricas, otimizam logística e levam IA para o chão de fábrica.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {techBadges.map((tech, index) => (
            <Badge
              key={tech}
              variant="outline"
              className="px-3 py-1 text-sm bg-card/50 border-border hover:border-primary/50 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tech}
            </Badge>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button size="lg" className="text-base" asChild>
            <a href="#projetos">
              Ver projetos
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="text-base" asChild>
            <a
              href="https://github.com/phillypmack"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              <AnimatedCounter target={stats.totalProjects} suffix="+" />
            </div>
            <div className="text-sm text-muted-foreground mt-1">repositórios</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              <AnimatedCounter target={stats.productionCount} suffix="+" />
            </div>
            <div className="text-sm text-muted-foreground mt-1">em produção</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              <AnimatedCounter target={stats.totalLines} separator />
            </div>
            <div className="text-sm text-muted-foreground mt-1">linhas de código</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              <AnimatedCounter target={5} suffix="+" />
            </div>
            <div className="text-sm text-muted-foreground mt-1">integrações Sankhya</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              <AnimatedCounter target={stats.companiesServed} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">empresas atendidas</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
        >
          <motion.div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
