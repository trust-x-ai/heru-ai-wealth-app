/**
 * Heru AI Wellness Scoring Engine
 * Calculates scores for the 8 dimensions of holistic wellness
 */

export const WELLNESS_DIMENSIONS = [
  { id: "financial", label: "Financial", emoji: "💰" },
  { id: "physical", label: "Physical", emoji: "💪" },
  { id: "emotional", label: "Emotional", emoji: "💝" },
  { id: "social", label: "Social", emoji: "🤝" },
  { id: "intellectual", label: "Intellectual", emoji: "🧠" },
  { id: "occupational", label: "Occupational", emoji: "🎯" },
  { id: "environmental", label: "Environmental", emoji: "🌿" },
  { id: "spiritual", label: "Spiritual", emoji: "✨" },
] as const

export interface WellnessScore {
  financial: number
  physical: number
  emotional: number
  social: number
  intellectual: number
  occupational: number
  environmental: number
  spiritual: number
}

export interface WellnessInsight {
  dimension: string
  score: number
  insight: string
  suggestion: string
  energy: "low" | "moderate" | "high" | "thriving"
}

/**
 * Calculate wellness insights based on scores
 */
export function calculateWellnessInsights(scores: WellnessScore): WellnessInsight[] {
  const insights: WellnessInsight[] = []

  const dimensionConfig: Record<
    string,
    {
      insights: Record<string, { insight: string; suggestion: string }>
    }
  > = {
    financial: {
      insights: {
        low: {
          insight: "Financial clarity may require attention",
          suggestion: "Consider mapping assets, cash flow, and long-term goals",
        },
        moderate: {
          insight: "Financial foundations are stable",
          suggestion: "Explore strategic diversification and wealth optimization",
        },
        high: {
          insight: "Strong financial discipline evident",
          suggestion: "Focus on legacy planning and conscious impact investing",
        },
        thriving: {
          insight: "Financial mastery achieved",
          suggestion: "Integrate purpose-driven wealth with conscious prosperity",
        },
      },
    },
    physical: {
      insights: {
        low: {
          insight: "Physical vitality may need nurturing",
          suggestion: "Integrate movement, nutrition, and preventative wellness",
        },
        moderate: {
          insight: "Physical health is balanced",
          suggestion: "Deepen practices that enhance energy and longevity",
        },
        high: {
          insight: "Strong physical foundation in place",
          suggestion: "Explore advanced wellness modalities and optimization",
        },
        thriving: {
          insight: "Peak physical vitality demonstrated",
          suggestion: "Model and share your wellness wisdom with others",
        },
      },
    },
    emotional: {
      insights: {
        low: {
          insight: "Emotional resilience deserves attention",
          suggestion: "Explore breathwork, meditation, or professional support",
        },
        moderate: {
          insight: "Emotional awareness is developing",
          suggestion: "Deepen practices like journaling and self-reflection",
        },
        high: {
          insight: "Strong emotional intelligence evident",
          suggestion: "Channel emotional wisdom into leadership and impact",
        },
        thriving: {
          insight: "Emotional mastery achieved",
          suggestion: "Mentor others in emotional resilience and growth",
        },
      },
    },
    social: {
      insights: {
        low: {
          insight: "Social connection may need cultivation",
          suggestion: "Invest in meaningful relationships and community",
        },
        moderate: {
          insight: "Social bonds are developing well",
          suggestion: "Deepen existing relationships and expand network thoughtfully",
        },
        high: {
          insight: "Strong community and relationships in place",
          suggestion: "Consider giving back and building your inner circle",
        },
        thriving: {
          insight: "Social flourishing and influence strong",
          suggestion: "Use your network for mutual growth and impact",
        },
      },
    },
    intellectual: {
      insights: {
        low: {
          insight: "Intellectual curiosity may need stimulation",
          suggestion: "Explore learning programs, reading, or skill development",
        },
        moderate: {
          insight: "Intellectual engagement is steady",
          suggestion: "Pursue deeper mastery in areas of passion",
        },
        high: {
          insight: "Strong intellectual pursuits evident",
          suggestion: "Apply learning to strategic thinking and leadership",
        },
        thriving: {
          insight: "Intellectual mastery and contribution strong",
          suggestion: "Share knowledge and mentor emerging thinkers",
        },
      },
    },
    occupational: {
      insights: {
        low: {
          insight: "Career alignment may need exploration",
          suggestion: "Clarify values and seek work that aligns with purpose",
        },
        moderate: {
          insight: "Career satisfaction is developing",
          suggestion: "Align professional goals with personal values",
        },
        high: {
          insight: "Strong occupational purpose evident",
          suggestion: "Consider legacy impact and next chapter opportunities",
        },
        thriving: {
          insight: "Occupational mastery and legacy building",
          suggestion: "Mentor next generation and build your professional legacy",
        },
      },
    },
    environmental: {
      insights: {
        low: {
          insight: "Environmental awareness may need development",
          suggestion: "Explore sustainable practices and nature connection",
        },
        moderate: {
          insight: "Environmental consciousness is growing",
          suggestion: "Deepen sustainable living practices",
        },
        high: {
          insight: "Strong environmental responsibility evident",
          suggestion: "Consider impact investing and stewardship initiatives",
        },
        thriving: {
          insight: "Environmental mastery and regeneration focus",
          suggestion: "Lead sustainable and regenerative impact projects",
        },
      },
    },
    spiritual: {
      insights: {
        low: {
          insight: "Spiritual foundation may need nurturing",
          suggestion: "Explore practices like meditation, nature, or philosophy",
        },
        moderate: {
          insight: "Spiritual awareness is developing",
          suggestion: "Deepen practices that connect to meaning and purpose",
        },
        high: {
          insight: "Strong spiritual foundation in place",
          suggestion: "Integrate spiritual wisdom into daily life and decisions",
        },
        thriving: {
          insight: "Spiritual mastery and enlightenment path",
          suggestion: "Share spiritual wisdom and guide others' transformation",
        },
      },
    },
  }

  for (const dimension of WELLNESS_DIMENSIONS) {
    const score = scores[dimension.id]
    let energy: "low" | "moderate" | "high" | "thriving"

    if (score < 35) energy = "low"
    else if (score < 60) energy = "moderate"
    else if (score < 85) energy = "high"
    else energy = "thriving"

    const config = dimensionConfig[dimension.id]
    const insightData = config.insights[energy]

    insights.push({
      dimension: dimension.label,
      score: Math.round(score),
      insight: insightData.insight,
      suggestion: insightData.suggestion,
      energy,
    })
  }

  return insights
}

/**
 * Calculate overall wellness score
 */
export function calculateOverallScore(scores: WellnessScore): number {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
  return Math.round(total / Object.keys(scores).length)
}

/**
 * Determine wellness profile based on dimension patterns
 */
export function getWellnessProfile(scores: WellnessScore): {
  profile: string
  focus: string[]
} {
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a)
  const strengths = sorted.slice(0, 3).map(([key]) => key)
  const weaknesses = sorted.slice(-2).map(([key]) => key)

  let profile = "Balanced"
  const focus = weaknesses

  // Determine profile archetype based on pattern
  const strengths_str = strengths.join("-")
  if (strengths_str.includes("spiritual") && strengths_str.includes("emotional")) {
    profile = "The Conscious Creator"
  } else if (strengths_str.includes("financial") && strengths_str.includes("intellectual")) {
    profile = "The Visionary Builder"
  } else if (strengths_str.includes("physical") && strengths_str.includes("environmental")) {
    profile = "The Harmonious Strategist"
  }

  return { profile, focus }
}
