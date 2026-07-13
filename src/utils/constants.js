/**
 * Application-wide constants and configuration values for the CIO IT Executive Dashboard.
 *
 * Provides centralized constants used across all dashboard components including
 * reference dates, section titles, RAG status enums, sort directions, and
 * navigation items.
 *
 * @module constants
 */

/**
 * Reference date for all relative date calculations and data fixtures.
 * All mock data is relative to this date.
 * @type {string}
 */
export const REFERENCE_DATE = '2024-06-10';

/**
 * Dashboard title displayed in the header.
 * Falls back to environment variable if available.
 * @type {string}
 */
export const DASHBOARD_TITLE = 'CIO IT Executive Dashboard';

/**
 * Section titles mapping section keys to their display titles.
 * Used by sidebar navigation, section cards, and breadcrumbs.
 * @type {Object.<string, string>}
 */
export const SECTION_TITLES = {
  scorecard: 'Executive Scorecard',
  financial: 'Financial Spend',
  license: 'License Management',
  vendor: 'Vendor Management',
  supplier: 'Supplier Risk',
  transformation: 'Transformation',
  manpower: 'Manpower',
};

/**
 * RAG (Red/Amber/Green) status enum values.
 * Used across all components that display RAG indicators.
 * @type {Object.<string, string>}
 */
export const RAG_STATUSES = {
  RED: 'red',
  AMBER: 'amber',
  GREEN: 'green',
};

/**
 * RAG status display labels mapping status values to human-readable labels.
 * @type {Object.<string, string>}
 */
export const RAG_LABELS = {
  [RAG_STATUSES.RED]: 'At Risk',
  [RAG_STATUSES.AMBER]: 'Needs Attention',
  [RAG_STATUSES.GREEN]: 'On Track',
};

/**
 * Sort direction enum values.
 * Used by DataTable and other sortable components.
 * @type {Object.<string, string>}
 */
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};

/**
 * Trend direction enum values.
 * Used by MetricCard and other trend-displaying components.
 * @type {Object.<string, string>}
 */
export const TREND_DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  FLAT: 'flat',
};

/**
 * Trend sentiment enum values.
 * Indicates whether a trend direction is positive, negative, or neutral.
 * @type {Object.<string, string>}
 */
export const TREND_SENTIMENTS = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral',
};

/**
 * Navigation items array for sidebar navigation.
 * Each item includes an id, label, and icon for rendering.
 * @type {Array<{id: string, label: string, icon: string}>}
 */
export const NAV_ITEMS = [
  {
    id: 'scorecard',
    label: 'Executive Scorecard',
    icon: '📊',
  },
  {
    id: 'financial',
    label: 'Financial Spend',
    icon: '💰',
  },
  {
    id: 'license',
    label: 'License Management',
    icon: '📋',
  },
  {
    id: 'vendor',
    label: 'Vendor Management',
    icon: '🤝',
  },
  {
    id: 'supplier',
    label: 'Supplier Risk',
    icon: '⚠️',
  },
  {
    id: 'transformation',
    label: 'Transformation',
    icon: '🔄',
  },
  {
    id: 'manpower',
    label: 'Manpower',
    icon: '👥',
  },
];

/**
 * Contract status enum values.
 * Used by supplier and vendor components.
 * @type {Object.<string, string>}
 */
export const CONTRACT_STATUSES = {
  ACTIVE: 'active',
  EXPIRING: 'expiring',
  EXPIRED: 'expired',
};

/**
 * Dependency risk level enum values.
 * Used by vendor management components.
 * @type {Object.<string, string>}
 */
export const DEPENDENCY_RISK_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

/**
 * Default reporting period label.
 * @type {string}
 */
export const REPORTING_PERIOD = 'Q2 FY2024';

/**
 * Currency symbol used across the dashboard.
 * @type {string}
 */
export const CURRENCY_SYMBOL = '₹';

/**
 * Default chart height in pixels.
 * @type {number}
 */
export const DEFAULT_CHART_HEIGHT = 300;

/**
 * Canon India brand colour palette for chart rendering.
 * @type {string[]}
 */
export const CHART_COLORS = [
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

export default {
  REFERENCE_DATE,
  DASHBOARD_TITLE,
  SECTION_TITLES,
  RAG_STATUSES,
  RAG_LABELS,
  SORT_DIRECTIONS,
  TREND_DIRECTIONS,
  TREND_SENTIMENTS,
  NAV_ITEMS,
  CONTRACT_STATUSES,
  DEPENDENCY_RISK_LEVELS,
  REPORTING_PERIOD,
  CURRENCY_SYMBOL,
  DEFAULT_CHART_HEIGHT,
  CHART_COLORS,
};