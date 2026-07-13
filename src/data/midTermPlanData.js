/**
 * Mock data fixture for Mid-Term Plan Progress.
 *
 * Exports an array of strategic pillars with pillar details for the
 * MidTermPlanProgressSection. Each entry includes pillar name, target milestones,
 * completed milestones, progress percentage, benefits realized, and RAG status.
 * Data is relative to 2024-06-10.
 *
 * @module midTermPlanData
 */

/**
 * @typedef {Object} StrategicPillar
 * @property {string} id - Unique identifier for the pillar
 * @property {string} pillarName - Strategic pillar name
 * @property {number} targetMilestones - Total number of target milestones
 * @property {number} completedMilestones - Number of milestones completed
 * @property {number} progressPercentage - Progress as percentage (0-100)
 * @property {number} benefitsRealized - Benefits realized in INR
 * @property {number} benefitsTarget - Benefits target in INR
 * @property {number} benefitsPercentage - Benefits realized as percentage of target
 * @property {'red' | 'amber' | 'green'} ragStatus - Pillar RAG status
 * @property {string} ragLabel - Human-readable RAG status label
 * @property {string} owner - Pillar owner / responsible executive
 * @property {string} targetDate - Target completion date (ISO format)
 * @property {string} description - Brief description of the pillar
 */

/**
 * Strategic pillars for mid-term plan progress rendering.
 * @type {StrategicPillar[]}
 */
export const strategicPillars = [
  {
    id: 'pillar-001',
    pillarName: 'Cloud Migration & Infrastructure Modernization',
    targetMilestones: 12,
    completedMilestones: 9,
    progressPercentage: 75,
    benefitsRealized: 2400000,
    benefitsTarget: 3500000,
    benefitsPercentage: 68.6,
    ragStatus: 'green',
    ragLabel: 'On Track',
    owner: 'VP Infrastructure',
    targetDate: '2025-03-31',
    description: 'Migrate 80% of on-premise workloads to cloud infrastructure and modernize legacy systems.',
  },
  {
    id: 'pillar-002',
    pillarName: 'ERP Transformation (SAP S/4HANA)',
    targetMilestones: 15,
    completedMilestones: 7,
    progressPercentage: 47,
    benefitsRealized: 800000,
    benefitsTarget: 5000000,
    benefitsPercentage: 16,
    ragStatus: 'red',
    ragLabel: 'At Risk',
    owner: 'VP Applications',
    targetDate: '2025-09-30',
    description: 'End-to-end ERP transformation from legacy SAP ECC to S/4HANA across all business units.',
  },
  {
    id: 'pillar-003',
    pillarName: 'Cybersecurity & Compliance Enhancement',
    targetMilestones: 10,
    completedMilestones: 7,
    progressPercentage: 70,
    benefitsRealized: 1200000,
    benefitsTarget: 2000000,
    benefitsPercentage: 60,
    ragStatus: 'green',
    ragLabel: 'On Track',
    owner: 'CISO',
    targetDate: '2025-06-30',
    description: 'Strengthen cybersecurity posture, achieve ISO 27001 certification, and implement zero-trust architecture.',
  },
  {
    id: 'pillar-004',
    pillarName: 'Data Analytics & Business Intelligence',
    targetMilestones: 8,
    completedMilestones: 5,
    progressPercentage: 62,
    benefitsRealized: 950000,
    benefitsTarget: 1800000,
    benefitsPercentage: 52.8,
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    owner: 'VP Data & Analytics',
    targetDate: '2025-03-31',
    description: 'Build enterprise data lake, deploy self-service BI dashboards, and enable advanced analytics capabilities.',
  },
  {
    id: 'pillar-005',
    pillarName: 'Digital Customer Experience',
    targetMilestones: 10,
    completedMilestones: 6,
    progressPercentage: 60,
    benefitsRealized: 1100000,
    benefitsTarget: 2500000,
    benefitsPercentage: 44,
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    owner: 'VP Digital',
    targetDate: '2025-06-30',
    description: 'Revamp customer-facing digital channels, implement omnichannel support, and deploy CRM enhancements.',
  },
  {
    id: 'pillar-006',
    pillarName: 'IT Operating Model & Workforce Optimization',
    targetMilestones: 6,
    completedMilestones: 5,
    progressPercentage: 83,
    benefitsRealized: 600000,
    benefitsTarget: 800000,
    benefitsPercentage: 75,
    ragStatus: 'green',
    ragLabel: 'On Track',
    owner: 'CIO',
    targetDate: '2024-12-31',
    description: 'Restructure IT operating model, upskill workforce, and implement agile delivery practices across IT.',
  },
];

/**
 * Total target milestones across all pillars.
 * @type {number}
 */
export const totalTargetMilestones = strategicPillars.reduce(
  (sum, pillar) => sum + pillar.targetMilestones,
  0
);

/**
 * Total completed milestones across all pillars.
 * @type {number}
 */
export const totalCompletedMilestones = strategicPillars.reduce(
  (sum, pillar) => sum + pillar.completedMilestones,
  0
);

/**
 * Overall progress percentage across all pillars.
 * @type {number}
 */
export const overallProgressPercentage = totalTargetMilestones > 0
  ? Math.round((totalCompletedMilestones / totalTargetMilestones) * 100)
  : 0;

/**
 * Total benefits realized across all pillars.
 * @type {number}
 */
export const totalBenefitsRealized = strategicPillars.reduce(
  (sum, pillar) => sum + pillar.benefitsRealized,
  0
);

/**
 * Total benefits target across all pillars.
 * @type {number}
 */
export const totalBenefitsTarget = strategicPillars.reduce(
  (sum, pillar) => sum + pillar.benefitsTarget,
  0
);

/**
 * Overall benefits realization percentage.
 * @type {number}
 */
export const overallBenefitsPercentage = totalBenefitsTarget > 0
  ? Math.round((totalBenefitsRealized / totalBenefitsTarget) * 100)
  : 0;

/**
 * Mid-term plan summary for section header rendering.
 * @type {Object}
 */
export const midTermPlanSummary = {
  totalPillars: strategicPillars.length,
  totalTargetMilestones,
  totalCompletedMilestones,
  overallProgressPercentage,
  totalBenefitsRealized,
  totalBenefitsTarget,
  overallBenefitsPercentage,
  greenCount: strategicPillars.filter((p) => p.ragStatus === 'green').length,
  amberCount: strategicPillars.filter((p) => p.ragStatus === 'amber').length,
  redCount: strategicPillars.filter((p) => p.ragStatus === 'red').length,
  overallStatus: 'green',
  overallLabel: 'On Track',
  planHorizon: '3-Year Mid-Term Plan (FY2023–FY2025)',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
};

/**
 * Mid-term plan KPI metrics for MetricCard rendering.
 * @type {Array<Object>}
 */
export const midTermPlanKPIs = [
  {
    id: 'overall-progress',
    name: 'Overall Plan Progress',
    value: overallProgressPercentage,
    prefix: '',
    unit: '%',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+5%',
    trendSentiment: 'positive',
    description: 'Overall progress across all strategic pillars of the 3-year mid-term plan.',
  },
  {
    id: 'milestones-completed',
    name: 'Milestones Completed',
    value: totalCompletedMilestones,
    prefix: '',
    unit: `/ ${totalTargetMilestones}`,
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+3',
    trendSentiment: 'positive',
    description: 'Number of milestones completed against total target milestones.',
  },
  {
    id: 'benefits-realized',
    name: 'Benefits Realized',
    value: totalBenefitsRealized,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+12%',
    trendSentiment: 'positive',
    description: 'Total financial benefits realized across all strategic pillars.',
  },
  {
    id: 'benefits-realization-rate',
    name: 'Benefits Realization Rate',
    value: overallBenefitsPercentage,
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+4%',
    trendSentiment: 'positive',
    description: 'Percentage of target benefits realized year-to-date.',
  },
  {
    id: 'pillars-at-risk',
    name: 'Pillars At Risk',
    value: strategicPillars.filter((p) => p.ragStatus === 'red').length,
    prefix: '',
    unit: '',
    ragStatus: 'red',
    ragLabel: 'At Risk',
    trend: 'flat',
    trendValue: '0',
    trendSentiment: 'neutral',
    description: 'Number of strategic pillars with red RAG status requiring immediate attention.',
  },
];

/**
 * Pillar progress data formatted for BarChart component consumption.
 * @type {Array<Object>}
 */
export const pillarBarChartData = strategicPillars.map((pillar) => ({
  pillar: pillar.pillarName,
  completed: pillar.completedMilestones,
  remaining: pillar.targetMilestones - pillar.completedMilestones,
}));

/**
 * Benefits data formatted for DonutChart component consumption.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const benefitsDonutChartData = (() => {
  const colors = [
    '#E60012',
    '#28A745',
    '#FFC107',
    '#6C757D',
    '#007BFF',
    '#17A2B8',
  ];
  return strategicPillars.map((pillar, index) => ({
    label: pillar.pillarName,
    value: pillar.benefitsRealized,
    color: colors[index % colors.length],
  }));
})();

/**
 * Quarterly progress trend data for line chart rendering.
 * @typedef {Object} QuarterlyProgress
 * @property {string} quarter - Quarter label
 * @property {number} progress - Overall progress percentage at end of quarter
 * @property {number} milestones - Cumulative milestones completed
 */

/**
 * Quarterly progress trend for mid-term plan.
 * @type {QuarterlyProgress[]}
 */
export const quarterlyProgressTrend = [
  { quarter: 'Q1 FY2023', progress: 8, milestones: 5 },
  { quarter: 'Q2 FY2023', progress: 18, milestones: 11 },
  { quarter: 'Q3 FY2023', progress: 28, milestones: 17 },
  { quarter: 'Q4 FY2023', progress: 38, milestones: 23 },
  { quarter: 'Q1 FY2024', progress: 52, milestones: 32 },
  { quarter: 'Q2 FY2024', progress: 64, milestones: 39 },
];

export default strategicPillars;