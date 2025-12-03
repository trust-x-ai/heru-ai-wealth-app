"use client"

interface WellnessQuestionCardProps {
  question: string
  score: number
  onScoreChange: (score: number) => void
}

export function WellnessQuestionCard({ question, score, onScoreChange }: WellnessQuestionCardProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-foreground font-display">{question}</p>
      <div className="flex gap-2 items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={score}
          onChange={(e) => onScoreChange(Number(e.target.value))}
          className="flex-1 h-2 bg-surface-alt rounded-full appearance-none cursor-pointer accent-accent-gold"
        />
        <span className="text-accent-gold font-display font-bold text-lg w-12 text-right">{Math.round(score)}</span>
      </div>
    </div>
  )
}
