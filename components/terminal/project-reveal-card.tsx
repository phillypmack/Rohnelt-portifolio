"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink } from "lucide-react"
import type { Project } from "@/lib/projects"

interface ProjectRevealCardProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  discoveredCount: number
  totalCount: number
}

export function ProjectRevealCard({
  project,
  isOpen,
  onClose,
  discoveredCount,
  totalCount,
}: ProjectRevealCardProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ x: 400, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 400, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-[380px] max-h-[80vh] overflow-y-auto rounded-lg border border-[#00ff88]/30 bg-[#0a0a0f]/95 backdrop-blur-xl shadow-2xl"
          style={{ boxShadow: "0 0 30px rgba(0,255,136,0.1)" }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-[#00ff88]/20 p-4 flex items-start justify-between">
            <div>
              <p className="text-[#00ff88] font-mono text-xs mb-1">
                &gt; segredo {discoveredCount}/{totalCount} descoberto
              </p>
              <h3
                className="text-lg font-bold font-mono text-[#00ff88]"
                style={{ textShadow: "0 0 10px rgba(0,255,136,0.5)" }}
              >
                {project.name}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#6a737d] hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {project.badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-mono px-2 py-0.5 rounded border border-[#00ff88]/30 text-[#00ff88]/80"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Tagline */}
            <p className="text-[#8b949e] text-sm font-mono leading-relaxed">
              {project.tagline}
            </p>

            {/* Stack */}
            <div>
              <p className="text-[#6a737d] text-xs font-mono mb-2"># stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-[#161b22] text-[#c9d1d9] border border-[#1a2332]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-[#1a2332]">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded font-mono text-xs bg-[#161b22] text-[#c9d1d9] border border-[#1a2332] hover:border-[#00ff88]/50 hover:text-[#00ff88] transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              {project.deploy && (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded font-mono text-xs bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 hover:bg-[#00ff88]/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
