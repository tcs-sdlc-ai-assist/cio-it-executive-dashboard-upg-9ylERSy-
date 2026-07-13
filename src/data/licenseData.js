/**
 * Mock data fixture for License Spend Split.
 *
 * Exports an array of license entries for chart rendering in the
 * LicenseSpendSplitSection. Each entry includes vendor name, annual cost,
 * percentage of total, and colour for donut/pie chart rendering.
 * Data is relative to 2024-06-10.
 *
 * @module licenseData
 */

/**
 * @typedef {Object} LicenseEntry
 * @property {string} vendor - Vendor/provider name
 * @property {number} annualCost - Annual license cost in INR
 * @property {number} percentage - Percentage of total license spend
 * @property {string} color - Hex colour for chart rendering
 */

/**
 * License spend split by vendor for donut chart rendering.
 * @type {LicenseEntry[]}
 */
export const licenseSpendData = [
  {
    vendor: 'Microsoft',
    annualCost: 1200000,
    percentage: 22.2,
    color: '#E60012',
  },
  {
    vendor: 'SAP',
    annualCost: 900000,
    percentage: 16.7,
    color: '#28A745',
  },
  {
    vendor: 'Oracle',
    annualCost: 800000,
    percentage: 14.8,
    color: '#FFC107',
  },
  {
    vendor: 'Salesforce',
    annualCost: 600000,
    percentage: 11.1,
    color: '#007BFF',
  },
  {
    vendor: 'Cloud',
    annualCost: 1500000,
    percentage: 27.8,
    color: '#6C757D',
  },
  {
    vendor: 'Other',
    annualCost: 400000,
    percentage: 7.4,
    color: '#17A2B8',
  },
];

/**
 * Total annual license spend across all vendors.
 * @type {number}
 */
export const totalLicenseSpend = licenseSpendData.reduce(
  (sum, entry) => sum + entry.annualCost,
  0
);

/**
 * License spend formatted for DonutChart component consumption.
 * Maps vendor entries to the {label, value, color} shape expected by DonutChart.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const licenseDonutChartData = licenseSpendData.map((entry) => ({
  label: entry.vendor,
  value: entry.annualCost,
  color: entry.color,
}));

/**
 * License spend summary metrics for MetricCard rendering.
 * @type {Object}
 */
export const licenseSummary = {
  totalSpend: totalLicenseSpend,
  numberOfVendors: licenseSpendData.length,
  topVendor: 'Cloud',
  topVendorSpend: 1500000,
  topVendorPercentage: 27.8,
  ragStatus: 'amber',
  ragLabel: 'Needs Attention',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
};

/**
 * License utilization data for table rendering.
 * @typedef {Object} LicenseUtilization
 * @property {string} vendor - Vendor name
 * @property {number} totalLicenses - Total licenses purchased
 * @property {number} activeLicenses - Licenses currently in use
 * @property {number} utilizationPercent - Utilization as percentage
 * @property {number} annualCost - Annual license cost in INR
 * @property {number} costPerLicense - Cost per individual license
 * @property {'red' | 'amber' | 'green'} ragStatus - Utilization RAG status
 */

/**
 * License utilization breakdown by vendor for DataTable rendering.
 * @type {LicenseUtilization[]}
 */
export const licenseUtilization = [
  {
    vendor: 'Microsoft',
    totalLicenses: 500,
    activeLicenses: 420,
    utilizationPercent: 84,
    annualCost: 1200000,
    costPerLicense: 2400,
    ragStatus: 'green',
  },
  {
    vendor: 'SAP',
    totalLicenses: 150,
    activeLicenses: 110,
    utilizationPercent: 73,
    annualCost: 900000,
    costPerLicense: 6000,
    ragStatus: 'amber',
  },
  {
    vendor: 'Oracle',
    totalLicenses: 200,
    activeLicenses: 130,
    utilizationPercent: 65,
    annualCost: 800000,
    costPerLicense: 4000,
    ragStatus: 'amber',
  },
  {
    vendor: 'Salesforce',
    totalLicenses: 120,
    activeLicenses: 95,
    utilizationPercent: 79,
    annualCost: 600000,
    costPerLicense: 5000,
    ragStatus: 'green',
  },
  {
    vendor: 'Cloud',
    totalLicenses: 300,
    activeLicenses: 280,
    utilizationPercent: 93,
    annualCost: 1500000,
    costPerLicense: 5000,
    ragStatus: 'green',
  },
  {
    vendor: 'Other',
    totalLicenses: 80,
    activeLicenses: 45,
    utilizationPercent: 56,
    annualCost: 400000,
    costPerLicense: 5000,
    ragStatus: 'red',
  },
];

/**
 * License KPI metrics for MetricCard rendering.
 * @type {Array<Object>}
 */
export const licenseKPIs = [
  {
    id: 'total-license-spend',
    name: 'Total License Spend',
    value: totalLicenseSpend,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+12%',
    trendSentiment: 'negative',
    description: 'Annual license spend across all vendors.',
  },
  {
    id: 'avg-utilization',
    name: 'Avg License Utilization',
    value: 75,
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+3%',
    trendSentiment: 'positive',
    description: 'Average utilization rate across all licensed software.',
  },
  {
    id: 'underutilized-licenses',
    name: 'Underutilized Licenses',
    value: 3,
    prefix: '',
    unit: '',
    ragStatus: 'red',
    ragLabel: 'At Risk',
    trend: 'flat',
    trendValue: '0',
    trendSentiment: 'neutral',
    description: 'Number of vendors with utilization below 70%.',
  },
  {
    id: 'potential-savings',
    name: 'Potential Savings',
    value: 450000,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+8%',
    trendSentiment: 'positive',
    description: 'Estimated savings from optimizing underutilized licenses.',
  },
];

export default licenseSpendData;