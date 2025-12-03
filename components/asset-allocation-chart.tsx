"use client"

import { useMemo } from "react"

interface AssetAllocationChartProps {
  allocation: Record<string, number>
  size?: number
}

const ASSET_COLORS: Record<string, string> = {
  equities: "#d4af37",
  fixedIncome: "#2d5a3d",
  alternatives: "#3d5a7a",
  cash: "#666666",
  realEstate: "#8b7355",
  privateEquity: "#5a4a3a",
  insurance: "#a88860",
}

export function AssetAllocationChart({ allocation, size = 300 }: AssetAllocationChartProps) {
  const centerX = size / 2
  const centerY = size / 2
  const radius = size * 0.35

  const slices = useMemo(() => {
    const total = Object.values(allocation).reduce((a, b) => a + b, 0)
    let currentAngle = -Math.PI / 2

    return Object.entries(allocation)
      .filter(([, value]) => value > 0)
      .map(([label, value]) => {
        const sliceAngle = (value / total) * Math.PI * 2
        const startAngle = currentAngle
        const endAngle = currentAngle + sliceAngle
        const midAngle = (startAngle + endAngle) / 2

        const x1 = centerX + radius * Math.cos(startAngle)
        const y1 = centerY + radius * Math.sin(startAngle)
        const x2 = centerX + radius * Math.cos(endAngle)
        const y2 = centerY + radius * Math.sin(endAngle)

        const labelRadius = radius * 0.65
        const labelX = centerX + labelRadius * Math.cos(midAngle)
        const labelY = centerY + labelRadius * Math.sin(midAngle)

        const largeArc = sliceAngle > Math.PI ? 1 : 0

        const path = `
          M ${centerX} ${centerY}
          L ${x1} ${y1}
          A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
          Z
        `

        currentAngle = endAngle

        return {
          label,
          value,
          percentage: ((value / total) * 100).toFixed(1),
          path,
          labelX,
          labelY,
          color: ASSET_COLORS[label] || "#999999",
        }
      })
  }, [allocation, size])

  return (
    <div className="flex flex-col items-center gap-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
        {/* Slices */}
        {slices.map((slice, i) => (
          <g key={`slice-${i}`}>
            <path d={slice.path} fill={slice.color} opacity="0.85" stroke="#0a0a0a" strokeWidth="2" />

            {/* Label */}
            {Number(slice.percentage) > 5 && (
              <text
                x={slice.labelX}
                y={slice.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-display font-bold text-xs fill-background"
              >
                {slice.percentage}%
              </text>
            )}
          </g>
        ))}

        {/* Center Circle */}
        <circle cx={centerX} cy={centerY} r="30" fill="#1a1a1a" stroke="#d4af37" strokeWidth="2" />
      </svg>

      {/* Legend */}
      <div className="w-full max-w-sm space-y-2">
        <p className="text-xs text-foreground-muted text-center font-semibold uppercase tracking-widest">
          Asset Classes
        </p>
        <div className="space-y-2">
          {slices.map((slice) => (
            <div key={`legend-${slice.label}`} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: slice.color }} opacity="0.8" />
              <span className="text-sm text-foreground capitalize flex-1">
                {slice.label.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <span className="font-display font-bold text-accent-gold">{slice.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
