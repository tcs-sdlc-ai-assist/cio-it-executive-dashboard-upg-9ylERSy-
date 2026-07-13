import { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../design-system/ThemeProvider';
import { BrandWrapper } from '../components/common/BrandWrapper';
import { SkipLink } from '../components/accessibility/AccessibilityUtils';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { StackLayout } from '../components/layout/StackLayout';
import { ExecutiveScorecardSection } from '../sections/ExecutiveScorecardSection';
import { ITFinancialOverviewSection } from '../sections/ITFinancialOverviewSection';
import { LicenseSpendSplitSection } from '../sections/LicenseSpendSplitSection';
import { VendorSpendSection } from '../sections/VendorSpendSection';
import { SupplierSpendSection } from '../sections/SupplierSpendSection';
import { MidTermPlanProgressSection } from '../sections/MidTermPlanProgressSection';
import { TransformationProgramsSection } from '../sections/TransformationProgramsSection';
import { TransformationBudgetSection } from '../sections/TransformationBudgetSection';
import { ManpowerCostSection } from '../sections/ManpowerCostSection';

/**
 * Section configuration for navigation and rendering.
 * @type {Array<{id: string, label: string, Component: React.ComponentType}>}
 */
const DASHBOARD_SECTIONS = [
  {
    id: 'scorecard',
    label: 'Executive Scorecard',
    Component: ExecutiveScorecardSection,
  },
  {
    id: 'financial',
    label: 'IT Financial Overview',
    Component: ITFinancialOverviewSection,
  },
  {
    id: 'license',
    label: 'License Spend Split',
    Component: LicenseSpendSplitSection,
  },
  {
    id: 'vendor',
    label: 'Vendor Spend',
    Component: VendorSpendSection,
  },
  {
    id: 'supplier',
    label: 'Supplier Spend',
    Component: SupplierSpendSection,
  },
  {
    id: 'transformation',
    label: 'Mid-Term Plan Progress',
    Component: MidTermPlanProgressSection,
  },
  {
    id: 'transformation-programs',
    label: 'Top 3 Transformation Programs',
    Component: TransformationProgramsSection,
  },
  {
    id: 'transformation-budget',
    label: 'Transformation Progress Against Budget',
    Component: TransformationBudgetSection,
  },
  {
    id: 'manpower',
    label: 'Manpower Cost',
    Component: ManpowerCostSection,
  },
];

/**
 * DashboardContainer - Main dashboard container composing all sections.
 *
 * Composes all nine dashboard sections (ExecutiveScorecard, ITFinancialOverview,
 * LicenseSpendSplit, VendorSpend, SupplierSpend, MidTermPlanProgress,
 * TransformationPrograms, TransformationBudget, ManpowerCost) into a single
 * scrollable view. Uses StackLayout for vertical arrangement. Manages active
 * section state for sidebar navigation scroll-to behavior. Includes Header,
 * Sidebar, SkipLink, and BrandWrapper for consistent layout and accessibility.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function DashboardContainer({ className = '' }) {
  const [activeSection, setActiveSection] = useState('scorecard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainRef = useRef(null);

  const handleNavigate = useCallback((sectionId) => {
    setActiveSection(sectionId);

    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setIsSidebarOpen(false);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (let i = DASHBOARD_SECTIONS.length - 1; i >= 0; i--) {
        const section = DASHBOARD_SECTIONS[i];
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerClasses = [
    'flex min-h-screen bg-canon-grey',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ThemeProvider initialTheme="light">
      <div className={containerClasses}>
        <SkipLink targetId="main-content" label="Skip to main content" />

        {/* Sidebar Navigation */}
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header
            isSidebarOpen={isSidebarOpen}
            onMenuToggle={handleMenuToggle}
          />

          {/* Main Content */}
          <main
            id="main-content"
            ref={mainRef}
            className="flex-1 overflow-y-auto"
            role="main"
            aria-label="Dashboard content"
          >
            <BrandWrapper
              padding="4"
              variant="default"
              fullWidth={false}
              as="div"
              className="py-6"
            >
              <StackLayout
                gap="6"
                padding="0"
                align="stretch"
                justify="start"
                fullWidth
                as="div"
              >
                {DASHBOARD_SECTIONS.map((section) => {
                  const { Component } = section;
                  return (
                    <Component key={section.id} />
                  );
                })}
              </StackLayout>
            </BrandWrapper>
          </main>

          {/* Footer */}
          <footer
            className="bg-canon-white border-t border-gray-200 px-4 py-3 text-center"
            role="contentinfo"
          >
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Canon India — CIO IT Executive Dashboard
            </p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

DashboardContainer.propTypes = {
  className: PropTypes.string,
};

export default DashboardContainer;