"use client"

import type React from "react"

interface SacredGeometryFrameProps {
  children: React.ReactNode
  className?: string
  accentColor?: "gold" | "emerald" | "white"
}

export function SacredGeometryFrame({ children, className = "", accentColor = "gold" }: SacredGeometryFrameProps) {
  const accentColors = {
    gold: "border-accent-gold",
    emerald: "border-accent-emerald",
    white: "border-foreground",
  }

  return (
    <div className={`relative ${className}`}>
      {/* Outer Sacred Geometry Frame */}
      <div className={`border ${accentColors[accentColor]} border-opacity-30 rounded-lg p-1`}>
        {/* Inner Content Container */}
        <div className="relative bg-surface rounded p-6 md:p-8">
          {/* Decorative Corner Elements */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent-gold opacity-50"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent-gold opacity-50"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accent-gold opacity-50"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accent-gold opacity-50"></div>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  )
}
