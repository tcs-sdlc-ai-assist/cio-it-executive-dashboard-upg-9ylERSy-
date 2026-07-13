/**
 * Mock data fixture for Top 3 Transformation Programs.
 *
 * Exports an array of 3 transformation programs with program details for the
 * TransformationProgramsSection. Each entry includes program name, budget,
 * actual spend, milestone progress, benefits realized, key risks, and RAG status.
 * Data is relative to 2024-06-10.
 *
 * @module transformationProgramsData
 */

/**
 * @typedef {Object} TransformationProgram
 * @property {string} id - Unique identifier for the program
 * @property {string} programName - Transformation program name
 * @property {number} budget - Approved program budget in INR
 * @property {number} actualSpend - Actual spend to date in INR
 * @property {number} spendVariance - Budget variance (budget - actualSpend)
 * @property {number} spendVariancePercent - Variance as percentage of budget
 * @property {number} milestoneProgress - Milestone progress as percentage (0-100)
 * @property {number} totalMilestones - Total number of milestones
 * @property {number} completedMilestones - Number of milestones completed
 * @property {number} benefitsRealized - Benefits realized in INR
 * @property {number} benefitsTarget - Benefits target in INR
 * @property {number} benefitsPercentage - Benefits realized as percentage of target
 * @property {Array<string>} keyRisks - Array of key risk descriptions
 * @property {'red' | 'amber' | 'green'} ragStatus - Program RAG status
 * @property {string} ragLabel - Human-readable RAG status label
 * @property {string} owner - Program owner / responsible executive
 * @property {string} startDate - Program start date (ISO format)
 * @property {string} targetEndDate - Target end date (ISO format)
 * @property {string} description - Brief description of the program
 */

/**
 * Top 3 transformation programs for dashboard rendering.
 * @type {TransformationProgram[]}
 */
export const transformationPrograms = [
  {
    id: 'tp-001',
    programName: 'ERP Transformation (SAP S/4HANA)',
    budget: 5000000,
    actualSpend: 3200000,
    spendVariance: 1800000,
    spendVariancePercent: 36,
    milestoneProgress: 47,
    totalMilestones: 15,
    completedMilestones: 7,
    benefitsRealized: 800000,
    benefitsTarget: 5000000,
    benefitsPercentage: 16,
    keyRisks: [
      'Vendor delivery delays impacting go-live timeline by 6 weeks',
      'Data migration complexity higher than estimated',
      'Change management adoption below target across business units',
      'Integration testing with legacy systems incomplete',
    ],
    ragStatus: 'red',
    ragLabel: 'At Risk',
    owner: 'VP Applications',
    startDate: '2023-04-01',
    targetEndDate: '2025-09-30',
    description: 'End-to-end ERP transformation from legacy SAP ECC to S/4HANA across all business units including finance, supply chain, and HR modules.',
  },
  {
    id: 'tp-002',
    programName: 'Cloud Migration & Infrastructure Modernization',
    budget: 3500000,
    actualSpend: 2400000,
    spendVariance: 1100000,
    spendVariancePercent: 31.4,
    milestoneProgress: 75,
    totalMilestones: 12,
    completedMilestones: 9,
    benefitsRealized: 2400000,
    benefitsTarget: 3500000,
    benefitsPercentage: 68.6,
    keyRisks: [
      'Network latency issues for hybrid cloud workloads',
      'Security compliance certification pending for cloud environment',
    ],
    ragStatus: 'green',
    ragLabel: 'On Track',
    owner: 'VP Infrastructure',
    startDate: '2023-01-01',
    targetEndDate: '2025-03-31',
    description: 'Migrate 80% of on-premise workloads to AWS/Azure cloud infrastructure, decommission legacy data centres, and modernize core infrastructure.',
  },
  {
    id: 'tp-003',
    programName: 'Digital Customer Experience Platform',
    budget: 2500000,
    actualSpend: 1500000,
    spendVariance: 1000000,
    spendVariancePercent: 40,
    milestoneProgress: 60,
    totalMilestones: 10,
    completedMilestones: 6,
    benefitsRealized: 1100000,
    benefitsTarget: 2500000,
    benefitsPercentage: 44,
    keyRisks: [
      'Third-party API integration delays with payment gateway',
      'Mobile app performance benchmarks not yet met',
      'Customer data privacy compliance review pending',
    ],
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    owner: 'VP Digital',
    startDate: '2023-07-01',
    targetEndDate: '2025-06-30',
    description: 'Revamp customer-facing digital channels including e-commerce platform, mobile app, omnichannel support, and CRM enhancements.',
  },
];

/**
 * Total budget across all transformation programs.
 * @type {number}
 */
export const totalProgramBudget = transformationPrograms.reduce(
  (sum, program) => sum + program.budget,
  0
);

/**
 * Total actual spend across all transformation programs.
 * @type {number}
 */
export const totalProgramSpend = transformationPrograms.reduce(
  (sum, program) => sum + program.actualSpend,
  0
);

/**
 * Total benefits realized across all transformation programs.
 * @type {number}
 */
export const totalProgramBenefitsRealized = transformationPrograms.reduce(
  (sum, program) => sum + program.benefitsRealized,
  0
);

/**
 * Total benefits target across all transformation programs.
 * @type {number}
 */
export const totalProgramBenefitsTarget = transformationPrograms.reduce(
  (sum, program) => sum + program.benefitsTarget,
  0
);

/**
 * Overall benefits realization percentage across all programs.
 * @type {number}
 */
export const overallProgramBenefitsPercentage = totalProgramBenefitsTarget > 0
  ? Math.round((totalProgramBenefitsRealized / totalProgramBenefitsTarget) * 100)
  : 0;

/**
 * Overall milestone progress across all programs.
 * @type {number}
 */
export const overallMilestoneProgress = (() => {
  const totalMilestones = transformationPrograms.reduce(
    (sum, program) => sum + program.totalMilestones,
    0
  );
  const completedMilestones = transformationPrograms.reduce(
    (sum, program) => sum + program.completedMilestones,
    0
  );
  return totalMilestones > 0
    ? Math.round((completedMilestones / totalMilestones) * 100)
    : 0;
})();

/**
 * Transformation programs formatted for BarChart component consumption.
 * Maps programs to the shape expected by BarChart for budget vs actual comparison.
 * @type {Array<Object>}
 */
export const programBarChartData = transformationPrograms.map((program) => ({
  program: program.programName,
  budget: program.budget,
  actualSpend: program.actualSpend,
}));

/**
 * Transformation programs formatted for DonutChart component consumption.
 * Maps programs to the {label, value, color} shape expected by DonutChart.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const programDonutChartData = (() => {
  const colors = ['#E60012', '#28A745', '#FFC107'];
  return transformationPrograms.map((program, index) => ({
    label: program.programName,
    value: program.actualSpend,
    color: colors[index % colors.length],
  }));
})();

/**
 * Transformation program summary for section header rendering.
 * @type {Object}
 */
export const transformationProgramSummary = {
  totalPrograms: transformationPrograms.length,
  totalBudget: totalProgramBudget,
  totalSpend: totalProgramSpend,
  totalBenefitsRealized: totalProgramBenefitsRealized,
  totalBenefitsTarget: totalProgramBenefitsTarget,
  overallBenefitsPercentage: overallProgramBenefitsPercentage,
  overallMilestoneProgress,
  greenCount: transformationPrograms.filter((p) => p.ragStatus === 'green').length,
  amberCount: transformationPrograms.filter((p) => p.ragStatus === 'amber').length,
  redCount: transformationPrograms.filter((p) => p.ragStatus === 'red').length,
  overallStatus: 'amber',
  overallLabel: 'Needs Attention',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
};

/**
 * Transformation program KPI metrics for MetricCard rendering.
 * @type {Array<Object>}
 */
export const transformationProgramKPIs = [
  {
    id: 'total-program-budget',
    name: 'Total Program Budget',
    value: totalProgramBudget,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'flat',
    trendValue: '0%',
    trendSentiment: 'neutral',
    description: 'Total approved budget across top 3 transformation programs.',
  },
  {
    id: 'total-program-spend',
    name: 'Total Program Spend',
    value: totalProgramSpend,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+10.5%',
    trendSentiment: 'negative',
    description: 'Actual spend to date across top 3 transformation programs.',
  },
  {
    id: 'milestone-progress',
    name: 'Milestone Progress',
    value: overallMilestoneProgress,
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+4%',
    trendSentiment: 'positive',
    description: 'Overall milestone completion across all transformation programs.',
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
    description: 'Percentage of target benefits realized across all programs.',
  },
  {
    id: 'programs-at-risk',
    name: 'Programs At Risk',
    value: transformationPrograms.filter((p) => p.ragStatus === 'red').length,
    prefix: '',
    unit: '',
    ragStatus: 'red',
    ragLabel: 'At Risk',
    trend: 'flat',
    trendValue: '0',
    trendSentiment: 'neutral',
    description: 'Number of transformation programs with red RAG status requiring immediate attention.',
  },
];

export default transformationPrograms;