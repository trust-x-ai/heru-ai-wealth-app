"use client"

import { useState } from "react"
import { HeruHeader } from "@/components/heru-header"
import { SacredGeometryFrame } from "@/components/sacred-geometry-frame"
import { ButtonPremium } from "@/components/button-premium"
import { ProductRecommendationCard } from "@/components/product-recommendation-card"
import { AssetAllocationChart } from "@/components/asset-allocation-chart"
import { generateProductRecommendations, calculateOptimalAllocation } from "@/lib/product-recommendations"
import { calculateRiskProfile, type WealthProfile } from "@/lib/wealth-profiling"
import type { WellnessScore } from "@/lib/wellness-scoring"
import Link from "next/link"

// Mock data
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

export default function ProductRecommendationsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const riskProfile = calculateRiskProfile(MOCK_WEALTH_PROFILE)
  const recommendations = generateProductRecommendations(MOCK_WEALTH_PROFILE, riskProfile, MOCK_WELLNESS_SCORES, 8)

  const optimalAllocation = calculateOptimalAllocation(recommendations, MOCK_WEALTH_PROFILE.totalAssets)

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <HeruHeader />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-6xl font-display font-bold text-foreground">Personalized Product Recommendations</h1>
            <p className="text-xl text-foreground-muted max-w-3xl">
              Eight carefully selected investment vehicles aligned with your risk profile, goals, and values. Each is
              scored for suitability to your unique situation.
            </p>
          </div>

          {/* Recommended Products */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Recommended Investments</h2>
              <p className="text-foreground-muted">Sorted by match score to your profile</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((recommendation) => (
                <ProductRecommendationCard
                  key={recommendation.product.id}
                  recommendation={recommendation}
                  onSelect={() => toggleProductSelection(recommendation.product.id)}
                />
              ))}
            </div>
          </section>

          {/* Optimal Allocation */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Suggested Portfolio Allocation</h2>
              <p className="text-foreground-muted">
                HKD {(MOCK_WEALTH_PROFILE.totalAssets / 1000000).toFixed(1)}M across {recommendations.length} vehicles
              </p>
            </div>

            <SacredGeometryFrame>
              <div className="flex justify-center">
                <AssetAllocationChart allocation={optimalAllocation} size={400} />
              </div>
            </SacredGeometryFrame>

            {/* Allocation Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations
                .sort((a, b) => optimalAllocation[b.product.id] - optimalAllocation[a.product.id])
                .slice(0, 8)
                .map((rec) => (
                  <div key={rec.product.id} className="bg-surface-alt border border-border-light rounded-lg p-4">
                    <p className="text-sm text-foreground-muted mb-2">{rec.product.name}</p>
                    <div className="space-y-2">
                      <p className="text-2xl font-display font-bold text-accent-gold">
                        {optimalAllocation[rec.product.id]?.toFixed(1)}%
                      </p>
                      <p className="text-xs text-foreground-muted">
                        HKD{" "}
                        {(
                          (MOCK_WEALTH_PROFILE.totalAssets * (optimalAllocation[rec.product.id] / 100)) /
                          1000000
                        ).toFixed(2)}
                        M
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Wealth Structures */}
          <section className="space-y-6 pt-8 border-t border-border-light">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Wealth Structures & Optimization</h2>
              <p className="text-foreground-muted">Premium structural wrappers designed for HNW clients</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Trust Structure */}
              <SacredGeometryFrame>
                <div className="space-y-4">
                  <div className="text-4xl mb-3">📜</div>
                  <h3 className="text-2xl font-display font-bold text-foreground">Trust Structure</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Establish a discretionary trust to optimize tax efficiency, provide family governance, and enable
                    flexible wealth distribution across generations.
                  </p>
                  <ul className="space-y-2 border-t border-border-light pt-4">
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Estate planning efficiency</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Tax optimization</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Legacy continuity</span>
                    </li>
                  </ul>
                </div>
              </SacredGeometryFrame>

              {/* Universal Life Insurance */}
              <SacredGeometryFrame>
                <div className="space-y-4">
                  <div className="text-4xl mb-3">🛡️</div>
                  <h3 className="text-2xl font-display font-bold text-foreground">Universal Life Policy</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Premium UL vehicles offer tax-efficient wealth accumulation, death benefit protection, and access to
                    policy values during your lifetime.
                  </p>
                  <ul className="space-y-2 border-t border-border-light pt-4">
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Tax-deferred growth</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Death benefit leverage</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Policy loans</span>
                    </li>
                  </ul>
                </div>
              </SacredGeometryFrame>

              {/* Family Office */}
              <SacredGeometryFrame>
                <div className="space-y-4">
                  <div className="text-4xl mb-3">👨‍💼</div>
                  <h3 className="text-2xl font-display font-bold text-foreground">Family Office Setup</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Establish a single or multi-family office infrastructure for centralized wealth management,
                    governance, and multi-generational coordination.
                  </p>
                  <ul className="space-y-2 border-t border-border-light pt-4">
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Centralized management</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Governance framework</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Next-gen education</span>
                    </li>
                  </ul>
                </div>
              </SacredGeometryFrame>

              {/* Hybrid Wrapper */}
              <SacredGeometryFrame>
                <div className="space-y-4">
                  <div className="text-4xl mb-3">🔀</div>
                  <h3 className="text-2xl font-display font-bold text-foreground">Hybrid Wrapper</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Combine multiple structures (trust + UL + corporate vehicle) to create a customized tax and estate
                    planning solution aligned with your objectives.
                  </p>
                  <ul className="space-y-2 border-t border-border-light pt-4">
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Maximum flexibility</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Multi-objective optimization</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-gold">✓</span>
                      <span className="text-sm text-foreground">Adaptable over time</span>
                    </li>
                  </ul>
                </div>
              </SacredGeometryFrame>
            </div>
          </section>

          {/* Implementation Pathway */}
          <section className="space-y-6 pt-8 border-t border-border-light">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Your Implementation Pathway</h2>
              <p className="text-foreground-muted">Phased approach to portfolio construction and wealth optimization</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  phase: "Phase 1",
                  title: "Foundation",
                  description: "Establish core holdings (60-70% of portfolio) and implement trust/UL structure",
                  timeline: "Months 1-3",
                },
                {
                  phase: "Phase 2",
                  title: "Diversification",
                  description: "Add satellite positions in real estate, dividend equities, and selected alternatives",
                  timeline: "Months 3-6",
                },
                {
                  phase: "Phase 3",
                  title: "Optimization",
                  description:
                    "Implement tax strategies, optimize allocation based on performance, add impact investments",
                  timeline: "Months 6-12",
                },
                {
                  phase: "Phase 4",
                  title: "Governance",
                  description: "Establish ongoing review cadence, family governance protocols, and succession planning",
                  timeline: "Year 2+",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-6 p-6 bg-surface-alt border border-border-light rounded-lg hover:border-accent-gold transition-smooth"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent-gold text-background flex items-center justify-center font-display font-bold text-lg">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-display font-bold text-foreground">{item.title}</h4>
                        <p className="text-foreground-muted text-sm">{item.phase}</p>
                      </div>
                      <span className="text-sm text-accent-gold font-semibold">{item.timeline}</span>
                    </div>
                    <p className="text-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Download & Connect */}
          <section className="text-center space-y-8 pt-8">
            <div className="space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">Ready to Begin Your Journey?</h2>
              <p className="text-foreground-muted max-w-2xl mx-auto">
                Your personalized report includes all assessments, visualizations, archetype insights, and detailed
                product recommendations tailored to your profile.
              </p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <ButtonPremium size="lg" variant="gold">
                Download Full Report (PDF)
              </ButtonPremium>
              <ButtonPremium size="lg" variant="outline">
                Schedule Advisor Consultation
              </ButtonPremium>
              <Link href="/">
                <ButtonPremium size="lg" variant="ghost">
                  Start New Assessment
                </ButtonPremium>
              </Link>
            </div>

            {/* Trust Statement */}
            <div className="max-w-2xl mx-auto text-center space-y-3 pt-8 border-t border-border-light">
              <p className="text-sm text-foreground-muted">
                <strong>Heru AI Privacy Commitment:</strong> All your assessment data and personal information is
                encrypted and stored securely. Your diagnostic results are private to you and shared only with your
                chosen advisor. We never sell or share your data.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
