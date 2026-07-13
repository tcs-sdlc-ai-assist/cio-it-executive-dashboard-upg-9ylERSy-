import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS, CONTAINER } from './designTokens';

/**
 * @typedef {'light' | 'dark'} ThemeMode
 */

/**
 * @typedef {Object} ThemeContextValue
 * @property {ThemeMode} theme - Current theme mode
 * @property {function} toggleTheme - Toggle between light and dark theme
 * @property {function} setTheme - Set theme to a specific mode
 * @property {Object} tokens - Design tokens object
 * @property {Object} tokens.colors - Color palette tokens
 * @property {Object} tokens.typography - Typography tokens
 * @property {Object} tokens.spacing - Spacing scale tokens
 * @property {Object} tokens.breakpoints - Responsive breakpoint tokens
 * @property {Object} tokens.container - Container constraint tokens
 */

const ThemeContext = createContext(null);

const VALID_THEMES = ['light', 'dark'];

/**
 * Validates and returns a valid theme mode.
 * Falls back to 'light' if the provided value is invalid.
 * @param {string} theme - Theme mode to validate
 * @returns {ThemeMode} Valid theme mode
 */
function validateTheme(theme) {
  if (VALID_THEMES.includes(theme)) {
    return theme;
  }
  console.warn(
    `[ThemeProvider] Invalid theme "${theme}" provided. Falling back to "light".`
  );
  return 'light';
}

/**
 * ThemeProvider component that wraps the application and provides
 * Canon India design tokens via React Context.
 *
 * @param {Object} props
 * @param {'light' | 'dark'} [props.initialTheme='light'] - Initial theme mode
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement}
 */
export function ThemeProvider({ initialTheme = 'light', children }) {
  const [theme, setThemeState] = useState(() => validateTheme(initialTheme));

  const setTheme = useCallback((newTheme) => {
    const validated = validateTheme(newTheme);
    setThemeState(validated);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const tokens = useMemo(
    () => ({
      colors: COLORS,
      typography: TYPOGRAPHY,
      spacing: SPACING,
      breakpoints: BREAKPOINTS,
      container: CONTAINER,
    }),
    []
  );

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      tokens,
    }),
    [theme, toggleTheme, setTheme, tokens]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  initialTheme: PropTypes.oneOf(['light', 'dark']),
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to consume theme context and design tokens.
 * Must be used within a ThemeProvider.
 *
 * @returns {ThemeContextValue} Theme context value including tokens and theme controls
 * @throws {Error} If used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;