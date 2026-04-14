"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, GraduationCap } from "lucide-react"
import { experiments } from "@/lib/projects"

export function Experiments() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full justify-between text-left h-auto py-4 px-6 bg-card/30 border border-border hover:bg-card/50 hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                Experimentos e Aprendizado
              </span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 border border-t-0 border-border rounded-b-xl bg-card/20">
                  <p className="text-sm text-muted-foreground mb-6">
                    Repositórios de exercícios da graduação no SENAI FATESG,
                    protótipos rápidos e experimentos. Mantidos públicos para
                    histórico de aprendizado.
                  </p>

                  <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {experiments.map((repo) => (
                      <li key={repo}>
                        <a
                          href={`https://github.com/phillypmack/${repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          <Github className="w-4 h-4 shrink-0" />
                          <span className="truncate">{repo}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
