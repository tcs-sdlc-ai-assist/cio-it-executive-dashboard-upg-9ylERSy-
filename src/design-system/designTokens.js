/**
 * Canon India Design Tokens
 * Single source of truth for all design values used across components.
 * @module designTokens
 */

/**
 * Brand and UI color palette
 * @type {Object.<string, string>}
 */
export const COLORS = {
  canonRed: '#E60012',
  black: '#000000',
  grey: '#F5F5F5',
  white: '#FFFFFF',
  successGreen: '#28A745',
  warningAmber: '#FFC107',
  dangerRed: '#E60012',
  ragRed: '#E60012',
  ragAmber: '#FFC107',
  ragGreen: '#28A745',
};

/**
 * Typography tokens
 * @type {Object}
 */
export const TYPOGRAPHY = {
  fontFamily: 'Arial, Helvetica, Roboto, "Segoe UI", sans-serif',
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

/**
 * Spacing scale
 * @type {Object.<string, string>}
 */
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

/**
 * Responsive breakpoints (min-width values)
 * @type {Object.<string, string>}
 */
export const BREAKPOINTS = {
  mobile: '0px',
  tablet: '768px',
  desktop: '1024px',
};

/**
 * Container constraints
 * @type {Object}
 */
export const CONTAINER = {
  maxWidth: 1200,
};