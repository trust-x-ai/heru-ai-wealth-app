"use client"

import { useState } from "react"
import { HeruHeader } from "@/components/heru-header"
import { WellnessAssessmentFlow } from "@/components/wellness-assessment-flow"
import { WELLNESS_DIMENSIONS } from "@/lib/wellness-scoring"

export default function WellnessAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(WELLNESS_DIMENSIONS.map((d) => [d.id, 50])),
  )

  return (
    <div className="min-h-screen bg-background">
      <HeruHeader />
      <WellnessAssessmentFlow
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        scores={scores}
        setScores={setScores}
      />
    </div>
  )
}
