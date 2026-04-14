"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { snippets, totalSecrets } from "@/lib/terminal-secrets"
import type { SecretKeyword } from "@/lib/terminal-secrets"
import { projects } from "@/lib/projects"
import type { Project } from "@/lib/projects"
import { CodeBlock } from "./code-block"
import { ProjectRevealCard } from "./project-reveal-card"
import { ProgressBar } from "./progress-bar"

export function TerminalPage() {
  const [discoveredSecrets, setDiscoveredSecrets] = useState<Set<string>>(new Set())
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [showCard, setShowCard] = useState(false)
  const [hintTarget, setHintTarget] = useState<string | null>(null)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("terminal-secrets")
    if (saved) {
      try {
        setDiscoveredSecrets(new Set(JSON.parse(saved)))
      } catch {}
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (discoveredSecrets.size > 0) {
      localStorage.setItem(
        "terminal-secrets",
        JSON.stringify([...discoveredSecrets])
      )
    }
  }, [discoveredSecrets])

  // Hint timer
  useEffect(() => {
    const interval = setInterval(() => {
      const allSecrets = snippets.flatMap((s) => s.secrets)
      const undiscovered = allSecrets.filter((s) => !discoveredSecrets.has(s.id))
      if (undiscovered.length > 0) {
        const random = undiscovered[Math.floor(Math.random() * undiscovered.length)]
        setHintTarget(random.id)
        setTimeout(() => setHintTarget(null), 800)
      }
    }, 15000)
    return () => clearInterval(interval)
  }, [discoveredSecrets])

  const handleSecretClick = useCallback(
    (secret: SecretKeyword) => {
      if (discoveredSecrets.has(secret.id)) return

      setDiscoveredSecrets((prev) => {
        const next = new Set(prev)
        next.add(secret.id)
        return next
      })

      const project = projects.find((p) => p.slug === secret.projectSlug)
      if (project) {
        setActiveProject(project)
        setShowCard(true)
      }
    },
    [discoveredSecrets]
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Scanlines overlay */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-4 left-4 z-50"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[#6a737d] hover:text-[#00ff88] font-mono text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          cd ~/portfolio
        </Link>
      </motion.div>

      {/* Progress */}
      <ProgressBar discovered={discoveredSecrets.size} total={totalSecrets} />

      {/* Intro */}
      <div className="pt-16 pb-8 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-mono text-sm text-[#6a737d] mb-2"
        >
          <span className="text-[#00ff88]">$</span> cat /dev/secrets | grep -i
          "hidden" --color=always
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-mono text-xs text-[#484f58]"
        >
          # Existem {totalSecrets} segredos escondidos neste codigo. Clique nas
          palavras certas para revelar cada projeto.
        </motion.p>
      </div>

      {/* Code grid */}
      <div className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {snippets.map((snippet, i) => (
            <motion.div
              key={snippet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <CodeBlock
                snippet={snippet}
                discoveredSecrets={discoveredSecrets}
                hintTarget={hintTarget}
                onSecretClick={handleSecretClick}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reveal card */}
      <ProjectRevealCard
        project={activeProject}
        isOpen={showCard}
        onClose={() => setShowCard(false)}
        discoveredCount={discoveredSecrets.size}
        totalCount={totalSecrets}
      />
    </div>
  )
}
