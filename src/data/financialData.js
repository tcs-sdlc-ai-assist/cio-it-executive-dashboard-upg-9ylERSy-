/**
 * Mock data fixture for IT Financial Overview.
 *
 * Exports financial summary object and monthly budget vs actual array
 * for chart rendering. Data is relative to 2024-06-10.
 *
 * @module financialData
 */

/**
 * @typedef {Object} FinancialSummary
 * @property {number} totalITSpend - Total IT spend year-to-date
 * @property {number} budget - Approved annual IT budget
 * @property {number} actuals - Actual spend year-to-date
 * @property {number} forecast - Forecasted full-year spend
 * @property {number} variance - Budget variance (budget - actuals)
 * @property {number} variancePercentage - Variance as percentage of budget
 * @property {number} runSpend - Operational/run spend (keep-the-lights-on)
 * @property {number} changeSpend - Change/transformation spend (projects, initiatives)
 * @property {'red' | 'amber' | 'green'} ragStatus - Overall financial RAG status
 * @property {string} ragLabel - Human-readable RAG status label
 * @property {string} reportingPeriod - Current reporting period label
 * @property {string} asOfDate - Date the data was last updated (ISO format)
 */

/** @type {FinancialSummary} */
export const financialSummary = {
  totalITSpend: 12000000,
  budget: 15000000,
  actuals: 12000000,
  forecast: 14200000,
  variance: 3000000,
  variancePercentage: 20,
  runSpend: 8400000,
  changeSpend: 3600000,
  ragStatus: 'amber',
  ragLabel: 'Needs Attention',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
};

/**
 * @typedef {Object} MonthlyBudgetActual
 * @property {string} month - Month label (e.g., 'Jan 2024')
 * @property {number} budget - Budgeted spend for the month
 * @property {number} actual - Actual spend for the month
 * @property {number} forecast - Forecasted spend for the month
 */

/**
 * Monthly budget vs actual data for chart rendering.
 * Covers Jan 2024 through Jun 2024 (actuals) and Jul 2024 through Dec 2024 (forecast only).
 * @type {MonthlyBudgetActual[]}
 */
export const monthlyBudgetVsActual = [
  { month: 'Jan 2024', budget: 1250000, actual: 1180000, forecast: 1180000 },
  { month: 'Feb 2024', budget: 1250000, actual: 1320000, forecast: 1320000 },
  { month: 'Mar 2024', budget: 1250000, actual: 1150000, forecast: 1150000 },
  { month: 'Apr 2024', budget: 1250000, actual: 1400000, forecast: 1400000 },
  { month: 'May 2024', budget: 1250000, actual: 1280000, forecast: 1280000 },
  { month: 'Jun 2024', budget: 1250000, actual: 1270000, forecast: 1270000 },
  { month: 'Jul 2024', budget: 1250000, actual: null, forecast: 1200000 },
  { month: 'Aug 2024', budget: 1250000, actual: null, forecast: 1250000 },
  { month: 'Sep 2024', budget: 1250000, actual: null, forecast: 1300000 },
  { month: 'Oct 2024', budget: 1250000, actual: null, forecast: 1180000 },
  { month: 'Nov 2024', budget: 1250000, actual: null, forecast: 1150000 },
  { month: 'Dec 2024', budget: 1250000, actual: null, forecast: 1250000 },
];

/**
 * @typedef {Object} SpendCategory
 * @property {string} category - Spend category name
 * @property {number} budget - Budgeted amount for the category
 * @property {number} actual - Actual spend for the category
 * @property {number} variance - Variance (budget - actual)
 * @property {number} variancePercent - Variance as percentage of budget
 * @property {'red' | 'amber' | 'green'} ragStatus - Category RAG status
 */

/**
 * IT spend breakdown by category.
 * @type {SpendCategory[]}
 */
export const spendByCategory = [
  {
    category: 'Infrastructure',
    budget: 5000000,
    actual: 4200000,
    variance: 800000,
    variancePercent: 16,
    ragStatus: 'green',
  },
  {
    category: 'Applications',
    budget: 3500000,
    actual: 3100000,
    variance: 400000,
    variancePercent: 11.4,
    ragStatus: 'green',
  },
  {
    category: 'Personnel',
    budget: 3000000,
    actual: 2800000,
    variance: 200000,
    variancePercent: 6.7,
    ragStatus: 'green',
  },
  {
    category: 'Security',
    budget: 1500000,
    actual: 1100000,
    variance: 400000,
    variancePercent: 26.7,
    ragStatus: 'amber',
  },
  {
    category: 'Innovation',
    budget: 2000000,
    actual: 800000,
    variance: 1200000,
    variancePercent: 60,
    ragStatus: 'red',
  },
];

/**
 * @typedef {Object} RunVsChangeBreakdown
 * @property {string} label - Breakdown label
 * @property {number} value - Spend amount
 * @property {string} [color] - Optional colour for chart rendering
 */

/**
 * Run vs Change spend breakdown for donut chart rendering.
 * @type {RunVsChangeBreakdown[]}
 */
export const runVsChangeBreakdown = [
  { label: 'Run (Operational)', value: 8400000, color: '#6C757D' },
  { label: 'Change (Transformation)', value: 3600000, color: '#E60012' },
];

/**
 * @typedef {Object} QuarterlySpend
 * @property {string} quarter - Quarter label (e.g., 'Q1 FY2024')
 * @property {number} budget - Budgeted spend for the quarter
 * @property {number} actual - Actual spend for the quarter
 * @property {number} forecast - Forecasted spend for the quarter
 */

/**
 * Quarterly spend summary for trend analysis.
 * @type {QuarterlySpend[]}
 */
export const quarterlySpend = [
  { quarter: 'Q1 FY2024', budget: 3750000, actual: 3650000, forecast: 3650000 },
  { quarter: 'Q2 FY2024', budget: 3750000, actual: 3950000, forecast: 3950000 },
  { quarter: 'Q3 FY2024', budget: 3750000, actual: null, forecast: 3750000 },
  { quarter: 'Q4 FY2024', budget: 3750000, actual: null, forecast: 3580000 },
];

/**
 * Financial KPI metrics for metric card rendering.
 * @type {Array<Object>}
 */
export const financialKPIs = [
  {
    id: 'total-it-spend',
    name: 'Total IT Spend (YTD)',
    value: 12000000,
    target: 15000000,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+8.2%',
    trendSentiment: 'negative',
    description: 'Year-to-date IT spend against annual budget.',
  },
  {
    id: 'budget-utilization',
    name: 'Budget Utilization',
    value: 80,
    target: 100,
    prefix: '',
    unit: '%',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+5%',
    trendSentiment: 'positive',
    description: 'Percentage of annual budget consumed year-to-date.',
  },
  {
    id: 'run-spend-ratio',
    name: 'Run Spend Ratio',
    value: 70,
    target: 65,
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'down',
    trendValue: '-2%',
    trendSentiment: 'positive',
    description: 'Operational spend as percentage of total IT spend. Target is to reduce below 65%.',
  },
  {
    id: 'change-spend-ratio',
    name: 'Change Spend Ratio',
    value: 30,
    target: 35,
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+2%',
    trendSentiment: 'positive',
    description: 'Transformation spend as percentage of total IT spend. Target is to increase above 35%.',
  },
  {
    id: 'forecast-accuracy',
    name: 'Forecast Accuracy',
    value: 94.7,
    target: 95,
    prefix: '',
    unit: '%',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+1.2%',
    trendSentiment: 'positive',
    description: 'Accuracy of financial forecasting against actuals.',
  },
];

export default financialSummary;