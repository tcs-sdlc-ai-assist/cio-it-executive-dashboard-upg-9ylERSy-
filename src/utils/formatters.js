/**
 * Data formatting utility functions for the CIO IT Executive Dashboard.
 *
 * Provides consistent formatting for currency, percentages, numbers, and dates
 * across all dashboard components. All formatters are pure functions with no
 * side effects.
 *
 * @module formatters
 */

/**
 * Reference date for relative date formatting.
 * @type {string}
 */
const REFERENCE_DATE = '2024-06-10';

/**
 * Formats a number as an Indian Rupee currency string with ₹ symbol.
 *
 * Supports abbreviation for large numbers (K for thousands, M for millions,
 * Cr for crores, L for lakhs). When abbreviate is false, formats with
 * full comma-separated value using Indian numbering system.
 *
 * @param {number|null|undefined} value - Numeric value to format
 * @param {Object} [options] - Formatting options
 * @param {boolean} [options.abbreviate=false] - Whether to abbreviate large numbers
 * @param {number} [options.decimals=0] - Number of decimal places for non-abbreviated values
 * @param {boolean} [options.showSymbol=true] - Whether to show the ₹ symbol
 * @param {string} [options.fallback='—'] - Fallback string for null/undefined values
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value, options = {}) {
  const {
    abbreviate = false,
    decimals = 0,
    showSymbol = true,
    fallback = '—',
  } = options;

  if (value == null || typeof value !== 'number' || isNaN(value)) {
    return fallback;
  }

  const symbol = showSymbol ? '₹' : '';

  if (abbreviate) {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 10000000) {
      // Crores (1 Cr = 10,000,000)
      const crValue = absValue / 10000000;
      return `${sign}${symbol}${crValue.toFixed(crValue >= 10 ? 1 : 2)}Cr`;
    }
    if (absValue >= 100000) {
      // Lakhs (1 L = 100,000)
      const lValue = absValue / 100000;
      return `${sign}${symbol}${lValue.toFixed(lValue >= 10 ? 1 : 2)}L`;
    }
    if (absValue >= 1000) {
      const kValue = absValue / 1000;
      return `${sign}${symbol}${kValue.toFixed(kValue >= 10 ? 0 : 1)}K`;
    }
    return `${sign}${symbol}${absValue.toFixed(decimals)}`;
  }

  // Full formatting with Indian numbering system
  const formatted = formatNumberIndian(value, decimals);
  return `${symbol}${formatted}`;
}

/**
 * Formats a number using the Indian numbering system (lakhs, crores).
 *
 * @param {number} value - Numeric value to format
 * @param {number} [decimals=0] - Number of decimal places
 * @returns {string} Comma-separated number string in Indian format
 */
function formatNumberIndian(value, decimals = 0) {
  const sign = value < 0 ? '-' : '';
  const absValue = Math.abs(value);
  const fixed = absValue.toFixed(decimals);
  const parts = fixed.split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Indian numbering: first group of 3 from right, then groups of 2
  if (integerPart.length > 3) {
    const lastThree = integerPart.slice(-3);
    const remaining = integerPart.slice(0, -3);
    const groups = [];
    let i = remaining.length;
    while (i > 0) {
      const start = Math.max(0, i - 2);
      groups.unshift(remaining.slice(start, i));
      i = start;
    }
    integerPart = groups.join(',') + ',' + lastThree;
  }

  const result = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  return `${sign}${result}`;
}

/**
 * Formats a number as a percentage string.
 *
 * Accepts values in either decimal form (0.85) or whole number form (85).
 * When isDecimal is true, multiplies by 100 before formatting.
 *
 * @param {number|null|undefined} value - Numeric value to format
 * @param {Object} [options] - Formatting options
 * @param {boolean} [options.isDecimal=false] - Whether the value is in decimal form (e.g., 0.85 = 85%)
 * @param {number} [options.decimals=1] - Number of decimal places
 * @param {boolean} [options.showSymbol=true] - Whether to show the % symbol
 * @param {string} [options.fallback='—'] - Fallback string for null/undefined values
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value, options = {}) {
  const {
    isDecimal = false,
    decimals = 1,
    showSymbol = true,
    fallback = '—',
  } = options;

  if (value == null || typeof value !== 'number' || isNaN(value)) {
    return fallback;
  }

  const percentValue = isDecimal ? value * 100 : value;
  const formatted = percentValue.toFixed(decimals);
  const suffix = showSymbol ? '%' : '';

  return `${formatted}${suffix}`;
}

/**
 * Formats a number with comma separators for readability.
 *
 * Supports abbreviation for large numbers (K, M, B).
 * Uses standard international formatting (groups of 3).
 *
 * @param {number|null|undefined} value - Numeric value to format
 * @param {Object} [options] - Formatting options
 * @param {boolean} [options.abbreviate=false] - Whether to abbreviate large numbers
 * @param {number} [options.decimals=0] - Number of decimal places
 * @param {string} [options.fallback='—'] - Fallback string for null/undefined values
 * @returns {string} Formatted number string
 */
export function formatNumber(value, options = {}) {
  const {
    abbreviate = false,
    decimals = 0,
    fallback = '—',
  } = options;

  if (value == null || typeof value !== 'number' || isNaN(value)) {
    return fallback;
  }

  if (abbreviate) {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1000000000) {
      const bValue = absValue / 1000000000;
      return `${sign}${bValue.toFixed(1)}B`;
    }
    if (absValue >= 1000000) {
      const mValue = absValue / 1000000;
      return `${sign}${mValue.toFixed(1)}M`;
    }
    if (absValue >= 1000) {
      const kValue = absValue / 1000;
      return `${sign}${kValue.toFixed(kValue >= 10 ? 0 : 1)}K`;
    }
    return `${sign}${absValue.toFixed(decimals)}`;
  }

  // Standard comma-separated formatting
  const fixed = value.toFixed(decimals);
  const parts = fixed.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1];

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

/**
 * Formats a date string or Date object relative to the reference date (2024-06-10).
 *
 * Supports multiple output formats including relative time (e.g., '3 days ago'),
 * short date, long date, and ISO format.
 *
 * @param {string|Date|null|undefined} value - Date value to format (ISO string or Date object)
 * @param {Object} [options] - Formatting options
 * @param {'short' | 'long' | 'relative' | 'iso' | 'monthYear'} [options.format='short'] - Output format
 * @param {string} [options.fallback='—'] - Fallback string for invalid/null dates
 * @param {string} [options.referenceDate] - Reference date for relative formatting (defaults to 2024-06-10)
 * @returns {string} Formatted date string
 */
export function formatDate(value, options = {}) {
  const {
    format = 'short',
    fallback = '—',
    referenceDate = REFERENCE_DATE,
  } = options;

  if (value == null) {
    return fallback;
  }

  let date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'string') {
    date = new Date(value);
  } else {
    return fallback;
  }

  if (isNaN(date.getTime())) {
    return fallback;
  }

  switch (format) {
    case 'iso': {
      return date.toISOString().split('T')[0];
    }

    case 'short': {
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('en-IN', { month: 'short' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }

    case 'long': {
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('en-IN', { month: 'long' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }

    case 'monthYear': {
      const month = date.toLocaleString('en-IN', { month: 'short' });
      const year = date.getFullYear();
      return `${month} ${year}`;
    }

    case 'relative': {
      const refDate = new Date(referenceDate);
      if (isNaN(refDate.getTime())) {
        return fallback;
      }

      const diffMs = refDate.getTime() - date.getTime();
      const diffDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
      const isFuture = diffMs < 0;

      if (diffDays === 0) {
        return 'Today';
      }
      if (diffDays === 1) {
        return isFuture ? 'Tomorrow' : 'Yesterday';
      }
      if (diffDays < 7) {
        return isFuture ? `In ${diffDays} days` : `${diffDays} days ago`;
      }
      if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        const label = weeks === 1 ? 'week' : 'weeks';
        return isFuture ? `In ${weeks} ${label}` : `${weeks} ${label} ago`;
      }
      if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        const label = months === 1 ? 'month' : 'months';
        return isFuture ? `In ${months} ${label}` : `${months} ${label} ago`;
      }
      const years = Math.floor(diffDays / 365);
      const label = years === 1 ? 'year' : 'years';
      return isFuture ? `In ${years} ${label}` : `${years} ${label} ago`;
    }

    default: {
      console.warn(
        `[formatDate] Invalid format "${format}" provided. Falling back to "short".`
      );
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('en-IN', { month: 'short' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
  }
}

/**
 * Formats a large number value for chart axis or tooltip display.
 *
 * Automatically abbreviates based on magnitude:
 * - >= 1,000,000: formatted as X.XM
 * - >= 1,000: formatted as XK
 * - Otherwise: formatted with locale string
 *
 * @param {number|null|undefined} value - Numeric value to format
 * @param {string} [fallback='—'] - Fallback string for null/undefined values
 * @returns {string} Abbreviated number string
 */
export function formatCompactNumber(value, fallback = '—') {
  if (value == null || typeof value !== 'number' || isNaN(value)) {
    return fallback;
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1000000) {
    return `${sign}${(absValue / 1000000).toFixed(1)}M`;
  }
  if (absValue >= 1000) {
    return `${sign}${(absValue / 1000).toFixed(0)}K`;
  }
  return `${sign}${absValue.toLocaleString()}`;
}

/**
 * Formats a variance value with sign indicator and optional colour hint.
 *
 * @param {number|null|undefined} value - Variance value
 * @param {Object} [options] - Formatting options
 * @param {boolean} [options.isCurrency=false] - Whether to format as currency
 * @param {boolean} [options.isPercentage=false] - Whether to format as percentage
 * @param {boolean} [options.showSign=true] - Whether to show +/- sign
 * @param {string} [options.fallback='—'] - Fallback string for null/undefined values
 * @returns {string} Formatted variance string
 */
export function formatVariance(value, options = {}) {
  const {
    isCurrency = false,
    isPercentage = false,
    showSign = true,
    fallback = '—',
  } = options;

  if (value == null || typeof value !== 'number' || isNaN(value)) {
    return fallback;
  }

  const sign = showSign ? (value > 0 ? '+' : value < 0 ? '' : '') : '';

  if (isCurrency) {
    const formatted = formatCurrency(Math.abs(value), { abbreviate: true, showSymbol: true });
    const negSign = value < 0 ? '-' : '';
    const posSign = showSign && value > 0 ? '+' : '';
    return `${posSign}${negSign}${formatted}`;
  }

  if (isPercentage) {
    const formatted = formatPercentage(Math.abs(value), { decimals: 1, showSymbol: true });
    const negSign = value < 0 ? '-' : '';
    const posSign = showSign && value > 0 ? '+' : '';
    return `${posSign}${negSign}${formatted}`;
  }

  const formatted = formatNumber(Math.abs(value), { abbreviate: true });
  const negSign = value < 0 ? '-' : '';
  const posSign = showSign && value > 0 ? '+' : '';
  return `${posSign}${negSign}${formatted}`;
}

export default {
  formatCurrency,
  formatPercentage,
  formatNumber,
  formatDate,
  formatCompactNumber,
  formatVariance,
};