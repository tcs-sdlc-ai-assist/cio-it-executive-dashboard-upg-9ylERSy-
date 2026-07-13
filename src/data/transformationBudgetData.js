/**
 * Mock data fixture for Transformation Progress Against Budget.
 *
 * Exports budget tracking object with approvedBudget, actualSpend,
 * forecastToComplete, variance, benefitRealization, and monthly burn-rate
 * data array for line chart rendering.
 * Data is relative to 2024-06-10.
 *
 * @module transformationBudgetData
 */

import {
  transformationPrograms,
  totalProgramBudget,
  totalProgramSpend,
  totalProgramBenefitsRealized,
  totalProgramBenefitsTarget,
  overallProgramBenefitsPercentage,
} from './transformationProgramsData';

/**
 * @typedef {Object} TransformationBudgetSummary
 * @property {number} approvedBudget - Total approved budget across all transformation programs in INR
 * @property {number} actualSpend - Actual spend to date across all programs in INR
 * @property {number} forecastToComplete - Forecasted spend to complete all programs in INR
 * @property {number} totalForecast - Total forecast (actualSpend + forecastToComplete) in INR
 * @property {number} variance - Budget variance (approvedBudget - totalForecast) in INR
 * @property {number} variancePercent - Variance as percentage of approved budget
 * @property {number} budgetUtilization - Percentage of approved budget spent to date
 * @property {number} benefitsRealized - Total benefits realized across all programs in INR
 * @property {number} benefitsTarget - Total benefits target across all programs in INR
 * @property {number} benefitsPercentage - Benefits realized as percentage of target
 * @property {'red' | 'amber' | 'green'} ragStatus - Overall budget RAG status
 * @property {string} ragLabel - Human-readable RAG status label
 * @property {string} reportingPeriod - Current reporting period label
 * @property {string} asOfDate - Date the data was last updated (ISO format)
 */

/**
 * Forecasted spend to complete all transformation programs.
 * @type {number}
 */
export const forecastToComplete = 3900000;

/**
 * Total forecast (actual spend + forecast to complete).
 * @type {number}
 */
export const totalForecast = totalProgramSpend + forecastToComplete;

/**
 * Budget variance (approved budget - total forecast).
 * @type {number}
 */
export const budgetVariance = totalProgramBudget - totalForecast;

/**
 * Variance as percentage of approved budget.
 * @type {number}
 */
export const budgetVariancePercent = totalProgramBudget > 0
  ? Math.round((budgetVariance / totalProgramBudget) * 100 * 10) / 10
  : 0;

/**
 * Budget utilization percentage (actual spend / approved budget).
 * @type {number}
 */
export const budgetUtilization = totalProgramBudget > 0
  ? Math.round((totalProgramSpend / totalProgramBudget) * 100)
  : 0;

/** @type {TransformationBudgetSummary} */
export const transformationBudgetSummary = {
  approvedBudget: totalProgramBudget,
  actualSpend: totalProgramSpend,
  forecastToComplete,
  totalForecast,
  variance: budgetVariance,
  variancePercent: budgetVariancePercent,
  budgetUtilization,
  benefitsRealized: totalProgramBenefitsRealized,
  benefitsTarget: totalProgramBenefitsTarget,
  benefitsPercentage: overallProgramBenefitsPercentage,
  ragStatus: 'amber',
  ragLabel: 'Needs Attention',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
};

/**
 * @typedef {Object} MonthlyBurnRate
 * @property {string} month - Month label (e.g., 'Jan 2024')
 * @property {number} planned - Planned spend for the month in INR
 * @property {number} actual - Actual spend for the month in INR (null for future months)
 * @property {number} forecast - Forecasted spend for the month in INR
 * @property {number} cumulativePlanned - Cumulative planned spend through this month
 * @property {number} cumulativeActual - Cumulative actual spend through this month (null for future months)
 * @property {number} cumulativeForecast - Cumulative forecasted spend through this month
 */

/**
 * Monthly burn-rate data for line chart rendering.
 * Covers Jan 2024 through Dec 2024 with actuals through Jun 2024
 * and forecast for Jul 2024 through Dec 2024.
 * @type {MonthlyBurnRate[]}
 */
export const monthlyBurnRateData = [
  {
    month: 'Jan 2024',
    planned: 550000,
    actual: 520000,
    forecast: 520000,
    cumulativePlanned: 550000,
    cumulativeActual: 520000,
    cumulativeForecast: 520000,
  },
  {
    month: 'Feb 2024',
    planned: 550000,
    actual: 580000,
    forecast: 580000,
    cumulativePlanned: 1100000,
    cumulativeActual: 1100000,
    cumulativeForecast: 1100000,
  },
  {
    month: 'Mar 2024',
    planned: 600000,
    actual: 620000,
    forecast: 620000,
    cumulativePlanned: 1700000,
    cumulativeActual: 1720000,
    cumulativeForecast: 1720000,
  },
  {
    month: 'Apr 2024',
    planned: 600000,
    actual: 650000,
    forecast: 650000,
    cumulativePlanned: 2300000,
    cumulativeActual: 2370000,
    cumulativeForecast: 2370000,
  },
  {
    month: 'May 2024',
    planned: 650000,
    actual: 680000,
    forecast: 680000,
    cumulativePlanned: 2950000,
    cumulativeActual: 3050000,
    cumulativeForecast: 3050000,
  },
  {
    month: 'Jun 2024',
    planned: 650000,
    actual: 670000,
    forecast: 670000,
    cumulativePlanned: 3600000,
    cumulativeActual: 3720000,
    cumulativeForecast: 3720000,
  },
  {
    month: 'Jul 2024',
    planned: 700000,
    actual: null,
    forecast: 720000,
    cumulativePlanned: 4300000,
    cumulativeActual: null,
    cumulativeForecast: 4440000,
  },
  {
    month: 'Aug 2024',
    planned: 700000,
    actual: null,
    forecast: 710000,
    cumulativePlanned: 5000000,
    cumulativeActual: null,
    cumulativeForecast: 5150000,
  },
  {
    month: 'Sep 2024',
    planned: 750000,
    actual: null,
    forecast: 740000,
    cumulativePlanned: 5750000,
    cumulativeActual: null,
    cumulativeForecast: 5890000,
  },
  {
    month: 'Oct 2024',
    planned: 750000,
    actual: null,
    forecast: 760000,
    cumulativePlanned: 6500000,
    cumulativeActual: null,
    cumulativeForecast: 6650000,
  },
  {
    month: 'Nov 2024',
    planned: 800000,
    actual: null,
    forecast: 780000,
    cumulativePlanned: 7300000,
    cumulativeActual: null,
    cumulativeForecast: 7430000,
  },
  {
    month: 'Dec 2024',
    planned: 800000,
    actual: null,
    forecast: 790000,
    cumulativePlanned: 8100000,
    cumulativeActual: null,
    cumulativeForecast: 8220000,
  },
];

/**
 * Monthly burn-rate data formatted for LineChart component consumption.
 * Uses cumulative values for S-curve visualization.
 * @type {Array<Object>}
 */
export const burnRateLineChartData = monthlyBurnRateData.map((entry) => ({
  month: entry.month,
  planned: entry.cumulativePlanned,
  actual: entry.cumulativeActual,
  forecast: entry.cumulativeForecast,
}));

/**
 * Monthly spend data formatted for BarChart component consumption.
 * Uses monthly (non-cumulative) values for period-over-period comparison.
 * @type {Array<Object>}
 */
export const burnRateBarChartData = monthlyBurnRateData
  .filter((entry) => entry.actual !== null)
  .map((entry) => ({
    month: entry.month,
    planned: entry.planned,
    actual: entry.actual,
  }));

/**
 * @typedef {Object} ProgramBudgetBreakdown
 * @property {string} program - Program name
 * @property {number} approvedBudget - Approved budget in INR
 * @property {number} actualSpend - Actual spend to date in INR
 * @property {number} forecastToComplete - Forecast to complete in INR
 * @property {number} totalForecast - Total forecast in INR
 * @property {number} variance - Budget variance in INR
 * @property {number} variancePercent - Variance as percentage of budget
 * @property {number} utilization - Budget utilization percentage
 * @property {'red' | 'amber' | 'green'} ragStatus - Program budget RAG status
 */

/**
 * Budget breakdown by transformation program for DataTable rendering.
 * @type {ProgramBudgetBreakdown[]}
 */
export const programBudgetBreakdown = [
  {
    program: 'ERP Transformation (SAP S/4HANA)',
    approvedBudget: 5000000,
    actualSpend: 3200000,
    forecastToComplete: 2200000,
    totalForecast: 5400000,
    variance: -400000,
    variancePercent: -8.0,
    utilization: 64,
    ragStatus: 'red',
  },
  {
    program: 'Cloud Migration & Infrastructure Modernization',
    approvedBudget: 3500000,
    actualSpend: 2400000,
    forecastToComplete: 900000,
    totalForecast: 3300000,
    variance: 200000,
    variancePercent: 5.7,
    utilization: 69,
    ragStatus: 'green',
  },
  {
    program: 'Digital Customer Experience Platform',
    approvedBudget: 2500000,
    actualSpend: 1500000,
    forecastToComplete: 800000,
    totalForecast: 2300000,
    variance: 200000,
    variancePercent: 8.0,
    utilization: 60,
    ragStatus: 'amber',
  },
];

/**
 * @typedef {Object} BenefitRealizationEntry
 * @property {string} program - Program name
 * @property {number} benefitsTarget - Benefits target in INR
 * @property {number} benefitsRealized - Benefits realized to date in INR
 * @property {number} benefitsPercentage - Benefits realized as percentage of target
 * @property {'red' | 'amber' | 'green'} ragStatus - Benefits realization RAG status
 */

/**
 * Benefits realization breakdown by program for DataTable rendering.
 * @type {BenefitRealizationEntry[]}
 */
export const benefitRealizationBreakdown = transformationPrograms.map((program) => ({
  program: program.programName,
  benefitsTarget: program.benefitsTarget,
  benefitsRealized: program.benefitsRealized,
  benefitsPercentage: program.benefitsPercentage,
  ragStatus: program.benefitsPercentage >= 60
    ? 'green'
    : program.benefitsPercentage >= 30
      ? 'amber'
      : 'red',
}));

/**
 * Benefits realization data formatted for DonutChart component consumption.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const benefitRealizationDonutData = [
  {
    label: 'Benefits Realized',
    value: totalProgramBenefitsRealized,
    color: '#28A745',
  },
  {
    label: 'Benefits Remaining',
    value: totalProgramBenefitsTarget - totalProgramBenefitsRealized,
    color: '#E5E7EB',
  },
];

/**
 * Budget allocation data formatted for DonutChart component consumption.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const budgetAllocationDonutData = (() => {
  const colors = ['#E60012', '#28A745', '#FFC107'];
  return programBudgetBreakdown.map((entry, index) => ({
    label: entry.program,
    value: entry.approvedBudget,
    color: colors[index % colors.length],
  }));
})();

/**
 * Spend allocation data formatted for DonutChart component consumption.
 * Shows actual spend distribution across programs.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const spendAllocationDonutData = (() => {
  const colors = ['#E60012', '#28A745', '#FFC107'];
  return programBudgetBreakdown.map((entry, index) => ({
    label: entry.program,
    value: entry.actualSpend,
    color: colors[index % colors.length],
  }));
})();

/**
 * Quarterly budget tracking data for trend analysis.
 * @typedef {Object} QuarterlyBudgetTracking
 * @property {string} quarter - Quarter label
 * @property {number} planned - Planned cumulative spend at end of quarter
 * @property {number} actual - Actual cumulative spend at end of quarter (null for future quarters)
 * @property {number} forecast - Forecasted cumulative spend at end of quarter
 */

/**
 * Quarterly budget tracking for transformation programs.
 * @type {QuarterlyBudgetTracking[]}
 */
export const quarterlyBudgetTracking = [
  { quarter: 'Q1 FY2024', planned: 1700000, actual: 1720000, forecast: 1720000 },
  { quarter: 'Q2 FY2024', planned: 3600000, actual: 3720000, forecast: 3720000 },
  { quarter: 'Q3 FY2024', planned: 5750000, actual: null, forecast: 5890000 },
  { quarter: 'Q4 FY2024', planned: 8100000, actual: null, forecast: 8220000 },
];

/**
 * Transformation budget KPI metrics for MetricCard rendering.
 * @type {Array<Object>}
 */
export const transformationBudgetKPIs = [
  {
    id: 'approved-budget',
    name: 'Approved Budget',
    value: totalProgramBudget,
    prefix: '₹',
    unit: '',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'flat',
    trendValue: '0%',
    trendSentiment: 'neutral',
    description: 'Total approved budget across all transformation programs.',
  },
  {
    id: 'actual-spend',
    name: 'Actual Spend (YTD)',
    value: totalProgramSpend,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+10.5%',
    trendSentiment: 'negative',
    description: 'Actual spend to date across all transformation programs.',
  },
  {
    id: 'budget-utilization',
    name: 'Budget Utilization',
    value: budgetUtilization,
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+8%',
    trendSentiment: 'neutral',
    description: 'Percentage of approved budget consumed to date.',
  },
  {
    id: 'budget-variance',
    name: 'Budget Variance',
    value: budgetVariance,
    prefix: '₹',
    unit: '',
    ragStatus: budgetVariance >= 0 ? 'green' : 'red',
    ragLabel: budgetVariance >= 0 ? 'On Track' : 'At Risk',
    trend: budgetVariance >= 0 ? 'flat' : 'down',
    trendValue: `${budgetVariancePercent}%`,
    trendSentiment: budgetVariance >= 0 ? 'positive' : 'negative',
    description: 'Difference between approved budget and total forecast spend.',
  },
  {
    id: 'benefits-realization',
    name: 'Benefits Realization',
    value: overallProgramBenefitsPercentage,
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+6%',
    trendSentiment: 'positive',
    description: 'Percentage of target benefits realized across all transformation programs.',
  },
  {
    id: 'forecast-to-complete',
    name: 'Forecast to Complete',
    value: forecastToComplete,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+3%',
    trendSentiment: 'negative',
    description: 'Estimated remaining spend to complete all transformation programs.',
  },
];

export default transformationBudgetSummary;