import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { DonutChart } from '../components/visualizations/DonutChart';
import { DataTable } from '../components/visualizations/DataTable';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';
import { ProgressBar } from '../components/visualizations/ProgressBar';
import {
  licenseDonutChartData,
  licenseSummary,
  licenseKPIs,
  licenseUtilization,
  totalLicenseSpend,
} from '../data/licenseData';
import { formatCurrency } from '../utils/formatters';

/**
 * LicenseSpendSplitSection - License Spend Split dashboard section (FR-003).
 *
 * Renders a DonutChart showing cost distribution across Microsoft, SAP,
 * Oracle, Salesforce, Cloud, and Other licenses. Includes a legend table
 * with vendor name, annual cost, and percentage. Displays KPI metric cards
 * for total license spend, average utilization, underutilized licenses,
 * and potential savings. Includes a utilization breakdown DataTable.
 * Wrapped in SectionCard with title 'License Spend Split'.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional license data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function LicenseSpendSplitSection({ data, className = '' }) {
  const summary = useMemo(() => {
    if (data && data.summary) {
      return data.summary;
    }
    return licenseSummary;
  }, [data]);

  const kpis = useMemo(() => {
    if (data && Array.isArray(data.kpis) && data.kpis.length > 0) {
      return data.kpis;
    }
    return licenseKPIs;
  }, [data]);

  const donutData = useMemo(() => {
    if (data && Array.isArray(data.donutChartData) && data.donutChartData.length > 0) {
      return data.donutChartData;
    }
    return licenseDonutChartData;
  }, [data]);

  const utilizationData = useMemo(() => {
    if (data && Array.isArray(data.utilization) && data.utilization.length > 0) {
      return data.utilization;
    }
    return licenseUtilization;
  }, [data]);

  const resolvedTotalSpend = useMemo(() => {
    if (data && data.totalSpend != null) {
      return data.totalSpend;
    }
    return totalLicenseSpend;
  }, [data]);

  const utilizationColumns = useMemo(() => [
    {
      key: 'vendor',
      label: 'Vendor',
      sortable: true,
      align: 'left',
    },
    {
      key: 'totalLicenses',
      label: 'Total Licenses',
      sortable: true,
      align: 'right',
    },
    {
      key: 'activeLicenses',
      label: 'Active Licenses',
      sortable: true,
      align: 'right',
    },
    {
      key: 'utilizationPercent',
      label: 'Utilization',
      sortable: true,
      align: 'right',
      render: (value) => {
        const color = value >= 80 ? 'success' : value >= 60 ? 'warning' : 'danger';
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
      key: 'annualCost',
      label: 'Annual Cost',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'costPerLicense',
      label: 'Cost/License',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: false, showSymbol: true }),
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
        title="License Spend Split"
        className={className}
        ariaLabel="License Spend Split"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No license data available.
        </p>
      </SectionCard>
    );
  }

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
        <span>{summary.numberOfVendors} Vendors</span>
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
      title="License Spend Split"
      subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="License Spend Split"
      headerRight={headerRight}
      id="license"
    >
      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Donut Chart and Utilization Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Donut Chart */}
        <div className="lg:col-span-1">
          <DonutChart
            data={donutData}
            title="License Cost Distribution"
            ariaLabel="License cost distribution by vendor donut chart"
            ariaDescription="Donut chart showing the distribution of annual license costs across vendors including Microsoft, SAP, Oracle, Salesforce, Cloud, and Other."
            height={300}
            innerRadiusRatio={0.55}
            showLegend
            showTooltip
            showLabels
            animate
            centerLabel="Total"
            centerValue={resolvedTotalSpend}
            formatValue={(val) => formatCurrency(val, { abbreviate: true, showSymbol: true })}
          />
        </div>

        {/* Utilization Table */}
        <div className="lg:col-span-2">
          <div className="bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-canon-black mb-3">
              License Utilization by Vendor
            </h3>
            <DataTable
              columns={utilizationColumns}
              data={utilizationData}
              caption="License utilization breakdown by vendor"
              defaultSortKey="utilizationPercent"
              defaultSortDirection="asc"
              striped
              hoverable
              size="sm"
              rowKeyField="vendor"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

LicenseSpendSplitSection.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.object,
    kpis: PropTypes.arrayOf(PropTypes.object),
    donutChartData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
        color: PropTypes.string,
      })
    ),
    utilization: PropTypes.arrayOf(PropTypes.object),
    totalSpend: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default LicenseSpendSplitSection;