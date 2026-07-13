/**
 * Mock data fixture for Vendor Spend.
 *
 * Exports an array of top 10 vendors with vendor details for the
 * VendorSpendSection. Each entry includes vendor name, annual spend,
 * contract value, spend variance, dependency risk, and RAG status.
 * Data is relative to 2024-06-10.
 *
 * @module vendorData
 */

/**
 * @typedef {Object} VendorEntry
 * @property {string} id - Unique identifier for the vendor
 * @property {string} vendorName - Vendor/provider name
 * @property {number} annualSpend - Annual spend in INR
 * @property {number} contractValue - Total contract value in INR
 * @property {number} spendVariance - Variance between contract value and annual spend (contractValue - annualSpend)
 * @property {number} spendVariancePercent - Variance as percentage of contract value
 * @property {'high' | 'medium' | 'low'} dependencyRisk - Vendor dependency risk level
 * @property {'red' | 'amber' | 'green'} ragStatus - Vendor RAG status
 * @property {string} category - Vendor category
 * @property {string} contractEndDate - Contract end date (ISO format)
 */

/**
 * Top 10 vendors by annual spend for table and chart rendering.
 * @type {VendorEntry[]}
 */
export const vendorSpendData = [
  {
    id: 'vendor-001',
    vendorName: 'Infosys',
    annualSpend: 3500000,
    contractValue: 4000000,
    spendVariance: 500000,
    spendVariancePercent: 12.5,
    dependencyRisk: 'high',
    ragStatus: 'red',
    category: 'IT Services',
    contractEndDate: '2025-03-31',
  },
  {
    id: 'vendor-002',
    vendorName: 'TCS',
    annualSpend: 2800000,
    contractValue: 3200000,
    spendVariance: 400000,
    spendVariancePercent: 12.5,
    dependencyRisk: 'high',
    ragStatus: 'amber',
    category: 'IT Services',
    contractEndDate: '2025-06-30',
  },
  {
    id: 'vendor-003',
    vendorName: 'Microsoft',
    annualSpend: 2200000,
    contractValue: 2500000,
    spendVariance: 300000,
    spendVariancePercent: 12.0,
    dependencyRisk: 'high',
    ragStatus: 'amber',
    category: 'Software Licensing',
    contractEndDate: '2025-12-31',
  },
  {
    id: 'vendor-004',
    vendorName: 'AWS',
    annualSpend: 1800000,
    contractValue: 2000000,
    spendVariance: 200000,
    spendVariancePercent: 10.0,
    dependencyRisk: 'medium',
    ragStatus: 'green',
    category: 'Cloud Infrastructure',
    contractEndDate: '2025-09-30',
  },
  {
    id: 'vendor-005',
    vendorName: 'SAP',
    annualSpend: 1500000,
    contractValue: 1600000,
    spendVariance: 100000,
    spendVariancePercent: 6.3,
    dependencyRisk: 'high',
    ragStatus: 'amber',
    category: 'Enterprise Software',
    contractEndDate: '2026-03-31',
  },
  {
    id: 'vendor-006',
    vendorName: 'Wipro',
    annualSpend: 1200000,
    contractValue: 1400000,
    spendVariance: 200000,
    spendVariancePercent: 14.3,
    dependencyRisk: 'medium',
    ragStatus: 'green',
    category: 'IT Services',
    contractEndDate: '2025-03-31',
  },
  {
    id: 'vendor-007',
    vendorName: 'Oracle',
    annualSpend: 1100000,
    contractValue: 1000000,
    spendVariance: -100000,
    spendVariancePercent: -10.0,
    dependencyRisk: 'medium',
    ragStatus: 'red',
    category: 'Database & Middleware',
    contractEndDate: '2025-06-30',
  },
  {
    id: 'vendor-008',
    vendorName: 'Cisco',
    annualSpend: 900000,
    contractValue: 1000000,
    spendVariance: 100000,
    spendVariancePercent: 10.0,
    dependencyRisk: 'low',
    ragStatus: 'green',
    category: 'Networking',
    contractEndDate: '2025-12-31',
  },
  {
    id: 'vendor-009',
    vendorName: 'Dell Technologies',
    annualSpend: 750000,
    contractValue: 800000,
    spendVariance: 50000,
    spendVariancePercent: 6.3,
    dependencyRisk: 'low',
    ragStatus: 'green',
    category: 'Hardware',
    contractEndDate: '2025-09-30',
  },
  {
    id: 'vendor-010',
    vendorName: 'Salesforce',
    annualSpend: 600000,
    contractValue: 650000,
    spendVariance: 50000,
    spendVariancePercent: 7.7,
    dependencyRisk: 'low',
    ragStatus: 'green',
    category: 'CRM',
    contractEndDate: '2026-03-31',
  },
];

/**
 * Total annual vendor spend across all top vendors.
 * @type {number}
 */
export const totalVendorSpend = vendorSpendData.reduce(
  (sum, entry) => sum + entry.annualSpend,
  0
);

/**
 * Total contract value across all top vendors.
 * @type {number}
 */
export const totalContractValue = vendorSpendData.reduce(
  (sum, entry) => sum + entry.contractValue,
  0
);

/**
 * Vendor spend formatted for BarChart component consumption.
 * Maps vendor entries to the shape expected by BarChart.
 * @type {Array<Object>}
 */
export const vendorBarChartData = vendorSpendData.map((entry) => ({
  vendor: entry.vendorName,
  annualSpend: entry.annualSpend,
  contractValue: entry.contractValue,
}));

/**
 * Vendor spend formatted for DonutChart component consumption.
 * Maps vendor entries to the {label, value, color} shape expected by DonutChart.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const vendorDonutChartData = vendorSpendData.map((entry, index) => {
  const colors = [
    '#E60012',
    '#28A745',
    '#FFC107',
    '#6C757D',
    '#007BFF',
    '#17A2B8',
    '#6F42C1',
    '#FD7E14',
    '#20C997',
    '#E83E8C',
  ];
  return {
    label: entry.vendorName,
    value: entry.annualSpend,
    color: colors[index % colors.length],
  };
});

/**
 * Vendor spend summary metrics for MetricCard rendering.
 * @type {Object}
 */
export const vendorSummary = {
  totalSpend: totalVendorSpend,
  totalContractValue: totalContractValue,
  numberOfVendors: vendorSpendData.length,
  topVendor: 'Infosys',
  topVendorSpend: 3500000,
  highDependencyCount: vendorSpendData.filter(
    (v) => v.dependencyRisk === 'high'
  ).length,
  ragStatus: 'amber',
  ragLabel: 'Needs Attention',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
};

/**
 * Vendor KPI metrics for MetricCard rendering.
 * @type {Array<Object>}
 */
export const vendorKPIs = [
  {
    id: 'total-vendor-spend',
    name: 'Total Vendor Spend',
    value: totalVendorSpend,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+6.5%',
    trendSentiment: 'negative',
    description: 'Annual spend across top 10 vendors.',
  },
  {
    id: 'high-dependency-vendors',
    name: 'High Dependency Vendors',
    value: vendorSpendData.filter((v) => v.dependencyRisk === 'high').length,
    prefix: '',
    unit: '',
    ragStatus: 'red',
    ragLabel: 'At Risk',
    trend: 'flat',
    trendValue: '0',
    trendSentiment: 'neutral',
    description: 'Number of vendors with high dependency risk.',
  },
  {
    id: 'contract-utilization',
    name: 'Contract Utilization',
    value: Math.round((totalVendorSpend / totalContractValue) * 100),
    prefix: '',
    unit: '%',
    ragStatus: 'green',
    ragLabel: 'On Track',
    trend: 'up',
    trendValue: '+3%',
    trendSentiment: 'positive',
    description: 'Percentage of total contract value utilized.',
  },
  {
    id: 'vendors-at-risk',
    name: 'Vendors At Risk',
    value: vendorSpendData.filter((v) => v.ragStatus === 'red').length,
    prefix: '',
    unit: '',
    ragStatus: 'red',
    ragLabel: 'At Risk',
    trend: 'up',
    trendValue: '+1',
    trendSentiment: 'negative',
    description: 'Number of vendors with red RAG status requiring immediate attention.',
  },
];

/**
 * Vendor spend by category for grouped analysis.
 * @type {Array<{category: string, spend: number, vendorCount: number}>}
 */
export const vendorSpendByCategory = [
  { category: 'IT Services', spend: 7500000, vendorCount: 3 },
  { category: 'Software Licensing', spend: 2200000, vendorCount: 1 },
  { category: 'Cloud Infrastructure', spend: 1800000, vendorCount: 1 },
  { category: 'Enterprise Software', spend: 1500000, vendorCount: 1 },
  { category: 'Database & Middleware', spend: 1100000, vendorCount: 1 },
  { category: 'Networking', spend: 900000, vendorCount: 1 },
  { category: 'Hardware', spend: 750000, vendorCount: 1 },
  { category: 'CRM', spend: 600000, vendorCount: 1 },
];

export default vendorSpendData;