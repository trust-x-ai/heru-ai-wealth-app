"use client"

import type React from "react"

import { useState } from "react"
import { ButtonPremium } from "@/components/button-premium"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ClientProfile } from "@/lib/assessment-data"

interface PersonalInfoStepProps {
  onComplete: (profile: ClientProfile) => void
}

export function PersonalInfoStep({ onComplete }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dependents: "",
    equities: "",
    fixedIncome: "",
    realEstate: "",
    privateEquity: "",
    alternatives: "",
    cash: "",
    insurance: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const profile: ClientProfile = {
      name: formData.name,
      age: Number.parseInt(formData.age) || 0,
      dependents: Number.parseInt(formData.dependents) || 0,
      existingWealth: {
        equities: Number.parseFloat(formData.equities) || 0,
        fixedIncome: Number.parseFloat(formData.fixedIncome) || 0,
        realEstate: Number.parseFloat(formData.realEstate) || 0,
        privateEquity: Number.parseFloat(formData.privateEquity) || 0,
        alternatives: Number.parseFloat(formData.alternatives) || 0,
        cash: Number.parseFloat(formData.cash) || 0,
        insurance: Number.parseFloat(formData.insurance) || 0,
      },
      totalWealth:
        (Number.parseFloat(formData.equities) || 0) +
        (Number.parseFloat(formData.fixedIncome) || 0) +
        (Number.parseFloat(formData.realEstate) || 0) +
        (Number.parseFloat(formData.privateEquity) || 0) +
        (Number.parseFloat(formData.alternatives) || 0) +
        (Number.parseFloat(formData.cash) || 0) +
        (Number.parseFloat(formData.insurance) || 0),
    }

    onComplete(profile)
  }

  const total = Object.values(formData)
    .slice(3)
    .reduce((sum, val) => sum + (Number.parseFloat(val) || 0), 0)

  const assetClasses = [
    { key: "equities", label: "Equities", icon: "📈" },
    { key: "fixedIncome", label: "Fixed Income / Bonds", icon: "📊" },
    { key: "realEstate", label: "Real Estate", icon: "🏠" },
    { key: "privateEquity", label: "Private Equity", icon: "🔒" },
    { key: "alternatives", label: "Alternatives (Art, Wine, etc.)", icon: "🎨" },
    { key: "cash", label: "Cash & Equivalents", icon: "💵" },
    { key: "insurance", label: "Insurance & Wrappers", icon: "🛡️" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">Your Profile</h1>
        <p className="text-lg text-foreground-muted">
          Let's start by understanding you and your current wealth structure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card className="p-8 border border-border-light bg-surface">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="text-2xl">👤</span> Personal Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., David Chen"
                required
                className="bg-background border-border-light text-foreground placeholder-foreground-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-foreground font-medium">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g., 42"
                required
                className="bg-background border-border-light text-foreground placeholder-foreground-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dependents" className="text-foreground font-medium">
                Number of Dependents
              </Label>
              <Input
                id="dependents"
                name="dependents"
                type="number"
                value={formData.dependents}
                onChange={handleChange}
                placeholder="e.g., 2"
                required
                className="bg-background border-border-light text-foreground placeholder-foreground-muted"
              />
            </div>
          </div>
        </Card>

        {/* Wealth Composition */}
        <Card className="p-8 border border-border-light bg-surface">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="text-2xl">💰</span> Current Wealth Composition
          </h2>
          <p className="text-sm text-foreground-muted mb-6">
            Enter amounts in your preferred currency (e.g., HKD). Leave blank if not applicable.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {assetClasses.map(({ key, label, icon }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="text-foreground font-medium flex items-center gap-2">
                  <span>{icon}</span> {label}
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-foreground-muted">HKD</span>
                  <Input
                    id={key}
                    name={key}
                    type="number"
                    value={(formData as Record<string, string>)[key]}
                    onChange={handleChange}
                    placeholder="0"
                    className="bg-background border-border-light text-foreground placeholder-foreground-muted flex-1"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Total Display */}
          {total > 0 && (
            <div className="p-4 bg-background rounded-lg border border-accent-gold">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-display font-semibold text-accent-gold">Total Wealth</span>
                <span className="text-2xl font-bold text-accent-gold">
                  HKD {total.toLocaleString("en-HK", { maximumFractionDigits: 0 })}
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-2">
                {assetClasses.map(({ key, label }) => {
                  const value = Number.parseFloat((formData as Record<string, string>)[key]) || 0
                  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0"
                  return (
                    <div key={key} className="flex justify-between items-center text-sm">
                      <span className="text-foreground-muted">{label}</span>
                      <div className="flex gap-4 items-center">
                        <div className="w-24 bg-surface border border-border-light rounded h-2">
                          <div
                            className="bg-accent-gold h-full rounded transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-foreground font-medium w-12 text-right">{percentage}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </Card>

        <div className="flex justify-end">
          <ButtonPremium type="submit" size="lg" variant="gold">
            Continue to Archetype Assessment →
          </ButtonPremium>
        </div>
      </form>
    </div>
  )
}
