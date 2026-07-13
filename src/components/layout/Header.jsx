import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../design-system/ThemeProvider';

/**
 * Header - Dashboard header with branding and mobile menu toggle.
 *
 * Displays the dashboard title 'CIO IT Executive Dashboard', Canon India logo
 * placeholder, and mobile hamburger menu toggle button. Includes accessible
 * labels and responsive styling.
 *
 * @param {Object} props
 * @param {string} [props.title] - Dashboard title to display
 * @param {boolean} [props.isSidebarOpen=false] - Whether the sidebar is currently open
 * @param {function} [props.onMenuToggle] - Callback when the mobile menu toggle is clicked
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function Header({
  title,
  isSidebarOpen = false,
  onMenuToggle,
  className = '',
}) {
  const { tokens } = useTheme();

  const displayTitle =
    title || import.meta.env.VITE_APP_TITLE || 'CIO IT Executive Dashboard';

  const handleMenuToggle = useCallback(() => {
    if (onMenuToggle) {
      onMenuToggle();
    }
  }, [onMenuToggle]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleMenuToggle();
      }
    },
    [handleMenuToggle]
  );

  const headerClasses = [
    'sticky top-0 z-20 flex items-center justify-between',
    'bg-canon-white shadow-sm border-b border-gray-200',
    'px-4 py-3 md:px-6',
    'min-h-[56px]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClasses} role="banner" aria-label="Dashboard header">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-canon-black hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red transition-colors"
          onClick={handleMenuToggle}
          onKeyDown={handleKeyDown}
          aria-label={
            isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar-nav"
          type="button"
        >
          {isSidebarOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Canon India logo placeholder */}
        <div
          className="flex items-center justify-center w-8 h-8 rounded bg-canon-red flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-canon-white font-bold text-sm">C</span>
        </div>

        {/* Dashboard title */}
        <h1 className="text-base md:text-lg font-bold text-canon-black leading-tight truncate">
          {displayTitle}
        </h1>
      </div>

      {/* Right section - branding label */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Canon India</span>
        <div
          className="w-px h-4 bg-gray-300"
          aria-hidden="true"
        />
        <span className="text-xs text-gray-400">IT Division</span>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  isSidebarOpen: PropTypes.bool,
  onMenuToggle: PropTypes.func,
  className: PropTypes.string,
};

export default Header;