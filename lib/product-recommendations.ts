/**
 * Heru AI Product Recommendation Engine
 * Matches HNW clients to investment products based on holistic profile
 */

import type { WellnessScore } from "./wellness-scoring"
import type { WealthProfile, RiskProfile } from "./wealth-profiling"

export interface InvestmentProduct {
  id: string
  name: string
  category: string
  subcategory: string
  assetClass: string
  description: string
  minInvestment: number
  expectedReturn: number
  riskRating: number // 0-100
  liquidityScore: number // 0-100 (100 = most liquid)
  volatility: number // Standard deviation estimate
  esgScore?: number
  minTimeHorizon: "short" | "medium" | "long" | "perpetual"
  features: string[]
  suitabilityFactors: string[]
}

export interface ProductRecommendation {
  product: InvestmentProduct
  matchScore: number // 0-100
  reasoning: string[]
  allocationPercentage?: number
  priority: "core" | "satellite" | "alternative"
}

// Sample Product Database
export const PRODUCTS_DATABASE: InvestmentProduct[] = [
  // Equities
  {
    id: "hsi-fund",
    name: "HSI Equity Fund",
    category: "Equities",
    subcategory: "Regional Equity",
    assetClass: "equities",
    description: "Diversified Hong Kong equities tracking the Hang Seng Index",
    minInvestment: 100000,
    expectedReturn: 8.5,
    riskRating: 55,
    liquidityScore: 90,
    volatility: 18,
    esgScore: 72,
    minTimeHorizon: "medium",
    features: ["Tax-efficient", "Liquid", "Diversified"],
    suitabilityFactors: ["Regional exposure", "Growth-oriented", "Balanced risk"],
  },
  {
    id: "global-tech-fund",
    name: "Global Tech Growth Fund",
    category: "Equities",
    subcategory: "Sector Equity",
    assetClass: "equities",
    description: "Concentrated exposure to global technology and innovation leaders",
    minInvestment: 500000,
    expectedReturn: 12.5,
    riskRating: 72,
    liquidityScore: 85,
    volatility: 25,
    esgScore: 68,
    minTimeHorizon: "long",
    features: ["High growth potential", "Innovation-focused", "Sector diversified"],
    suitabilityFactors: ["Growth investors", "Long time horizon", "Higher risk tolerance"],
  },
  {
    id: "dividend-aristocrats",
    name: "Dividend Aristocrats Fund",
    category: "Equities",
    subcategory: "Income Equity",
    assetClass: "equities",
    description: "Mature companies with 25+ years of dividend growth history",
    minInvestment: 250000,
    expectedReturn: 6.5,
    riskRating: 35,
    liquidityScore: 92,
    volatility: 12,
    esgScore: 75,
    minTimeHorizon: "medium",
    features: ["Stable income", "Dividend growth", "Blue-chip quality"],
    suitabilityFactors: ["Income-focused", "Risk-conservative", "Wealth preservation"],
  },

  // Fixed Income
  {
    id: "investment-grade-bonds",
    name: "Investment Grade Bond Fund",
    category: "Fixed Income",
    subcategory: "Corporate Bonds",
    assetClass: "fixedIncome",
    description: "Diversified portfolio of investment-grade corporate and government bonds",
    minInvestment: 100000,
    expectedReturn: 4.2,
    riskRating: 25,
    liquidityScore: 88,
    volatility: 6,
    minTimeHorizon: "short",
    features: ["Stable returns", "Low volatility", "Capital preservation"],
    suitabilityFactors: ["Conservative", "Income generation", "Risk mitigation"],
  },
  {
    id: "emerging-market-bonds",
    name: "Emerging Market Bond Fund",
    category: "Fixed Income",
    subcategory: "Emerging Market Bonds",
    assetClass: "fixedIncome",
    description: "Higher-yielding bonds from emerging market sovereigns and corporates",
    minInvestment: 300000,
    expectedReturn: 7.8,
    riskRating: 58,
    liquidityScore: 75,
    volatility: 15,
    esgScore: 65,
    minTimeHorizon: "medium",
    features: ["Higher yields", "Diversification", "Emerging market exposure"],
    suitabilityFactors: ["Yield seekers", "Balanced portfolio", "Medium-high risk"],
  },

  // Real Estate
  {
    id: "asia-reits-fund",
    name: "Asia REIT Income Fund",
    category: "Real Estate",
    subcategory: "REITs",
    assetClass: "realEstate",
    description: "Diversified portfolio of real estate investment trusts across Asia",
    minInvestment: 200000,
    expectedReturn: 5.8,
    riskRating: 42,
    liquidityScore: 85,
    volatility: 14,
    esgScore: 70,
    minTimeHorizon: "medium",
    features: ["Regular income", "Real estate exposure", "Inflation hedge"],
    suitabilityFactors: ["Income generation", "Real estate preference", "Balanced risk"],
  },
  {
    id: "direct-property-hk",
    name: "Direct Property Investment (HK)",
    category: "Real Estate",
    subcategory: "Direct Real Estate",
    assetClass: "realEstate",
    description: "Direct ownership of premium residential or commercial property in Hong Kong",
    minInvestment: 2000000,
    expectedReturn: 5.2,
    riskRating: 35,
    liquidityScore: 30,
    volatility: 10,
    minTimeHorizon: "perpetual",
    features: ["Long-term appreciation", "Rental income", "Portfolio diversification"],
    suitabilityFactors: ["Wealth preservation", "Low liquidity needs", "Long time horizon"],
  },

  // Private Equity & Alternatives
  {
    id: "mid-market-pe-fund",
    name: "Mid-Market Private Equity Fund",
    category: "Private Equity",
    subcategory: "PE Funds",
    assetClass: "alternatives",
    description: "Diversified exposure to mid-market buyouts and growth investments",
    minInvestment: 1000000,
    expectedReturn: 11.5,
    riskRating: 65,
    liquidityScore: 20,
    volatility: 20,
    esgScore: 60,
    minTimeHorizon: "perpetual",
    features: ["High return potential", "Professional management", "Multi-year lockup"],
    suitabilityFactors: ["Accredited investors", "Long time horizon", "Higher risk tolerance"],
  },
  {
    id: "fine-art-fund",
    name: "Fine Art Fractional Investment",
    category: "Alternatives",
    subcategory: "Collectibles",
    assetClass: "alternatives",
    description: "Fractional ownership in curated contemporary and blue-chip artwork",
    minInvestment: 50000,
    expectedReturn: 9.0,
    riskRating: 62,
    liquidityScore: 50,
    volatility: 16,
    esgScore: 72,
    minTimeHorizon: "long",
    features: ["Diversification", "Aesthetic value", "Historical appreciation"],
    suitabilityFactors: ["Values-aligned", "Portfolio diversification", "Alt exposure"],
  },
  {
    id: "impact-vc-fund",
    name: "Impact Venture Capital Fund",
    category: "Alternatives",
    subcategory: "Venture Capital",
    assetClass: "alternatives",
    description: "Growth equity and venture investments in companies with positive social/environmental impact",
    minInvestment: 500000,
    expectedReturn: 13.2,
    riskRating: 72,
    liquidityScore: 15,
    volatility: 28,
    esgScore: 90,
    minTimeHorizon: "perpetual",
    features: ["Impact-driven", "High growth", "ESG-aligned"],
    suitabilityFactors: ["Impact investors", "Values-driven", "Long horizon", "Higher risk"],
  },

  // Insurance & Wrappers
  {
    id: "universal-life-policy",
    name: "Premium Universal Life (UL) Policy",
    category: "Insurance",
    subcategory: "Life Insurance",
    assetClass: "insurance",
    description: "Flexible life insurance with investment account and tax-efficient wealth transfer",
    minInvestment: 500000,
    expectedReturn: 4.5,
    riskRating: 30,
    liquidityScore: 75,
    volatility: 8,
    minTimeHorizon: "perpetual",
    features: ["Tax efficiency", "Legacy planning", "Liquidity access", "Estate planning"],
    suitabilityFactors: ["Legacy builders", "Tax optimization", "Wealth preservation"],
  },
  {
    id: "variable-ul-policy",
    name: "Variable Universal Life (VUL) Policy",
    category: "Insurance",
    subcategory: "Investment-Linked Insurance",
    assetClass: "insurance",
    description: "Life insurance with market-linked investment options for growth and legacy",
    minInvestment: 300000,
    expectedReturn: 6.5,
    riskRating: 48,
    liquidityScore: 70,
    volatility: 14,
    minTimeHorizon: "long",
    features: ["Growth potential", "Death benefit", "Tax optimization"],
    suitabilityFactors: ["Legacy planning", "Growth-focused", "Tax-efficient investing"],
  },
]

/**
 * Calculate product match score (0-100)
 */
export function calculateProductMatch(
  product: InvestmentProduct,
  wealthProfile: WealthProfile,
  riskProfile: RiskProfile,
  wellnessScores?: WellnessScore,
): number {
  let score = 50 // Base score

  // Risk alignment (most important)
  const riskDifference = Math.abs(product.riskRating - riskProfile.score)
  const riskAlignment = Math.max(0, 40 - riskDifference * 0.5)
  score += riskAlignment

  // Liquidity fit
  const liquidityPreference = 100 - wealthProfile.liquidityNeeds
  const liquidityDifference = Math.abs(product.liquidityScore - liquidityPreference)
  const liquidityFit = Math.max(0, 15 - liquidityDifference * 0.15)
  score += liquidityFit

  // Time horizon alignment
  const horizonScores = {
    short: wealthProfile.timeHorizon === "short" ? 10 : wealthProfile.timeHorizon === "medium" ? 5 : 0,
    medium:
      wealthProfile.timeHorizon === "medium"
        ? 10
        : ["short", "long", "perpetual"].includes(wealthProfile.timeHorizon)
          ? 5
          : 0,
    long: wealthProfile.timeHorizon === "long" ? 10 : wealthProfile.timeHorizon === "perpetual" ? 8 : 5,
    perpetual: wealthProfile.timeHorizon === "perpetual" ? 10 : 0,
  }
  score += horizonScores[product.minTimeHorizon] || 0

  // Goal alignment
  const goalBonus = wealthProfile.investmentGoals.some((g) =>
    product.description.toLowerCase().includes(g.toLowerCase()),
  )
    ? 10
    : 0
  score += goalBonus

  // ESG/Impact alignment for conscious investors
  if (wellnessScores?.spiritual && wellnessScores.spiritual > 65 && wellnessScores.environmental > 60) {
    const esgBonus = product.esgScore ? (product.esgScore / 100) * 15 : 0
    score += esgBonus
  }

  // Investment amount compatibility
  if (wealthProfile.totalAssets < product.minInvestment) {
    score *= 0.7 // Reduce score if underqualified
  }

  return Math.min(100, Math.max(0, score))
}

/**
 * Generate product recommendations
 */
export function generateProductRecommendations(
  wealthProfile: WealthProfile,
  riskProfile: RiskProfile,
  wellnessScores?: WellnessScore,
  limit = 8,
): ProductRecommendation[] {
  const recommendations = PRODUCTS_DATABASE.map((product) => ({
    product,
    matchScore: calculateProductMatch(product, wealthProfile, riskProfile, wellnessScores),
    reasoning: generateRecommendationReasoning(product, wealthProfile, riskProfile),
    priority: determinePriority(product, riskProfile),
  }))
    .filter((rec) => rec.matchScore > 40) // Minimum threshold
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit)

  return recommendations
}

/**
 * Generate human-readable reasoning for recommendation
 */
function generateRecommendationReasoning(
  product: InvestmentProduct,
  wealthProfile: WealthProfile,
  riskProfile: RiskProfile,
): string[] {
  const reasons: string[] = []

  if (Math.abs(product.riskRating - riskProfile.score) < 15) {
    reasons.push("Risk profile alignment")
  }

  if (product.liquidityScore >= 80 && wealthProfile.liquidityNeeds > 30) {
    reasons.push("High liquidity meets your accessibility needs")
  }

  if (
    wealthProfile.investmentGoals.some((g) =>
      product.suitabilityFactors.some((f) => f.toLowerCase().includes(g.toLowerCase())),
    )
  ) {
    reasons.push("Supports stated investment goals")
  }

  if (product.minTimeHorizon === wealthProfile.timeHorizon) {
    reasons.push("Time horizon alignment")
  }

  if (product.expectedReturn > 8) {
    reasons.push("Strong expected returns")
  }

  if (reasons.length === 0) {
    reasons.push("Diversification benefit")
  }

  return reasons
}

/**
 * Determine priority level
 */
function determinePriority(product: InvestmentProduct, riskProfile: RiskProfile): "core" | "satellite" | "alternative" {
  if (product.category === "Equities" || product.category === "Fixed Income") {
    return "core"
  }
  if (product.category === "Real Estate") {
    return riskProfile.score > 50 ? "core" : "satellite"
  }
  return "alternative"
}

/**
 * Calculate optimal allocation across recommended products
 */
export function calculateOptimalAllocation(
  recommendations: ProductRecommendation[],
  totalAmount: number,
): Record<string, number> {
  const allocation: Record<string, number> = {}

  const coreProducts = recommendations.filter((r) => r.priority === "core")
  const satelliteProducts = recommendations.filter((r) => r.priority === "satellite")
  const altProducts = recommendations.filter((r) => r.priority === "alternative")

  // 70% to core, 20% to satellite, 10% to alternatives (standard allocation)
  const coreAmount = totalAmount * 0.7
  const satelliteAmount = totalAmount * 0.2
  const altAmount = totalAmount * 0.1

  // Distribute based on match scores
  const distributeByScore = (products: ProductRecommendation[], amount: number) => {
    const totalScore = products.reduce((sum, p) => sum + p.matchScore, 0)
    products.forEach((product) => {
      const percentage = (product.matchScore / totalScore) * (amount / totalAmount)
      allocation[product.product.id] = percentage * 100
    })
  }

  if (coreProducts.length > 0) distributeByScore(coreProducts, coreAmount)
  if (satelliteProducts.length > 0) distributeByScore(satelliteProducts, satelliteAmount)
  if (altProducts.length > 0) distributeByScore(altProducts, altAmount)

  return allocation
}
