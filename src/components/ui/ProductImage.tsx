"use client"

import { useState } from "react"

const categoryGradients: Record<string, { from: string; to: string; icon: string }> = {
  processory: { from: "#1e40af", to: "#3b82f6", icon: "⚡" },
  videokarty: { from: "#7c3aed", to: "#a78bfa", icon: "🎮" },
  "operativnaya-pamyat": { from: "#059669", to: "#34d399", icon: "🧠" },
  "materinskie-platy": { from: "#b45309", to: "#f59e0b", icon: "🔧" },
  nakopiteli: { from: "#0284c7", to: "#38bdf8", icon: "💾" },
  "bloki-pitaniya": { from: "#dc2626", to: "#f87171", icon: "🔌" },
  korpusa: { from: "#4b5563", to: "#9ca3af", icon: "🖥️" },
  ohlazhdenie: { from: "#0e7490", to: "#22d3ee", icon: "❄️" },
  monitory: { from: "#4338ca", to: "#818cf8", icon: "🖥️" },
  myshi: { from: "#be185d", to: "#f472b6", icon: "🖱️" },
  klaviatury: { from: "#1d4ed8", to: "#60a5fa", icon: "⌨️" },
  kabeli: { from: "#64748b", to: "#cbd5e1", icon: "🔗" },
  periferiya: { from: "#0f766e", to: "#5eead4", icon: "🎧" },
}

const defaultGradient = { from: "#6366f1", to: "#a5b4fc", icon: "📦" }

const categoryImageMap: Record<string, string> = {
  processory: "/images/cpu.webp",
  videokarty: "/images/gpu.webp",
  "operativnaya-pamyat": "/images/ram.webp",
  "materinskie-platy": "/images/mb.webp",
  nakopiteli: "/images/ssd.webp",
  "bloki-pitaniya": "/images/psu.webp",
  korpusa: "/images/case.webp",
  ohlazhdenie: "/images/cooler.webp",
  monitory: "/images/monitor.webp",
  myshi: "/images/mouse.webp",
  klaviatury: "/images/keyboard.webp",
  kabeli: "/images/cable.webp",
  periferiya: "/images/headset.webp",
}

export function ProductImage({
  slug,
  category,
  className = "",
}: {
  slug?: string
  category?: string
  className?: string
}) {
  const [imgError, setImgError] = useState(false)
  const gradient = categoryGradients[category || ""] || defaultGradient
  const imgSrc = category ? categoryImageMap[category] : null

  if (imgSrc && !imgError) {
    return (
      <img
        src={imgSrc}
        alt={category || ""}
        className={className}
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${slug || "default"}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient.from} />
          <stop offset="100%" stopColor={gradient.to} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#grad-${slug || "default"})`} rx="0" />
      <text x="100" y="90" textAnchor="middle" fontSize="48" fill="rgba(255,255,255,0.3)">
        {gradient.icon}
      </text>
      <text x="100" y="130" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="system-ui">
        {category ? category.split(",")[0] : "PC-Shop"}
      </text>
    </svg>
  )
}
