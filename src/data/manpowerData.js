/**
 * Mock data fixture for Manpower Cost.
 *
 * Exports workforce cost data including internal FTE cost, contractor cost,
 * partner/vendor cost, total manpower cost, and location split array
 * for donut chart rendering. Data is relative to 2024-06-10.
 *
 * @module manpowerData
 */

/**
 * @typedef {Object} ManpowerCostSummary
 * @property {number} internalFTECost - Internal full-time employee cost in INR
 * @property {number} contractorCost - Contractor/contingent workforce cost in INR
 * @property {number} partnerVendorCost - Partner/vendor managed services cost in INR
 * @property {number} totalManpowerCost - Total manpower cost in INR
 * @property {number} internalFTECount - Number of internal FTEs
 * @property {number} contractorCount - Number of contractors
 * @property {number} partnerVendorCount - Number of partner/vendor resources
 * @property {number} totalHeadcount - Total headcount across all categories
 * @property {number} costPerFTE - Average cost per internal FTE in INR
 * @property {number} costPerContractor - Average cost per contractor in INR
 * @property {'red' | 'amber' | 'green'} ragStatus - Overall manpower cost RAG status
 * @property {string} ragLabel - Human-readable RAG status label
 * @property {string} reportingPeriod - Current reporting period label
 * @property {string} asOfDate - Date the data was last updated (ISO format)
 */

/**
 * Internal FTE cost (annual).
 * @type {number}
 */
export const internalFTECost = 4800000;

/**
 * Contractor/contingent workforce cost (annual).
 * @type {number}
 */
export const contractorCost = 2400000;

/**
 * Partner/vendor managed services cost (annual).
 * @type {number}
 */
export const partnerVendorCost = 1800000;

/**
 * Total manpower cost (annual).
 * @type {number}
 */
export const totalManpowerCost = internalFTECost + contractorCost + partnerVendorCost;

/** @type {ManpowerCostSummary} */
export const manpowerCostSummary = {
  internalFTECost,
  contractorCost,
  partnerVendorCost,
  totalManpowerCost,
  internalFTECount: 120,
  contractorCount: 45,
  partnerVendorCount: 30,
  totalHeadcount: 195,
  costPerFTE: Math.round(internalFTECost / 120),
  costPerContractor: Math.round(contractorCost / 45),
  ragStatus: 'amber',
  ragLabel: 'Needs Attention',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
};

/**
 * @typedef {Object} WorkforceCategoryBreakdown
 * @property {string} category - Workforce category name
 * @property {number} cost - Annual cost in INR
 * @property {number} headcount - Number of resources
 * @property {number} percentage - Percentage of total manpower cost
 * @property {string} color - Hex colour for chart rendering
 */

/**
 * Workforce cost breakdown by category for donut chart rendering.
 * @type {WorkforceCategoryBreakdown[]}
 */
export const workforceCategoryBreakdown = [
  {
    category: 'Internal FTE',
    cost: internalFTECost,
    headcount: 120,
    percentage: Math.round((internalFTECost / totalManpowerCost) * 1000) / 10,
    color: '#E60012',
  },
  {
    category: 'Contractors',
    cost: contractorCost,
    headcount: 45,
    percentage: Math.round((contractorCost / totalManpowerCost) * 1000) / 10,
    color: '#28A745',
  },
  {
    category: 'Partner/Vendor',
    cost: partnerVendorCost,
    headcount: 30,
    percentage: Math.round((partnerVendorCost / totalManpowerCost) * 1000) / 10,
    color: '#FFC107',
  },
];

/**
 * Workforce category data formatted for DonutChart component consumption.
 * Maps category entries to the {label, value, color} shape expected by DonutChart.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const workforceCategoryDonutData = workforceCategoryBreakdown.map((entry) => ({
  label: entry.category,
  value: entry.cost,
  color: entry.color,
}));

/**
 * @typedef {Object} LocationSplit
 * @property {string} location - Office/site location name
 * @property {number} cost - Annual manpower cost at this location in INR
 * @property {number} percentage - Percentage of total manpower cost
 * @property {number} headcount - Number of resources at this location
 * @property {string} color - Hex colour for chart rendering
 */

/**
 * Manpower cost split by location for donut chart rendering.
 * @type {LocationSplit[]}
 */
export const locationSplit = [
  {
    location: 'Delhi NCR (HQ)',
    cost: 3600000,
    percentage: 40.0,
    headcount: 78,
    color: '#E60012',
  },
  {
    location: 'Mumbai',
    cost: 2250000,
    percentage: 25.0,
    headcount: 48,
    color: '#28A745',
  },
  {
    location: 'Bangalore',
    cost: 1800000,
    percentage: 20.0,
    headcount: 39,
    color: '#FFC107',
  },
  {
    location: 'Chennai',
    cost: 720000,
    percentage: 8.0,
    headcount: 16,
    color: '#007BFF',
  },
  {
    location: 'Kolkata',
    cost: 630000,
    percentage: 7.0,
    headcount: 14,
    color: '#6C757D',
  },
];

/**
 * Location split data formatted for DonutChart component consumption.
 * Maps location entries to the {label, value, color} shape expected by DonutChart.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const locationDonutChartData = locationSplit.map((entry) => ({
  label: entry.location,
  value: entry.cost,
  color: entry.color,
}));

/**
 * @typedef {Object} DepartmentCost
 * @property {string} department - IT department/function name
 * @property {number} cost - Annual manpower cost for the department in INR
 * @property {number} headcount - Number of resources in the department
 * @property {number} internalFTE - Number of internal FTEs
 * @property {number} contractors - Number of contractors
 * @property {number} partnerVendor - Number of partner/vendor resources
 * @property {'red' | 'amber' | 'green'} ragStatus - Department cost RAG status
 */

/**
 * Manpower cost breakdown by IT department for DataTable rendering.
 * @type {DepartmentCost[]}
 */
export const departmentCostBreakdown = [
  {
    department: 'Infrastructure & Operations',
    cost: 2700000,
    headcount: 55,
    internalFTE: 30,
    contractors: 15,
    partnerVendor: 10,
    ragStatus: 'green',
  },
  {
    department: 'Application Development',
    cost: 2400000,
    headcount: 50,
    internalFTE: 28,
    contractors: 14,
    partnerVendor: 8,
    ragStatus: 'amber',
  },
  {
    department: 'Cybersecurity',
    cost: 1200000,
    headcount: 25,
    internalFTE: 18,
    contractors: 5,
    partnerVendor: 2,
    ragStatus: 'green',
  },
  {
    department: 'Data & Analytics',
    cost: 1080000,
    headcount: 22,
    internalFTE: 14,
    contractors: 5,
    partnerVendor: 3,
    ragStatus: 'amber',
  },
  {
    department: 'IT Governance & PMO',
    cost: 900000,
    headcount: 18,
    internalFTE: 14,
    contractors: 2,
    partnerVendor: 2,
    ragStatus: 'green',
  },
  {
    department: 'Service Desk & Support',
    cost: 720000,
    headcount: 25,
    internalFTE: 16,
    contractors: 4,
    partnerVendor: 5,
    ragStatus: 'green',
  },
];

/**
 * Monthly manpower cost trend data for line chart rendering.
 * Covers Jan 2024 through Jun 2024.
 * @typedef {Object} MonthlyManpowerCost
 * @property {string} month - Month label (e.g., 'Jan 2024')
 * @property {number} internalFTE - Internal FTE cost for the month
 * @property {number} contractor - Contractor cost for the month
 * @property {number} partnerVendor - Partner/vendor cost for the month
 * @property {number} total - Total manpower cost for the month
 */

/**
 * Monthly manpower cost trend data.
 * @type {MonthlyManpowerCost[]}
 */
export const monthlyManpowerCost = [
  { month: 'Jan 2024', internalFTE: 780000, contractor: 390000, partnerVendor: 290000, total: 1460000 },
  { month: 'Feb 2024', internalFTE: 790000, contractor: 395000, partnerVendor: 295000, total: 1480000 },
  { month: 'Mar 2024', internalFTE: 800000, contractor: 400000, partnerVendor: 300000, total: 1500000 },
  { month: 'Apr 2024', internalFTE: 810000, contractor: 410000, partnerVendor: 305000, total: 1525000 },
  { month: 'May 2024', internalFTE: 805000, contractor: 405000, partnerVendor: 305000, total: 1515000 },
  { month: 'Jun 2024', internalFTE: 815000, contractor: 400000, partnerVendor: 305000, total: 1520000 },
];

/**
 * Quarterly manpower cost summary for trend analysis.
 * @typedef {Object} QuarterlyManpowerCost
 * @property {string} quarter - Quarter label
 * @property {number} internalFTE - Internal FTE cost for the quarter
 * @property {number} contractor - Contractor cost for the quarter
 * @property {number} partnerVendor - Partner/vendor cost for the quarter
 * @property {number} total - Total manpower cost for the quarter
 */

/**
 * Quarterly manpower cost summary.
 * @type {QuarterlyManpowerCost[]}
 */
export const quarterlyManpowerCost = [
  { quarter: 'Q1 FY2024', internalFTE: 2370000, contractor: 1185000, partnerVendor: 885000, total: 4440000 },
  { quarter: 'Q2 FY2024', internalFTE: 2430000, contractor: 1215000, partnerVendor: 915000, total: 4560000 },
];

/**
 * Manpower KPI metrics for MetricCard rendering.
 * @type {Array<Object>}
 */
export const manpowerKPIs = [
  {
    id: 'total-manpower-cost',
    name: 'Total Manpower Cost',
    value: totalManpowerCost,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+4.5%',
    trendSentiment: 'negative',
    description: 'Annual manpower cost across internal FTEs, contractors, and partner/vendor resources.',
  },
  {
    id: 'total-headcount',
    name: 'Total Headcount',
    value: 195,
    prefix: '',
    unit: '',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+3',
    trendSentiment: 'neutral',
    description: 'Total IT workforce headcount across all categories.',
  },
  {
    id: 'internal-vs-external-ratio',
    name: 'Internal vs External Ratio',
    value: 62,
    prefix: '',
    unit: '%',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'down',
    trendValue: '-2%',
    trendSentiment: 'neutral',
    description: 'Percentage of internal FTEs in total IT workforce. Target is to maintain above 60%.',
  },
  {
    id: 'cost-per-fte',
    name: 'Avg Cost per FTE',
    value: Math.round(internalFTECost / 120),
    prefix: '₹',
    unit: '',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+2.1%',
    trendSentiment: 'negative',
    description: 'Average annual cost per internal full-time employee.',
  },
  {
    id: 'contractor-spend-ratio',
    name: 'Contractor Spend Ratio',
    value: Math.round((contractorCost / totalManpowerCost) * 100),
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+1.5%',
    trendSentiment: 'negative',
    description: 'Contractor cost as percentage of total manpower cost. Target is to reduce below 25%.',
  },
];

/**
 * Department cost data formatted for BarChart component consumption.
 * @type {Array<Object>}
 */
export const departmentBarChartData = departmentCostBreakdown.map((entry) => ({
  department: entry.department,
  internalFTE: Math.round(entry.cost * (entry.internalFTE / entry.headcount)),
  contractors: Math.round(entry.cost * (entry.contractors / entry.headcount)),
  partnerVendor: Math.round(entry.cost * (entry.partnerVendor / entry.headcount)),
}));

/**
 * Department cost data formatted for DonutChart component consumption.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const departmentDonutChartData = (() => {
  const colors = [
    '#E60012',
    '#28A745',
    '#FFC107',
    '#007BFF',
    '#6C757D',
    '#17A2B8',
  ];
  return departmentCostBreakdown.map((entry, index) => ({
    label: entry.department,
    value: entry.cost,
    color: colors[index % colors.length],
  }));
})();

export default manpowerCostSummary;