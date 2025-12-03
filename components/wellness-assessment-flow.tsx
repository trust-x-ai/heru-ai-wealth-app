"use client"
import { SacredGeometryFrame } from "./sacred-geometry-frame"
import { ButtonPremium } from "./button-premium"
import { WELLNESS_DIMENSIONS } from "@/lib/wellness-scoring"
import Link from "next/link"

interface WellnessAssessmentFlowProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  scores: Record<string, number>
  setScores: (scores: Record<string, number>) => void
}

const WELLNESS_QUESTIONS: Record<string, string[]> = {
  financial: [
    "How clear are you about your financial goals and net worth?",
    "Do you have a comprehensive financial plan in place?",
    "How diversified are your investments?",
    "Are you confident in your emergency fund coverage?",
    "Do you actively review and optimize your financial strategy?",
  ],
  physical: [
    "How energized do you feel in your daily life?",
    "Are you satisfied with your current fitness level?",
    "How consistent are you with healthy nutrition?",
    "Do you get adequate sleep and recovery?",
    "Are you managing stress effectively?",
  ],
  emotional: [
    "How emotionally resilient do you feel?",
    "Can you effectively manage your emotions?",
    "Do you practice self-compassion and reflection?",
    "How satisfied are you with your emotional boundaries?",
    "Can you find meaning and joy in daily life?",
  ],
  social: [
    "How fulfilled are your close relationships?",
    "Do you have a strong support network?",
    "How engaged are you in your community?",
    "Do you balance social time with personal time?",
    "How meaningful are your connections with others?",
  ],
  intellectual: [
    "How curious and engaged in learning are you?",
    "Do you regularly challenge yourself mentally?",
    "How often do you pursue growth and new skills?",
    "Do you engage in creative or strategic thinking?",
    "How satisfied are you with your intellectual pursuits?",
  ],
  occupational: [
    "How aligned is your work with your values?",
    "Do you find your work meaningful and fulfilling?",
    "How satisfied are you with your career trajectory?",
    "Do you have clear professional goals?",
    "How balanced is your work-life integration?",
  ],
  environmental: [
    "How connected do you feel to nature?",
    "Are you conscious of your environmental impact?",
    "Do you live in an environment that supports your wellbeing?",
    "How sustainable are your lifestyle choices?",
    "Do you take action toward environmental stewardship?",
  ],
  spiritual: [
    "How connected do you feel to your life's purpose?",
    "Do you have meaningful spiritual or philosophical practices?",
    "How often do you reflect on your deeper values?",
    "Do you feel a sense of peace and inner harmony?",
    "How guided do you feel by your sense of purpose?",
  ],
}

export function WellnessAssessmentFlow({
  currentStep,
  setCurrentStep,
  scores,
  setScores,
}: WellnessAssessmentFlowProps) {
  const totalSteps = WELLNESS_DIMENSIONS.length
  const currentDimension = WELLNESS_DIMENSIONS[currentStep]
  const questions = WELLNESS_QUESTIONS[currentDimension.id] || []

  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleScoreChange = (score: number) => {
    setScores({
      ...scores,
      [currentDimension.id]: score,
    })
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Assessment complete, navigate to harmony wheel
      window.location.href = "/assessment/harmony"
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentScore = scores[currentDimension.id] || 50

  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-display font-bold text-foreground">{currentDimension.label} Wellness</h2>
            <span className="text-sm text-foreground-muted">
              {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <div className="h-1 bg-surface-alt rounded-full overflow-hidden">
            <div className="h-full bg-gradient-gold transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Main Assessment Card */}
        <SacredGeometryFrame className="mb-8">
          <div className="space-y-8">
            {/* Icon and Title */}
            <div className="text-center space-y-3">
              <div className="text-6xl">{currentDimension.emoji}</div>
              <h3 className="text-3xl font-display font-bold text-foreground">{currentDimension.label}</h3>
              <p className="text-foreground-muted">Rate your current wellbeing in this dimension</p>
            </div>

            {/* Score Display */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-7xl font-display font-bold text-accent-gold">{Math.round(currentScore)}</span>
                <span className="text-foreground-muted">/ 100</span>
              </div>

              {/* Score Labels */}
              <div className="flex justify-between text-xs text-foreground-muted px-2">
                <span>Low</span>
                <span>Moderate</span>
                <span>Thriving</span>
              </div>
            </div>

            {/* Interactive Slider */}
            <div className="space-y-6">
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(currentScore)}
                onChange={(e) => handleScoreChange(Number(e.target.value))}
                className="w-full h-3 bg-surface-alt rounded-full appearance-none cursor-pointer accent-accent-gold"
              />

              {/* Question Preview */}
              <div className="bg-surface-alt rounded-lg p-4 border border-border-light">
                <p className="text-sm text-foreground italic">
                  "{questions[Math.floor((currentScore / 100) * (questions.length - 1))]}"
                </p>
              </div>
            </div>

            {/* Sample Questions */}
            <div className="space-y-3 pt-4 border-t border-border-light">
              <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wider">
                Reflection Questions
              </p>
              <ul className="space-y-2">
                {questions.map((q, i) => (
                  <li key={i} className="text-sm text-foreground-muted flex gap-2">
                    <span className="text-accent-gold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
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
            {currentStep === totalSteps - 1 ? "View Results" : "Next"} →
          </ButtonPremium>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Link href="/assessment/wealth">
            <button className="text-sm text-foreground-muted hover:text-accent-gold transition-smooth">
              Skip to Wealth Profile
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
