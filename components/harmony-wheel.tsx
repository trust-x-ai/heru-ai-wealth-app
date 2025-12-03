"use client"

import { useMemo } from "react"
import type { WellnessScore } from "@/lib/wellness-scoring"
import { WELLNESS_DIMENSIONS } from "@/lib/wellness-scoring"

interface HarmonyWheelProps {
  scores: WellnessScore
  size?: number
}

export function HarmonyWheel({ scores, size = 400 }: HarmonyWheelProps) {
  const dimensions = WELLNESS_DIMENSIONS
  const centerX = size / 2
  const centerY = size / 2
  const maxRadius = size * 0.35

  // Calculate points for radar chart
  const points = useMemo(() => {
    return dimensions.map((dim, index) => {
      const angle = (index / dimensions.length) * Math.PI * 2 - Math.PI / 2
      const score = (scores[dim.id] || 0) / 100
      const radius = maxRadius * score

      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      return {
        x,
        y,
        angle,
        score: scores[dim.id] || 0,
        dimension: dim,
      }
    })
  }, [scores, size])

  // Generate polygon path
  const polygonPath = useMemo(() => {
    const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
    return pathData + " Z"
  }, [points])

  // Generate concentric circles (grid)
  const gridCircles = [20, 40, 60, 80, 100].map((value) => ({
    radius: (maxRadius * value) / 100,
    label: `${value}%`,
  }))

  return (
    <div className="flex flex-col items-center gap-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
        {/* Background */}
        <circle cx={centerX} cy={centerY} r={maxRadius + 20} fill="url(#wheelGradient)" opacity="0.05" />

        {/* Grid Circles */}
        {gridCircles.map((circle, i) => (
          <g key={`grid-${i}`}>
            <circle
              cx={centerX}
              cy={centerY}
              r={circle.radius}
              fill="none"
              stroke="#d4af37"
              strokeWidth="1"
              opacity="0.2"
            />
          </g>
        ))}

        {/* Radial Lines to Dimensions */}
        {points.map((p, i) => (
          <line
            key={`radial-${i}`}
            x1={centerX}
            y1={centerY}
            x2={centerX + maxRadius * Math.cos(p.angle)}
            y2={centerY + maxRadius * Math.sin(p.angle)}
            stroke="#d4af37"
            strokeWidth="1"
            opacity="0.15"
          />
        ))}

        {/* Main Polygon (Harmony Wheel) */}
        <path
          d={polygonPath}
          fill="#d4af37"
          fillOpacity="0.15"
          stroke="#d4af37"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Inner sacred geometry hexagon */}
        <circle
          cx={centerX}
          cy={centerY}
          r={maxRadius * 0.3}
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Points and Labels */}
        {points.map((p, i) => {
          const labelAngle = p.angle
          const labelRadius = maxRadius + 40
          const labelX = centerX + labelRadius * Math.cos(labelAngle)
          const labelY = centerY + labelRadius * Math.sin(labelAngle)

          return (
            <g key={`point-${i}`}>
              {/* Dimension Point */}
              <circle cx={p.x} cy={p.y} r="5" fill="#d4af37" stroke="#0a0a0a" strokeWidth="2" />

              {/* Label Background */}
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-display font-semibold text-xs fill-accent-gold"
                opacity="0.9"
              >
                {p.dimension.emoji}
              </text>

              {/* Dimension Name */}
              <text
                x={labelX}
                y={labelY + 16}
                textAnchor="middle"
                className="font-display text-xs font-semibold fill-foreground"
              >
                {p.dimension.label}
              </text>

              {/* Score */}
              <text
                x={labelX}
                y={labelY + 28}
                textAnchor="middle"
                className="font-display text-xs fill-accent-gold font-bold"
              >
                {Math.round(p.score)}
              </text>
            </g>
          )
        })}

        {/* Center Circle with Overall Score */}
        <circle cx={centerX} cy={centerY} r="35" fill="#1a1a1a" stroke="#d4af37" strokeWidth="2" />

        <text
          x={centerX}
          y={centerY - 8}
          textAnchor="middle"
          className="font-display text-2xl font-bold fill-accent-gold"
        >
          {Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)}
        </text>

        <text x={centerX} y={centerY + 12} textAnchor="middle" className="font-display text-xs fill-foreground-muted">
          Harmony
        </text>

        {/* Define Gradient */}
        <defs>
          <radialGradient id="wheelGradient">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Legend */}
      <div className="w-full max-w-sm space-y-2">
        <p className="text-xs text-foreground-muted text-center font-semibold uppercase tracking-widest">
          Wellness Dimensions
        </p>
        <div className="grid grid-cols-2 gap-3">
          {points.map((p, i) => (
            <div key={`legend-${i}`} className="flex items-center gap-2 p-2 rounded bg-surface-alt">
              <div className="w-3 h-3 rounded-full bg-accent-gold opacity-70" />
              <div>
                <p className="text-xs font-semibold text-foreground">{p.dimension.label}</p>
                <p className="text-xs text-accent-gold font-display">{Math.round(p.score)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
