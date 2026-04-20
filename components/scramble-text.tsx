"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  durationMs?: number;
  onComplete?: () => void;
}

export function ScrambleText({ text, className, style, durationMs = 1600, onComplete }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const targetChars = Array.from(text);
    const schedule = targetChars.map((_, i) => {
      const stagger = (i / targetChars.length) * durationMs * 0.6;
      const reveal = stagger + durationMs * 0.35 + Math.random() * durationMs * 0.1;
      return { reveal };
    });

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      let done = 0;
      const out = targetChars.map((ch, i) => {
        if (elapsed >= schedule[i].reveal) {
          done++;
          return ch;
        }
        if (ch === " ") return " ";
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(out.join(""));
      if (done === targetChars.length) {
        onComplete?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, durationMs]);

  return (
    <span className={className} style={style} suppressHydrationWarning>
      {display}
    </span>
  );
}
