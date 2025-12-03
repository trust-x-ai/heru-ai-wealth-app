# Heru AI - Holistic Wealth & Wellness Diagnostic Platform

A luxury, gamified web application that combines 8 dimensions of wellness assessment with sophisticated wealth profiling to deliver personalized portfolio recommendations and wealth archetype classification for high-net-worth individuals and private clients.

## Platform Overview

Heru AI serves as the first touchpoint for HNW clients and sales associates, providing a transformative diagnostic experience that:

- Assesses holistic wellness across 8 dimensions (Financial, Physical, Emotional, Social, Intellectual, Occupational, Environmental, Spiritual)
- Profiles wealth, risk tolerance, and investment goals
- Generates personalized "Harmony Wheel" wellness visualization
- Classifies clients into 5 wealth archetypes (Legacy Sovereign, Visionary Builder, Harmonious Strategist, Conscious Creator, Guardian of Stability)
- Recommends 8 tailored investment products with match scores
- Suggests optimal portfolio allocation
- Presents wealth structure options (Trusts, UL, Family Office, Hybrid)
- Creates comprehensive diagnostic reports

## Key Features

### 1. Wellness Assessment Flow
- 8-step progressive assessment covering all wellness dimensions
- Interactive slider-based scoring (0-100 per dimension)
- Reflection questions for each dimension
- Real-time insight generation
- Accessible skip options to move between sections

### 2. Wealth Profiling Module
- 7-step comprehensive financial profiling
- Asset base and income capture (HKD currency)
- Time horizon selection (short/medium/long/perpetual)
- Risk appetite slider with real-time classification
- Multi-select investment goals
- Priority weighting system (growth/stability/liquidity/legacy/tax optimization)
- Optional impact investing focus

### 3. Harmony Wheel Visualization
- Sacred geometry-inspired radar chart showing all 8 wellness dimensions
- Grid circles, radial lines, and central harmony score
- Interactive visualization with emoji labels and scores
- Color-coded legend with dimension breakdown
- Overall wellness profile classification

### 4. Asset Allocation Chart
- Pie chart visualization of portfolio allocation
- Color-coded asset classes with percentage labels
- Optimized allocation based on risk profile
- Asset class breakdown legend

### 5. Wealth Archetype System
- 5 sophisticated archetypes with unique characteristics
- Intelligent classification algorithm (wellness + financial patterns)
- Confidence scoring for archetype match
- Detailed archetype cards showing traits, philosophy, and growth opportunities
- Personalized recommendations aligned with archetype

### 6. Product Recommendation Engine
- Database of 11 investment vehicles across 7 asset classes
- Intelligent matching algorithm (0-100 match score)
- Factors: risk alignment, liquidity fit, time horizon, goals, ESG preferences
- Priority classification (core/satellite/alternative)
- Optimal allocation distribution
- Detailed product cards with reasoning

### 7. Wealth Structures
- Trust structures for estate planning
- Universal Life (UL) insurance with tax efficiency
- Variable UL (VUL) for investment-linked growth
- Family Office setup guidance
- Hybrid wrapper strategies

### 8. Implementation Roadmap
- 4-phase implementation plan (Foundation → Build → Optimize → Sustain)
- Timeline and objectives for each phase
- Actionable next steps
- Advisor consultation flow

## Technology Stack

- **Frontend**: React 19.2 (with Server Components), Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **Typography**: Geist (sans), Playfair Display (display)
- **Charts & Visualization**: Recharts, custom SVG components
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **State Management**: React hooks with SWR
- **Database**: Supabase (PostgreSQL) - optional, for storing user profiles
- **Deployment**: Vercel

## Project Structure

\`\`\`
heru-ai-webapp/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── layout.tsx                        # Root layout with typography
│   ├── globals.css                       # Design tokens & theme
│   ├── assessment/
│   │   ├── wellness/page.tsx            # Wellness assessment flow
│   │   ├── wealth/page.tsx              # Wealth profiling flow
│   │   └── harmony/page.tsx             # Harmony wheel & insights
│   └── dashboard/
│       ├── page.tsx                      # Archetype dashboard
│       ├── recommendations/page.tsx      # Product recommendations
│       └── export/route.ts               # PDF export endpoint
├── components/
│   ├── heru-header.tsx                  # Navigation header
│   ├── sacred-geometry-frame.tsx        # Card wrapper component
│   ├── button-premium.tsx               # Custom button variants
│   ├── harmony-wheel.tsx                # Radar chart visualization
│   ├── asset-allocation-chart.tsx       # Pie chart visualization
│   ├── wellness-assessment-flow.tsx     # Assessment component
│   ├── wellness-question-card.tsx       # Question display
│   ├── wealth-profiling-flow.tsx        # Wealth profiling UI
│   ├── archetype-card.tsx               # Archetype display
│   ├── product-recommendation-card.tsx  # Product card
│   └── wealth-summary-card.tsx          # Summary metrics
├── lib/
│   ├── wellness-scoring.ts              # Wellness scoring engine
│   ├── wealth-profiling.ts              # Risk profile & wealth logic
│   ├── wealth-archetypes.ts             # Archetype classification
│   ├── product-recommendations.ts       # Product matching engine
│   ├── report-generator.ts              # Report generation
│   └── utils.ts                         # Utility functions
├── public/
│   └── favicon.ico
└── [config files]
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.js
    └── next.config.mjs
\`\`\`

## Design System

### Color Palette
- **Background**: #0a0a0a (rich black)
- **Surfaces**: #1a1a1a, #242424 (charcoal)
- **Accent Gold**: #d4af37 (primary), #e8c547 (light), #b8941e (dark)
- **Accent Emerald**: #2d5a3d (secondary)
- **Text**: #f5f5f1 (foreground), #a8a8a3 (muted)
- **Borders**: #333333, #404040

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: Geist (sans-serif)
- **Line Height**: 1.4-1.6 (relaxed for readability)

### Components
- **SacredGeometryFrame**: Card wrapper with corner accents and border effects
- **ButtonPremium**: 4 variants (gold, emerald, outline, ghost)
- **Charts**: Custom SVG for harmony wheel and asset allocation

## Key Scoring Formulas

### Wellness Scoring
Each dimension scored 0-100 based on slider input, then classified into energy levels:
- Low (< 35): Needs attention
- Moderate (35-60): Developing
- High (60-85): Strong
- Thriving (85+): Mastery

### Risk Profile Score
\`\`\`
baseRisk = wealthProfile.riskAppetite
riskScore = baseRisk × timeHorizonMultiplier × (1 - liquidityNeeds/200)
\`\`\`

Risk classifications:
- Conservative: < 20
- Moderate: 20-40
- Balanced: 40-60
- Growth: 60-80
- Aggressive: 80+

### Product Match Score (0-100)
- Risk alignment (40 points): |productRisk - clientRisk| comparison
- Liquidity fit (15 points): Alignment with liquidity needs
- Time horizon (10 points): Compatibility with time horizon
- Goal alignment (10 points): Product matches stated goals
- ESG bonus (15 points): For conscious investors
- Minimum investment check (multiplier)

### Archetype Classification
Algorithm evaluates:
1. Wellness patterns (spiritual, environmental, emotional balance)
2. Financial priorities (legacy, growth, stability)
3. Time horizon (perpetual suggests legacy focus)
4. Risk appetite and liquidity needs
5. Impact/values alignment

Classification priority:
1. Conscious Creator (if high spiritual + environmental + impact)
2. Legacy Sovereign (if high legacy priority + perpetual horizon)
3. Visionary Builder (if high occupational + intellectual + high risk)
4. Guardian of Stability (if high stability priority + low risk appetite)
5. Harmonious Strategist (default - balanced profile)

## User Flows

### Flow 1: Complete Assessment Journey
1. **Landing** → Marketing with 3 CTA cards
2. **Wellness Assessment** → 8 steps, each dimension scored with slider
3. **Wealth Profile** → 7 steps, financial input and goal selection
4. **Harmony Wheel** → Visualization + insights + risk profile
5. **Archetype Dashboard** → Classification + insights + growth opportunities
6. **Recommendations** → 8 products + allocation chart + structures
7. **Export/Connect** → Download report or schedule consultation

### Flow 2: Quick Skip Options
- Skip wellness → Jump to wealth profiling
- Skip wealth → Jump to harmony wheel with defaults
- Both can navigate forward/backward within their respective flows

### Flow 3: Dashboard Exploration
- View primary archetype with confidence score
- Explore alternative archetypes
- Zoom into product recommendations
- Review implementation phases
- Download comprehensive report

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/heru-ai/holistic-wealth-webapp.git
cd holistic-wealth-webapp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
\`\`\`

### Environment Variables

\`\`\`env
# Optional: Supabase integration for storing user profiles
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: Stripe (for premium features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Push to GitHub
git push origin main

# In Vercel Dashboard:
# 1. Import project from GitHub
# 2. Configure environment variables
# 3. Deploy

# Or use CLI
vercel deploy --prod
\`\`\`

### Deploy to Other Platforms

The app can run on any Node.js hosting:
- **Netlify**: Supported with adapter
- **Docker**: Create Dockerfile
- **AWS**: Lambda or EC2
- **GCP**: Cloud Run or App Engine

## Customization

### Modify Product Database
Edit `lib/product-recommendations.ts` to add/remove products:
\`\`\`typescript
export const PRODUCTS_DATABASE: InvestmentProduct[] = [
  // Add your products here
]
\`\`\`

### Add Custom Wellness Questions
Edit `components/wellness-assessment-flow.tsx` to customize questions:
\`\`\`typescript
const WELLNESS_QUESTIONS: Record<string, string[]> = {
  financial: ['Custom question 1', 'Custom question 2', ...],
  // Add more dimensions
}
\`\`\`

### Adjust Brand Colors
Modify `app/globals.css` CSS variables in the @theme block:
\`\`\`css
--color-accent-gold: #your-color;
--color-background: #your-color;
\`\`\`

### Customize Archetypes
Edit `lib/wealth-archetypes.ts` to modify or add archetypes:
\`\`\`typescript
export const WEALTH_ARCHETYPES: Record<string, WealthArchetype> = {
  customArchetype: {
    // Your archetype definition
  }
}
\`\`\`

## Performance Optimization

- **Code Splitting**: Routes use automatic splitting via Next.js
- **Image Optimization**: Use next/image for all images
- **Caching**: React Server Components provide automatic caching
- **Chart Rendering**: SVG charts optimize for large screens
- **State Management**: Minimal re-renders with proper React patterns

## Security

- **Data Privacy**: All client data stays client-side until explicitly submitted
- **HTTPS Only**: Enforce in production
- **CSRF Protection**: Built-in with Next.js
- **Input Validation**: All form inputs validated
- **API Routes**: Secured with authentication if connecting to backend

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Focus management in flows

## Testing

Add tests for:
- Wellness scoring calculations
- Risk profile classification
- Archetype assignment
- Product matching algorithm
- Form validation

\`\`\`bash
npm run test
\`\`\`

## FAQ

**Q: Can users save their results?**
A: Yes, with optional Supabase integration. Results can be stored and retrieved by authenticated users.

**Q: Is the product database customizable?**
A: Yes. Edit the PRODUCTS_DATABASE in lib/product-recommendations.ts with your own products.

**Q: Can we change the archetypes?**
A: Yes. Modify lib/wealth-archetypes.ts to define custom archetypes and classification logic.

**Q: What if someone skips sections?**
A: The app uses sensible defaults and allows skipping between major sections. Users can always go back.

**Q: How do we integrate with advisors?**
A: Add a contact form or calendar booking (Calendly/HubSpot) in the dashboard recommendation pages.

## Support & Maintenance

- **Bug Reports**: GitHub Issues
- **Feature Requests**: GitHub Discussions
- **Documentation**: See `/docs` folder
- **Styling Changes**: Update CSS variables in `app/globals.css`

## License

Copyright © 2025 Heru AI. All rights reserved.

---

**Built with Heru AI Philosophy:**
- Conscious Prosperity
- Intelligent Transformation
- Holistic Mastery
- Living Well, Investing Wise

The eye of Horus sees clearly. We help you see your wealth clearly.
