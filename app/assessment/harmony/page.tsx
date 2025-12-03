"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { HeruHeader } from "@/components/heru-header"
import { SacredGeometryFrame } from "@/components/sacred-geometry-frame"
import { ButtonPremium } from "@/components/button-premium"
import { HarmonyWheel } from "@/components/harmony-wheel"
import { AssetAllocationChart } from "@/components/asset-allocation-chart"
import {
  calculateWellnessInsights,
  calculateOverallScore,
  getWellnessProfile,
  type WellnessScore,
} from "@/lib/wellness-scoring"
import { calculateRiskProfile, calculatePriorityWeighting, type WealthProfile } from "@/lib/wealth-profiling"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default function HarmonyPage() {
  const searchParams = useSearchParams()
  const [wellnessScores, setWellnessScores] = useState<WellnessScore>({
    financial: 72,
    physical: 68,
    emotional: 65,
    social: 70,
    intellectual: 78,
    occupational: 75,
    environmental: 62,
    spiritual: 58,
  })

  const [wealthProfile, setWealthProfile] = useState<WealthProfile>({
    totalAssets: 2500000,
    annualIncome: 500000,
    timeHorizon: "long",
    riskAppetite: 65,
    liquidityNeeds: 25,
    investmentGoals: ["Wealth Preservation", "Capital Growth", "Legacy Building"],
    priorities: {
      growth: 35,
      stability: 25,
      liquidity: 15,
      legacy: 20,
      taxOptimization: 5,
    },
  })

  // Derive insights
  const wellnessInsights = calculateWellnessInsights(wellnessScores)
  const overallWellnessScore = calculateOverallScore(wellnessScores)
  const { profile: wellnessProfile } = getWellnessProfile(wellnessScores)
  const riskProfile = calculateRiskProfile(wealthProfile)
  const priorityWeights = calculatePriorityWeighting(wealthProfile)

  return (
    <div className="min-h-screen bg-background">
      <HeruHeader />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground">Your Heru Harmony</h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              A comprehensive view of your holistic wellness and wealth profile.
            </p>
          </div>

          {/* Layer 1: Harmony Wheel */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">The Harmony Wheel</h2>
              <p className="text-foreground-muted">Your wellness across eight dimensions of holistic living</p>
            </div>

            <SacredGeometryFrame>
              <div className="flex justify-center">
                <HarmonyWheel scores={wellnessScores} size={500} />
              </div>
            </SacredGeometryFrame>

            {/* Wellness Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              {wellnessInsights.map((insight, i) => (
                <div key={i} className="bg-surface-alt border border-border-light rounded-lg p-6 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-display font-semibold text-foreground">{insight.dimension}</h4>
                      <p className="text-sm text-foreground-muted mt-1">{insight.insight}</p>
                    </div>
                    <span className="text-3xl font-display font-bold text-accent-gold">{insight.score}</span>
                  </div>
                  <p className="text-sm text-foreground-muted border-t border-border-light pt-3">
                    <strong>Suggestion:</strong> {insight.suggestion}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Layer 2: Wealth Archetype Preview */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Your Wealth Profile</h2>
              <p className="text-foreground-muted">Risk classification and foundational metrics</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Overall Wellness Score */}
              <SacredGeometryFrame>
                <div className="text-center space-y-3">
                  <p className="text-sm text-foreground-muted uppercase tracking-widest">Overall Wellness</p>
                  <div className="text-6xl font-display font-bold text-accent-gold">{overallWellnessScore}</div>
                  <p className="text-foreground-muted">{wellnessProfile}</p>
                </div>
              </SacredGeometryFrame>

              {/* Risk Classification */}
              <SacredGeometryFrame>
                <div className="text-center space-y-3">
                  <p className="text-sm text-foreground-muted uppercase tracking-widest">Risk Profile</p>
                  <div className="text-6xl font-display font-bold text-accent-gold">{riskProfile.score}</div>
                  <p className="text-foreground-muted capitalize">{riskProfile.classification}</p>
                </div>
              </SacredGeometryFrame>

              {/* Asset Base */}
              <SacredGeometryFrame>
                <div className="text-center space-y-3">
                  <p className="text-sm text-foreground-muted uppercase tracking-widest">Total Assets</p>
                  <div className="text-2xl font-display font-bold text-accent-gold">
                    HKD {(wealthProfile.totalAssets / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-foreground-muted text-sm">
                    Annual Income: HKD {(wealthProfile.annualIncome / 1000).toFixed(0)}K
                  </p>
                </div>
              </SacredGeometryFrame>
            </div>
          </section>

          {/* Layer 3: Portfolio Allocation Preview */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Recommended Asset Allocation</h2>
              <p className="text-foreground-muted">Based on your risk profile and investment goals</p>
            </div>

            <SacredGeometryFrame>
              <div className="flex justify-center">
                <AssetAllocationChart allocation={riskProfile.recommendedAllocation} size={350} />
              </div>
            </SacredGeometryFrame>
          </section>

          {/* Call to Action */}
          <section className="text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-display font-bold text-foreground">Discover Your Archetype</h2>
              <p className="text-foreground-muted max-w-2xl mx-auto">
                View your personalized wealth archetype, product recommendations, and complete dashboard.
              </p>
            </div>

            <Link href="/dashboard">
              <ButtonPremium size="lg" variant="gold">
                View Complete Dashboard →
              </ButtonPremium>
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
