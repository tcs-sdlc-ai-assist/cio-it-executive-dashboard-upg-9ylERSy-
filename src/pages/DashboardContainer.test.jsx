import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DashboardContainer } from './DashboardContainer';

// Mock ResizeObserver for chart components
beforeEach(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock scrollIntoView
  Element.prototype.scrollIntoView = vi.fn();

  // Mock window.scrollY
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    value: 0,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('DashboardContainer', () => {
  describe('rendering all nine dashboard sections', () => {
    it('renders the Executive CIO Scorecard section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('Executive CIO Scorecard')).toBeInTheDocument();
    });

    it('renders the IT Financial Overview section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('IT Financial Overview')).toBeInTheDocument();
    });

    it('renders the License Spend Split section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('License Spend Split')).toBeInTheDocument();
    });

    it('renders the Vendor Spend section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('Vendor Spend')).toBeInTheDocument();
    });

    it('renders the Supplier Spend section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('Supplier Spend')).toBeInTheDocument();
    });

    it('renders the Mid-Term Plan Progress section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('Mid-Term Plan Progress')).toBeInTheDocument();
    });

    it('renders the Top 3 Transformation Programs section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('Top 3 Transformation Programs')).toBeInTheDocument();
    });

    it('renders the Transformation Progress Against Budget section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('Transformation Progress Against Budget')).toBeInTheDocument();
    });

    it('renders the Manpower Cost section', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('Manpower Cost')).toBeInTheDocument();
    });

    it('renders all nine sections at once', () => {
      render(<DashboardContainer />);

      const sectionLabels = [
        'Executive CIO Scorecard',
        'IT Financial Overview',
        'License Spend Split',
        'Vendor Spend',
        'Supplier Spend',
        'Mid-Term Plan Progress',
        'Top 3 Transformation Programs',
        'Transformation Progress Against Budget',
        'Manpower Cost',
      ];

      sectionLabels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });

  describe('layout structure', () => {
    it('renders the main content area with role="main"', () => {
      render(<DashboardContainer />);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveAttribute('aria-label', 'Dashboard content');
    });

    it('renders the main content area with id="main-content"', () => {
      render(<DashboardContainer />);

      const mainContent = document.getElementById('main-content');
      expect(mainContent).toBeInTheDocument();
    });

    it('renders the header with role="banner"', () => {
      render(<DashboardContainer />);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('renders the sidebar navigation with role="navigation"', () => {
      render(<DashboardContainer />);

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });

    it('renders the footer with role="contentinfo"', () => {
      render(<DashboardContainer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('renders the footer with Canon India copyright text', () => {
      render(<DashboardContainer />);

      const footer = screen.getByRole('contentinfo');
      const currentYear = new Date().getFullYear();
      expect(footer).toHaveTextContent(`© ${currentYear} Canon India — CIO IT Executive Dashboard`);
    });

    it('renders the dashboard title in the header', () => {
      render(<DashboardContainer />);

      expect(screen.getByText('CIO IT Executive Dashboard')).toBeInTheDocument();
    });

    it('applies additional className when provided', () => {
      const { container } = render(<DashboardContainer className="custom-dashboard-class" />);

      const wrapper = container.firstChild;
      // The ThemeProvider wraps, so we need to find the flex container
      const flexContainer = wrapper.querySelector('.flex.min-h-screen');
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer.className).toContain('custom-dashboard-class');
    });
  });

  describe('accessibility', () => {
    it('renders the SkipLink for keyboard navigation', () => {
      render(<DashboardContainer />);

      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink.tagName.toLowerCase()).toBe('a');
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('each section has an id attribute for navigation', () => {
      render(<DashboardContainer />);

      const sectionIds = [
        'scorecard',
        'financial',
        'license',
        'vendor',
        'supplier',
        'transformation',
        'transformation-programs',
        'transformation-budget',
        'manpower',
      ];

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        expect(element).toBeInTheDocument();
      });
    });

    it('each section has an aria-label attribute', () => {
      render(<DashboardContainer />);

      const sectionAriaLabels = [
        'Executive CIO Scorecard',
        'IT Financial Overview',
        'License Spend Split',
        'Vendor Spend',
        'Supplier Spend',
        'Mid-Term Plan Progress',
        'Top 3 Transformation Programs',
        'Transformation Progress Against Budget',
        'Manpower Cost',
      ];

      sectionAriaLabels.forEach((label) => {
        expect(screen.getByLabelText(label)).toBeInTheDocument();
      });
    });
  });

  describe('sidebar navigation', () => {
    it('renders sidebar navigation items', () => {
      render(<DashboardContainer />);

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(within(nav).getByText('Executive Scorecard')).toBeInTheDocument();
      expect(within(nav).getByText('Financial Spend')).toBeInTheDocument();
      expect(within(nav).getByText('License Management')).toBeInTheDocument();
      expect(within(nav).getByText('Vendor Management')).toBeInTheDocument();
      expect(within(nav).getByText('Supplier Risk')).toBeInTheDocument();
      expect(within(nav).getByText('Transformation')).toBeInTheDocument();
      expect(within(nav).getByText('Manpower')).toBeInTheDocument();
    });

    it('highlights the scorecard section as active by default', () => {
      render(<DashboardContainer />);

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const scorecardButton = within(nav).getByText('Executive Scorecard').closest('button');
      expect(scorecardButton).toHaveAttribute('aria-current', 'page');
    });

    it('navigates to a section when a sidebar item is clicked', async () => {
      const user = userEvent.setup();

      render(<DashboardContainer />);

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const financialButton = within(nav).getByText('Financial Spend');
      await user.click(financialButton);

      // After clicking, the financial section should be scrolled into view
      const financialSection = document.getElementById('financial');
      expect(financialSection).toBeInTheDocument();
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('updates active section when a sidebar item is clicked', async () => {
      const user = userEvent.setup();

      render(<DashboardContainer />);

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const financialButton = within(nav).getByText('Financial Spend');
      await user.click(financialButton);

      // The financial button should now be active
      const financialMenuItem = within(nav).getByText('Financial Spend').closest('button');
      expect(financialMenuItem).toHaveAttribute('aria-current', 'page');

      // The scorecard button should no longer be active
      const scorecardMenuItem = within(nav).getByText('Executive Scorecard').closest('button');
      expect(scorecardMenuItem).not.toHaveAttribute('aria-current');
    });
  });

  describe('mobile menu toggle', () => {
    it('renders the mobile menu toggle button in the header', () => {
      render(<DashboardContainer />);

      const header = screen.getByRole('banner');
      const menuButton = within(header).getByLabelText('Open navigation menu');
      expect(menuButton).toBeInTheDocument();
    });

    it('toggles the sidebar open state when the header menu button is clicked', async () => {
      const user = userEvent.setup();

      render(<DashboardContainer />);

      const header = screen.getByRole('banner');
      const menuButton = within(header).getByLabelText('Open navigation menu');
      await user.click(menuButton);

      // After clicking, the button label should change to close
      expect(within(header).getByLabelText('Close navigation menu')).toBeInTheDocument();
    });
  });

  describe('ThemeProvider integration', () => {
    it('wraps the dashboard in a ThemeProvider', () => {
      // If ThemeProvider is not present, components using useTheme would throw
      // The fact that the component renders without error proves ThemeProvider is present
      render(<DashboardContainer />);

      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  describe('section ordering', () => {
    it('renders sections in the correct order', () => {
      render(<DashboardContainer />);

      const main = screen.getByRole('main');
      const sectionTitles = [
        'Executive CIO Scorecard',
        'IT Financial Overview',
        'License Spend Split',
        'Vendor Spend',
        'Supplier Spend',
        'Mid-Term Plan Progress',
        'Top 3 Transformation Programs',
        'Transformation Progress Against Budget',
        'Manpower Cost',
      ];

      // Get all heading elements within main that match section titles
      const headings = within(main).getAllByRole('heading', { level: 2 });
      const headingTexts = headings.map((h) => h.textContent);

      // Verify each section title appears and in the correct relative order
      let lastIndex = -1;
      sectionTitles.forEach((title) => {
        const index = headingTexts.indexOf(title);
        expect(index).toBeGreaterThan(lastIndex);
        lastIndex = index;
      });
    });
  });

  describe('edge cases', () => {
    it('renders without crashing when no className is provided', () => {
      render(<DashboardContainer />);

      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders without crashing with empty className', () => {
      render(<DashboardContainer className="" />);

      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders the Canon India branding in the sidebar', () => {
      render(<DashboardContainer />);

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(within(nav).getByText('Canon India')).toBeInTheDocument();
      expect(within(nav).getByText('IT Executive Dashboard')).toBeInTheDocument();
    });

    it('renders the Dashboard Modules label in the sidebar', () => {
      render(<DashboardContainer />);

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(within(nav).getByText('Dashboard Modules')).toBeInTheDocument();
    });
  });

  describe('scroll-based active section tracking', () => {
    it('registers a scroll event listener on mount', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      render(<DashboardContainer />);

      const scrollCalls = addEventListenerSpy.mock.calls.filter(
        ([event]) => event === 'scroll'
      );
      expect(scrollCalls.length).toBeGreaterThanOrEqual(1);
    });

    it('removes the scroll event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = render(<DashboardContainer />);
      unmount();

      const scrollCalls = removeEventListenerSpy.mock.calls.filter(
        ([event]) => event === 'scroll'
      );
      expect(scrollCalls.length).toBeGreaterThanOrEqual(1);
    });
  });
});