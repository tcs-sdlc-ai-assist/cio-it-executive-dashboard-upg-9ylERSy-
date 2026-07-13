import { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../design-system/ThemeProvider';

const NAV_SECTIONS = [
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
 * Sidebar - Main navigation sidebar with responsive hamburger menu.
 *
 * Persistent sidebar navigation for desktop. Displays category-led navigation
 * with section labels for each dashboard module. Includes Canon India branding.
 * On mobile, collapses to hamburger menu. Uses ARIA roles and labels for accessibility.
 *
 * @param {Object} props
 * @param {string} [props.activeSection='scorecard'] - Currently active navigation section id
 * @param {function} [props.onNavigate] - Callback when a navigation item is clicked, receives section id
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function Sidebar({ activeSection = 'scorecard', onNavigate, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const { tokens } = useTheme();

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (sectionId) => {
      if (onNavigate) {
        onNavigate(sectionId);
      }
      setIsOpen(false);
    },
    [onNavigate]
  );

  const handleKeyDown = useCallback(
    (event, sectionId) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleNavigate(sectionId);
      }
    },
    [handleNavigate]
  );

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        if (toggleButtonRef.current) {
          toggleButtonRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Trap focus within sidebar when open on mobile
  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      const focusableElements = sidebarRef.current.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  const navItems = NAV_SECTIONS.map((section) => {
    const isActive = activeSection === section.id;

    return (
      <li key={section.id} role="none">
        <button
          role="menuitem"
          aria-current={isActive ? 'page' : undefined}
          className={[
            'flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-medium rounded-md transition-colors',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red',
            isActive
              ? 'bg-canon-red text-canon-white'
              : 'text-canon-black hover:bg-gray-200 hover:text-canon-red',
          ].join(' ')}
          onClick={() => handleNavigate(section.id)}
          onKeyDown={(e) => handleKeyDown(e, section.id)}
          tabIndex={0}
        >
          <span className="text-base" aria-hidden="true">
            {section.icon}
          </span>
          <span>{section.label}</span>
        </button>
      </li>
    );
  });

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        ref={toggleButtonRef}
        className="md:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-md bg-canon-white shadow-md text-canon-black hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red transition-colors"
        onClick={handleToggle}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="sidebar-nav"
      >
        {isOpen ? (
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

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="sidebar-nav"
        role="navigation"
        aria-label="Main navigation"
        className={[
          'fixed top-0 left-0 z-40 h-full bg-canon-white shadow-lg flex flex-col',
          'w-64 transition-transform duration-300 ease-in-out',
          'md:translate-x-0 md:static md:z-auto md:shadow-none md:border-r md:border-gray-200',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Brand header */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-200">
          <div
            className="flex items-center justify-center w-8 h-8 rounded bg-canon-red"
            aria-hidden="true"
          >
            <span className="text-canon-white font-bold text-sm">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-canon-black leading-tight">
              Canon India
            </span>
            <span className="text-xs text-gray-500 leading-tight">
              IT Executive Dashboard
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Dashboard Modules
          </p>
          <ul role="menu" aria-label="Dashboard navigation" className="flex flex-col gap-1">
            {navItems}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Canon India
          </p>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  activeSection: PropTypes.string,
  onNavigate: PropTypes.func,
  className: PropTypes.string,
};

export default Sidebar;