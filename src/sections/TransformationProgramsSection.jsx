import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { BarChart } from '../components/visualizations/BarChart';
import { DonutChart } from '../components/visualizations/DonutChart';
import { ProgressBar } from '../components/visualizations/ProgressBar';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';
import {
  transformationPrograms,
  transformationProgramSummary,
  transformationProgramKPIs,
  programBarChartData,
  programDonutChartData,
  totalProgramBudget,
  totalProgramSpend,
  totalProgramBenefitsRealized,
  totalProgramBenefitsTarget,
  overallProgramBenefitsPercentage,
  overallMilestoneProgress,
} from '../data/transformationProgramsData';
import { formatCurrency } from '../utils/formatters';

/**
 * TransformationProgramsSection - Top 3 Transformation Programs dashboard section (FR-007).
 *
 * Renders 3 program status cards, each displaying Program Name, Budget,
 * Actual Spend, Milestone Progress (ProgressBar), Benefits Realized,
 * Key Risks list, and RAG status. Cards are visually distinct with
 * Canon India card styling. Includes KPI metric cards and charts for
 * budget vs actual comparison and spend distribution.
 * Wrapped in SectionCard with title 'Top 3 Transformation Programs'.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional transformation programs data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function TransformationProgramsSection({ data, className = '' }) {
  const summary = useMemo(() => {
    if (data && data.summary) {
      return data.summary;
    }
    return transformationProgramSummary;
  }, [data]);

  const kpis = useMemo(() => {
    if (data && Array.isArray(data.kpis) && data.kpis.length > 0) {
      return data.kpis;
    }
    return transformationProgramKPIs;
  }, [data]);

  const programs = useMemo(() => {
    if (data && Array.isArray(data.programs) && data.programs.length > 0) {
      return data.programs;
    }
    return transformationPrograms;
  }, [data]);

  const barData = useMemo(() => {
    if (data && Array.isArray(data.barChartData) && data.barChartData.length > 0) {
      return data.barChartData;
    }
    return programBarChartData;
  }, [data]);

  const donutData = useMemo(() => {
    if (data && Array.isArray(data.donutChartData) && data.donutChartData.length > 0) {
      return data.donutChartData;
    }
    return programDonutChartData;
  }, [data]);

  const resolvedTotalSpend = useMemo(() => {
    if (data && data.totalSpend != null) {
      return data.totalSpend;
    }
    return totalProgramSpend;
  }, [data]);

  if (!summary) {
    return (
      <SectionCard
        title="Top 3 Transformation Programs"
        className={className}
        ariaLabel="Top 3 Transformation Programs"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No transformation program data available.
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
      title="Top 3 Transformation Programs"
      subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="Top 3 Transformation Programs"
      headerRight={headerRight}
      id="transformation-programs"
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

      {/* Overall Milestone Progress */}
      <div className="mb-6">
        <ProgressBar
          value={summary.overallMilestoneProgress}
          label="Overall Milestone Progress"
          color={summary.overallMilestoneProgress >= 60 ? 'success' : summary.overallMilestoneProgress >= 40 ? 'warning' : 'danger'}
          size="lg"
          showValue
          animate
          valuePosition="outside"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Bar Chart - Budget vs Actual Spend */}
        <div className="lg:col-span-2">
          <BarChart
            data={barData}
            xKey="program"
            yKeys={['budget', 'actualSpend']}
            labels={['Budget', 'Actual Spend']}
            colors={['#6C757D', '#E60012']}
            title="Budget vs Actual Spend by Program"
            ariaLabel="Transformation program budget versus actual spend bar chart"
            ariaDescription="Grouped bar chart comparing approved budget against actual spend for each of the top 3 transformation programs."
            mode="grouped"
            xAxisLabel="Program"
            yAxisLabel="Amount (₹)"
            height={300}
            showLegend
            showTooltip
            animate
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>

        {/* Donut Chart - Spend Distribution */}
        <div className="lg:col-span-1">
          <DonutChart
            data={donutData}
            title="Spend Distribution"
            ariaLabel="Transformation program spend distribution donut chart"
            ariaDescription="Donut chart showing the distribution of actual spend across the top 3 transformation programs."
            height={300}
            innerRadiusRatio={0.55}
            showLegend
            showTooltip
            showLabels
            animate
            centerLabel="Total Spend"
            centerValue={resolvedTotalSpend}
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>
      </div>

      {/* Program Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {programs.map((program) => {
          const milestoneColor = program.ragStatus === 'green'
            ? 'success'
            : program.ragStatus === 'amber'
              ? 'warning'
              : 'danger';

          const benefitsColor = program.benefitsPercentage >= 60
            ? 'success'
            : program.benefitsPercentage >= 30
              ? 'warning'
              : 'danger';

          const spendPercent = program.budget > 0
            ? Math.round((program.actualSpend / program.budget) * 100)
            : 0;

          const spendColor = spendPercent <= 70
            ? 'success'
            : spendPercent <= 90
              ? 'warning'
              : 'danger';

          return (
            <div
              key={program.id}
              className="bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col"
              role="group"
              aria-label={`${program.programName} - ${program.ragLabel}`}
            >
              {/* Program Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-sm font-bold text-canon-black leading-tight">
                  {program.programName}
                </h3>
                <RAGIndicator
                  status={program.ragStatus}
                  label={program.ragLabel}
                  size="sm"
                  showDot
                  showIcon
                  showLabel={false}
                />
              </div>

              {/* RAG Label */}
              <div className="mb-3">
                <RAGIndicator
                  status={program.ragStatus}
                  label={program.ragLabel}
                  size="sm"
                  showDot={false}
                  showIcon={false}
                  showLabel
                />
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mb-4 leading-snug line-clamp-2">
                {program.description}
              </p>

              {/* Owner & Dates */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs text-gray-400">
                <span>Owner: <span className="text-canon-black font-medium">{program.owner}</span></span>
                <span>Target: <span className="text-canon-black font-medium">{program.targetEndDate}</span></span>
              </div>

              {/* Budget & Spend */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-0.5">Budget</span>
                  <span className="text-sm font-bold text-canon-black">
                    {formatCurrency(program.budget, { abbreviate: true, showSymbol: true })}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-0.5">Actual Spend</span>
                  <span className="text-sm font-bold text-canon-black">
                    {formatCurrency(program.actualSpend, { abbreviate: true, showSymbol: true })}
                  </span>
                </div>
              </div>

              {/* Budget Utilization */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-canon-black">
                    Budget Utilization
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatCurrency(program.spendVariance, { abbreviate: true, showSymbol: true })} remaining
                  </span>
                </div>
                <ProgressBar
                  value={spendPercent}
                  color={spendColor}
                  size="sm"
                  showValue
                  animate
                  valuePosition="outside"
                />
              </div>

              {/* Milestone Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-canon-black">
                    Milestone Progress
                  </span>
                  <span className="text-xs text-gray-500">
                    {program.completedMilestones} / {program.totalMilestones} milestones
                  </span>
                </div>
                <ProgressBar
                  value={program.milestoneProgress}
                  color={milestoneColor}
                  size="sm"
                  showValue
                  animate
                  valuePosition="outside"
                />
              </div>

              {/* Benefits Realized */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-canon-black">
                    Benefits Realized
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatCurrency(program.benefitsRealized, { abbreviate: true, showSymbol: true })}
                    {' / '}
                    {formatCurrency(program.benefitsTarget, { abbreviate: true, showSymbol: true })}
                  </span>
                </div>
                <ProgressBar
                  value={program.benefitsPercentage}
                  color={benefitsColor}
                  size="sm"
                  showValue
                  animate
                  valuePosition="outside"
                />
              </div>

              {/* Key Risks */}
              {program.keyRisks && program.keyRisks.length > 0 && (
                <div className="mt-auto">
                  <h4 className="text-xs font-semibold text-canon-black mb-2">
                    Key Risks ({program.keyRisks.length})
                  </h4>
                  <ul className="space-y-1.5">
                    {program.keyRisks.map((risk, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-1.5 text-xs text-gray-600 leading-snug"
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full bg-danger mt-1 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

TransformationProgramsSection.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.object,
    kpis: PropTypes.arrayOf(PropTypes.object),
    programs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        programName: PropTypes.string.isRequired,
        budget: PropTypes.number,
        actualSpend: PropTypes.number,
        spendVariance: PropTypes.number,
        spendVariancePercent: PropTypes.number,
        milestoneProgress: PropTypes.number,
        totalMilestones: PropTypes.number,
        completedMilestones: PropTypes.number,
        benefitsRealized: PropTypes.number,
        benefitsTarget: PropTypes.number,
        benefitsPercentage: PropTypes.number,
        keyRisks: PropTypes.arrayOf(PropTypes.string),
        ragStatus: PropTypes.oneOf(['red', 'amber', 'green']),
        ragLabel: PropTypes.string,
        owner: PropTypes.string,
        startDate: PropTypes.string,
        targetEndDate: PropTypes.string,
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
    totalSpend: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default TransformationProgramsSection;