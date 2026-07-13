/**
 * Mock data fixture for Executive CIO Scorecard.
 *
 * Exports an array of scorecard metrics used by the ExecutiveScorecardSection.
 * Each metric includes name, value, target, unit, ragStatus, trend, trendValue,
 * trendSentiment, and description. Data is relative to 2024-06-10.
 *
 * @module scorecardData
 */

/**
 * @typedef {Object} ScorecardMetric
 * @property {string} id - Unique identifier for the metric
 * @property {string} name - Display name of the metric
 * @property {number} value - Current metric value
 * @property {number} target - Target metric value
 * @property {string} unit - Unit of measurement (e.g., '%', '₹', 'M')
 * @property {string} prefix - Prefix for the value display (e.g., '₹')
 * @property {'red' | 'amber' | 'green'} ragStatus - RAG status indicator
 * @property {string} ragLabel - Human-readable RAG status label
 * @property {'up' | 'down' | 'flat'} trend - Trend direction
 * @property {string} trendValue - Trend value text (e.g., '+5%')
 * @property {'positive' | 'negative' | 'neutral'} trendSentiment - Whether the trend is good or bad
 * @property {string} description - Brief description of the metric
 * @property {string} asOfDate - Date the metric was last updated (ISO format)
 */

/** @type {ScorecardMetric[]} */
export const scorecardMetrics = [
  {
    id: 'it-spend-vs-budget',
    name: 'IT Spend vs Budget',
    value: 12000000,
    target: 15000000,
    unit: '',
    prefix: '₹',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+8.2%',
    trendSentiment: 'negative',
    description: 'Total IT spend against approved annual budget. Currently at 80% of budget with Q3 commitments pending.',
    asOfDate: '2024-06-10',
  },
  {
    id: 'mid-term-plan-progress',
    name: 'Mid-Term Plan Progress',
    value: 65,
    target: 75,
    unit: '%',
    prefix: '',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+5%',
    trendSentiment: 'positive',
    description: 'Progress against the 3-year IT mid-term strategic plan milestones. On track for FY2024 targets.',
    asOfDate: '2024-06-10',
  },
  {
    id: 'operational-health',
    name: 'Operational Health',
    value: 82,
    target: 90,
    unit: '%',
    prefix: '',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+3%',
    trendSentiment: 'positive',
    description: 'Composite score of system uptime, incident resolution SLA, and service desk performance.',
    asOfDate: '2024-06-10',
  },
  {
    id: 'compliance-risk',
    name: 'Compliance & Risk',
    value: 68,
    target: 85,
    unit: '%',
    prefix: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'down',
    trendValue: '-4%',
    trendSentiment: 'negative',
    description: 'IT compliance score covering audit findings, license compliance, and security posture. Two open audit items require remediation.',
    asOfDate: '2024-06-10',
  },
  {
    id: 'transformation-progress',
    name: 'Transformation Progress',
    value: 48,
    target: 60,
    unit: '%',
    prefix: '',
    ragStatus: 'red',
    ragLabel: 'At Risk',
    trend: 'flat',
    trendValue: '0%',
    trendSentiment: 'neutral',
    description: 'Overall progress of digital transformation initiatives. ERP migration delayed by 6 weeks due to vendor dependency.',
    asOfDate: '2024-06-10',
  },
  {
    id: 'application-utilization',
    name: 'Application Utilization',
    value: 74,
    target: 80,
    unit: '%',
    prefix: '',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+2.5%',
    trendSentiment: 'positive',
    description: 'Average utilization rate across licensed enterprise applications. Three underutilized applications flagged for review.',
    asOfDate: '2024-06-10',
  },
];

/**
 * Summary data for the executive scorecard section.
 * @type {Object}
 */
export const scorecardSummary = {
  totalMetrics: 6,
  greenCount: 3,
  amberCount: 2,
  redCount: 1,
  overallStatus: 'amber',
  overallLabel: 'Needs Attention',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
  lastUpdated: '2024-06-10T09:00:00+05:30',
};

/**
 * IT Spend vs Budget breakdown for scorecard detail view.
 * @type {Object}
 */
export const itSpendVsBudget = {
  actual: 12000000,
  budget: 15000000,
  variance: -3000000,
  variancePercent: -20,
  ragStatus: 'amber',
  breakdown: [
    { category: 'Infrastructure', actual: 4200000, budget: 5000000 },
    { category: 'Applications', actual: 3100000, budget: 3500000 },
    { category: 'Personnel', actual: 2800000, budget: 3000000 },
    { category: 'Security', actual: 1100000, budget: 1500000 },
    { category: 'Innovation', actual: 800000, budget: 2000000 },
  ],
};

export default scorecardMetrics;