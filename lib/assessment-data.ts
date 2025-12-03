/**
 * Heru AI Assessment Data Structures & MCQ Questions
 * Multi-choice questions for Wealth Archetype and Wellness Assessment
 */

export interface ClientProfile {
  name: string
  age: number
  dependents: number
  existingWealth: {
    equities: number
    fixedIncome: number
    realEstate: number
    privateEquity: number
    alternatives: number
    cash: number
    insurance: number
  }
  totalWealth: number
}

export const WEALTH_ARCHETYPE_QUESTIONS = [
  {
    id: "q1",
    question: "When thinking about your wealth, what resonates most with you?",
    answers: [
      { text: "Building a legacy for future generations", archetypeId: "legacy-sovereign" },
      { text: "Creating opportunities for growth and expansion", archetypeId: "visionary-builder" },
      { text: "Maintaining balance across all life dimensions", archetypeId: "harmonious-strategist" },
      { text: "Generating positive impact on people and planet", archetypeId: "conscious-creator" },
      { text: "Ensuring security and protection for what I value", archetypeId: "guardian-of-stability" },
    ],
  },
  {
    id: "q2",
    question: "Your ideal time horizon for investments is:",
    answers: [
      { text: "Perpetual - thinking across generations", archetypeId: "legacy-sovereign" },
      { text: "Long-term - 10+ years to capture growth", archetypeId: "visionary-builder" },
      { text: "Balanced mix of short and long-term", archetypeId: "harmonious-strategist" },
      { text: "Long-term with impact considerations", archetypeId: "conscious-creator" },
      { text: "Near-term with stable returns", archetypeId: "guardian-of-stability" },
    ],
  },
  {
    id: "q3",
    question: "When facing financial decisions, you prioritize:",
    answers: [
      { text: "Multi-generational impact and values transmission", archetypeId: "legacy-sovereign" },
      { text: "Opportunity and growth potential", archetypeId: "visionary-builder" },
      { text: "Balanced optimization across priorities", archetypeId: "harmonious-strategist" },
      { text: "Alignment with personal values and purpose", archetypeId: "conscious-creator" },
      { text: "Security and capital preservation", archetypeId: "guardian-of-stability" },
    ],
  },
  {
    id: "q4",
    question: "Your relationship to risk is best described as:",
    answers: [
      { text: "Risk-aware with multi-generational perspective", archetypeId: "legacy-sovereign" },
      { text: "Comfortable with calculated risk for growth", archetypeId: "visionary-builder" },
      { text: "Seeking optimal balance", archetypeId: "harmonious-strategist" },
      { text: "Values-aligned rather than risk-focused", archetypeId: "conscious-creator" },
      { text: "Preferring stability and safety", archetypeId: "guardian-of-stability" },
    ],
  },
  {
    id: "q5",
    question: "When considering your wealth structure, you value:",
    answers: [
      { text: "Family governance and succession planning", archetypeId: "legacy-sovereign" },
      { text: "Flexibility and optionality for new ventures", archetypeId: "visionary-builder" },
      { text: "Systematic, integrated financial planning", archetypeId: "harmonious-strategist" },
      { text: "Transparency and values-aligned vehicles", archetypeId: "conscious-creator" },
      { text: "Protective structures and insurance", archetypeId: "guardian-of-stability" },
    ],
  },
]

export const WELLNESS_ASSESSMENT_QUESTIONS = [
  {
    id: "financial",
    dimension: "Financial Wellness",
    questions: [
      {
        id: "fin1",
        text: "I have clarity on my financial goals and current financial position",
        answers: [
          { text: "Strongly Disagree", score: 10 },
          { text: "Disagree", score: 30 },
          { text: "Neutral", score: 50 },
          { text: "Agree", score: 70 },
          { text: "Strongly Agree", score: 90 },
        ],
      },
      {
        id: "fin2",
        text: "I feel confident managing financial decisions and investments",
        answers: [
          { text: "Not Confident", score: 15 },
          { text: "Somewhat Unconfident", score: 35 },
          { text: "Neutral", score: 55 },
          { text: "Somewhat Confident", score: 75 },
          { text: "Very Confident", score: 95 },
        ],
      },
      {
        id: "fin3",
        text: "My financial plan aligns with my life values and purpose",
        answers: [
          { text: "Not Aligned", score: 10 },
          { text: "Somewhat Misaligned", score: 35 },
          { text: "Neutral", score: 50 },
          { text: "Mostly Aligned", score: 72 },
          { text: "Fully Aligned", score: 90 },
        ],
      },
    ],
  },
  {
    id: "physical",
    dimension: "Physical Wellness",
    questions: [
      {
        id: "phys1",
        text: "I maintain regular physical activity and exercise",
        answers: [
          { text: "Rarely/Never", score: 15 },
          { text: "Occasionally", score: 35 },
          { text: "Moderately", score: 55 },
          { text: "Regularly", score: 75 },
          { text: "Consistently", score: 95 },
        ],
      },
      {
        id: "phys2",
        text: "My sleep quality and duration support my wellbeing",
        answers: [
          { text: "Very Poor", score: 10 },
          { text: "Poor", score: 30 },
          { text: "Average", score: 50 },
          { text: "Good", score: 75 },
          { text: "Excellent", score: 90 },
        ],
      },
      {
        id: "phys3",
        text: "I feel physically energized and capable in my daily life",
        answers: [
          { text: "Not at All", score: 10 },
          { text: "Slightly", score: 30 },
          { text: "Moderately", score: 55 },
          { text: "Mostly", score: 75 },
          { text: "Completely", score: 95 },
        ],
      },
    ],
  },
  {
    id: "emotional",
    dimension: "Emotional Wellness",
    questions: [
      {
        id: "emot1",
        text: "I understand and can manage my emotions effectively",
        answers: [
          { text: "Strongly Disagree", score: 15 },
          { text: "Disagree", score: 35 },
          { text: "Neutral", score: 55 },
          { text: "Agree", score: 75 },
          { text: "Strongly Agree", score: 90 },
        ],
      },
      {
        id: "emot2",
        text: "I handle stress and challenges with resilience",
        answers: [
          { text: "Not Resilient", score: 15 },
          { text: "Somewhat Fragile", score: 35 },
          { text: "Moderately Resilient", score: 55 },
          { text: "Quite Resilient", score: 75 },
          { text: "Very Resilient", score: 90 },
        ],
      },
      {
        id: "emot3",
        text: "I feel satisfied and fulfilled with my life",
        answers: [
          { text: "Not Satisfied", score: 10 },
          { text: "Somewhat Unsatisfied", score: 35 },
          { text: "Neutral", score: 50 },
          { text: "Mostly Satisfied", score: 72 },
          { text: "Very Satisfied", score: 95 },
        ],
      },
    ],
  },
  {
    id: "social",
    dimension: "Social Wellness",
    questions: [
      {
        id: "soc1",
        text: "I have meaningful, supportive relationships",
        answers: [
          { text: "No", score: 10 },
          { text: "Few", score: 30 },
          { text: "Some", score: 55 },
          { text: "Many", score: 75 },
          { text: "Very Strong Network", score: 90 },
        ],
      },
      {
        id: "soc2",
        text: "I feel connected to my community",
        answers: [
          { text: "Very Disconnected", score: 15 },
          { text: "Somewhat Disconnected", score: 35 },
          { text: "Neutral", score: 55 },
          { text: "Connected", score: 75 },
          { text: "Very Connected", score: 90 },
        ],
      },
      {
        id: "soc3",
        text: "I have adequate time and energy for relationships",
        answers: [
          { text: "Never", score: 15 },
          { text: "Rarely", score: 35 },
          { text: "Sometimes", score: 55 },
          { text: "Often", score: 75 },
          { text: "Always", score: 90 },
        ],
      },
    ],
  },
  {
    id: "intellectual",
    dimension: "Intellectual Wellness",
    questions: [
      {
        id: "intel1",
        text: "I engage in continuous learning and mental stimulation",
        answers: [
          { text: "Never", score: 15 },
          { text: "Rarely", score: 35 },
          { text: "Sometimes", score: 55 },
          { text: "Regularly", score: 75 },
          { text: "Constantly", score: 90 },
        ],
      },
      {
        id: "intel2",
        text: "I apply my knowledge and skills meaningfully",
        answers: [
          { text: "Never", score: 10 },
          { text: "Rarely", score: 35 },
          { text: "Sometimes", score: 50 },
          { text: "Regularly", score: 72 },
          { text: "Always", score: 95 },
        ],
      },
      {
        id: "intel3",
        text: "I feel intellectually challenged and engaged",
        answers: [
          { text: "Not at All", score: 15 },
          { text: "Slightly", score: 35 },
          { text: "Moderately", score: 55 },
          { text: "Quite a Bit", score: 75 },
          { text: "Completely", score: 90 },
        ],
      },
    ],
  },
  {
    id: "occupational",
    dimension: "Occupational Wellness",
    questions: [
      {
        id: "occ1",
        text: "My work aligns with my values and purpose",
        answers: [
          { text: "Not Aligned", score: 10 },
          { text: "Somewhat Misaligned", score: 35 },
          { text: "Neutral", score: 50 },
          { text: "Mostly Aligned", score: 72 },
          { text: "Fully Aligned", score: 90 },
        ],
      },
      {
        id: "occ2",
        text: "I feel satisfied with my professional accomplishments",
        answers: [
          { text: "Not Satisfied", score: 15 },
          { text: "Somewhat Unsatisfied", score: 35 },
          { text: "Neutral", score: 55 },
          { text: "Satisfied", score: 75 },
          { text: "Very Satisfied", score: 90 },
        ],
      },
      {
        id: "occ3",
        text: "I have work-life balance and manage stress well",
        answers: [
          { text: "No Balance", score: 15 },
          { text: "Poor Balance", score: 35 },
          { text: "Fair Balance", score: 55 },
          { text: "Good Balance", score: 75 },
          { text: "Excellent Balance", score: 90 },
        ],
      },
    ],
  },
  {
    id: "environmental",
    dimension: "Environmental Wellness",
    questions: [
      {
        id: "env1",
        text: "I make conscious choices to minimize environmental impact",
        answers: [
          { text: "Never", score: 15 },
          { text: "Rarely", score: 35 },
          { text: "Sometimes", score: 55 },
          { text: "Often", score: 75 },
          { text: "Always", score: 90 },
        ],
      },
      {
        id: "env2",
        text: "I spend time in nature and value environmental stewardship",
        answers: [
          { text: "Never", score: 10 },
          { text: "Rarely", score: 30 },
          { text: "Sometimes", score: 55 },
          { text: "Often", score: 75 },
          { text: "Very Often", score: 95 },
        ],
      },
      {
        id: "env3",
        text: "I feel connected to the natural world",
        answers: [
          { text: "Not Connected", score: 15 },
          { text: "Somewhat Disconnected", score: 35 },
          { text: "Neutral", score: 50 },
          { text: "Connected", score: 75 },
          { text: "Very Connected", score: 90 },
        ],
      },
    ],
  },
  {
    id: "spiritual",
    dimension: "Spiritual Wellness",
    questions: [
      {
        id: "spir1",
        text: "I have a sense of purpose and meaning in my life",
        answers: [
          { text: "No Purpose", score: 10 },
          { text: "Unclear", score: 30 },
          { text: "Somewhat Clear", score: 55 },
          { text: "Clear", score: 75 },
          { text: "Crystal Clear", score: 95 },
        ],
      },
      {
        id: "spir2",
        text: "My values guide my decisions and actions",
        answers: [
          { text: "Not Guided", score: 15 },
          { text: "Rarely", score: 35 },
          { text: "Sometimes", score: 50 },
          { text: "Usually", score: 75 },
          { text: "Always", score: 90 },
        ],
      },
      {
        id: "spir3",
        text: "I engage in practices that nourish my spiritual wellbeing",
        answers: [
          { text: "Never", score: 15 },
          { text: "Rarely", score: 35 },
          { text: "Sometimes", score: 55 },
          { text: "Often", score: 75 },
          { text: "Consistently", score: 90 },
        ],
      },
    ],
  },
]
