/**
 * Heru AI Wealth Archetype Classification System
 * Maps wellness patterns + financial profiles to archetypal wealth identities
 */

import type { WellnessScore } from "./wellness-scoring"
import type { WealthProfile } from "./wealth-profiling"

export interface WealthArchetype {
  id: string
  name: string
  emoji: string
  coreTraits: string[]
  description: string
  growthOpportunities: string[]
  moneyEnergyPattern: string
  idealAssetStyle: string[]
  philosophicalAlignment: string
  recommendedActions: string[]
}

export const WEALTH_ARCHETYPES: Record<string, WealthArchetype> = {
  legacySovereign: {
    id: "legacy-sovereign",
    name: "The Legacy Sovereign",
    emoji: "👑",
    coreTraits: [
      "Visionary steward",
      "Multi-generational thinker",
      "Values-aligned",
      "Strategic advisor",
      "Transformative impact",
    ],
    description: `You embody the conscious steward of wealth across generations. Your focus extends beyond personal prosperity to 
      creating lasting impact and meaningful legacy. You balance growth with stability, always viewing wealth through the lens of 
      responsibility and wisdom.`,
    growthOpportunities: [
      "Family governance and succession planning",
      "Impact investing alignment with family values",
      "Structured wealth transfer optimization",
      "Philanthropic strategy integration",
      "Next-generation wealth education",
    ],
    moneyEnergyPattern: "Wealth as a tool for lineage building, values transmission, and conscious impact.",
    idealAssetStyle: [
      "Diversified equities with ESG focus",
      "Direct real estate with long-term hold",
      "Private equity aligned with values",
      "Impact funds and social enterprises",
      "Trust structures and alternative vehicles",
    ],
    philosophicalAlignment: "Living well, investing wisely, leaving well.",
    recommendedActions: [
      "Engage wealth advisor for multi-generational planning",
      "Establish family office or advisory infrastructure",
      "Align portfolio with family mission and values",
      "Explore trust and legacy structures",
      "Develop impact investing strategy",
    ],
  },

  visionaryBuilder: {
    id: "visionary-builder",
    name: "The Visionary Builder",
    emoji: "🚀",
    coreTraits: [
      "Entrepreneurial mindset",
      "Growth-oriented",
      "Innovative thinker",
      "Risk-capable",
      "Opportunity seeker",
    ],
    description: `You are the architect of expansion. Your wealth serves as capital for growth, innovation, and new possibilities. 
      You thrive on building, scaling, and creating value. Your portfolio mirrors your ambitious vision—leveraging growth assets 
      while maintaining strategic optionality.`,
    growthOpportunities: [
      "Venture capital and growth equity participation",
      "Startup ecosystem engagement",
      "Business ownership and diversification",
      "Strategic acquisitions and consolidation",
      "Technology and innovation exposure",
    ],
    moneyEnergyPattern: "Wealth as an engine for creation, growth, and transformative ventures.",
    idealAssetStyle: [
      "Growth equities and tech-focused funds",
      "Private equity and venture capital",
      "Business ownership stakes",
      "Emerging market exposure",
      "Real estate development projects",
    ],
    philosophicalAlignment: "Building forward, scaling wisely, creating legacy through enterprise.",
    recommendedActions: [
      "Develop venture capital allocation strategy",
      "Diversify across business interests",
      "Implement systematic wealth extraction plan",
      "Build professional advisor network",
      "Focus on exit planning for key investments",
    ],
  },

  harmoniousStrategist: {
    id: "harmonious-strategist",
    name: "The Harmonious Strategist",
    emoji: "⚖️",
    coreTraits: [
      "Balanced perspective",
      "Analytical mindset",
      "Systematic optimizer",
      "Holistic integrator",
      "Measured wisdom",
    ],
    description: `You understand that true wealth is balance. You seek harmony across all dimensions—financial growth alongside 
      personal wellbeing, risk management paired with opportunity, preservation balanced with growth. Your strategy reflects a 
      sophisticated understanding that prosperity requires integration.`,
    growthOpportunities: [
      "Systematic rebalancing protocols",
      "Tax-optimized allocation strategies",
      "Integrated financial planning",
      "Sustainable yield generation",
      "Risk-adjusted return maximization",
    ],
    moneyEnergyPattern: "Wealth as a balanced ecosystem supporting multiple life dimensions and objectives.",
    idealAssetStyle: [
      "Balanced multi-asset portfolios",
      "Dividend-yielding equities",
      "Investment-grade bonds",
      "Real estate income properties",
      "Diversified alternative funds",
    ],
    philosophicalAlignment: "Balance, wisdom, systematic optimization across life and wealth.",
    recommendedActions: [
      "Establish comprehensive financial plan",
      "Implement quarterly review and rebalancing",
      "Optimize tax strategy across holdings",
      "Develop income generation plan",
      "Build integrated advisory team",
    ],
  },

  consciousCreator: {
    id: "conscious-creator",
    name: "The Conscious Creator",
    emoji: "🌱",
    coreTraits: ["Purpose-driven", "Impact-focused", "Meaning-seeker", "Values-aligned", "Social conscious"],
    description: `Your wealth is inseparable from purpose. You seek to create positive change through conscious choices, from 
      investment selections to lifestyle decisions. Every dollar reflects your values. You understand that true prosperity integrates 
      financial success with positive impact on people and planet.`,
    growthOpportunities: [
      "Impact investing and ESG strategies",
      "Social enterprise support",
      "Environmental restoration projects",
      "Community development initiatives",
      "Conscious brand and company backing",
    ],
    moneyEnergyPattern: "Wealth as a force for conscious evolution and regenerative impact.",
    idealAssetStyle: [
      "ESG-focused equity funds",
      "Impact-directed private equity",
      "Sustainable real estate projects",
      "Social enterprise investments",
      "Environmental restoration funds",
    ],
    philosophicalAlignment: "Conscious prosperity, regenerative wealth, values-aligned growth.",
    recommendedActions: [
      "Develop comprehensive impact strategy",
      "Audit portfolio for values alignment",
      "Allocate portion to impact investing",
      "Engage in steward networks",
      "Support mission-aligned organizations",
    ],
  },

  guardianOfStability: {
    id: "guardian-of-stability",
    name: "The Guardian of Stability",
    emoji: "🛡️",
    coreTraits: ["Risk-conscious", "Security-focused", "Protective instinct", "Steady hand", "Prudent steward"],
    description: `You prioritize protection and stability. Your wealth serves as a foundation—solid, secure, and enduring. You 
      understand the value of preservation and prudent management. Your portfolio reflects a measured approach that prioritizes 
      downside protection and reliable income over aggressive growth.`,
    growthOpportunities: [
      "Strategic yield optimization",
      "Diversified fixed income strategies",
      "Alternative stability vehicles",
      "Insurance and protection structures",
      "Emergency fund optimization",
    ],
    moneyEnergyPattern: "Wealth as a secure foundation, weathering volatility with calm wisdom.",
    idealAssetStyle: [
      "High-quality dividend stocks",
      "Investment-grade bonds",
      "Secure real estate income",
      "Treasury and government bonds",
      "Stable alternative income",
    ],
    philosophicalAlignment: "Stability, security, measured wisdom, protecting what matters.",
    recommendedActions: [
      "Build comprehensive risk management plan",
      "Optimize income-generating assets",
      "Establish diversified bond allocation",
      "Implement insurance strategy",
      "Focus on capital preservation",
    ],
  },
}

/**
 * Classify archetype based on wellness + wealth patterns
 */
export function classifyWealthArchetype(
  wellnessScores: WellnessScore,
  wealthProfile: WealthProfile,
): { archetype: WealthArchetype; confidence: number; reasoning: string[] } {
  const scores = Object.values(wellnessScores)
  const avgWellness = scores.reduce((a, b) => a + b, 0) / scores.length

  const reasoning: string[] = []
  let archetypeId = "harmonious-strategist" // Default fallback

  // Analyze patterns
  const highSpiritual = wellnessScores.spiritual > 70
  const highOccupational = wellnessScores.occupational > 70
  const highIntellectual = wellnessScores.intellectual > 70
  const highEnvironmental = wellnessScores.environmental > 70
  const highEmotional = wellnessScores.emotional > 70
  const lowLiquidity = wealthProfile.liquidityNeeds < 30
  const highTimeHorizon = wealthProfile.timeHorizon === "long" || wealthProfile.timeHorizon === "perpetual"
  const hasLegacyGoal = wealthProfile.investmentGoals.includes("Legacy Building")
  const highLegacyPriority = wealthProfile.priorities.legacy > 25

  // Classification Logic
  if ((highSpiritual || highEmotional) && highEnvironmental && wealthProfile.impactFocus) {
    archetypeId = "conscious-creator"
    reasoning.push("Strong spiritual and environmental wellness with impact focus")
    reasoning.push("Values-aligned investment preferences")
  } else if (highLegacyPriority && highTimeHorizon && hasLegacyGoal) {
    archetypeId = "legacy-sovereign"
    reasoning.push("Multi-generational time horizon with legacy prioritization")
    reasoning.push("Emphasis on structured wealth transmission")
  } else if (highOccupational && highIntellectual && wealthProfile.riskAppetite > 65) {
    archetypeId = "visionary-builder"
    reasoning.push("High occupational engagement with strong intellectual pursuits")
    reasoning.push("Risk-capable profile aligned with growth objectives")
  } else if (
    wellnessScores.financial > 75 &&
    wellnessScores.physical > 70 &&
    wealthProfile.priorities.stability >= wealthProfile.priorities.growth
  ) {
    archetypeId = "harmonious-strategist"
    reasoning.push("Balanced wellness profile across multiple dimensions")
    reasoning.push("Preference for stability and systematic optimization")
  } else if (
    wealthProfile.liquidityNeeds > 50 ||
    wealthProfile.riskAppetite < 40 ||
    wealthProfile.priorities.stability > 30
  ) {
    archetypeId = "guardian-of-stability"
    reasoning.push("Risk-conscious approach with emphasis on security")
    reasoning.push("High priority on capital preservation and accessibility")
  }

  const archetype = WEALTH_ARCHETYPES[archetypeId]
  const confidence = Math.min(0.95, 0.6 + (Math.abs(avgWellness - 50) / 100) * 0.35)

  return {
    archetype,
    confidence: Math.round(confidence * 100),
    reasoning,
  }
}

/**
 * Get personalized archetype insights
 */
export function getArchetypeInsights(archetype: WealthArchetype) {
  return {
    philosophy: `As ${archetype.name}, you embody ${archetype.coreTraits.join(", ")}.`,
    moneyPsychology: archetype.moneyEnergyPattern,
    strategicPath: `Your optimal path involves: ${archetype.recommendedActions.slice(0, 2).join(", ")}.`,
    nextSteps: archetype.recommendedActions,
  }
}
