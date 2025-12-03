"use client"

import { useState } from "react"
import { HeruHeader } from "@/components/heru-header"
import { WealthProfilingFlow } from "@/components/wealth-profiling-flow"
import type { WealthProfile } from "@/lib/wealth-profiling"

export const dynamic = 'force-dynamic'

export default function WealthProfilingPage() {
  const [wealthProfile, setWealthProfile] = useState<Partial<WealthProfile>>({
    totalAssets: 1000000,
    annualIncome: 200000,
    timeHorizon: "long",
    riskAppetite: 60,
    liquidityNeeds: 30,
    investmentGoals: [],
    priorities: {
      growth: 30,
      stability: 25,
      liquidity: 15,
      legacy: 20,
      taxOptimization: 10,
    },
  })

  return (
    <div className="min-h-screen bg-background">
      <HeruHeader />
      <WealthProfilingFlow wealthProfile={wealthProfile} setWealthProfile={setWealthProfile} />
    </div>
  )
}
