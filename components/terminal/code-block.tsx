"use client"

import type { CodeSnippet, SecretKeyword } from "@/lib/terminal-secrets"
import { HiddenKeyword } from "./hidden-keyword"
import { memo } from "react"

const syntaxColors: Record<string, string> = {
  variable: "text-[#7ee787]",
  function: "text-[#d2a8ff]",
  string: "text-[#a5d6ff]",
  comment: "text-[#6a737d]",
  keyword: "text-[#ff7b72]",
  class: "text-[#ffa657]",
}

function renderLine(
  line: string,
  lineIndex: number,
  secrets: (SecretKeyword & { line: number })[],
  discoveredSecrets: Set<string>,
  hintTarget: string | null,
  onSecretClick: (secret: SecretKeyword) => void
) {
  const secret = secrets.find((s) => s.line === lineIndex)

  if (!secret) {
    return <span className="text-[#c9d1d9]">{line || "\u00A0"}</span>
  }

  const keywordIndex = line.indexOf(secret.keyword)
  if (keywordIndex === -1) {
    return <span className="text-[#c9d1d9]">{line}</span>
  }

  const before = line.substring(0, keywordIndex)
  const after = line.substring(keywordIndex + secret.keyword.length)
  const colorClass = syntaxColors[secret.syntaxRole] || "text-[#c9d1d9]"

  return (
    <>
      <span className="text-[#c9d1d9]">{before}</span>
      <HiddenKeyword
        secret={secret}
        isDiscovered={discoveredSecrets.has(secret.id)}
        isHinting={hintTarget === secret.id}
        colorClass={colorClass}
        onClick={() => onSecretClick(secret)}
      />
      <span className="text-[#c9d1d9]">{after}</span>
    </>
  )
}

interface CodeBlockProps {
  snippet: CodeSnippet
  discoveredSecrets: Set<string>
  hintTarget: string | null
  onSecretClick: (secret: SecretKeyword) => void
}

export const CodeBlock = memo(function CodeBlock({
  snippet,
  discoveredSecrets,
  hintTarget,
  onSecretClick,
}: CodeBlockProps) {
  return (
    <div className="rounded-lg border border-[#1a2332] bg-[#0d1117] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#1a2332]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[#6a737d] text-xs font-mono ml-2">{snippet.filename}</span>
      </div>

      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-[13px] leading-6">
          {snippet.lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-[#484f58] select-none w-8 shrink-0 text-right mr-4">
                {i + 1}
              </span>
              <span className="flex-1 whitespace-pre">
                {renderLine(line, i, snippet.secrets, discoveredSecrets, hintTarget, onSecretClick)}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
})
