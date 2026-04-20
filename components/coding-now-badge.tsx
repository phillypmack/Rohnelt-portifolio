"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Code2, Briefcase, Moon } from "lucide-react";
import type { LivePresence } from "@/hooks/use-live-stats";

const CODING_WINDOW_MS = 60_000;
const HEARTBEAT_TIMEOUT_MS = 120_000;

type PresenceState = "coding" | "working" | "offline";

function derivePresenceState(presence: LivePresence): PresenceState {
  const now = Date.now();
  const heartbeatAge = now - new Date(presence.lastUpdate).getTime();
  if (heartbeatAge > HEARTBEAT_TIMEOUT_MS) return "offline";

  if (presence.lastLineChangeAt) {
    const lineChangeAge = now - new Date(presence.lastLineChangeAt).getTime();
    if (lineChangeAge < CODING_WINDOW_MS) return "coding";
  }

  return presence.ideRunning ? "working" : "offline";
}

const STATE_STYLES: Record<
  PresenceState,
  { label: string; icon: typeof Code2; classes: string; dot: string }
> = {
  coding: {
    label: "codando agora",
    icon: Code2,
    classes: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    dot: "bg-emerald-500",
  },
  working: {
    label: "trabalhando",
    icon: Briefcase,
    classes: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    dot: "bg-amber-500",
  },
  offline: {
    label: "offline",
    icon: Moon,
    classes: "bg-muted/20 border-border text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

export function CodingNowBadge({ presence }: { presence: LivePresence }) {
  const state = derivePresenceState(presence);
  const style = STATE_STYLES[state];
  const Icon = style.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        initial={{ opacity: 0, y: -6, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${style.classes}`}
      >
        <span className="relative flex h-2 w-2">
          {state === "coding" && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`} />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`} />
        </span>
        <Icon className="w-3.5 h-3.5" />
        <span>
          {style.label}
          {state !== "offline" && presence.ide ? ` no ${presence.ide}` : ""}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
