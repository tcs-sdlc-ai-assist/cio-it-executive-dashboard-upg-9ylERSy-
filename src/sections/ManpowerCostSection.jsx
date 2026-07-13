import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { DonutChart } from '../components/visualizations/DonutChart';
import { BarChart } from '../components/visualizations/BarChart';
import { DataTable } from '../components/visualizations/DataTable';
import { LineChart } from '../components/visualizations/LineChart';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';
import { ProgressBar } from '../components/visualizations/ProgressBar';
import {
  manpowerCostSummary,
  manpowerKPIs,
  workforceCategoryDonutData,
  locationDonutChartData,
  departmentCostBreakdown,
  departmentBarChartData,
  monthlyManpowerCost,
  totalManpowerCost,
} from '../data/manpowerData';
import { formatCurrency } from '../utils/formatters';

/**
 * ManpowerCostSection - Manpower Cost dashboard section (FR-009).
 *
 * Displays Internal FTE Cost, Contractor Cost, Partner/Vendor Resource Cost
 * as MetricCards. Renders a DonutChart showing cost by workforce type and
 * a second DonutChart showing location split. Includes a department cost
 * breakdown DataTable and a monthly cost trend LineChart.
 * Wrapped in SectionCard with title 'Manpower Cost'.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional manpower data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function ManpowerCostSection({ data, className = '' }) {
  const summary = useMemo(() => {
    if (data && data.summary) {
      return data.summary;
    }
    return manpowerCostSummary;
  }, [data]);

  const kpis = useMemo(() => {
    if (data && Array.isArray(data.kpis) && data.kpis.length > 0) {
      return data.kpis;
    }
    return manpowerKPIs;
  }, [data]);

  const workforceDonutData = useMemo(() => {
    if (data && Array.isArray(data.workforceDonutData) && data.workforceDonutData.length > 0) {
      return data.workforceDonutData;
    }
    return workforceCategoryDonutData;
  }, [data]);

  const locationDonutData = useMemo(() => {
    if (data && Array.isArray(data.locationDonutData) && data.locationDonutData.length > 0) {
      return data.locationDonutData;
    }
    return locationDonutChartData;
  }, [data]);

  const departmentData = useMemo(() => {
    if (data && Array.isArray(data.departmentBreakdown) && data.departmentBreakdown.length > 0) {
      return data.departmentBreakdown;
    }
    return departmentCostBreakdown;
  }, [data]);

  const barData = useMemo(() => {
    if (data && Array.isArray(data.departmentBarChartData) && data.departmentBarChartData.length > 0) {
      return data.departmentBarChartData;
    }
    return departmentBarChartData;
  }, [data]);

  const monthlyData = useMemo(() => {
    if (data && Array.isArray(data.monthlyManpowerCost) && data.monthlyManpowerCost.length > 0) {
      return data.monthlyManpowerCost;
    }
    return monthlyManpowerCost;
  }, [data]);

  const resolvedTotalCost = useMemo(() => {
    if (data && data.totalManpowerCost != null) {
      return data.totalManpowerCost;
    }
    return totalManpowerCost;
  }, [data]);

  const internalRatio = useMemo(() => {
    if (summary.totalHeadcount === 0) return 0;
    return Math.round((summary.internalFTECount / summary.totalHeadcount) * 100);
  }, [summary]);

  const departmentColumns = useMemo(() => [
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      align: 'left',
    },
    {
      key: 'headcount',
      label: 'Headcount',
      sortable: true,
      align: 'right',
    },
    {
      key: 'internalFTE',
      label: 'Internal FTE',
      sortable: true,
      align: 'right',
    },
    {
      key: 'contractors',
      label: 'Contractors',
      sortable: true,
      align: 'right',
    },
    {
      key: 'partnerVendor',
      label: 'Partner/Vendor',
      sortable: true,
      align: 'right',
    },
    {
      key: 'cost',
      label: 'Annual Cost',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
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
        title="Manpower Cost"
        className={className}
        ariaLabel="Manpower Cost"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No manpower data available.
        </p>
      </SectionCard>
    );
  }

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
        <span>Headcount: {summary.totalHeadcount}</span>
        <span className="text-gray-300">|</span>
        <span>Internal: {internalRatio}%</span>
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
      title="Manpower Cost"
      subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="Manpower Cost"
      headerRight={headerRight}
      id="manpower"
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

      {/* Workforce Composition Progress */}
      <div className="mb-6 bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-canon-black mb-3">
          Workforce Composition
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-canon-black">
                Internal FTE
              </span>
              <span className="text-xs text-gray-500">
                {summary.internalFTECount} resources
              </span>
            </div>
            <ProgressBar
              value={summary.totalHeadcount > 0 ? Math.round((summary.internalFTECount / summary.totalHeadcount) * 100) : 0}
              color="canon-red"
              size="sm"
              showValue
              animate
              valuePosition="outside"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-canon-black">
                Contractors
              </span>
              <span className="text-xs text-gray-500">
                {summary.contractorCount} resources
              </span>
            </div>
            <ProgressBar
              value={summary.totalHeadcount > 0 ? Math.round((summary.contractorCount / summary.totalHeadcount) * 100) : 0}
              color="success"
              size="sm"
              showValue
              animate
              valuePosition="outside"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-canon-black">
                Partner/Vendor
              </span>
              <span className="text-xs text-gray-500">
                {summary.partnerVendorCount} resources
              </span>
            </div>
            <ProgressBar
              value={summary.totalHeadcount > 0 ? Math.round((summary.partnerVendorCount / summary.totalHeadcount) * 100) : 0}
              color="warning"
              size="sm"
              showValue
              animate
              valuePosition="outside"
            />
          </div>
        </div>
      </div>

      {/* Charts Row - Workforce Type & Location Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Donut Chart - Cost by Workforce Type */}
        <div>
          <DonutChart
            data={workforceDonutData}
            title="Cost by Workforce Type"
            ariaLabel="Manpower cost by workforce type donut chart"
            ariaDescription="Donut chart showing the distribution of manpower cost across internal FTEs, contractors, and partner/vendor resources."
            height={300}
            innerRadiusRatio={0.55}
            showLegend
            showTooltip
            showLabels
            animate
            centerLabel="Total"
            centerValue={resolvedTotalCost}
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>

        {/* Donut Chart - Cost by Location */}
        <div>
          <DonutChart
            data={locationDonutData}
            title="Cost by Location"
            ariaLabel="Manpower cost by location donut chart"
            ariaDescription="Donut chart showing the distribution of manpower cost across office locations including Delhi NCR, Mumbai, Bangalore, Chennai, and Kolkata."
            height={300}
            innerRadiusRatio={0.55}
            showLegend
            showTooltip
            showLabels
            animate
            centerLabel="Total"
            centerValue={resolvedTotalCost}
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>
      </div>

      {/* Charts Row - Department Bar Chart & Monthly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Bar Chart - Department Cost Breakdown */}
        <div className="lg:col-span-2">
          <BarChart
            data={barData}
            xKey="department"
            yKeys={['internalFTE', 'contractors', 'partnerVendor']}
            labels={['Internal FTE', 'Contractors', 'Partner/Vendor']}
            colors={['#E60012', '#28A745', '#FFC107']}
            title="Department Cost by Workforce Type"
            ariaLabel="Department manpower cost by workforce type bar chart"
            ariaDescription="Stacked bar chart showing the breakdown of manpower cost by workforce type for each IT department."
            mode="stacked"
            xAxisLabel="Department"
            yAxisLabel="Cost (₹)"
            height={300}
            showLegend
            showTooltip
            animate
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>

        {/* Line Chart - Monthly Cost Trend */}
        <div className="lg:col-span-1">
          <LineChart
            data={monthlyData}
            xKey="month"
            yKeys={['total']}
            labels={['Total Cost']}
            colors={['#E60012']}
            title="Monthly Cost Trend"
            ariaLabel="Monthly manpower cost trend line chart"
            ariaDescription="Line chart showing the monthly total manpower cost trend over the current fiscal year."
            xAxisLabel="Month"
            yAxisLabel="Cost (₹)"
            height={300}
            showLegend={false}
            showTooltip
            showDots
            showArea
            animate
            curved
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>
      </div>

      {/* Department Cost Breakdown Table */}
      <div className="bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-canon-black mb-3">
          Department Cost Breakdown
        </h3>
        <DataTable
          columns={departmentColumns}
          data={departmentData}
          caption="Manpower cost breakdown by IT department with headcount, workforce type split, and annual cost"
          defaultSortKey="cost"
          defaultSortDirection="desc"
          striped
          hoverable
          size="sm"
          rowKeyField="department"
        />
      </div>
    </SectionCard>
  );
}

ManpowerCostSection.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.object,
    kpis: PropTypes.arrayOf(PropTypes.object),
    workforceDonutData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
        color: PropTypes.string,
      })
    ),
    locationDonutData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
        color: PropTypes.string,
      })
    ),
    departmentBreakdown: PropTypes.arrayOf(PropTypes.object),
    departmentBarChartData: PropTypes.arrayOf(PropTypes.object),
    monthlyManpowerCost: PropTypes.arrayOf(PropTypes.object),
    totalManpowerCost: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default ManpowerCostSection;