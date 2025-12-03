"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { WEALTH_ARCHETYPE_QUESTIONS } from "@/lib/assessment-data"

interface ArchetypeQuizStepProps {
  onComplete: (scores: Record<string, number>) => void
}

export function ArchetypeQuizStep({ onComplete }: ArchetypeQuizStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})

  const question = WEALTH_ARCHETYPE_QUESTIONS[currentQuestion]
  const isLastQuestion = currentQuestion === WEALTH_ARCHETYPE_QUESTIONS.length - 1

  const handleSelectAnswer = (archetypeId: string) => {
    setScores((prev) => ({
      ...prev,
      [archetypeId]: (prev[archetypeId] || 0) + 1,
    }))

    if (isLastQuestion) {
      onComplete(scores)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const progress = ((currentQuestion + 1) / WEALTH_ARCHETYPE_QUESTIONS.length) * 100

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">Your Wealth Archetype</h1>
        <p className="text-lg text-foreground-muted">Let's discover which wealth archetype resonates most with you.</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border-light">
        <div className="h-full bg-accent-gold transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="text-center text-sm text-foreground-muted mb-4">
        Question {currentQuestion + 1} of {WEALTH_ARCHETYPE_QUESTIONS.length}
      </div>

      {/* Question Card */}
      <Card className="p-8 border border-border-light bg-surface">
        <h2 className="text-2xl font-display font-semibold text-foreground mb-8 text-center">{question.question}</h2>

        <div className="space-y-3">
          {question.answers.map((answer, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectAnswer(answer.archetypeId)}
              className="w-full p-4 text-left border border-border-light rounded-lg bg-background hover:bg-surface hover:border-accent-gold transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border border-accent-gold flex items-center justify-center group-hover:bg-accent-gold group-hover:text-black transition-all">
                  <div className="w-2.5 h-2.5 bg-accent-gold rounded-full group-hover:hidden" />
                </div>
                <span className="text-foreground font-medium group-hover:text-accent-gold transition-colors">
                  {answer.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 text-foreground-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        <div className="text-sm text-foreground-muted">
          {currentQuestion + 1} / {WEALTH_ARCHETYPE_QUESTIONS.length}
        </div>

        <button
          onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, WEALTH_ARCHETYPE_QUESTIONS.length - 1))}
          disabled={isLastQuestion}
          className="px-6 py-2 text-foreground-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
