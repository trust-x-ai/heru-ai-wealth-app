/**
 * Heru AI Wealth & Risk Profiling Engine
 * Comprehensive analysis of financial profile and asset allocation preferences
 */

export interface WealthProfile {
  totalAssets: number
  annualIncome: number
  timeHorizon: "short" | "medium" | "long" | "perpetual"
  riskAppetite: number // 0-100
  liquidityNeeds: number // 0-100
  investmentGoals: string[]
  priorities: {
    growth: number
    stability: number
    liquidity: number
    legacy: number
    taxOptimization: number
  }
  impactFocus?: string // Optional: conscious prosperity focus
}

export interface RiskProfile {
  score: number // 0-100
  classification: "conservative" | "moderate" | "balanced" | "growth" | "aggressive"
  volatilityTolerance: number
  drawdownTolerance: number
  recommendedAllocation: {
    equities: number
    fixedIncome: number
    alternatives: number
    cash: number
  }
}

export const INVESTMENT_GOALS = [
  "Wealth Preservation",
  "Passive Income Generation",
  "Capital Growth",
  "Legacy Building",
  "Diversification",
  "Tax Optimization",
  "Impact Investing",
  "Entrepreneurial Ventures",
]

export const TIME_HORIZONS = [
  { value: "short", label: "Short Term (0-3 years)", min: 0, max: 3 },
  { value: "medium", label: "Medium Term (3-10 years)", min: 3, max: 10 },
  { value: "long", label: "Long Term (10-25 years)", min: 10, max: 25 },
  { value: "perpetual", label: "Perpetual (25+ years)", min: 25, max: 100 },
] as const

/**
 * Calculate risk profile based on inputs
 */
export function calculateRiskProfile(profile: WealthProfile): RiskProfile {
  let riskScore = profile.riskAppetite

  // Adjust based on time horizon
  const horizonMultiplier = {
    short: 0.7,
    medium: 0.85,
    long: 1.0,
    perpetual: 1.15,
  }
  riskScore *= horizonMultiplier[profile.timeHorizon]

  // Adjust based on liquidity needs
  riskScore *= 1 - profile.liquidityNeeds / 200 // 0.5 to 1.0

  // Ensure score stays within bounds
  riskScore = Math.max(0, Math.min(100, riskScore))

  let classification: "conservative" | "moderate" | "balanced" | "growth" | "aggressive"
  if (riskScore < 20) classification = "conservative"
  else if (riskScore < 40) classification = "moderate"
  else if (riskScore < 60) classification = "balanced"
  else if (riskScore < 80) classification = "growth"
  else classification = "aggressive"

  // Calculate allocation based on risk score
  const allocations = {
    conservative: { equities: 30, fixedIncome: 55, alternatives: 10, cash: 5 },
    moderate: { equities: 40, fixedIncome: 45, alternatives: 10, cash: 5 },
    balanced: { equities: 55, fixedIncome: 30, alternatives: 12, cash: 3 },
    growth: { equities: 70, fixedIncome: 15, alternatives: 12, cash: 3 },
    aggressive: { equities: 85, fixedIncome: 5, alternatives: 8, cash: 2 },
  }

  return {
    score: Math.round(riskScore),
    classification,
    volatilityTolerance: riskScore,
    drawdownTolerance: Math.max(10, 50 - riskScore / 2),
    recommendedAllocation: allocations[classification],
  }
}

/**
 * Generate wealth profile insights
 */
export function generateWealthInsights(profile: WealthProfile, riskProfile: RiskProfile) {
  const insights = []

  // Asset base insight
  if (profile.totalAssets > 5000000) {
    insights.push("Strong asset base positions you for sophisticated wealth structures and diversified strategies.")
  } else if (profile.totalAssets > 1000000) {
    insights.push("Solid financial foundation allows for strategic diversification and professional management.")
  }

  // Income stability
  const incomeToAssets = profile.annualIncome / profile.totalAssets
  if (incomeToAssets > 0.1) {
    insights.push("Strong annual income relative to assets suggests capacity for significant wealth accumulation.")
  }

  // Time horizon
  if (profile.timeHorizon === "perpetual") {
    insights.push(
      "Multi-generational wealth perspective opens opportunities for legacy-focused structures and patient capital strategies.",
    )
  }

  // Risk alignment
  if (profile.riskAppetite > 70 && profile.liquidityNeeds < 30) {
    insights.push(
      "Risk appetite and liquidity profile support allocation to higher-return alternatives and illiquid investments.",
    )
  }

  return insights
}

/**
 * Calculate priority-weighted allocation
 */
export function calculatePriorityWeighting(profile: WealthProfile) {
  const totalWeight = Object.values(profile.priorities).reduce((a, b) => a + b, 0)
  return {
    growth: (profile.priorities.growth / totalWeight) * 100,
    stability: (profile.priorities.stability / totalWeight) * 100,
    liquidity: (profile.priorities.liquidity / totalWeight) * 100,
    legacy: (profile.priorities.legacy / totalWeight) * 100,
    taxOptimization: (profile.priorities.taxOptimization / totalWeight) * 100,
  }
}
