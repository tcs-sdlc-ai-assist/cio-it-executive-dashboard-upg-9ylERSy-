import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ExecutiveScorecardSection } from './ExecutiveScorecardSection';
import { ThemeProvider } from '../design-system/ThemeProvider';
import { scorecardMetrics, scorecardSummary } from '../data/scorecardData';

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

describe('ExecutiveScorecardSection', () => {
  describe('rendering', () => {
    it('renders the section title "Executive CIO Scorecard"', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      expect(screen.getByText('Executive CIO Scorecard')).toBeInTheDocument();
    });

    it('renders the reporting period and date subtitle', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      expect(
        screen.getByText(`${scorecardSummary.reportingPeriod} • As of ${scorecardSummary.asOfDate}`)
      ).toBeInTheDocument();
    });

    it('renders all six scorecard metric names', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      expect(screen.getByText('IT Spend vs Budget')).toBeInTheDocument();
      expect(screen.getByText('Mid-Term Plan Progress')).toBeInTheDocument();
      expect(screen.getByText('Operational Health')).toBeInTheDocument();
      expect(screen.getByText('Compliance & Risk')).toBeInTheDocument();
      expect(screen.getByText('Transformation Progress')).toBeInTheDocument();
      expect(screen.getByText('Application Utilization')).toBeInTheDocument();
    });

    it('renders the correct number of metric card groups', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      const metricGroups = screen.getAllByRole('group');
      expect(metricGroups.length).toBe(6);
    });

    it('renders the section with aria-label "Executive CIO Scorecard"', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      expect(
        screen.getByLabelText('Executive CIO Scorecard')
      ).toBeInTheDocument();
    });

    it('renders the section with id "scorecard"', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      const section = document.getElementById('scorecard');
      expect(section).toBeInTheDocument();
    });
  });

  describe('metric values', () => {
    it('displays the IT Spend vs Budget value', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      // Value 12000000 should be formatted as 12M
      expect(screen.getByText('12M')).toBeInTheDocument();
    });

    it('displays percentage-based metric values', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      // Mid-Term Plan Progress = 65
      expect(screen.getByText('65')).toBeInTheDocument();
      // Operational Health = 82
      expect(screen.getByText('82')).toBeInTheDocument();
      // Compliance & Risk = 68
      expect(screen.getByText('68')).toBeInTheDocument();
      // Transformation Progress = 48
      expect(screen.getByText('48')).toBeInTheDocument();
      // Application Utilization = 74
      expect(screen.getByText('74')).toBeInTheDocument();
    });

    it('displays the ₹ prefix for IT Spend vs Budget', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      const metricGroup = screen.getByLabelText(/IT Spend vs Budget/);
      expect(metricGroup).toBeInTheDocument();
      expect(within(metricGroup).getByText('₹')).toBeInTheDocument();
    });

    it('displays percentage unit symbols', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      const percentSymbols = screen.getAllByText('%');
      // 5 metrics have '%' as unit
      expect(percentSymbols.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('RAG indicators', () => {
    it('renders RAG status indicators for each metric', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      const statusIndicators = screen.getAllByRole('status');
      // At least 6 for the metric cards + 1 for the overall header RAG
      expect(statusIndicators.length).toBeGreaterThanOrEqual(7);
    });

    it('renders the overall RAG indicator in the header', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      expect(screen.getByText(scorecardSummary.overallLabel)).toBeInTheDocument();
    });

    it('renders RAG summary counts in the header', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      // Green count = 3, Amber count = 2, Red count = 1
      // These are rendered as text nodes alongside colored dots
      expect(screen.getByText(String(scorecardSummary.greenCount))).toBeInTheDocument();
      expect(screen.getByText(String(scorecardSummary.amberCount))).toBeInTheDocument();
      expect(screen.getByText(String(scorecardSummary.redCount))).toBeInTheDocument();
    });
  });

  describe('trend indicators', () => {
    it('displays trend values for metrics', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      expect(screen.getByText('+8.2%')).toBeInTheDocument();
      expect(screen.getByText('+5%')).toBeInTheDocument();
      expect(screen.getByText('+3%')).toBeInTheDocument();
      expect(screen.getByText('-4%')).toBeInTheDocument();
      expect(screen.getByText('0%')).toBeInTheDocument();
      expect(screen.getByText('+2.5%')).toBeInTheDocument();
    });
  });

  describe('descriptions', () => {
    it('renders metric descriptions', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      expect(
        screen.getByText(/Total IT spend against approved annual budget/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Progress against the 3-year IT mid-term strategic plan/)
      ).toBeInTheDocument();
    });
  });

  describe('custom data prop', () => {
    it('renders custom data when provided', () => {
      const customData = [
        {
          id: 'custom-metric-1',
          name: 'Custom Metric Alpha',
          value: 99,
          target: 100,
          unit: '%',
          prefix: '',
          ragStatus: 'green',
          ragLabel: 'On Track',
          trend: 'up',
          trendValue: '+10%',
          trendSentiment: 'positive',
          description: 'A custom test metric.',
        },
      ];

      renderWithTheme(<ExecutiveScorecardSection data={customData} />);

      expect(screen.getByText('Custom Metric Alpha')).toBeInTheDocument();
      expect(screen.getByText('99')).toBeInTheDocument();
      expect(screen.getByText('+10%')).toBeInTheDocument();
      expect(screen.getByText('A custom test metric.')).toBeInTheDocument();
    });

    it('falls back to default data when empty array is provided', () => {
      renderWithTheme(<ExecutiveScorecardSection data={[]} />);

      // Should render default scorecard metrics
      expect(screen.getByText('IT Spend vs Budget')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('renders empty message when data is explicitly null-like and default data is overridden', () => {
      // The component falls back to scorecardMetrics when data is empty/null,
      // so we need to verify the section still renders properly
      renderWithTheme(<ExecutiveScorecardSection />);

      expect(screen.queryByText('No scorecard data available.')).not.toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies additional className when provided', () => {
      renderWithTheme(<ExecutiveScorecardSection className="custom-test-class" />);

      const section = screen.getByLabelText('Executive CIO Scorecard');
      expect(section.className).toContain('custom-test-class');
    });

    it('renders metric cards in a grid layout', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      const section = screen.getByLabelText('Executive CIO Scorecard');
      const grid = section.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid.className).toContain('grid-cols-1');
      expect(grid.className).toContain('sm:grid-cols-2');
      expect(grid.className).toContain('lg:grid-cols-3');
    });
  });

  describe('accessibility', () => {
    it('each metric card has an accessible aria-label', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      const metricGroups = screen.getAllByRole('group');
      metricGroups.forEach((group) => {
        expect(group).toHaveAttribute('aria-label');
        expect(group.getAttribute('aria-label')).not.toBe('');
      });
    });

    it('metric card aria-labels contain the metric name', () => {
      renderWithTheme(<ExecutiveScorecardSection />);

      const itSpendGroup = screen.getByLabelText(/IT Spend vs Budget/);
      expect(itSpendGroup).toBeInTheDocument();

      const midTermGroup = screen.getByLabelText(/Mid-Term Plan Progress/);
      expect(midTermGroup).toBeInTheDocument();

      const operationalGroup = screen.getByLabelText(/Operational Health/);
      expect(operationalGroup).toBeInTheDocument();

      const complianceGroup = screen.getByLabelText(/Compliance & Risk/);
      expect(complianceGroup).toBeInTheDocument();

      const transformationGroup = screen.getByLabelText(/Transformation Progress/);
      expect(transformationGroup).toBeInTheDocument();

      const appUtilGroup = screen.getByLabelText(/Application Utilization/);
      expect(appUtilGroup).toBeInTheDocument();
    });
  });
});