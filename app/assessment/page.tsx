"use client"

import { useState } from "react"
import { HeruHeader } from "@/components/heru-header"
import { PersonalInfoStep } from "@/components/assessment/personal-info-step"
import { ArchetypeQuizStep } from "@/components/assessment/archetype-quiz-step"
import { WellnessQuizStep } from "@/components/assessment/wellness-quiz-step"
import { ResultsStep } from "@/components/assessment/results-step"
import type { ClientProfile } from "@/lib/assessment-data"
import type { WellnessScore } from "@/lib/wellness-scoring"

export default function AssessmentPage() {
  const [step, setStep] = useState(0)
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null)
  const [archetypeScores, setArchetypeScores] = useState<Record<string, number>>({})
  const [wellnessScores, setWellnessScores] = useState<WellnessScore | null>(null)

  const steps = ["Personal Information", "Wealth Archetype", "Wellness Assessment", "Results & Recommendations"]

  const handlePersonalInfoComplete = (profile: ClientProfile) => {
    setClientProfile(profile)
    setStep(1)
  }

  const handleArchetypeComplete = (scores: Record<string, number>) => {
    setArchetypeScores(scores)
    setStep(2)
  }

  const handleWellnessComplete = (scores: WellnessScore) => {
    setWellnessScores(scores)
    setStep(3)
  }

  const handleRestart = () => {
    setStep(0)
    setClientProfile(null)
    setArchetypeScores({})
    setWellnessScores(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <HeruHeader />

      {/* Progress Indicator */}
      <div className="sticky top-24 z-40 bg-background border-b border-border-light py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            {steps.map((stepName, idx) => (
              <div key={idx} className="flex items-center gap-3 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold ${
                    idx < step
                      ? "bg-accent-gold text-black"
                      : idx === step
                        ? "bg-accent-gold text-black ring-2 ring-accent-gold ring-offset-2 ring-offset-background"
                        : "bg-surface text-foreground-muted border border-border-light"
                  }`}
                >
                  {idx + 1}
                </div>
                <span className={`text-sm font-medium ${idx <= step ? "text-foreground" : "text-foreground-muted"}`}>
                  {stepName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {step === 0 && <PersonalInfoStep onComplete={handlePersonalInfoComplete} />}
          {step === 1 && <ArchetypeQuizStep onComplete={handleArchetypeComplete} />}
          {step === 2 && <WellnessQuizStep onComplete={handleWellnessComplete} />}
          {step === 3 && clientProfile && archetypeScores && wellnessScores && (
            <ResultsStep
              clientProfile={clientProfile}
              archetypeScores={archetypeScores}
              wellnessScores={wellnessScores}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  )
}
