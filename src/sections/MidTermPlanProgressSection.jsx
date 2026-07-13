import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { ProgressBar } from '../components/visualizations/ProgressBar';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';
import { BarChart } from '../components/visualizations/BarChart';
import { DonutChart } from '../components/visualizations/DonutChart';
import {
  strategicPillars,
  midTermPlanSummary,
  midTermPlanKPIs,
  pillarBarChartData,
  benefitsDonutChartData,
  totalBenefitsRealized,
  totalBenefitsTarget,
} from '../data/midTermPlanData';
import { formatCurrency } from '../utils/formatters';

/**
 * MidTermPlanProgressSection - Mid-Term Plan Progress dashboard section (FR-006).
 *
 * Renders a list of strategic pillars, each with a ProgressBar showing
 * completion percentage, target milestones, completed milestones, and
 * benefits realized. Includes RAG status for each pillar and KPI metric
 * cards for overall plan progress. Displays a BarChart for milestone
 * completion and a DonutChart for benefits realization distribution.
 * Wrapped in SectionCard with title 'Mid-Term Plan Progress'.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional mid-term plan data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function MidTermPlanProgressSection({ data, className = '' }) {
  const summary = useMemo(() => {
    if (data && data.summary) {
      return data.summary;
    }
    return midTermPlanSummary;
  }, [data]);

  const kpis = useMemo(() => {
    if (data && Array.isArray(data.kpis) && data.kpis.length > 0) {
      return data.kpis;
    }
    return midTermPlanKPIs;
  }, [data]);

  const pillars = useMemo(() => {
    if (data && Array.isArray(data.pillars) && data.pillars.length > 0) {
      return data.pillars;
    }
    return strategicPillars;
  }, [data]);

  const barData = useMemo(() => {
    if (data && Array.isArray(data.barChartData) && data.barChartData.length > 0) {
      return data.barChartData;
    }
    return pillarBarChartData;
  }, [data]);

  const donutData = useMemo(() => {
    if (data && Array.isArray(data.donutChartData) && data.donutChartData.length > 0) {
      return data.donutChartData;
    }
    return benefitsDonutChartData;
  }, [data]);

  const resolvedTotalBenefitsRealized = useMemo(() => {
    if (data && data.totalBenefitsRealized != null) {
      return data.totalBenefitsRealized;
    }
    return totalBenefitsRealized;
  }, [data]);

  const resolvedTotalBenefitsTarget = useMemo(() => {
    if (data && data.totalBenefitsTarget != null) {
      return data.totalBenefitsTarget;
    }
    return totalBenefitsTarget;
  }, [data]);

  const overallBenefitsPercent = useMemo(() => {
    if (resolvedTotalBenefitsTarget === 0) return 0;
    return Math.round((resolvedTotalBenefitsRealized / resolvedTotalBenefitsTarget) * 100);
  }, [resolvedTotalBenefitsRealized, resolvedTotalBenefitsTarget]);

  if (!summary) {
    return (
      <SectionCard
        title="Mid-Term Plan Progress"
        className={className}
        ariaLabel="Mid-Term Plan Progress"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No mid-term plan data available.
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
      title="Mid-Term Plan Progress"
      subtitle={`${summary.planHorizon} • ${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="Mid-Term Plan Progress"
      headerRight={headerRight}
      id="transformation"
    >
      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {kpis.map((kpi) => (
          <MetricCard
            key={kpi.id}
            label={kpi.name}
            value={kpi.value}
            unit={kpi.unit}
            prefix={kpi.prefix}
            trend={kpi.trend}
            trendValue={kpi.trendValue}
            trendSentiment={kpi.trendSentiment}
            ragStatus={kpi.ragStatus}
            ragLabel={kpi.ragLabel}
            description={kpi.description}
            size="sm"
          />
        ))}
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <ProgressBar
          value={summary.overallProgressPercentage}
          label="Overall Plan Progress"
          color={summary.overallProgressPercentage >= 60 ? 'success' : summary.overallProgressPercentage >= 40 ? 'warning' : 'danger'}
          size="lg"
          showValue
          animate
          valuePosition="outside"
        />
      </div>

      {/* Benefits Realization Tracker */}
      <div className="mb-6 bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold text-canon-black">
            Benefits Realization Tracker
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>
              Realized: {formatCurrency(resolvedTotalBenefitsRealized, { abbreviate: true, showSymbol: true })}
            </span>
            <span className="text-gray-300">|</span>
            <span>
              Target: {formatCurrency(resolvedTotalBenefitsTarget, { abbreviate: true, showSymbol: true })}
            </span>
          </div>
        </div>
        <ProgressBar
          value={overallBenefitsPercent}
          label={`Benefits Achievement: ${overallBenefitsPercent}%`}
          color={overallBenefitsPercent >= 60 ? 'success' : overallBenefitsPercent >= 40 ? 'warning' : 'danger'}
          size="md"
          showValue
          animate
          valuePosition="outside"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Bar Chart - Milestone Completion */}
        <div className="lg:col-span-2">
          <BarChart
            data={barData}
            xKey="pillar"
            yKeys={['completed', 'remaining']}
            labels={['Completed', 'Remaining']}
            colors={['#28A745', '#E5E7EB']}
            title="Milestone Completion by Pillar"
            ariaLabel="Milestone completion by strategic pillar bar chart"
            ariaDescription="Stacked bar chart showing completed and remaining milestones for each strategic pillar of the mid-term plan."
            mode="stacked"
            xAxisLabel="Strategic Pillar"
            yAxisLabel="Milestones"
            height={300}
            showLegend
            showTooltip
            animate
          />
        </div>

        {/* Donut Chart - Benefits Distribution */}
        <div className="lg:col-span-1">
          <DonutChart
            data={donutData}
            title="Benefits Realized by Pillar"
            ariaLabel="Benefits realized by strategic pillar donut chart"
            ariaDescription="Donut chart showing the distribution of benefits realized across strategic pillars of the mid-term plan."
            height={300}
            innerRadiusRatio={0.55}
            showLegend
            showTooltip
            showLabels
            animate
            centerLabel="Total"
            centerValue={resolvedTotalBenefitsRealized}
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>
      </div>

      {/* Strategic Pillars List */}
      <div className="bg-canon-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-canon-black">
            Strategic Pillars
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {pillars.map((pillar) => {
            const progressColor = pillar.ragStatus === 'green'
              ? 'success'
              : pillar.ragStatus === 'amber'
                ? 'warning'
                : 'danger';

            const benefitsColor = pillar.benefitsPercentage >= 60
              ? 'success'
              : pillar.benefitsPercentage >= 30
                ? 'warning'
                : 'danger';

            return (
              <div
                key={pillar.id}
                className="px-4 py-4"
                role="group"
                aria-label={`${pillar.pillarName} - ${pillar.ragLabel}`}
              >
                {/* Pillar Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <RAGIndicator
                      status={pillar.ragStatus}
                      label={pillar.ragLabel}
                      size="sm"
                      showDot
                      showIcon
                      showLabel={false}
                    />
                    <span className="text-sm font-semibold text-canon-black truncate">
                      {pillar.pillarName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-500">
                      Owner: {pillar.owner}
                    </span>
                    <RAGIndicator
                      status={pillar.ragStatus}
                      label={pillar.ragLabel}
                      size="sm"
                      showDot={false}
                      showIcon={false}
                      showLabel
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 mb-3 leading-snug">
                  {pillar.description}
                </p>

                {/* Progress Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Milestone Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-canon-black">
                        Milestone Progress
                      </span>
                      <span className="text-xs text-gray-500">
                        {pillar.completedMilestones} / {pillar.targetMilestones} milestones
                      </span>
                    </div>
                    <ProgressBar
                      value={pillar.progressPercentage}
                      color={progressColor}
                      size="sm"
                      showValue
                      animate
                      valuePosition="outside"
                    />
                  </div>

                  {/* Benefits Realization */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-canon-black">
                        Benefits Realized
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatCurrency(pillar.benefitsRealized, { abbreviate: true, showSymbol: true })}
                        {' / '}
                        {formatCurrency(pillar.benefitsTarget, { abbreviate: true, showSymbol: true })}
                      </span>
                    </div>
                    <ProgressBar
                      value={pillar.benefitsPercentage}
                      color={benefitsColor}
                      size="sm"
                      showValue
                      animate
                      valuePosition="outside"
                    />
                  </div>
                </div>

                {/* Target Date */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    Target: {pillar.targetDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}

MidTermPlanProgressSection.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.object,
    kpis: PropTypes.arrayOf(PropTypes.object),
    pillars: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        pillarName: PropTypes.string.isRequired,
        targetMilestones: PropTypes.number,
        completedMilestones: PropTypes.number,
        progressPercentage: PropTypes.number,
        benefitsRealized: PropTypes.number,
        benefitsTarget: PropTypes.number,
        benefitsPercentage: PropTypes.number,
        ragStatus: PropTypes.oneOf(['red', 'amber', 'green']),
        ragLabel: PropTypes.string,
        owner: PropTypes.string,
        targetDate: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    barChartData: PropTypes.arrayOf(PropTypes.object),
    donutChartData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
        color: PropTypes.string,
      })
    ),
    totalBenefitsRealized: PropTypes.number,
    totalBenefitsTarget: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default MidTermPlanProgressSection;