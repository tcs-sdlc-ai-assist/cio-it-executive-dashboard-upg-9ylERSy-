import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { BarChart } from '../components/visualizations/BarChart';
import { DonutChart } from '../components/visualizations/DonutChart';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';
import { ProgressBar } from '../components/visualizations/ProgressBar';
import {
  financialSummary,
  financialKPIs,
  monthlyBudgetVsActual,
  spendByCategory,
  runVsChangeBreakdown,
} from '../data/financialData';
import { formatCurrency } from '../utils/formatters';

/**
 * ITFinancialOverviewSection - IT Financial Overview dashboard section (FR-002).
 *
 * Displays Total IT Spend, Budget, Actuals, Forecast, Variance, and
 * Run vs Change Spend as MetricCards. Renders a BarChart showing
 * Budget vs Actual by month and a DonutChart for Run vs Change split.
 * Includes variance percentage indicator and spend by category breakdown.
 * Wrapped in SectionCard with title 'IT Financial Overview'.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional financial data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function ITFinancialOverviewSection({ data, className = '' }) {
  const summary = useMemo(() => {
    if (data && data.summary) {
      return data.summary;
    }
    return financialSummary;
  }, [data]);

  const kpis = useMemo(() => {
    if (data && Array.isArray(data.kpis) && data.kpis.length > 0) {
      return data.kpis;
    }
    return financialKPIs;
  }, [data]);

  const monthlyData = useMemo(() => {
    if (data && Array.isArray(data.monthlyBudgetVsActual) && data.monthlyBudgetVsActual.length > 0) {
      return data.monthlyBudgetVsActual;
    }
    return monthlyBudgetVsActual;
  }, [data]);

  const runVsChange = useMemo(() => {
    if (data && Array.isArray(data.runVsChangeBreakdown) && data.runVsChangeBreakdown.length > 0) {
      return data.runVsChangeBreakdown;
    }
    return runVsChangeBreakdown;
  }, [data]);

  const categoryData = useMemo(() => {
    if (data && Array.isArray(data.spendByCategory) && data.spendByCategory.length > 0) {
      return data.spendByCategory;
    }
    return spendByCategory;
  }, [data]);

  const barChartData = useMemo(() => {
    return monthlyData
      .filter((entry) => entry.actual !== null)
      .map((entry) => ({
        month: entry.month,
        budget: entry.budget,
        actual: entry.actual,
      }));
  }, [monthlyData]);

  const runVsChangeDonutData = useMemo(() => {
    return runVsChange.map((entry) => ({
      label: entry.label,
      value: entry.value,
      color: entry.color,
    }));
  }, [runVsChange]);

  const varianceColor = useMemo(() => {
    if (summary.variancePercentage > 10) {
      return 'success';
    }
    if (summary.variancePercentage >= 0) {
      return 'warning';
    }
    return 'danger';
  }, [summary.variancePercentage]);

  if (!summary) {
    return (
      <SectionCard
        title="IT Financial Overview"
        className={className}
        ariaLabel="IT Financial Overview"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No financial data available.
        </p>
      </SectionCard>
    );
  }

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
        <span>Variance:</span>
        <span className={`font-semibold ${summary.variancePercentage >= 0 ? 'text-success' : 'text-danger'}`}>
          {summary.variancePercentage >= 0 ? '+' : ''}{summary.variancePercentage}%
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
      title="IT Financial Overview"
      subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="IT Financial Overview"
      headerRight={headerRight}
      id="financial"
    >
      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
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
          value={Math.round((summary.actuals / summary.budget) * 100)}
          label="Budget Utilization"
          color={varianceColor}
          size="md"
          showValue
          animate
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Budget vs Actual Bar Chart */}
        <div className="lg:col-span-2">
          <BarChart
            data={barChartData}
            xKey="month"
            yKeys={['budget', 'actual']}
            labels={['Budget', 'Actual']}
            colors={['#6C757D', '#E60012']}
            title="Budget vs Actual (Monthly)"
            ariaLabel="Monthly budget versus actual spend bar chart"
            ariaDescription="Grouped bar chart comparing monthly budgeted spend against actual spend for the current fiscal year."
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

        {/* Run vs Change Donut Chart */}
        <div className="lg:col-span-1">
          <DonutChart
            data={runVsChangeDonutData}
            title="Run vs Change Spend"
            ariaLabel="Run versus change spend distribution donut chart"
            ariaDescription="Donut chart showing the split between operational run spend and transformation change spend."
            height={300}
            innerRadiusRatio={0.55}
            showLegend
            showTooltip
            showLabels
            animate
            centerLabel="Total"
            centerValue={summary.totalITSpend}
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>
      </div>

      {/* Spend by Category Breakdown */}
      <div className="bg-canon-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-canon-black">
            Spend by Category
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {categoryData.map((category) => {
            const utilizationPercent = category.budget > 0
              ? Math.round((category.actual / category.budget) * 100)
              : 0;

            return (
              <div
                key={category.category}
                className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <div className="flex items-center justify-between sm:w-1/4 min-w-0">
                  <span className="text-sm font-medium text-canon-black truncate">
                    {category.category}
                  </span>
                  <RAGIndicator
                    status={category.ragStatus}
                    size="sm"
                    showLabel={false}
                    showDot={false}
                    showIcon
                    className="sm:hidden"
                  />
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar
                      value={utilizationPercent}
                      color={category.ragStatus === 'green' ? 'success' : category.ragStatus === 'amber' ? 'warning' : 'danger'}
                      size="sm"
                      showValue={false}
                      animate
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 w-16 text-right">
                      {formatCurrency(category.actual, { abbreviate: true, showSymbol: true })}
                    </span>
                    <span className="text-xs text-gray-400">/</span>
                    <span className="text-xs text-gray-500 w-16 text-right">
                      {formatCurrency(category.budget, { abbreviate: true, showSymbol: true })}
                    </span>
                    <span className="text-xs font-semibold text-canon-black w-10 text-right">
                      {utilizationPercent}%
                    </span>
                    <RAGIndicator
                      status={category.ragStatus}
                      size="sm"
                      showLabel={false}
                      showDot={false}
                      showIcon
                      className="hidden sm:inline-flex"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}

ITFinancialOverviewSection.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.object,
    kpis: PropTypes.arrayOf(PropTypes.object),
    monthlyBudgetVsActual: PropTypes.arrayOf(PropTypes.object),
    runVsChangeBreakdown: PropTypes.arrayOf(PropTypes.object),
    spendByCategory: PropTypes.arrayOf(PropTypes.object),
  }),
  className: PropTypes.string,
};

export default ITFinancialOverviewSection;