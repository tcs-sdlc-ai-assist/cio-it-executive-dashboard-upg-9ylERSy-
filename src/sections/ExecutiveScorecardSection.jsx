import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { scorecardMetrics, scorecardSummary } from '../data/scorecardData';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';

/**
 * ExecutiveScorecardSection - Executive CIO Scorecard dashboard section (FR-001).
 *
 * Renders a grid of MetricCard components for each scorecard metric:
 * IT Spend vs Budget, Mid-Term Plan Progress, Operational Health,
 * Compliance Risk, Transformation Progress, Application Utilization.
 * Each card displays the metric value, target, RAG status indicator,
 * trend direction, and description. Wrapped in SectionCard with
 * title 'Executive CIO Scorecard'.
 *
 * @param {Object} props
 * @param {Array<Object>} [props.data] - Optional scorecard metrics data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function ExecutiveScorecardSection({ data, className = '' }) {
  const metrics = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return scorecardMetrics;
  }, [data]);

  const summary = useMemo(() => {
    return scorecardSummary;
  }, []);

  if (!metrics || metrics.length === 0) {
    return (
      <SectionCard
        title="Executive CIO Scorecard"
        subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
        className={className}
        ariaLabel="Executive CIO Scorecard"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No scorecard data available.
        </p>
      </SectionCard>
    );
  }

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full bg-success"
            aria-hidden="true"
          />
          {summary.greenCount}
        </span>
        <span className="flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full bg-warning"
            aria-hidden="true"
          />
          {summary.amberCount}
        </span>
        <span className="flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full bg-danger"
            aria-hidden="true"
          />
          {summary.redCount}
        </span>
      </div>
      <RAGIndicator
        status={summary.overallStatus}
        label={summary.overallLabel}
        size="sm"
      />
    </div>
  );

  return (
    <SectionCard
      title="Executive CIO Scorecard"
      subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="Executive CIO Scorecard"
      headerRight={headerRight}
      id="scorecard"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.name}
            value={metric.value}
            unit={metric.unit}
            prefix={metric.prefix}
            trend={metric.trend}
            trendValue={metric.trendValue}
            trendSentiment={metric.trendSentiment}
            ragStatus={metric.ragStatus}
            ragLabel={metric.ragLabel}
            description={metric.description}
            size="md"
          />
        ))}
      </div>
    </SectionCard>
  );
}

ExecutiveScorecardSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      target: PropTypes.number,
      unit: PropTypes.string,
      prefix: PropTypes.string,
      ragStatus: PropTypes.oneOf(['red', 'amber', 'green']),
      ragLabel: PropTypes.string,
      trend: PropTypes.oneOf(['up', 'down', 'flat']),
      trendValue: PropTypes.string,
      trendSentiment: PropTypes.oneOf(['positive', 'negative', 'neutral']),
      description: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default ExecutiveScorecardSection;