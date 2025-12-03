"use client"

import { useState } from "react"
import { HeruHeader } from "@/components/heru-header"
import { SacredGeometryFrame } from "@/components/sacred-geometry-frame"
import { ButtonPremium } from "@/components/button-premium"
import Link from "next/link"

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <HeruHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6">
              Know Your Wealth
              <span className="text-accent-gold block mt-2">Know Yourself</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-8">
              Discover your holistic wealth profile through our transformative diagnostic experience. Conscious
              prosperity begins with understanding yourself across wealth and wellness.
            </p>
          </div>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                id: "wellness",
                title: "Wellness First",
                description: "Assess your 8 dimensions of holistic wellbeing",
                icon: "✨",
              },
              {
                id: "wealth",
                title: "Wealth Profile",
                description: "Map your financial assets and investment goals",
                icon: "💰",
              },
              {
                id: "archetype",
                title: "Your Archetype",
                description: "Discover your wealth archetype and recommendations",
                icon: "🔮",
              },
            ].map((card) => (
              <div
                key={card.id}
                className="group cursor-pointer transition-smooth"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <SacredGeometryFrame className={hoveredCard === card.id ? "scale-105" : ""}>
                  <div className="text-center">
                    <div className="text-5xl mb-4">{card.icon}</div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm text-foreground-muted">{card.description}</p>
                  </div>
                </SacredGeometryFrame>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="text-center mt-16">
            <Link href="/assessment">
              <ButtonPremium size="lg" variant="gold">
                Begin Your Journey →
              </ButtonPremium>
            </Link>
            <p className="text-sm text-foreground-muted mt-4">
              Takes approximately 15-20 minutes | All data is private & secure
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 border-t border-border-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-foreground mb-12 text-center">Heru AI Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Conscious Prosperity",
                description:
                  "Wealth that aligns with your deepest values and purpose. We believe true prosperity integrates financial growth with holistic wellbeing.",
              },
              {
                title: "Intelligent Transformation",
                description:
                  "Data-driven insights meet wisdom-based guidance. Our AI-powered analysis reveals patterns you wouldn't see alone.",
              },
              {
                title: "Holistic Mastery",
                description:
                  "Success spans all dimensions of life. We help you optimize financial health alongside physical, emotional, and spiritual wellbeing.",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-xl font-display font-semibold text-accent-gold">{item.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-light py-8 px-6 bg-surface">
        <div className="max-w-6xl mx-auto text-center text-sm text-foreground-muted">
          <p>Heru AI | Conscious Wealth Intelligence Platform</p>
          <p className="mt-2">The eye of Horus sees clearly. We help you see your wealth clearly.</p>
        </div>
      </footer>
    </div>
  )
}
