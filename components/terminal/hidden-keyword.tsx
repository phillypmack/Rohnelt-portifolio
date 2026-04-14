"use client"

import { motion } from "framer-motion"
import type { SecretKeyword } from "@/lib/terminal-secrets"

interface HiddenKeywordProps {
  secret: SecretKeyword
  isDiscovered: boolean
  isHinting: boolean
  colorClass: string
  onClick: () => void
}

export function HiddenKeyword({
  secret,
  isDiscovered,
  isHinting,
  colorClass,
  onClick,
}: HiddenKeywordProps) {
  if (isDiscovered) {
    return (
      <motion.span
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.3 }}
        className="relative cursor-default rounded px-0.5 bg-[#00ff88]/10 text-[#00ff88]"
        style={{ textShadow: "0 0 10px #00ff88, 0 0 20px rgba(0,255,136,0.3)" }}
      >
        {secret.keyword}
      </motion.span>
    )
  }

  return (
    <motion.span
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      animate={
        isHinting
          ? {
              opacity: [1, 0.3, 1],
              textShadow: [
                "0 0 0px transparent",
                "0 0 12px #00ff88",
                "0 0 0px transparent",
              ],
            }
          : {}
      }
      transition={isHinting ? { duration: 0.6, ease: "easeInOut" } : {}}
      className={`${colorClass} cursor-pointer hover:border-b hover:border-dotted hover:border-[#7ee787]/40 transition-all duration-150`}
    >
      {secret.keyword}
    </motion.span>
  )
}
