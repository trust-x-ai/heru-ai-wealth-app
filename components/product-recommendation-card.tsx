"use client"

import type { ProductRecommendation } from "@/lib/product-recommendations"

interface ProductRecommendationCardProps {
  recommendation: ProductRecommendation
  onSelect?: () => void
}

export function ProductRecommendationCard({ recommendation, onSelect }: ProductRecommendationCardProps) {
  const { product, matchScore, reasoning, priority } = recommendation

  const priorityColors = {
    core: "border-accent-gold bg-accent-gold/5",
    satellite: "border-accent-emerald bg-accent-emerald/5",
    alternative: "border-info bg-info/5",
  }

  const priorityLabels = {
    core: "Core Holding",
    satellite: "Supporting",
    alternative: "Alternative",
  }

  return (
    <div
      onClick={onSelect}
      className={`rounded-lg border-2 p-6 transition-all cursor-pointer hover:shadow-lg ${priorityColors[priority]}`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-display font-semibold text-foreground">{product.name}</h3>
            <p className="text-sm text-foreground-muted">{product.category}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-accent-gold">{matchScore}</div>
            <div className="text-xs text-foreground-muted">Match %</div>
          </div>
        </div>

        {/* Priority Badge */}
        <div className="flex gap-2">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              priority === "core"
                ? "bg-accent-gold text-background"
                : priority === "satellite"
                  ? "bg-accent-emerald text-background"
                  : "bg-info text-background"
            }`}
          >
            {priorityLabels[priority]}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-muted leading-relaxed">{product.description}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-surface-alt rounded p-2">
            <p className="text-foreground-muted text-xs">Expected Return</p>
            <p className="font-display font-bold text-accent-gold">{product.expectedReturn}%</p>
          </div>
          <div className="bg-surface-alt rounded p-2">
            <p className="text-foreground-muted text-xs">Risk Rating</p>
            <p className="font-display font-bold text-foreground">{product.riskRating}</p>
          </div>
          <div className="bg-surface-alt rounded p-2">
            <p className="text-foreground-muted text-xs">Liquidity</p>
            <p className="font-display font-bold text-foreground">{product.liquidityScore}</p>
          </div>
        </div>

        {/* Reasoning */}
        <div className="border-t border-border-light pt-3 space-y-2">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest">Why This Product?</p>
          <ul className="space-y-1">
            {reasoning.slice(0, 2).map((reason, i) => (
              <li key={i} className="text-sm text-foreground-muted flex gap-2">
                <span className="text-accent-gold">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {product.features.slice(0, 2).map((feature) => (
            <span key={feature} className="text-xs px-2 py-1 rounded bg-surface-alt text-foreground-muted">
              {feature}
            </span>
          ))}
        </div>

        {/* Min Investment */}
        <div className="bg-surface-alt rounded p-3 border border-border-light">
          <p className="text-xs text-foreground-muted mb-1">Minimum Investment</p>
          <p className="font-display font-semibold text-foreground">
            HKD {(product.minInvestment / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>
    </div>
  )
}
