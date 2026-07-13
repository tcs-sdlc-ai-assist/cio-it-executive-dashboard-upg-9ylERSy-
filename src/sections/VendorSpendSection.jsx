import { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { DataTable } from '../components/visualizations/DataTable';
import { DonutChart } from '../components/visualizations/DonutChart';
import { BarChart } from '../components/visualizations/BarChart';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';
import { FilterDropdown } from '../components/common/FilterDropdown';
import {
  vendorSpendData,
  vendorSummary,
  vendorKPIs,
  vendorBarChartData,
  vendorDonutChartData,
  totalVendorSpend,
} from '../data/vendorData';
import { formatCurrency } from '../utils/formatters';

/**
 * VendorSpendSection - Vendor Spend dashboard section (FR-004).
 *
 * Renders a sortable DataTable with Top 10 vendors showing Vendor Name,
 * Annual Spend, Contract Value, Spend Variance, and Dependency Risk with
 * RAG indicators. Includes FilterDropdown for filtering by dependency risk
 * level. Displays KPI metric cards and charts for vendor spend analysis.
 * Wrapped in SectionCard with title 'Vendor Spend'.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional vendor data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function VendorSpendSection({ data, className = '' }) {
  const [riskFilter, setRiskFilter] = useState('');

  const summary = useMemo(() => {
    if (data && data.summary) {
      return data.summary;
    }
    return vendorSummary;
  }, [data]);

  const kpis = useMemo(() => {
    if (data && Array.isArray(data.kpis) && data.kpis.length > 0) {
      return data.kpis;
    }
    return vendorKPIs;
  }, [data]);

  const vendors = useMemo(() => {
    if (data && Array.isArray(data.vendors) && data.vendors.length > 0) {
      return data.vendors;
    }
    return vendorSpendData;
  }, [data]);

  const barChartData = useMemo(() => {
    if (data && Array.isArray(data.barChartData) && data.barChartData.length > 0) {
      return data.barChartData;
    }
    return vendorBarChartData;
  }, [data]);

  const donutData = useMemo(() => {
    if (data && Array.isArray(data.donutChartData) && data.donutChartData.length > 0) {
      return data.donutChartData;
    }
    return vendorDonutChartData;
  }, [data]);

  const resolvedTotalSpend = useMemo(() => {
    if (data && data.totalSpend != null) {
      return data.totalSpend;
    }
    return totalVendorSpend;
  }, [data]);

  const filteredVendors = useMemo(() => {
    if (!riskFilter) {
      return vendors;
    }
    return vendors.filter((v) => v.dependencyRisk === riskFilter);
  }, [vendors, riskFilter]);

  const handleRiskFilterChange = useCallback((value) => {
    setRiskFilter(value);
  }, []);

  const riskFilterOptions = useMemo(() => [
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' },
  ], []);

  const dependencyRiskConfig = {
    high: { label: 'High', statusColor: 'red' },
    medium: { label: 'Medium', statusColor: 'amber' },
    low: { label: 'Low', statusColor: 'green' },
  };

  const vendorColumns = useMemo(() => [
    {
      key: 'vendorName',
      label: 'Vendor Name',
      sortable: true,
      align: 'left',
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      align: 'left',
    },
    {
      key: 'annualSpend',
      label: 'Annual Spend',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'contractValue',
      label: 'Contract Value',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'spendVariance',
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
              ({isPositive ? '+' : ''}{row.spendVariancePercent}%)
            </span>
          </span>
        );
      },
    },
    {
      key: 'dependencyRisk',
      label: 'Dependency Risk',
      sortable: true,
      align: 'center',
      render: (value) => {
        const config = dependencyRiskConfig[value] || dependencyRiskConfig.low;
        return (
          <RAGIndicator
            status={config.statusColor}
            label={config.label}
            size="sm"
            showDot
            showIcon={false}
            showLabel
          />
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
        title="Vendor Spend"
        className={className}
        ariaLabel="Vendor Spend"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No vendor data available.
        </p>
      </SectionCard>
    );
  }

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
        <span>{summary.numberOfVendors} Vendors</span>
        <span className="text-gray-300">|</span>
        <span>High Dependency: {summary.highDependencyCount}</span>
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
      title="Vendor Spend"
      subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="Vendor Spend"
      headerRight={headerRight}
      id="vendor"
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Bar Chart - Annual Spend vs Contract Value */}
        <div className="lg:col-span-2">
          <BarChart
            data={barChartData}
            xKey="vendor"
            yKeys={['annualSpend', 'contractValue']}
            labels={['Annual Spend', 'Contract Value']}
            colors={['#E60012', '#6C757D']}
            title="Annual Spend vs Contract Value"
            ariaLabel="Vendor annual spend versus contract value bar chart"
            ariaDescription="Grouped bar chart comparing annual spend against contract value for top 10 vendors."
            mode="grouped"
            xAxisLabel="Vendor"
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
            title="Vendor Spend Distribution"
            ariaLabel="Vendor spend distribution donut chart"
            ariaDescription="Donut chart showing the distribution of annual spend across top 10 vendors."
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
      </div>

      {/* Vendor Table with Filter */}
      <div className="bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <h3 className="text-sm font-semibold text-canon-black">
            Top 10 Vendors by Spend
          </h3>
          <FilterDropdown
            options={riskFilterOptions}
            value={riskFilter}
            onChange={handleRiskFilterChange}
            label="Dependency Risk"
            placeholder="All Risks"
            showLabel={false}
            size="sm"
            ariaLabel="Filter vendors by dependency risk level"
          />
        </div>
        <DataTable
          columns={vendorColumns}
          data={filteredVendors}
          caption="Top 10 vendors by annual spend with contract value, variance, and dependency risk"
          defaultSortKey="annualSpend"
          defaultSortDirection="desc"
          striped
          hoverable
          size="sm"
          rowKeyField="id"
          emptyMessage="No vendors match the selected filter."
        />
      </div>
    </SectionCard>
  );
}

VendorSpendSection.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.object,
    kpis: PropTypes.arrayOf(PropTypes.object),
    vendors: PropTypes.arrayOf(PropTypes.object),
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

export default VendorSpendSection;