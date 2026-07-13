import { describe, it, expect, vi } from 'vitest';
import {
  formatCurrency,
  formatPercentage,
  formatNumber,
  formatDate,
  formatCompactNumber,
  formatVariance,
} from './formatters';

describe('formatCurrency', () => {
  describe('basic formatting', () => {
    it('formats a positive number with ₹ symbol', () => {
      expect(formatCurrency(1000)).toBe('₹1,000');
    });

    it('formats zero as ₹0', () => {
      expect(formatCurrency(0)).toBe('₹0');
    });

    it('formats a negative number with sign', () => {
      expect(formatCurrency(-5000)).toBe('₹-5,000');
    });

    it('formats a large number with Indian numbering system', () => {
      expect(formatCurrency(12000000)).toBe('₹1,20,00,000');
    });

    it('formats with decimal places when specified', () => {
      expect(formatCurrency(1234.5, { decimals: 2 })).toBe('₹1,234.50');
    });
  });

  describe('abbreviated formatting', () => {
    it('abbreviates thousands as K', () => {
      expect(formatCurrency(5000, { abbreviate: true })).toBe('₹5.0K');
    });

    it('abbreviates large thousands as K without decimal', () => {
      expect(formatCurrency(15000, { abbreviate: true })).toBe('₹15K');
    });

    it('abbreviates lakhs as L', () => {
      expect(formatCurrency(500000, { abbreviate: true })).toBe('₹5.00L');
    });

    it('abbreviates large lakhs as L with one decimal', () => {
      expect(formatCurrency(1200000, { abbreviate: true })).toBe('₹12.0L');
    });

    it('abbreviates crores as Cr', () => {
      expect(formatCurrency(10000000, { abbreviate: true })).toBe('₹1.00Cr');
    });

    it('abbreviates large crores as Cr with one decimal', () => {
      expect(formatCurrency(150000000, { abbreviate: true })).toBe('₹15.0Cr');
    });

    it('abbreviates negative values correctly', () => {
      expect(formatCurrency(-3500000, { abbreviate: true })).toBe('-₹35.0L');
    });

    it('does not abbreviate small values', () => {
      expect(formatCurrency(500, { abbreviate: true })).toBe('₹500');
    });
  });

  describe('symbol option', () => {
    it('hides ₹ symbol when showSymbol is false', () => {
      expect(formatCurrency(1000, { showSymbol: false })).toBe('1,000');
    });

    it('hides ₹ symbol in abbreviated mode when showSymbol is false', () => {
      expect(formatCurrency(5000, { abbreviate: true, showSymbol: false })).toBe('5.0K');
    });
  });

  describe('null and invalid inputs', () => {
    it('returns fallback for null', () => {
      expect(formatCurrency(null)).toBe('—');
    });

    it('returns fallback for undefined', () => {
      expect(formatCurrency(undefined)).toBe('—');
    });

    it('returns fallback for NaN', () => {
      expect(formatCurrency(NaN)).toBe('—');
    });

    it('returns fallback for non-number types', () => {
      expect(formatCurrency('abc')).toBe('—');
    });

    it('returns custom fallback when specified', () => {
      expect(formatCurrency(null, { fallback: 'N/A' })).toBe('N/A');
    });
  });
});

describe('formatPercentage', () => {
  describe('basic formatting', () => {
    it('formats a whole number as percentage', () => {
      expect(formatPercentage(85)).toBe('85.0%');
    });

    it('formats zero as percentage', () => {
      expect(formatPercentage(0)).toBe('0.0%');
    });

    it('formats a negative number as percentage', () => {
      expect(formatPercentage(-5)).toBe('-5.0%');
    });

    it('formats with custom decimal places', () => {
      expect(formatPercentage(85.678, { decimals: 2 })).toBe('85.68%');
    });

    it('formats with zero decimal places', () => {
      expect(formatPercentage(85.678, { decimals: 0 })).toBe('86%');
    });
  });

  describe('decimal form conversion', () => {
    it('converts decimal form to percentage when isDecimal is true', () => {
      expect(formatPercentage(0.85, { isDecimal: true })).toBe('85.0%');
    });

    it('converts small decimal to percentage', () => {
      expect(formatPercentage(0.05, { isDecimal: true })).toBe('5.0%');
    });

    it('converts 1.0 to 100%', () => {
      expect(formatPercentage(1.0, { isDecimal: true })).toBe('100.0%');
    });
  });

  describe('symbol option', () => {
    it('hides % symbol when showSymbol is false', () => {
      expect(formatPercentage(85, { showSymbol: false })).toBe('85.0');
    });
  });

  describe('null and invalid inputs', () => {
    it('returns fallback for null', () => {
      expect(formatPercentage(null)).toBe('—');
    });

    it('returns fallback for undefined', () => {
      expect(formatPercentage(undefined)).toBe('—');
    });

    it('returns fallback for NaN', () => {
      expect(formatPercentage(NaN)).toBe('—');
    });

    it('returns fallback for non-number types', () => {
      expect(formatPercentage('abc')).toBe('—');
    });

    it('returns custom fallback when specified', () => {
      expect(formatPercentage(null, { fallback: 'N/A' })).toBe('N/A');
    });
  });
});

describe('formatNumber', () => {
  describe('basic formatting', () => {
    it('formats a number with comma separators', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('formats zero', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('formats a negative number', () => {
      expect(formatNumber(-1234)).toBe('-1,234');
    });

    it('formats with decimal places', () => {
      expect(formatNumber(1234.5, { decimals: 2 })).toBe('1,234.50');
    });

    it('formats small numbers without commas', () => {
      expect(formatNumber(42)).toBe('42');
    });
  });

  describe('abbreviated formatting', () => {
    it('abbreviates thousands as K', () => {
      expect(formatNumber(5000, { abbreviate: true })).toBe('5.0K');
    });

    it('abbreviates large thousands as K without decimal', () => {
      expect(formatNumber(15000, { abbreviate: true })).toBe('15K');
    });

    it('abbreviates millions as M', () => {
      expect(formatNumber(1500000, { abbreviate: true })).toBe('1.5M');
    });

    it('abbreviates billions as B', () => {
      expect(formatNumber(2500000000, { abbreviate: true })).toBe('2.5B');
    });

    it('abbreviates negative values correctly', () => {
      expect(formatNumber(-3500000, { abbreviate: true })).toBe('-3.5M');
    });

    it('does not abbreviate small values', () => {
      expect(formatNumber(500, { abbreviate: true })).toBe('500');
    });
  });

  describe('null and invalid inputs', () => {
    it('returns fallback for null', () => {
      expect(formatNumber(null)).toBe('—');
    });

    it('returns fallback for undefined', () => {
      expect(formatNumber(undefined)).toBe('—');
    });

    it('returns fallback for NaN', () => {
      expect(formatNumber(NaN)).toBe('—');
    });

    it('returns fallback for non-number types', () => {
      expect(formatNumber('abc')).toBe('—');
    });

    it('returns custom fallback when specified', () => {
      expect(formatNumber(null, { fallback: 'N/A' })).toBe('N/A');
    });
  });
});

describe('formatDate', () => {
  describe('short format', () => {
    it('formats a date string in short format', () => {
      const result = formatDate('2024-06-10');
      expect(result).toMatch(/10.*Jun.*2024/);
    });

    it('formats a Date object in short format', () => {
      const result = formatDate(new Date('2024-01-15'));
      expect(result).toMatch(/15.*Jan.*2024/);
    });
  });

  describe('long format', () => {
    it('formats a date string in long format', () => {
      const result = formatDate('2024-06-10', { format: 'long' });
      expect(result).toMatch(/10.*June.*2024/);
    });
  });

  describe('iso format', () => {
    it('formats a date string in ISO format', () => {
      const result = formatDate('2024-06-10T12:00:00Z', { format: 'iso' });
      expect(result).toBe('2024-06-10');
    });
  });

  describe('monthYear format', () => {
    it('formats a date string as month and year', () => {
      const result = formatDate('2024-06-10', { format: 'monthYear' });
      expect(result).toMatch(/Jun.*2024/);
    });
  });

  describe('relative format', () => {
    it('returns "Today" for the reference date', () => {
      const result = formatDate('2024-06-10', { format: 'relative' });
      expect(result).toBe('Today');
    });

    it('returns "Yesterday" for one day before reference date', () => {
      const result = formatDate('2024-06-09', { format: 'relative' });
      expect(result).toBe('Yesterday');
    });

    it('returns "Tomorrow" for one day after reference date', () => {
      const result = formatDate('2024-06-11', { format: 'relative' });
      expect(result).toBe('Tomorrow');
    });

    it('returns days ago for recent past dates', () => {
      const result = formatDate('2024-06-07', { format: 'relative' });
      expect(result).toBe('3 days ago');
    });

    it('returns "In X days" for near future dates', () => {
      const result = formatDate('2024-06-14', { format: 'relative' });
      expect(result).toBe('In 4 days');
    });

    it('returns weeks ago for dates 7-29 days in the past', () => {
      const result = formatDate('2024-05-27', { format: 'relative' });
      expect(result).toBe('2 weeks ago');
    });

    it('returns "1 week ago" for exactly 7 days ago', () => {
      const result = formatDate('2024-06-03', { format: 'relative' });
      expect(result).toBe('1 week ago');
    });

    it('returns months ago for dates 30-364 days in the past', () => {
      const result = formatDate('2024-03-10', { format: 'relative' });
      expect(result).toBe('3 months ago');
    });

    it('returns years ago for dates 365+ days in the past', () => {
      const result = formatDate('2022-06-10', { format: 'relative' });
      expect(result).toBe('2 years ago');
    });

    it('returns "In X months" for future dates', () => {
      const result = formatDate('2024-09-15', { format: 'relative' });
      expect(result).toMatch(/In 3 months/);
    });

    it('uses custom reference date when provided', () => {
      const result = formatDate('2024-01-01', {
        format: 'relative',
        referenceDate: '2024-01-02',
      });
      expect(result).toBe('Yesterday');
    });
  });

  describe('null and invalid inputs', () => {
    it('returns fallback for null', () => {
      expect(formatDate(null)).toBe('—');
    });

    it('returns fallback for undefined', () => {
      expect(formatDate(undefined)).toBe('—');
    });

    it('returns fallback for invalid date string', () => {
      expect(formatDate('not-a-date')).toBe('—');
    });

    it('returns custom fallback when specified', () => {
      expect(formatDate(null, { fallback: 'N/A' })).toBe('N/A');
    });

    it('returns fallback for non-string non-Date types', () => {
      expect(formatDate(12345)).toBe('—');
    });
  });

  describe('invalid format', () => {
    it('falls back to short format and warns for invalid format', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const result = formatDate('2024-06-10', { format: 'invalid' });
      expect(result).toMatch(/10.*Jun.*2024/);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[formatDate] Invalid format')
      );

      consoleSpy.mockRestore();
    });
  });
});

describe('formatCompactNumber', () => {
  describe('basic formatting', () => {
    it('formats millions as M', () => {
      expect(formatCompactNumber(1500000)).toBe('1.5M');
    });

    it('formats thousands as K', () => {
      expect(formatCompactNumber(5000)).toBe('5K');
    });

    it('formats small numbers with locale string', () => {
      expect(formatCompactNumber(42)).toBe('42');
    });

    it('formats zero', () => {
      expect(formatCompactNumber(0)).toBe('0');
    });

    it('formats negative millions', () => {
      expect(formatCompactNumber(-2500000)).toBe('-2.5M');
    });

    it('formats negative thousands', () => {
      expect(formatCompactNumber(-3000)).toBe('-3K');
    });
  });

  describe('null and invalid inputs', () => {
    it('returns fallback for null', () => {
      expect(formatCompactNumber(null)).toBe('—');
    });

    it('returns fallback for undefined', () => {
      expect(formatCompactNumber(undefined)).toBe('—');
    });

    it('returns fallback for NaN', () => {
      expect(formatCompactNumber(NaN)).toBe('—');
    });

    it('returns custom fallback when specified', () => {
      expect(formatCompactNumber(null, 'N/A')).toBe('N/A');
    });
  });
});

describe('formatVariance', () => {
  describe('basic formatting', () => {
    it('formats a positive variance with + sign', () => {
      const result = formatVariance(5000);
      expect(result).toMatch(/^\+/);
      expect(result).toContain('5');
    });

    it('formats a negative variance with - sign', () => {
      const result = formatVariance(-3000);
      expect(result).toContain('-');
      expect(result).toContain('3');
    });

    it('formats zero variance without sign', () => {
      const result = formatVariance(0);
      expect(result).toBe('0');
    });
  });

  describe('currency formatting', () => {
    it('formats positive variance as currency', () => {
      const result = formatVariance(500000, { isCurrency: true });
      expect(result).toContain('+');
      expect(result).toContain('₹');
    });

    it('formats negative variance as currency', () => {
      const result = formatVariance(-500000, { isCurrency: true });
      expect(result).toContain('-');
      expect(result).toContain('₹');
    });
  });

  describe('percentage formatting', () => {
    it('formats positive variance as percentage', () => {
      const result = formatVariance(5.5, { isPercentage: true });
      expect(result).toContain('+');
      expect(result).toContain('%');
    });

    it('formats negative variance as percentage', () => {
      const result = formatVariance(-3.2, { isPercentage: true });
      expect(result).toContain('-');
      expect(result).toContain('%');
    });
  });

  describe('sign option', () => {
    it('hides sign when showSign is false', () => {
      const result = formatVariance(5000, { showSign: false });
      expect(result).not.toMatch(/^\+/);
    });
  });

  describe('null and invalid inputs', () => {
    it('returns fallback for null', () => {
      expect(formatVariance(null)).toBe('—');
    });

    it('returns fallback for undefined', () => {
      expect(formatVariance(undefined)).toBe('—');
    });

    it('returns fallback for NaN', () => {
      expect(formatVariance(NaN)).toBe('—');
    });

    it('returns custom fallback when specified', () => {
      expect(formatVariance(null, { fallback: 'N/A' })).toBe('N/A');
    });
  });
});