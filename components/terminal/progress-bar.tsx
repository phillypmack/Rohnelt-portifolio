"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ProgressBarProps {
  discovered: number
  total: number
}

export function ProgressBar({ discovered, total }: ProgressBarProps) {
  const filled = Math.round((discovered / total) * 20)
  const bar = "#".repeat(filled) + ".".repeat(20 - filled)
  const allFound = discovered === total

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 font-mono text-sm"
    >
      <div className="rounded-lg border border-[#1a2332] bg-[#0d1117]/95 backdrop-blur-sm px-4 py-3">
        <AnimatePresence mode="wait">
          {allFound ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#00ff88]"
              style={{ textShadow: "0 0 10px rgba(0,255,136,0.5)" }}
            >
              <span className="text-[#6a737d]">&gt; </span>
              TODOS OS SEGREDOS DESCOBERTOS!
            </motion.div>
          ) : (
            <motion.div key="progress">
              <span className="text-[#6a737d]">&gt; segredos: </span>
              <span className="text-[#00ff88]">[{bar}]</span>
              <span className="text-[#c9d1d9]">
                {" "}
                {discovered}/{total}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
