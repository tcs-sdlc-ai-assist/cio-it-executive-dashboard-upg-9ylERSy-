/**
 * Mock data fixture for Supplier Spend.
 *
 * Exports an array of suppliers with supplier details for the
 * SupplierSpendSection. Each entry includes supplier name, total spend,
 * procurement category, contract status, savings delivered, RAG status,
 * and monthly spend trend data for line chart rendering.
 * Data is relative to 2024-06-10.
 *
 * @module supplierData
 */

/**
 * @typedef {Object} SupplierEntry
 * @property {string} id - Unique identifier for the supplier
 * @property {string} supplierName - Supplier/provider name
 * @property {number} totalSpend - Total spend in INR (year-to-date)
 * @property {string} procurementCategory - Procurement category
 * @property {'active' | 'expiring' | 'expired'} contractStatus - Current contract status
 * @property {number} savingsDelivered - Savings delivered in INR (year-to-date)
 * @property {number} savingsTarget - Savings target in INR (annual)
 * @property {number} savingsPercent - Savings delivered as percentage of target
 * @property {'red' | 'amber' | 'green'} ragStatus - Supplier RAG status
 * @property {string} contractEndDate - Contract end date (ISO format)
 * @property {Array<{month: string, spend: number}>} monthlySpend - Monthly spend trend data
 */

/**
 * Supplier spend data for table and chart rendering.
 * @type {SupplierEntry[]}
 */
export const supplierSpendData = [
  {
    id: 'supplier-001',
    supplierName: 'Infosys BPO',
    totalSpend: 4200000,
    procurementCategory: 'IT Services',
    contractStatus: 'active',
    savingsDelivered: 380000,
    savingsTarget: 500000,
    savingsPercent: 76,
    ragStatus: 'green',
    contractEndDate: '2025-09-30',
    monthlySpend: [
      { month: 'Jan 2024', spend: 680000 },
      { month: 'Feb 2024', spend: 710000 },
      { month: 'Mar 2024', spend: 690000 },
      { month: 'Apr 2024', spend: 720000 },
      { month: 'May 2024', spend: 700000 },
      { month: 'Jun 2024', spend: 700000 },
    ],
  },
  {
    id: 'supplier-002',
    supplierName: 'Wipro Technologies',
    totalSpend: 3100000,
    procurementCategory: 'IT Services',
    contractStatus: 'active',
    savingsDelivered: 210000,
    savingsTarget: 350000,
    savingsPercent: 60,
    ragStatus: 'amber',
    contractEndDate: '2025-06-30',
    monthlySpend: [
      { month: 'Jan 2024', spend: 500000 },
      { month: 'Feb 2024', spend: 520000 },
      { month: 'Mar 2024', spend: 510000 },
      { month: 'Apr 2024', spend: 530000 },
      { month: 'May 2024', spend: 520000 },
      { month: 'Jun 2024', spend: 520000 },
    ],
  },
  {
    id: 'supplier-003',
    supplierName: 'HCL Technologies',
    totalSpend: 2800000,
    procurementCategory: 'Infrastructure',
    contractStatus: 'expiring',
    savingsDelivered: 150000,
    savingsTarget: 400000,
    savingsPercent: 37.5,
    ragStatus: 'red',
    contractEndDate: '2024-09-30',
    monthlySpend: [
      { month: 'Jan 2024', spend: 450000 },
      { month: 'Feb 2024', spend: 470000 },
      { month: 'Mar 2024', spend: 460000 },
      { month: 'Apr 2024', spend: 480000 },
      { month: 'May 2024', spend: 470000 },
      { month: 'Jun 2024', spend: 470000 },
    ],
  },
  {
    id: 'supplier-004',
    supplierName: 'Tech Mahindra',
    totalSpend: 2200000,
    procurementCategory: 'Application Development',
    contractStatus: 'active',
    savingsDelivered: 280000,
    savingsTarget: 300000,
    savingsPercent: 93.3,
    ragStatus: 'green',
    contractEndDate: '2026-03-31',
    monthlySpend: [
      { month: 'Jan 2024', spend: 350000 },
      { month: 'Feb 2024', spend: 370000 },
      { month: 'Mar 2024', spend: 360000 },
      { month: 'Apr 2024', spend: 380000 },
      { month: 'May 2024', spend: 370000 },
      { month: 'Jun 2024', spend: 370000 },
    ],
  },
  {
    id: 'supplier-005',
    supplierName: 'Cognizant',
    totalSpend: 1900000,
    procurementCategory: 'IT Services',
    contractStatus: 'active',
    savingsDelivered: 120000,
    savingsTarget: 250000,
    savingsPercent: 48,
    ragStatus: 'amber',
    contractEndDate: '2025-12-31',
    monthlySpend: [
      { month: 'Jan 2024', spend: 300000 },
      { month: 'Feb 2024', spend: 320000 },
      { month: 'Mar 2024', spend: 310000 },
      { month: 'Apr 2024', spend: 330000 },
      { month: 'May 2024', spend: 320000 },
      { month: 'Jun 2024', spend: 320000 },
    ],
  },
  {
    id: 'supplier-006',
    supplierName: 'Microland',
    totalSpend: 1500000,
    procurementCategory: 'Infrastructure',
    contractStatus: 'active',
    savingsDelivered: 180000,
    savingsTarget: 200000,
    savingsPercent: 90,
    ragStatus: 'green',
    contractEndDate: '2025-06-30',
    monthlySpend: [
      { month: 'Jan 2024', spend: 240000 },
      { month: 'Feb 2024', spend: 250000 },
      { month: 'Mar 2024', spend: 245000 },
      { month: 'Apr 2024', spend: 260000 },
      { month: 'May 2024', spend: 255000 },
      { month: 'Jun 2024', spend: 250000 },
    ],
  },
  {
    id: 'supplier-007',
    supplierName: 'Mphasis',
    totalSpend: 1200000,
    procurementCategory: 'Application Development',
    contractStatus: 'expiring',
    savingsDelivered: 60000,
    savingsTarget: 180000,
    savingsPercent: 33.3,
    ragStatus: 'red',
    contractEndDate: '2024-08-31',
    monthlySpend: [
      { month: 'Jan 2024', spend: 190000 },
      { month: 'Feb 2024', spend: 200000 },
      { month: 'Mar 2024', spend: 195000 },
      { month: 'Apr 2024', spend: 210000 },
      { month: 'May 2024', spend: 205000 },
      { month: 'Jun 2024', spend: 200000 },
    ],
  },
  {
    id: 'supplier-008',
    supplierName: 'NTT Data',
    totalSpend: 950000,
    procurementCategory: 'Cloud Services',
    contractStatus: 'active',
    savingsDelivered: 95000,
    savingsTarget: 120000,
    savingsPercent: 79.2,
    ragStatus: 'green',
    contractEndDate: '2025-12-31',
    monthlySpend: [
      { month: 'Jan 2024', spend: 150000 },
      { month: 'Feb 2024', spend: 160000 },
      { month: 'Mar 2024', spend: 155000 },
      { month: 'Apr 2024', spend: 165000 },
      { month: 'May 2024', spend: 160000 },
      { month: 'Jun 2024', spend: 160000 },
    ],
  },
  {
    id: 'supplier-009',
    supplierName: 'L&T Infotech',
    totalSpend: 800000,
    procurementCategory: 'IT Services',
    contractStatus: 'expired',
    savingsDelivered: 40000,
    savingsTarget: 100000,
    savingsPercent: 40,
    ragStatus: 'red',
    contractEndDate: '2024-03-31',
    monthlySpend: [
      { month: 'Jan 2024', spend: 180000 },
      { month: 'Feb 2024', spend: 170000 },
      { month: 'Mar 2024', spend: 160000 },
      { month: 'Apr 2024', spend: 110000 },
      { month: 'May 2024', spend: 100000 },
      { month: 'Jun 2024', spend: 80000 },
    ],
  },
  {
    id: 'supplier-010',
    supplierName: 'Hexaware',
    totalSpend: 650000,
    procurementCategory: 'Application Development',
    contractStatus: 'active',
    savingsDelivered: 70000,
    savingsTarget: 80000,
    savingsPercent: 87.5,
    ragStatus: 'green',
    contractEndDate: '2026-06-30',
    monthlySpend: [
      { month: 'Jan 2024', spend: 100000 },
      { month: 'Feb 2024', spend: 110000 },
      { month: 'Mar 2024', spend: 105000 },
      { month: 'Apr 2024', spend: 115000 },
      { month: 'May 2024', spend: 110000 },
      { month: 'Jun 2024', spend: 110000 },
    ],
  },
];

/**
 * Total supplier spend across all suppliers (year-to-date).
 * @type {number}
 */
export const totalSupplierSpend = supplierSpendData.reduce(
  (sum, entry) => sum + entry.totalSpend,
  0
);

/**
 * Total savings delivered across all suppliers (year-to-date).
 * @type {number}
 */
export const totalSavingsDelivered = supplierSpendData.reduce(
  (sum, entry) => sum + entry.savingsDelivered,
  0
);

/**
 * Total savings target across all suppliers (annual).
 * @type {number}
 */
export const totalSavingsTarget = supplierSpendData.reduce(
  (sum, entry) => sum + entry.savingsTarget,
  0
);

/**
 * Supplier spend formatted for LineChart component consumption.
 * Aggregates monthly spend across all suppliers for trend visualization.
 * @type {Array<Object>}
 */
export const supplierMonthlyTrendData = (() => {
  const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];
  return months.map((month) => {
    const entry = { month };
    supplierSpendData.forEach((supplier) => {
      const monthData = supplier.monthlySpend.find((m) => m.month === month);
      entry[supplier.supplierName] = monthData ? monthData.spend : 0;
    });
    return entry;
  });
})();

/**
 * Aggregated monthly spend trend (total across all suppliers) for line chart.
 * @type {Array<{month: string, totalSpend: number}>}
 */
export const aggregatedMonthlySpend = (() => {
  const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];
  return months.map((month) => {
    const total = supplierSpendData.reduce((sum, supplier) => {
      const monthData = supplier.monthlySpend.find((m) => m.month === month);
      return sum + (monthData ? monthData.spend : 0);
    }, 0);
    return { month, totalSpend: total };
  });
})();

/**
 * Supplier spend by procurement category for grouped analysis.
 * @type {Array<{category: string, spend: number, supplierCount: number, savingsDelivered: number}>}
 */
export const supplierSpendByCategory = (() => {
  const categoryMap = {};
  supplierSpendData.forEach((supplier) => {
    const cat = supplier.procurementCategory;
    if (!categoryMap[cat]) {
      categoryMap[cat] = { category: cat, spend: 0, supplierCount: 0, savingsDelivered: 0 };
    }
    categoryMap[cat].spend += supplier.totalSpend;
    categoryMap[cat].supplierCount += 1;
    categoryMap[cat].savingsDelivered += supplier.savingsDelivered;
  });
  return Object.values(categoryMap).sort((a, b) => b.spend - a.spend);
})();

/**
 * Supplier spend formatted for DonutChart component consumption.
 * Maps supplier entries to the {label, value, color} shape expected by DonutChart.
 * @type {Array<{label: string, value: number, color: string}>}
 */
export const supplierDonutChartData = (() => {
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
  return supplierSpendData.map((entry, index) => ({
    label: entry.supplierName,
    value: entry.totalSpend,
    color: colors[index % colors.length],
  }));
})();

/**
 * Contract status summary counts.
 * @type {{active: number, expiring: number, expired: number}}
 */
export const contractStatusSummary = {
  active: supplierSpendData.filter((s) => s.contractStatus === 'active').length,
  expiring: supplierSpendData.filter((s) => s.contractStatus === 'expiring').length,
  expired: supplierSpendData.filter((s) => s.contractStatus === 'expired').length,
};

/**
 * Supplier spend summary metrics for MetricCard rendering.
 * @type {Object}
 */
export const supplierSummary = {
  totalSpend: totalSupplierSpend,
  totalSavingsDelivered: totalSavingsDelivered,
  totalSavingsTarget: totalSavingsTarget,
  savingsPercent: Math.round((totalSavingsDelivered / totalSavingsTarget) * 100),
  numberOfSuppliers: supplierSpendData.length,
  activeContracts: contractStatusSummary.active,
  expiringContracts: contractStatusSummary.expiring,
  expiredContracts: contractStatusSummary.expired,
  ragStatus: 'amber',
  ragLabel: 'Needs Attention',
  reportingPeriod: 'Q2 FY2024',
  asOfDate: '2024-06-10',
};

/**
 * Supplier KPI metrics for MetricCard rendering.
 * @type {Array<Object>}
 */
export const supplierKPIs = [
  {
    id: 'total-supplier-spend',
    name: 'Total Supplier Spend',
    value: totalSupplierSpend,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+5.8%',
    trendSentiment: 'negative',
    description: 'Year-to-date spend across all suppliers.',
  },
  {
    id: 'savings-delivered',
    name: 'Savings Delivered',
    value: totalSavingsDelivered,
    prefix: '₹',
    unit: '',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+4.2%',
    trendSentiment: 'positive',
    description: 'Total savings delivered year-to-date against annual target.',
  },
  {
    id: 'savings-achievement',
    name: 'Savings Achievement',
    value: Math.round((totalSavingsDelivered / totalSavingsTarget) * 100),
    prefix: '',
    unit: '%',
    ragStatus: 'amber',
    ragLabel: 'Needs Attention',
    trend: 'up',
    trendValue: '+3%',
    trendSentiment: 'positive',
    description: 'Percentage of annual savings target achieved year-to-date.',
  },
  {
    id: 'contracts-at-risk',
    name: 'Contracts At Risk',
    value: contractStatusSummary.expiring + contractStatusSummary.expired,
    prefix: '',
    unit: '',
    ragStatus: 'red',
    ragLabel: 'At Risk',
    trend: 'up',
    trendValue: '+1',
    trendSentiment: 'negative',
    description: 'Number of supplier contracts expiring or expired requiring immediate action.',
  },
  {
    id: 'suppliers-at-risk',
    name: 'Suppliers At Risk',
    value: supplierSpendData.filter((s) => s.ragStatus === 'red').length,
    prefix: '',
    unit: '',
    ragStatus: 'red',
    ragLabel: 'At Risk',
    trend: 'flat',
    trendValue: '0',
    trendSentiment: 'neutral',
    description: 'Number of suppliers with red RAG status requiring attention.',
  },
];

/**
 * Top 5 suppliers by spend for line chart trend comparison.
 * Returns supplier names as yKeys for LineChart component.
 * @type {string[]}
 */
export const topSupplierNames = supplierSpendData
  .slice()
  .sort((a, b) => b.totalSpend - a.totalSpend)
  .slice(0, 5)
  .map((s) => s.supplierName);

/**
 * Monthly trend data for top 5 suppliers formatted for LineChart.
 * @type {Array<Object>}
 */
export const topSupplierTrendData = (() => {
  const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];
  const topSuppliers = supplierSpendData
    .slice()
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 5);

  return months.map((month) => {
    const entry = { month };
    topSuppliers.forEach((supplier) => {
      const monthData = supplier.monthlySpend.find((m) => m.month === month);
      entry[supplier.supplierName] = monthData ? monthData.spend : 0;
    });
    return entry;
  });
})();

export default supplierSpendData;