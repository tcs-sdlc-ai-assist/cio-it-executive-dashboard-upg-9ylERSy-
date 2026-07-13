import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { LineChart } from '../components/visualizations/LineChart';
import { DonutChart } from '../components/visualizations/DonutChart';
import { BarChart } from '../components/visualizations/BarChart';
import { DataTable } from '../components/visualizations/DataTable';
import { ProgressBar } from '../components/visualizations/ProgressBar';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';
import {
  transformationBudgetSummary,
  transformationBudgetKPIs,
  burnRateLineChartData,
  burnRateBarChartData,
  programBudgetBreakdown,
  benefitRealizationBreakdown,
  benefitRealizationDonutData,
  budgetAllocationDonutData,
  quarterlyBudgetTracking,
} from '../data/transformationBudgetData';
import { formatCurrency } from '../utils/formatters';

/**
 * TransformationBudgetSection - Transformation Progress Against Budget dashboard section (FR-008).
 *
 * Displays Approved Budget, Actual Spend, Forecast to Complete, Variance,
 * and Benefit Realization as MetricCards. Renders a LineChart showing budget
 * burn-rate over time (cumulative planned vs actual vs forecast) and a
 * BarChart for monthly planned vs actual comparison. Includes a benefits
 * realization tracker (ProgressBar) and program budget breakdown DataTable.
 * Wrapped in SectionCard with title 'Transformation Progress Against Budget'.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional transformation budget data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function TransformationBudgetSection({ data, className = '' }) {
  const summary = useMemo(() => {
    if (data && data.summary) {
      return data.summary;
    }
    return transformationBudgetSummary;
  }, [data]);

  const kpis = useMemo(() => {
    if (data && Array.isArray(data.kpis) && data.kpis.length > 0) {
      return data.kpis;
    }
    return transformationBudgetKPIs;
  }, [data]);

  const burnRateData = useMemo(() => {
    if (data && Array.isArray(data.burnRateLineChartData) && data.burnRateLineChartData.length > 0) {
      return data.burnRateLineChartData;
    }
    return burnRateLineChartData;
  }, [data]);

  const barData = useMemo(() => {
    if (data && Array.isArray(data.burnRateBarChartData) && data.burnRateBarChartData.length > 0) {
      return data.burnRateBarChartData;
    }
    return burnRateBarChartData;
  }, [data]);

  const programBreakdown = useMemo(() => {
    if (data && Array.isArray(data.programBudgetBreakdown) && data.programBudgetBreakdown.length > 0) {
      return data.programBudgetBreakdown;
    }
    return programBudgetBreakdown;
  }, [data]);

  const benefitBreakdown = useMemo(() => {
    if (data && Array.isArray(data.benefitRealizationBreakdown) && data.benefitRealizationBreakdown.length > 0) {
      return data.benefitRealizationBreakdown;
    }
    return benefitRealizationBreakdown;
  }, [data]);

  const benefitDonutData = useMemo(() => {
    if (data && Array.isArray(data.benefitRealizationDonutData) && data.benefitRealizationDonutData.length > 0) {
      return data.benefitRealizationDonutData;
    }
    return benefitRealizationDonutData;
  }, [data]);

  const budgetDonutData = useMemo(() => {
    if (data && Array.isArray(data.budgetAllocationDonutData) && data.budgetAllocationDonutData.length > 0) {
      return data.budgetAllocationDonutData;
    }
    return budgetAllocationDonutData;
  }, [data]);

  const programBudgetColumns = useMemo(() => [
    {
      key: 'program',
      label: 'Program',
      sortable: true,
      align: 'left',
    },
    {
      key: 'approvedBudget',
      label: 'Approved Budget',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'actualSpend',
      label: 'Actual Spend',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'forecastToComplete',
      label: 'Forecast to Complete',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'variance',
      label: 'Variance',
      sortable: true,
      align: 'right',
      render: (value, row) => {
        const isPositive = value >= 0;
        const colorClass = isPositive ? 'text-success' : 'text-danger';
        return (
          <span className={`font-medium ${colorClass}`}>
            {isPositive ? '+' : ''}{formatCurrency(value, { abbreviate: true, showSymbol: true })}
            <span className="text-xs text-gray-400 ml-1">
              ({isPositive ? '+' : ''}{row.variancePercent}%)
            </span>
          </span>
        );
      },
    },
    {
      key: 'utilization',
      label: 'Utilization',
      sortable: true,
      align: 'right',
      render: (value) => {
        const color = value <= 70 ? 'success' : value <= 90 ? 'warning' : 'danger';
        return (
          <div className="flex items-center gap-2 justify-end">
            <div className="w-16">
              <ProgressBar
                value={value}
                color={color}
                size="sm"
                showValue={false}
                animate
              />
            </div>
            <span className="text-sm font-medium text-canon-black w-10 text-right">
              {value}%
            </span>
          </div>
        );
      },
    },
    {
      key: 'ragStatus',
      label: 'Status',
      sortable: true,
      align: 'center',
      render: (value) => (
        <RAGIndicator
          status={value}
          size="sm"
          showLabel={false}
          showDot
          showIcon
        />
      ),
    },
  ], []);

  const benefitColumns = useMemo(() => [
    {
      key: 'program',
      label: 'Program',
      sortable: true,
      align: 'left',
    },
    {
      key: 'benefitsTarget',
      label: 'Benefits Target',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'benefitsRealized',
      label: 'Benefits Realized',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'benefitsPercentage',
      label: 'Achievement',
      sortable: true,
      align: 'right',
      render: (value) => {
        const color = value >= 60 ? 'success' : value >= 30 ? 'warning' : 'danger';
        return (
          <div className="flex items-center gap-2 justify-end">
            <div className="w-16">
              <ProgressBar
                value={value}
                color={color}
                size="sm"
                showValue={false}
                animate
              />
            </div>
            <span className="text-sm font-medium text-canon-black w-10 text-right">
              {value}%
            </span>
          </div>
        );
      },
    },
    {
      key: 'ragStatus',
      label: 'Status',
      sortable: true,
      align: 'center',
      render: (value) => (
        <RAGIndicator
          status={value}
          size="sm"
          showLabel={false}
          showDot
          showIcon
        />
      ),
    },
  ], []);

  if (!summary) {
    return (
      <SectionCard
        title="Transformation Progress Against Budget"
        className={className}
        ariaLabel="Transformation Progress Against Budget"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No transformation budget data available.
        </p>
      </SectionCard>
    );
  }

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
        <span>Variance:</span>
        <span className={`font-semibold ${summary.variance >= 0 ? 'text-success' : 'text-danger'}`}>
          {summary.variance >= 0 ? '+' : ''}{summary.variancePercent}%
        </span>
      </div>
      <RAGIndicator
        status={summary.ragStatus}
        label={summary.ragLabel}
        size="sm"
      />
    </div>
  );

  return (
    <SectionCard
      title="Transformation Progress Against Budget"
      subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="Transformation Progress Against Budget"
      headerRight={headerRight}
      id="transformation-budget"
    >
      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
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

      {/* Budget Utilization Progress */}
      <div className="mb-6">
        <ProgressBar
          value={summary.budgetUtilization}
          label="Budget Utilization"
          color={summary.budgetUtilization <= 70 ? 'success' : summary.budgetUtilization <= 90 ? 'warning' : 'danger'}
          size="md"
          showValue
          animate
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
              Realized: {formatCurrency(summary.benefitsRealized, { abbreviate: true, showSymbol: true })}
            </span>
            <span className="text-gray-300">|</span>
            <span>
              Target: {formatCurrency(summary.benefitsTarget, { abbreviate: true, showSymbol: true })}
            </span>
          </div>
        </div>
        <ProgressBar
          value={summary.benefitsPercentage}
          label={`Benefits Achievement: ${summary.benefitsPercentage}%`}
          color={summary.benefitsPercentage >= 60 ? 'success' : summary.benefitsPercentage >= 30 ? 'warning' : 'danger'}
          size="lg"
          showValue
          animate
          valuePosition="outside"
        />
      </div>

      {/* Charts Row - Burn Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Line Chart - Cumulative Burn Rate (S-Curve) */}
        <div className="lg:col-span-2">
          <LineChart
            data={burnRateData}
            xKey="month"
            yKeys={['planned', 'actual', 'forecast']}
            labels={['Planned', 'Actual', 'Forecast']}
            colors={['#6C757D', '#E60012', '#FFC107']}
            title="Budget Burn-Rate (Cumulative)"
            ariaLabel="Transformation budget cumulative burn-rate line chart"
            ariaDescription="Line chart showing cumulative planned, actual, and forecasted spend over time for transformation programs, forming an S-curve visualization."
            xAxisLabel="Month"
            yAxisLabel="Cumulative Spend (₹)"
            height={300}
            showLegend
            showTooltip
            showDots
            showArea={false}
            animate
            curved
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>

        {/* Donut Chart - Benefits Realization */}
        <div className="lg:col-span-1">
          <DonutChart
            data={benefitDonutData}
            title="Benefits Realization"
            ariaLabel="Benefits realization donut chart"
            ariaDescription="Donut chart showing the proportion of benefits realized versus remaining target across all transformation programs."
            height={300}
            innerRadiusRatio={0.55}
            showLegend
            showTooltip
            showLabels
            animate
            centerLabel="Realized"
            centerValue={summary.benefitsPercentage + '%'}
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>
      </div>

      {/* Charts Row - Monthly & Budget Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Bar Chart - Monthly Planned vs Actual */}
        <div className="lg:col-span-2">
          <BarChart
            data={barData}
            xKey="month"
            yKeys={['planned', 'actual']}
            labels={['Planned', 'Actual']}
            colors={['#6C757D', '#E60012']}
            title="Monthly Planned vs Actual Spend"
            ariaLabel="Monthly planned versus actual transformation spend bar chart"
            ariaDescription="Grouped bar chart comparing monthly planned spend against actual spend for transformation programs through the current reporting period."
            mode="grouped"
            xAxisLabel="Month"
            yAxisLabel="Spend (₹)"
            height={300}
            showLegend
            showTooltip
            animate
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>

        {/* Donut Chart - Budget Allocation */}
        <div className="lg:col-span-1">
          <DonutChart
            data={budgetDonutData}
            title="Budget Allocation by Program"
            ariaLabel="Budget allocation by transformation program donut chart"
            ariaDescription="Donut chart showing the distribution of approved budget across transformation programs."
            height={300}
            innerRadiusRatio={0.55}
            showLegend
            showTooltip
            showLabels
            animate
            centerLabel="Total Budget"
            centerValue={summary.approvedBudget}
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>
      </div>

      {/* Program Budget Breakdown Table */}
      <div className="bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <h3 className="text-sm font-semibold text-canon-black mb-3">
          Program Budget Breakdown
        </h3>
        <DataTable
          columns={programBudgetColumns}
          data={programBreakdown}
          caption="Transformation program budget breakdown with approved budget, actual spend, forecast, variance, and utilization"
          defaultSortKey="approvedBudget"
          defaultSortDirection="desc"
          striped
          hoverable
          size="sm"
          rowKeyField="program"
        />
      </div>

      {/* Benefits Realization Breakdown Table */}
      <div className="bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-canon-black mb-3">
          Benefits Realization by Program
        </h3>
        <DataTable
          columns={benefitColumns}
          data={benefitBreakdown}
          caption="Benefits realization breakdown by transformation program with target, realized, and achievement percentage"
          defaultSortKey="benefitsPercentage"
          defaultSortDirection="desc"
          striped
          hoverable
          size="sm"
          rowKeyField="program"
        />
      </div>
    </SectionCard>
  );
}

TransformationBudgetSection.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.object,
    kpis: PropTypes.arrayOf(PropTypes.object),
    burnRateLineChartData: PropTypes.arrayOf(PropTypes.object),
    burnRateBarChartData: PropTypes.arrayOf(PropTypes.object),
    programBudgetBreakdown: PropTypes.arrayOf(PropTypes.object),
    benefitRealizationBreakdown: PropTypes.arrayOf(PropTypes.object),
    benefitRealizationDonutData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
        color: PropTypes.string,
      })
    ),
    budgetAllocationDonutData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
        color: PropTypes.string,
      })
    ),
  }),
  className: PropTypes.string,
};

export default TransformationBudgetSection;