/**
 * Report Generation Utilities
 * Converts assessment data into comprehensive report format
 */

import type { WellnessScore } from "./wellness-scoring"
import type { WealthProfile, RiskProfile } from "./wealth-profiling"
import type { WealthArchetype } from "./wealth-archetypes"
import type { ProductRecommendation } from "./product-recommendations"

export interface HolisticReport {
  id: string
  generatedAt: string
  clientProfile: {
    archetypeName: string
    wellnessScore: number
    riskScore: number
  }
  sections: {
    executive: string
    wellness: WellnessSection
    wealth: WealthSection
    recommendations: RecommendationSection
    implementation: ImplementationSection
  }
}

export interface WellnessSection {
  overallScore: number
  dimensions: Array<{
    name: string
    score: number
    insight: string
  }>
  profile: string
}

export interface WealthSection {
  totalAssets: number
  riskClassification: string
  timeHorizon: string
  keyMetrics: Record<string, number>
}

export interface RecommendationSection {
  archetype: WealthArchetype
  topProducts: ProductRecommendation[]
  suggestedAllocation: Record<string, number>
}

export interface ImplementationSection {
  phases: Phase[]
  nextSteps: string[]
  advisorRecommendations: string[]
}

interface Phase {
  name: string
  duration: string
  objectives: string[]
}

/**
 * Generate comprehensive holistic report
 */
export function generateHolisticReport(
  wellnessScores: WellnessScore,
  wealthProfile: WealthProfile,
  riskProfile: RiskProfile,
  archetype: WealthArchetype,
  recommendations: ProductRecommendation[],
): HolisticReport {
  const overallWellnessScore = Math.round(
    Object.values(wellnessScores).reduce((a, b) => a + b, 0) / Object.keys(wellnessScores).length,
  )

  return {
    id: `heru-report-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    clientProfile: {
      archetypeName: archetype.name,
      wellnessScore: overallWellnessScore,
      riskScore: riskProfile.score,
    },
    sections: {
      executive: generateExecutiveSummary(archetype, overallWellnessScore, riskProfile.score),
      wellness: generateWellnessSection(wellnessScores),
      wealth: generateWealthSection(wealthProfile, riskProfile),
      recommendations: generateRecommendationSection(archetype, recommendations),
      implementation: generateImplementationPlan(archetype, riskProfile),
    },
  }
}

function generateExecutiveSummary(archetype: WealthArchetype, wellnessScore: number, riskScore: number): string {
  return `Your Heru AI diagnostic reveals you as ${archetype.name}. Your holistic wellness score 
    of ${wellnessScore}/100 and risk profile of ${riskScore} indicate a unique wealth 
    archetype combining ${archetype.coreTraits.slice(0, 2).join(" and ")}. This report 
    provides personalized recommendations to optimize your wealth across all dimensions of wellbeing.`
}

function generateWellnessSection(scores: WellnessScore): WellnessSection {
  const dimensions = Object.entries(scores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
    insight: `Your ${key} wellness dimension scored ${value}/100.`,
  }))

  const overallScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length)

  return {
    overallScore,
    dimensions,
    profile: "Balanced",
  }
}

function generateWealthSection(profile: WealthProfile, riskProfile: RiskProfile): WealthSection {
  return {
    totalAssets: profile.totalAssets,
    riskClassification: riskProfile.classification,
    timeHorizon: profile.timeHorizon,
    keyMetrics: {
      annualIncome: profile.annualIncome,
      liquidityNeeds: profile.liquidityNeeds,
      riskScore: riskProfile.score,
    },
  }
}

function generateRecommendationSection(
  archetype: WealthArchetype,
  recommendations: ProductRecommendation[],
): RecommendationSection {
  const allocation: Record<string, number> = {}
  recommendations.forEach((rec, idx) => {
    allocation[rec.product.id] = (100 - idx * 5) / recommendations.length
  })

  return {
    archetype,
    topProducts: recommendations.slice(0, 5),
    suggestedAllocation: allocation,
  }
}

function generateImplementationPlan(archetype: WealthArchetype, riskProfile: RiskProfile): ImplementationSection {
  return {
    phases: [
      {
        name: "Foundation",
        duration: "Months 1-3",
        objectives: ["Establish core holdings", "Implement trust structure", "Begin tax optimization"],
      },
      {
        name: "Build",
        duration: "Months 3-6",
        objectives: ["Add diversification", "Integrate alternatives", "Review and adjust"],
      },
      {
        name: "Optimize",
        duration: "Months 6-12",
        objectives: ["Fine-tune allocation", "Maximize tax efficiency", "Align with archetype"],
      },
      {
        name: "Sustain",
        duration: "Year 2+",
        objectives: ["Ongoing governance", "Annual review", "Adapt to life changes"],
      },
    ],
    nextSteps: [
      "Schedule consultation with Heru AI advisor",
      "Review product recommendations in detail",
      "Discuss trust and structural options",
      "Begin implementation of Phase 1",
    ],
    advisorRecommendations: archetype.recommendedActions,
  }
}
