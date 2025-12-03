"use client"

import { useState } from "react"
import { SacredGeometryFrame } from "./sacred-geometry-frame"
import { ButtonPremium } from "./button-premium"
import { INVESTMENT_GOALS, TIME_HORIZONS, calculateRiskProfile, type WealthProfile } from "@/lib/wealth-profiling"
import Link from "next/link"

interface WealthProfilingFlowProps {
  wealthProfile: Partial<WealthProfile>
  setWealthProfile: (profile: Partial<WealthProfile>) => void
}

export function WealthProfilingFlow({ wealthProfile, setWealthProfile }: WealthProfilingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { id: "assets", label: "Asset Base", icon: "💎" },
    { id: "income", label: "Income", icon: "📊" },
    { id: "timeline", label: "Time Horizon", icon: "⏳" },
    { id: "risk", label: "Risk Appetite", icon: "⚖️" },
    { id: "goals", label: "Investment Goals", icon: "🎯" },
    { id: "priorities", label: "Priorities", icon: "🔍" },
    { id: "impact", label: "Impact Focus", icon: "🌍" },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Move to harmony wheel
      window.location.href = `/assessment/harmony?wealth=${encodeURIComponent(JSON.stringify(wealthProfile))}`
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]
  const riskProfile = calculateRiskProfile(wealthProfile as WealthProfile)

  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {currentStepData.icon} {currentStepData.label}
            </h2>
            <span className="text-sm text-foreground-muted">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="h-1 bg-surface-alt rounded-full overflow-hidden">
            <div className="h-full bg-gradient-gold transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Main Content Card */}
        <SacredGeometryFrame className="mb-8">
          <div className="space-y-6">
            {/* Asset Base */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <p className="text-foreground-muted">What is your total investable wealth?</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-foreground-muted">HKD</span>
                    <input
                      type="number"
                      value={wealthProfile.totalAssets || 0}
                      onChange={(e) =>
                        setWealthProfile({
                          ...wealthProfile,
                          totalAssets: Number(e.target.value),
                        })
                      }
                      className="flex-1 bg-surface-alt border border-border-light rounded px-4 py-3 text-foreground text-right focus:outline-none focus:border-accent-gold transition-smooth"
                      placeholder="1,000,000"
                    />
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="500000000"
                    step="100000"
                    value={wealthProfile.totalAssets || 1000000}
                    onChange={(e) =>
                      setWealthProfile({
                        ...wealthProfile,
                        totalAssets: Number(e.target.value),
                      })
                    }
                    className="w-full h-3 bg-surface-alt rounded-full appearance-none cursor-pointer accent-accent-gold"
                  />
                  <div className="flex justify-between text-xs text-foreground-muted">
                    <span>HKD 100K</span>
                    <span>HKD 500M+</span>
                  </div>
                </div>
              </div>
            )}

            {/* Annual Income */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <p className="text-foreground-muted">What is your annual income?</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-foreground-muted">HKD</span>
                    <input
                      type="number"
                      value={wealthProfile.annualIncome || 0}
                      onChange={(e) =>
                        setWealthProfile({
                          ...wealthProfile,
                          annualIncome: Number(e.target.value),
                        })
                      }
                      className="flex-1 bg-surface-alt border border-border-light rounded px-4 py-3 text-foreground text-right focus:outline-none focus:border-accent-gold transition-smooth"
                      placeholder="200,000"
                    />
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="10000000"
                    step="50000"
                    value={wealthProfile.annualIncome || 200000}
                    onChange={(e) =>
                      setWealthProfile({
                        ...wealthProfile,
                        annualIncome: Number(e.target.value),
                      })
                    }
                    className="w-full h-3 bg-surface-alt rounded-full appearance-none cursor-pointer accent-accent-gold"
                  />
                </div>
              </div>
            )}

            {/* Time Horizon */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-foreground-muted mb-6">What is your investment time horizon?</p>
                <div className="grid gap-3">
                  {TIME_HORIZONS.map((horizon) => (
                    <button
                      key={horizon.value}
                      onClick={() =>
                        setWealthProfile({
                          ...wealthProfile,
                          timeHorizon: horizon.value as any,
                        })
                      }
                      className={`p-4 rounded border transition-smooth text-left ${
                        wealthProfile.timeHorizon === horizon.value
                          ? "border-accent-gold bg-accent-gold/10"
                          : "border-border-light hover:border-accent-gold"
                      }`}
                    >
                      <div className="font-semibold text-foreground">{horizon.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Appetite */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <p className="text-foreground-muted">How would you rate your risk appetite?</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-foreground font-semibold">Risk Appetite Score</span>
                      <span className="text-3xl font-display font-bold text-accent-gold">
                        {Math.round(wealthProfile.riskAppetite || 50)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={wealthProfile.riskAppetite || 50}
                      onChange={(e) =>
                        setWealthProfile({
                          ...wealthProfile,
                          riskAppetite: Number(e.target.value),
                        })
                      }
                      className="w-full h-3 bg-surface-alt rounded-full appearance-none cursor-pointer accent-accent-gold"
                    />
                    <div className="flex justify-between text-xs text-foreground-muted mt-2">
                      <span>Conservative</span>
                      <span>Moderate</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <div className="bg-surface-alt rounded p-4 border border-border-light">
                    <p className="text-sm text-foreground-muted mb-3">Classification:</p>
                    <p className="text-lg font-semibold text-accent-gold capitalize">{riskProfile.classification}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Investment Goals */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <p className="text-foreground-muted mb-4">Select your primary investment goals (choose multiple):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {INVESTMENT_GOALS.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => {
                        const goals = wealthProfile.investmentGoals || []
                        if (goals.includes(goal)) {
                          setWealthProfile({
                            ...wealthProfile,
                            investmentGoals: goals.filter((g) => g !== goal),
                          })
                        } else {
                          setWealthProfile({
                            ...wealthProfile,
                            investmentGoals: [...goals, goal],
                          })
                        }
                      }}
                      className={`p-3 rounded border transition-smooth text-left ${
                        wealthProfile.investmentGoals?.includes(goal)
                          ? "border-accent-gold bg-accent-gold/10"
                          : "border-border-light hover:border-accent-gold"
                      }`}
                    >
                      <div className="font-medium text-foreground text-sm">{goal}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Priorities */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <p className="text-foreground-muted mb-4">Weight your priorities (0-100):</p>
                {Object.entries(wealthProfile.priorities || {}).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <label className="font-semibold text-foreground capitalize">{key}</label>
                      <span className="text-accent-gold font-display">{value}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) =>
                        setWealthProfile({
                          ...wealthProfile,
                          priorities: {
                            ...(wealthProfile.priorities || {}),
                            [key]: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full h-2 bg-surface-alt rounded-full appearance-none cursor-pointer accent-accent-gold"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Impact Focus */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <p className="text-foreground-muted mb-4">Optional: What's your focus for impact investing?</p>
                <textarea
                  value={wealthProfile.impactFocus || ""}
                  onChange={(e) =>
                    setWealthProfile({
                      ...wealthProfile,
                      impactFocus: e.target.value,
                    })
                  }
                  placeholder="E.g., Environmental sustainability, social innovation, healthcare..."
                  className="w-full bg-surface-alt border border-border-light rounded px-4 py-3 text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent-gold transition-smooth resize-none h-24"
                />
              </div>
            )}
          </div>
        </SacredGeometryFrame>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex-1 px-6 py-3 border border-accent-gold text-accent-gold rounded transition-smooth disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-gold/10"
          >
            ← Previous
          </button>
          <ButtonPremium onClick={handleNext} size="md" className="flex-1">
            {currentStep === steps.length - 1 ? "Generate Results" : "Next"} →
          </ButtonPremium>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Link href="/assessment/harmony">
            <button className="text-sm text-foreground-muted hover:text-accent-gold transition-smooth">
              Skip to Results
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
