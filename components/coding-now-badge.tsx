"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import type { LivePresence } from "@/hooks/use-live-stats";

const STALE_THRESHOLD_MS = 60_000;

export function CodingNowBadge({ presence }: { presence: LivePresence }) {
  const updatedAt = new Date(presence.lastUpdate).getTime();
  const fresh = Date.now() - updatedAt < STALE_THRESHOLD_MS;
  const visible = presence.coding && fresh;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <Code2 className="w-3.5 h-3.5" />
          <span>codando agora{presence.ide ? ` no ${presence.ide}` : ""}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
