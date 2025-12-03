"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonPremiumProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "emerald" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  children: React.ReactNode
}

export function ButtonPremium({
  variant = "gold",
  size = "md",
  loading = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonPremiumProps) {
  const baseStyles =
    "font-display font-semibold rounded transition-smooth duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"

  const variants = {
    gold: "bg-gradient-gold text-black hover:shadow-lg hover:shadow-accent-gold/50",
    emerald: "bg-accent-emerald text-foreground hover:bg-accent-emerald-light",
    outline: "border-2 border-accent-gold text-accent-gold hover:bg-accent-gold/10",
    ghost: "text-accent-gold hover:bg-accent-gold/10",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="animate-spin">⟳</span>}
      {children}
    </button>
  )
}
