"use client"

import { useState } from "react"
import { ButtonPremium } from "@/components/button-premium"
import { Card } from "@/components/ui/card"
import { WELLNESS_ASSESSMENT_QUESTIONS } from "@/lib/assessment-data"
import { WELLNESS_DIMENSIONS } from "@/lib/wellness-scoring"
import type { WellnessScore } from "@/lib/wellness-scoring"

interface WellnessQuizStepProps {
  onComplete: (scores: WellnessScore) => void
}

export function WellnessQuizStep({ onComplete }: WellnessQuizStepProps) {
  const [currentDimensionIdx, setCurrentDimensionIdx] = useState(0)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})

  const currentDimension = WELLNESS_ASSESSMENT_QUESTIONS[currentDimensionIdx]
  const currentQuestion = currentDimension.questions[currentQuestionIdx]

  const isLastQuestion =
    currentDimensionIdx === WELLNESS_ASSESSMENT_QUESTIONS.length - 1 &&
    currentQuestionIdx === currentDimension.questions.length - 1

  const handleSelectAnswer = (score: number) => {
    const key = currentDimension.id
    setScores((prev) => {
      const existing = prev[key] || 0
      return {
        ...prev,
        [key]: existing + score,
      }
    })

    // Move to next question
    if (currentQuestionIdx < currentDimension.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
    } else if (currentDimensionIdx < WELLNESS_ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentDimensionIdx(currentDimensionIdx + 1)
      setCurrentQuestionIdx(0)
    } else if (isLastQuestion) {
      // Convert raw scores to 0-100 scale
      const normalizedScores = Object.entries(scores).reduce(
        (acc, [key, value]) => {
          // Average score across 3 questions, normalize to 0-100
          const avgScore = value / 3
          acc[key as keyof WellnessScore] = Math.min(100, avgScore)
          return acc
        },
        {} as Record<string, number>,
      )

      // Add current dimension
      const lastKey = currentDimension.id
      const finalScores = {
        ...normalizedScores,
        [lastKey]: Math.min(100, (normalizedScores[lastKey] || 0) + score / 3),
      }

      onComplete(finalScores as WellnessScore)
    }
  }

  const totalQuestions = WELLNESS_ASSESSMENT_QUESTIONS.reduce((sum, d) => sum + d.questions.length, 0)
  const completedQuestions =
    WELLNESS_ASSESSMENT_QUESTIONS.slice(0, currentDimensionIdx).reduce((sum, d) => sum + d.questions.length, 0) +
    (currentQuestionIdx + 1)
  const progress = (completedQuestions / totalQuestions) * 100

  const dimensionEmoji = WELLNESS_DIMENSIONS.find((d) => d.id === currentDimension.id)?.emoji || "✨"

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">Wellness Assessment</h1>
        <p className="text-lg text-foreground-muted">Let's explore your holistic wellbeing across 8 dimensions.</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border-light">
        <div className="h-full bg-accent-gold transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="text-center text-sm text-foreground-muted mb-4">
        Question {completedQuestions} of {totalQuestions}
      </div>

      {/* Question Card */}
      <Card className="p-8 border border-border-light bg-surface">
        <div className="mb-6">
          <h2 className="text-xl font-display font-semibold text-accent-gold mb-2 flex items-center gap-2">
            <span className="text-3xl">{dimensionEmoji}</span>
            {currentDimension.dimension}
          </h2>
          <p className="text-sm text-foreground-muted">Question {currentQuestionIdx + 1} of 3</p>
        </div>

        <h3 className="text-2xl font-semibold text-foreground mb-8">{currentQuestion.text}</h3>

        <div className="space-y-3">
          {currentQuestion.answers.map((answer, idx) => (
            <ButtonPremium
              key={idx}
              onClick={() => handleSelectAnswer(answer.score)}
              className="w-full p-4 text-left border border-border-light rounded-lg bg-background hover:bg-surface hover:border-accent-gold transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium group-hover:text-accent-gold transition-colors">
                  {answer.text}
                </span>
                <div className="w-5 h-5 rounded border-2 border-accent-gold group-hover:bg-accent-gold transition-all" />
              </div>
            </ButtonPremium>
          ))}
        </div>
      </Card>

      {/* Dimension Progress */}
      <div className="p-4 bg-surface border border-border-light rounded-lg">
        <p className="text-sm text-foreground-muted mb-3">Dimensions Progress:</p>
        <div className="flex gap-2 flex-wrap">
          {WELLNESS_ASSESSMENT_QUESTIONS.map((dimension, idx) => (
            <div
              key={dimension.id}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                idx < currentDimensionIdx
                  ? "bg-accent-gold text-black"
                  : idx === currentDimensionIdx
                    ? "bg-accent-gold text-black ring-2 ring-accent-gold ring-offset-2 ring-offset-background"
                    : "bg-background border border-border-light text-foreground-muted"
              }`}
            >
              {WELLNESS_DIMENSIONS.find((d) => d.id === dimension.id)?.emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
