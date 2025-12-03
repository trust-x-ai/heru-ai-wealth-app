"use client"

import { useMemo } from "react"
import { ButtonPremium } from "@/components/button-premium"
import { Card } from "@/components/ui/card"
import { HarmonyWheel } from "@/components/harmony-wheel"
import { WEALTH_ARCHETYPES } from "@/lib/wealth-archetypes"
import { calculateWellnessInsights } from "@/lib/wellness-scoring"
import type { ClientProfile } from "@/lib/assessment-data"
import type { WellnessScore } from "@/lib/wellness-scoring"

interface ResultsStepProps {
  clientProfile: ClientProfile
  archetypeScores: Record<string, number>
  wellnessScores: WellnessScore
  onRestart: () => void
}

export function ResultsStep({ clientProfile, archetypeScores, wellnessScores, onRestart }: ResultsStepProps) {
  const determinedArchetypeId = useMemo(() => {
    let maxScore = 0
    let maxArchetype = "harmoniousStrategist"
    for (const [archetypeId, score] of Object.entries(archetypeScores)) {
      if (score > maxScore) {
        maxScore = score
        maxArchetype = archetypeId
      }
    }
    return maxArchetype
  }, [archetypeScores])

  const archetypeKey = determinedArchetypeId.split("-").reduce((acc, word, idx) => {
    if (idx === 0) return word
    return acc + word.charAt(0).toUpperCase() + word.slice(1)
  })
  const archetype = WEALTH_ARCHETYPES[archetypeKey as keyof typeof WEALTH_ARCHETYPES]

  const totalWealth = clientProfile.totalWealth
  const assetPercentages = {
    equities: (clientProfile.existingWealth.equities / totalWealth) * 100 || 0,
    fixedIncome: (clientProfile.existingWealth.fixedIncome / totalWealth) * 100 || 0,
    realEstate: (clientProfile.existingWealth.realEstate / totalWealth) * 100 || 0,
    privateEquity: (clientProfile.existingWealth.privateEquity / totalWealth) * 100 || 0,
    alternatives: (clientProfile.existingWealth.alternatives / totalWealth) * 100 || 0,
    cash: (clientProfile.existingWealth.cash / totalWealth) * 100 || 0,
    insurance: (clientProfile.existingWealth.insurance / totalWealth) * 100 || 0,
  }

  const riskScore = useMemo(() => {
    const archetypeRiskMap = {
      legacySovereign: 45,
      visionaryBuilder: 75,
      harmoniousStrategist: 55,
      consciousCreator: 50,
      guardianOfStability: 30,
    }
    const archetypeRisk = archetypeRiskMap[determinedArchetypeId as keyof typeof archetypeRiskMap] || 50
    const wellnessModifier = (wellnessScores.overall - 50) / 10
    return Math.max(20, Math.min(95, archetypeRisk + wellnessModifier))
  }, [determinedArchetypeId, wellnessScores])

  const wellnessInsights = useMemo(() => calculateWellnessInsights(wellnessScores), [wellnessScores])

  const wrapperRecommendations = useMemo(() => {
    const recommendations = []

    // Determine wrapper needs based on archetype, age, dependents, wealth
    if (determinedArchetypeId === "legacySovereign" || (clientProfile.dependents > 0 && clientProfile.age > 40)) {
      recommendations.push({
        type: "Family Trust",
        matchScore: 92,
        description: "Multi-generational wealth transfer with tax efficiency",
        benefits: [
          "Structured succession planning",
          "Asset protection for heirs",
          "Tax optimization across generations",
          "Family governance framework",
        ],
      })
    }

    if (
      totalWealth > 5000000 &&
      (determinedArchetypeId === "visionaryBuilder" || determinedArchetypeId === "legacySovereign")
    ) {
      recommendations.push({
        type: "Universal Life Insurance Policy",
        matchScore: 88,
        description: "Tax-efficient wealth transfer and liquidity management",
        benefits: [
          "Tax-deferred growth on cash values",
          "Flexible premium and withdrawal options",
          "Death benefit provides liquidity",
          "Estate planning efficiency",
        ],
      })
    }

    if (determinedArchetypeId === "harmoniousStrategist" || determinedArchetypeId === "consciousCreator") {
      recommendations.push({
        type: "Hybrid Wrapper Structure",
        matchScore: 85,
        description: "Combined trust and insurance for balanced wealth management",
        benefits: [
          "Flexibility in asset management",
          "Dual layer of asset protection",
          "Multiple objectives alignment",
          "Tax and succession optimization",
        ],
      })
    }

    if (clientProfile.age >= 50 && totalWealth > 3000000) {
      recommendations.push({
        type: "Charitable Trust / Donor Advised Fund",
        matchScore: 80,
        description: "Philanthropic strategy with tax benefits for impact-focused clients",
        benefits: [
          "Immediate tax deduction",
          "Sustained charitable impact",
          "Strategic giving over time",
          "Family legacy through values",
        ],
      })
    }

    return recommendations
  }, [determinedArchetypeId, clientProfile.dependents, clientProfile.age, totalWealth])

  if (!archetype) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-foreground-muted">Unable to load archetype details. Please try again.</p>
        <button
          onClick={onRestart}
          className="mt-4 px-8 py-3 border border-accent-gold text-accent-gold rounded-lg font-medium hover:bg-accent-gold hover:text-black transition-all"
        >
          Start Over
        </button>
      </div>
    )
  }

  const overallWellnessScore = wellnessInsights.overall

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">Your Holistic Wealth Profile</h1>
        <p className="text-lg text-foreground-muted">
          Personalized insights for {clientProfile.name}, age {clientProfile.age}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 border border-accent-gold bg-surface">
          <p className="text-sm text-foreground-muted mb-2">Total Wealth</p>
          <p className="text-2xl font-display font-bold text-accent-gold">HKD {(totalWealth / 1000000).toFixed(1)}M</p>
        </Card>

        <Card className="p-6 border border-accent-gold bg-surface">
          <p className="text-sm text-foreground-muted mb-2">Overall Wellness</p>
          <p className="text-2xl font-display font-bold text-accent-gold">{overallWellnessScore}/100</p>
        </Card>

        <Card className="p-6 border border-accent-gold bg-surface">
          <p className="text-sm text-foreground-muted mb-2">Risk Profile</p>
          <p className="text-2xl font-display font-bold text-accent-gold">{Math.round(riskScore)}/100</p>
        </Card>

        <Card className="p-6 border border-accent-gold bg-surface">
          <p className="text-sm text-foreground-muted mb-2">Dependents</p>
          <p className="text-2xl font-display font-bold text-accent-gold">{clientProfile.dependents}</p>
        </Card>
      </div>

      {/* Wealth Archetype */}
      <Card className="p-8 border border-border-light bg-surface">
        <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
          Your Wealth Archetype: {archetype.emoji} {archetype.name}
        </h2>

        <p className="text-lg text-foreground-muted mb-6">{archetype.description}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-display font-semibold text-accent-gold mb-4">Core Traits</h3>
            <ul className="space-y-2">
              {archetype.coreTraits.map((trait, idx) => (
                <li key={idx} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent-gold" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold text-accent-gold mb-4">Ideal Asset Style</h3>
            <ul className="space-y-2">
              {archetype.idealAssetStyle.map((asset, idx) => (
                <li key={idx} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent-gold" />
                  {asset}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Current Wealth Composition */}
      <Card className="p-8 border border-border-light bg-surface">
        <h2 className="text-2xl font-display font-semibold text-foreground mb-6">Current Wealth Composition</h2>

        <div className="space-y-4">
          {Object.entries(assetPercentages).map(([asset, percentage]) => {
            if (percentage === 0) return null
            return (
              <div key={asset} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium capitalize">{asset}</span>
                  <span className="text-accent-gold font-bold">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 bg-background rounded-full border border-border-light overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-gold to-accent-emerald"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Wellness Insights */}
      <Card className="p-8 border border-border-light bg-surface">
        <h2 className="text-2xl font-display font-semibold text-foreground mb-6">Wellness Harmony Score</h2>

        <div className="flex flex-col items-center">
          <HarmonyWheel scores={wellnessScores} size={400} />
        </div>

        {/* Detailed insights below chart */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {wellnessInsights.map((insight) => (
            <div key={insight.dimension} className="p-4 rounded-lg bg-background border border-border-light">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium text-foreground">{insight.dimension}</h3>
                <span className="text-2xl font-bold text-accent-gold">{insight.score}</span>
              </div>
              <p className="text-sm text-foreground-muted mb-2">{insight.insight}</p>
              <p className="text-xs text-accent-gold">{insight.suggestion}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Wrapper Recommendations */}
      <Card className="p-8 border border-accent-gold bg-surface">
        <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
          <span className="text-accent-gold">✨ AI-Powered Wealth Structure Recommendations</span>
        </h2>
        <p className="text-sm text-foreground-muted mb-6">
          Based on your profile, archetype, and wellness patterns, we recommend these tax-efficient wrappers for HNW
          clients:
        </p>

        <div className="space-y-4">
          {wrapperRecommendations.length > 0 ? (
            wrapperRecommendations.map((rec, idx) => (
              <div key={idx} className="p-6 border border-border-light rounded-lg bg-background">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-display font-semibold text-foreground">{rec.type}</h3>
                  <div className="text-right">
                    <p className="text-xs text-foreground-muted mb-1">Match Score</p>
                    <p className="text-2xl font-bold text-accent-gold">{rec.matchScore}%</p>
                  </div>
                </div>

                <p className="text-foreground mb-4">{rec.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-accent-gold">Key Benefits:</p>
                  <ul className="space-y-2">
                    {rec.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-accent-gold mt-1">→</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-foreground-muted">
              We recommend consulting with a wealth advisor to discuss optimal structures for your specific situation.
            </p>
          )}
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-8 border border-border-light bg-surface">
        <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Recommended Next Steps</h2>

        <ol className="space-y-4">
          {[
            "Schedule consultation with Heru AI wealth advisor to discuss recommendations",
            "Review and prioritize recommended wealth structure options",
            `Develop implementation roadmap for ${archetype.name} strategy`,
            "Begin integration of wellness insights into your financial decisions",
          ].map((step, idx) => (
            <li key={idx} className="flex gap-4">
              <div className="min-w-8 w-8 h-8 rounded-full bg-accent-gold text-black flex items-center justify-center font-display font-bold">
                {idx + 1}
              </div>
              <span className="text-foreground pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </Card>

      {/* CTA */}
      <div className="flex gap-4 justify-center flex-wrap">
        <ButtonPremium size="lg" variant="gold">
          Schedule Advisor Consultation
        </ButtonPremium>
        <button
          onClick={onRestart}
          className="px-8 py-3 border border-accent-gold text-accent-gold rounded-lg font-medium hover:bg-accent-gold hover:text-black transition-all"
        >
          Start Over
        </button>
      </div>
    </div>
  )
}
