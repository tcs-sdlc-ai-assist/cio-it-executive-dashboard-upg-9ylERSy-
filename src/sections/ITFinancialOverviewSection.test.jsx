import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ITFinancialOverviewSection } from './ITFinancialOverviewSection';
import { ThemeProvider } from '../design-system/ThemeProvider';
import { financialSummary, financialKPIs } from '../data/financialData';

/**
 * Helper to render component wrapped in ThemeProvider.
 * @param {React.ReactElement} ui - Component to render
 * @returns {import('@testing-library/react').RenderResult}
 */
function renderWithTheme(ui) {
  return render(
    <ThemeProvider initialTheme="light">
      {ui}
    </ThemeProvider>
  );
}

// Mock ResizeObserver for chart components
beforeEach(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ITFinancialOverviewSection', () => {
  describe('rendering', () => {
    it('renders the section title "IT Financial Overview"', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText('IT Financial Overview')).toBeInTheDocument();
    });

    it('renders the reporting period and date subtitle', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(
        screen.getByText(`${financialSummary.reportingPeriod} • As of ${financialSummary.asOfDate}`)
      ).toBeInTheDocument();
    });

    it('renders the section with aria-label "IT Financial Overview"', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(
        screen.getByLabelText('IT Financial Overview')
      ).toBeInTheDocument();
    });

    it('renders the section with id "financial"', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      const section = document.getElementById('financial');
      expect(section).toBeInTheDocument();
    });
  });

  describe('financial metric cards', () => {
    it('renders all five financial KPI metric names', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText('Total IT Spend (YTD)')).toBeInTheDocument();
      expect(screen.getByText('Budget Utilization')).toBeInTheDocument();
      expect(screen.getByText('Run Spend Ratio')).toBeInTheDocument();
      expect(screen.getByText('Change Spend Ratio')).toBeInTheDocument();
      expect(screen.getByText('Forecast Accuracy')).toBeInTheDocument();
    });

    it('renders the correct number of metric card groups', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      const metricGroups = screen.getAllByRole('group');
      // 5 KPI metric cards
      expect(metricGroups.length).toBeGreaterThanOrEqual(5);
    });

    it('displays trend values for financial KPIs', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText('+8.2%')).toBeInTheDocument();
      expect(screen.getByText('+1.2%')).toBeInTheDocument();
    });

    it('displays KPI descriptions', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(
        screen.getByText(/Year-to-date IT spend against annual budget/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Percentage of annual budget consumed year-to-date/)
      ).toBeInTheDocument();
    });
  });

  describe('variance percentage display', () => {
    it('displays the variance percentage in the header', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      // Variance label
      expect(screen.getByText('Variance:')).toBeInTheDocument();
    });

    it('displays the correct variance percentage value', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      // financialSummary.variancePercentage is 20, displayed as +20%
      expect(screen.getByText('+20%')).toBeInTheDocument();
    });

    it('renders the overall RAG indicator in the header', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText(financialSummary.ragLabel)).toBeInTheDocument();
    });
  });

  describe('budget utilization progress bar', () => {
    it('renders the Budget Utilization progress bar', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      const progressBars = screen.getAllByRole('progressbar');
      expect(progressBars.length).toBeGreaterThanOrEqual(1);

      // Budget utilization = actuals / budget * 100 = 12000000 / 15000000 * 100 = 80
      const budgetUtilBar = screen.getByLabelText('Budget Utilization');
      expect(budgetUtilBar).toBeInTheDocument();
      expect(budgetUtilBar).toHaveAttribute('aria-valuenow', '80');
    });
  });

  describe('charts', () => {
    it('renders the Budget vs Actual bar chart container', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(
        screen.getByLabelText('Monthly budget versus actual spend bar chart')
      ).toBeInTheDocument();
    });

    it('renders the Budget vs Actual chart title', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText('Budget vs Actual (Monthly)')).toBeInTheDocument();
    });

    it('renders the Run vs Change donut chart container', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(
        screen.getByLabelText('Run versus change spend distribution donut chart')
      ).toBeInTheDocument();
    });

    it('renders the Run vs Change chart title', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText('Run vs Change Spend')).toBeInTheDocument();
    });
  });

  describe('spend by category breakdown', () => {
    it('renders the Spend by Category heading', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText('Spend by Category')).toBeInTheDocument();
    });

    it('renders all spend category names', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText('Infrastructure')).toBeInTheDocument();
      expect(screen.getByText('Applications')).toBeInTheDocument();
      expect(screen.getByText('Personnel')).toBeInTheDocument();
      expect(screen.getByText('Security')).toBeInTheDocument();
      expect(screen.getByText('Innovation')).toBeInTheDocument();
    });

    it('renders progress bars for each category', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      // Multiple progress bars: 1 budget utilization + 5 categories + any from KPI cards
      const progressBars = screen.getAllByRole('progressbar');
      expect(progressBars.length).toBeGreaterThanOrEqual(6);
    });

    it('renders utilization percentages for categories', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      // Infrastructure: 4200000 / 5000000 * 100 = 84%
      expect(screen.getByText('84%')).toBeInTheDocument();
      // Applications: 3100000 / 3500000 * 100 = 89%
      expect(screen.getByText('89%')).toBeInTheDocument();
      // Personnel: 2800000 / 3000000 * 100 = 93%
      expect(screen.getByText('93%')).toBeInTheDocument();
    });
  });

  describe('RAG indicators', () => {
    it('renders RAG status indicators for KPI metrics', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      const statusIndicators = screen.getAllByRole('status');
      // At least 5 for KPI cards + 1 for header + category RAG indicators
      expect(statusIndicators.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('custom data prop', () => {
    it('renders custom summary data when provided', () => {
      const customData = {
        summary: {
          ...financialSummary,
          reportingPeriod: 'Q3 FY2024',
          asOfDate: '2024-09-15',
          variancePercentage: 15,
          ragStatus: 'green',
          ragLabel: 'On Track',
          totalITSpend: 10000000,
          budget: 15000000,
          actuals: 10000000,
        },
      };

      renderWithTheme(<ITFinancialOverviewSection data={customData} />);

      expect(
        screen.getByText('Q3 FY2024 • As of 2024-09-15')
      ).toBeInTheDocument();
      expect(screen.getByText('+15%')).toBeInTheDocument();
    });

    it('renders custom KPI data when provided', () => {
      const customData = {
        kpis: [
          {
            id: 'custom-kpi-1',
            name: 'Custom Financial KPI',
            value: 42,
            unit: '%',
            prefix: '',
            ragStatus: 'green',
            ragLabel: 'On Track',
            trend: 'up',
            trendValue: '+7%',
            trendSentiment: 'positive',
            description: 'A custom financial metric.',
          },
        ],
      };

      renderWithTheme(<ITFinancialOverviewSection data={customData} />);

      expect(screen.getByText('Custom Financial KPI')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('+7%')).toBeInTheDocument();
      expect(screen.getByText('A custom financial metric.')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies additional className when provided', () => {
      renderWithTheme(<ITFinancialOverviewSection className="custom-financial-class" />);

      const section = screen.getByLabelText('IT Financial Overview');
      expect(section.className).toContain('custom-financial-class');
    });

    it('renders KPI metric cards in a grid layout', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      const section = screen.getByLabelText('IT Financial Overview');
      const grids = section.querySelectorAll('.grid');
      expect(grids.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('accessibility', () => {
    it('each KPI metric card has an accessible aria-label', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      const metricGroups = screen.getAllByRole('group');
      metricGroups.forEach((group) => {
        expect(group).toHaveAttribute('aria-label');
        expect(group.getAttribute('aria-label')).not.toBe('');
      });
    });

    it('metric card aria-labels contain the metric name', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      const totalSpendGroup = screen.getByLabelText(/Total IT Spend/);
      expect(totalSpendGroup).toBeInTheDocument();

      const budgetUtilGroup = screen.getByLabelText(/Budget Utilization/);
      expect(budgetUtilGroup).toBeInTheDocument();
    });

    it('chart containers have accessible aria-labels', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(
        screen.getByLabelText('Monthly budget versus actual spend bar chart')
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('Run versus change spend distribution donut chart')
      ).toBeInTheDocument();
    });

    it('charts have role="img"', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      const chartImages = screen.getAllByRole('img');
      expect(chartImages.length).toBeGreaterThanOrEqual(2);
    });

    it('charts include accessible data tables for screen readers', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      // Bar chart and donut chart both render sr-only tables
      const tables = screen.getAllByRole('table');
      expect(tables.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('edge cases', () => {
    it('renders with default data when no data prop is provided', () => {
      renderWithTheme(<ITFinancialOverviewSection />);

      expect(screen.getByText('IT Financial Overview')).toBeInTheDocument();
      expect(screen.getByText('Total IT Spend (YTD)')).toBeInTheDocument();
    });

    it('renders with partial custom data, falling back to defaults for missing fields', () => {
      const partialData = {
        summary: financialSummary,
        // kpis, monthlyBudgetVsActual, etc. not provided — should fall back to defaults
      };

      renderWithTheme(<ITFinancialOverviewSection data={partialData} />);

      expect(screen.getByText('IT Financial Overview')).toBeInTheDocument();
      expect(screen.getByText('Total IT Spend (YTD)')).toBeInTheDocument();
      expect(screen.getByText('Budget vs Actual (Monthly)')).toBeInTheDocument();
    });
  });
});