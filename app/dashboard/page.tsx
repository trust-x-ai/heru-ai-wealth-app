"use client"

import { useState } from "react"
import { HeruHeader } from "@/components/heru-header"
import { ArchetypeCard } from "@/components/archetype-card"
import { ButtonPremium } from "@/components/button-premium"
import { SacredGeometryFrame } from "@/components/sacred-geometry-frame"
import { classifyWealthArchetype, getArchetypeInsights, WEALTH_ARCHETYPES } from "@/lib/wealth-archetypes"
import type { WellnessScore } from "@/lib/wellness-scoring"
import type { WealthProfile } from "@/lib/wealth-profiling"

// Mock data - in real app, would come from user session/API
const MOCK_WELLNESS_SCORES: WellnessScore = {
  financial: 76,
  physical: 72,
  emotional: 68,
  social: 74,
  intellectual: 82,
  occupational: 78,
  environmental: 65,
  spiritual: 72,
}

const MOCK_WEALTH_PROFILE: WealthProfile = {
  totalAssets: 3500000,
  annualIncome: 650000,
  timeHorizon: "long",
  riskAppetite: 68,
  liquidityNeeds: 20,
  investmentGoals: ["Wealth Preservation", "Capital Growth", "Legacy Building"],
  priorities: {
    growth: 35,
    stability: 20,
    liquidity: 15,
    legacy: 25,
    taxOptimization: 5,
  },
}

export default function DashboardPage() {
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null)

  // Classify archetype
  const classification = classifyWealthArchetype(MOCK_WELLNESS_SCORES, MOCK_WEALTH_PROFILE)
  const archetype = classification.archetype
  const insights = getArchetypeInsights(archetype)

  return (
    <div className="min-h-screen bg-background">
      <HeruHeader />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-6xl font-display font-bold text-foreground">Your Wealth Archetype</h1>
            <p className="text-xl text-foreground-muted max-w-3xl">
              Based on your holistic wellness and financial profile, you are classified as:
            </p>
          </div>

          {/* Primary Archetype Display */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ArchetypeCard archetype={archetype} confidence={classification.confidence} isActive={true} />
            </div>

            <div className="space-y-6">
              {/* Classification Reasoning */}
              <div className="space-y-3">
                <h2 className="text-2xl font-display font-bold text-foreground">Why This Archetype?</h2>
                <ul className="space-y-2">
                  {classification.reasoning.map((reason, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent-gold font-bold">✓</span>
                      <span className="text-foreground-muted">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Insights */}
              <SacredGeometryFrame>
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-foreground">Core Philosophy</h3>
                  <p className="text-foreground-muted leading-relaxed">{insights.philosophy}</p>

                  <div className="border-t border-border-light pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Your Money Energy</h4>
                    <p className="text-foreground-muted italic">"{insights.moneyPsychology}"</p>
                  </div>

                  <div className="border-t border-border-light pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Strategic Direction</h4>
                    <p className="text-foreground-muted">{insights.strategicPath}</p>
                  </div>
                </div>
              </SacredGeometryFrame>
            </div>
          </div>

          {/* Growth Opportunities */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Growth Opportunities</h2>
              <p className="text-foreground-muted">Areas where you can deepen and evolve your wealth strategy:</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {archetype.growthOpportunities.map((opportunity, i) => (
                <div
                  key={i}
                  className="bg-surface-alt border border-border-light rounded-lg p-5 hover:border-accent-gold transition-smooth"
                >
                  <div className="flex gap-3">
                    <div className="text-2xl">→</div>
                    <p className="text-foreground font-semibold leading-snug">{opportunity}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Actions */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Your Next Steps</h2>
              <p className="text-foreground-muted">Personalized recommendations aligned with your archetype:</p>
            </div>

            <div className="space-y-3">
              {insights.nextSteps.map((action, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-surface-alt border border-border-light rounded-lg hover:border-accent-gold transition-smooth cursor-pointer"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center font-display font-bold text-accent-gold">
                    {i + 1}
                  </div>
                  <p className="text-foreground leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Other Archetypes */}
          <section className="space-y-6 pt-8 border-t border-border-light">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Other Archetypes</h2>
              <p className="text-foreground-muted">Explore alternative wealth identities and their characteristics:</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(WEALTH_ARCHETYPES)
                .filter((a) => a.id !== archetype.id)
                .map((otherArchetype) => (
                  <ArchetypeCard
                    key={otherArchetype.id}
                    archetype={otherArchetype}
                    confidence={undefined}
                    isActive={selectedArchetype === otherArchetype.id}
                    onClick={() =>
                      setSelectedArchetype(selectedArchetype === otherArchetype.id ? null : otherArchetype.id)
                    }
                  />
                ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 pt-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-display font-bold text-foreground">Ready to Execute Your Strategy?</h2>
              <p className="text-foreground-muted max-w-2xl mx-auto">
                Connect with a Heru AI advisor to develop your personalized wealth and wellness integration plan.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <ButtonPremium size="lg" variant="gold">
                Schedule Consultation
              </ButtonPremium>
              <ButtonPremium size="lg" variant="outline">
                Download Report
              </ButtonPremium>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
