import { ImageResponse } from "next/og"

import { counts } from "@/lib/systems"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Felipe Rohnelt — softwares, soluções e automações"

// De propósito só com fonte de sistema: o card tem que renderizar mesmo se a fonte falhar.
export default function OpengraphImage() {
  const figures = [
    [String(counts.total), "sistemas em produção"],
    [String(counts.vps), "endpoints públicos"],
    [String(counts.onPrem), "na rede de clientes"],
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ECEEF0",
          color: "#14181C",
          padding: "64px 72px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#5A646E" }}>
          <span>FELIPE ROHNELT</span>
          <span style={{ color: "#0F7A4A" }}>rohnelt.dev</span>
        </div>

        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2.4, maxWidth: 980 }}>
          Softwares, Soluções e Automações.
        </div>

        <div style={{ display: "flex", borderTop: "1px solid #CFD5DB", paddingTop: 26, gap: 72 }}>
          {figures.map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 52, fontWeight: 700 }}>{value}</span>
              <span style={{ fontSize: 21, color: "#5A646E" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
