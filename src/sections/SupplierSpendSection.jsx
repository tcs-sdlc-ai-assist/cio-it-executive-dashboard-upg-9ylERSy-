import { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SectionCard } from '../components/common/SectionCard';
import { MetricCard } from '../components/visualizations/MetricCard';
import { DataTable } from '../components/visualizations/DataTable';
import { LineChart } from '../components/visualizations/LineChart';
import { DonutChart } from '../components/visualizations/DonutChart';
import { RAGIndicator } from '../components/visualizations/RAGIndicator';
import { ProgressBar } from '../components/visualizations/ProgressBar';
import { FilterDropdown } from '../components/common/FilterDropdown';
import {
  supplierSpendData,
  supplierSummary,
  supplierKPIs,
  supplierDonutChartData,
  topSupplierTrendData,
  topSupplierNames,
  totalSupplierSpend,
  totalSavingsDelivered,
  totalSavingsTarget,
  aggregatedMonthlySpend,
} from '../data/supplierData';
import { formatCurrency } from '../utils/formatters';

/**
 * SupplierSpendSection - Supplier Spend dashboard section (FR-005).
 *
 * Renders a DataTable with supplier-wise spend, Procurement Category,
 * Contract Status, and Savings Delivered. Includes a LineChart showing
 * supplier spend trend over time and a savings tracker summary.
 * FilterDropdown for procurement category filtering.
 * Wrapped in SectionCard with title 'Supplier Spend'.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional supplier data (defaults to mock data)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function SupplierSpendSection({ data, className = '' }) {
  const [categoryFilter, setCategoryFilter] = useState('');

  const summary = useMemo(() => {
    if (data && data.summary) {
      return data.summary;
    }
    return supplierSummary;
  }, [data]);

  const kpis = useMemo(() => {
    if (data && Array.isArray(data.kpis) && data.kpis.length > 0) {
      return data.kpis;
    }
    return supplierKPIs;
  }, [data]);

  const suppliers = useMemo(() => {
    if (data && Array.isArray(data.suppliers) && data.suppliers.length > 0) {
      return data.suppliers;
    }
    return supplierSpendData;
  }, [data]);

  const trendData = useMemo(() => {
    if (data && Array.isArray(data.trendData) && data.trendData.length > 0) {
      return data.trendData;
    }
    return topSupplierTrendData;
  }, [data]);

  const trendYKeys = useMemo(() => {
    if (data && Array.isArray(data.trendYKeys) && data.trendYKeys.length > 0) {
      return data.trendYKeys;
    }
    return topSupplierNames;
  }, [data]);

  const donutData = useMemo(() => {
    if (data && Array.isArray(data.donutChartData) && data.donutChartData.length > 0) {
      return data.donutChartData;
    }
    return supplierDonutChartData;
  }, [data]);

  const resolvedTotalSpend = useMemo(() => {
    if (data && data.totalSpend != null) {
      return data.totalSpend;
    }
    return totalSupplierSpend;
  }, [data]);

  const resolvedTotalSavingsDelivered = useMemo(() => {
    if (data && data.totalSavingsDelivered != null) {
      return data.totalSavingsDelivered;
    }
    return totalSavingsDelivered;
  }, [data]);

  const resolvedTotalSavingsTarget = useMemo(() => {
    if (data && data.totalSavingsTarget != null) {
      return data.totalSavingsTarget;
    }
    return totalSavingsTarget;
  }, [data]);

  const categoryFilterOptions = useMemo(() => {
    const categories = [...new Set(suppliers.map((s) => s.procurementCategory))];
    return categories.map((cat) => ({
      value: cat,
      label: cat,
    }));
  }, [suppliers]);

  const filteredSuppliers = useMemo(() => {
    if (!categoryFilter) {
      return suppliers;
    }
    return suppliers.filter((s) => s.procurementCategory === categoryFilter);
  }, [suppliers, categoryFilter]);

  const handleCategoryFilterChange = useCallback((value) => {
    setCategoryFilter(value);
  }, []);

  const contractStatusConfig = {
    active: { label: 'Active', statusColor: 'green' },
    expiring: { label: 'Expiring', statusColor: 'amber' },
    expired: { label: 'Expired', statusColor: 'red' },
  };

  const supplierColumns = useMemo(() => [
    {
      key: 'supplierName',
      label: 'Supplier Name',
      sortable: true,
      align: 'left',
    },
    {
      key: 'procurementCategory',
      label: 'Category',
      sortable: true,
      align: 'left',
    },
    {
      key: 'totalSpend',
      label: 'Total Spend (YTD)',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'contractStatus',
      label: 'Contract Status',
      sortable: true,
      align: 'center',
      render: (value) => {
        const config = contractStatusConfig[value] || contractStatusConfig.active;
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
      key: 'savingsDelivered',
      label: 'Savings Delivered',
      sortable: true,
      align: 'right',
      render: (value) => formatCurrency(value, { abbreviate: true, showSymbol: true }),
    },
    {
      key: 'savingsPercent',
      label: 'Savings %',
      sortable: true,
      align: 'right',
      render: (value) => {
        const color = value >= 75 ? 'success' : value >= 50 ? 'warning' : 'danger';
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
              {Math.round(value)}%
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

  const savingsPercent = useMemo(() => {
    if (resolvedTotalSavingsTarget === 0) return 0;
    return Math.round((resolvedTotalSavingsDelivered / resolvedTotalSavingsTarget) * 100);
  }, [resolvedTotalSavingsDelivered, resolvedTotalSavingsTarget]);

  if (!summary) {
    return (
      <SectionCard
        title="Supplier Spend"
        className={className}
        ariaLabel="Supplier Spend"
      >
        <p className="text-sm text-gray-500 text-center py-8">
          No supplier data available.
        </p>
      </SectionCard>
    );
  }

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
        <span>{summary.numberOfSuppliers} Suppliers</span>
        <span className="text-gray-300">|</span>
        <span>Active: {summary.activeContracts}</span>
        <span className="text-gray-300">|</span>
        <span className="text-danger font-medium">Expiring/Expired: {summary.expiringContracts + summary.expiredContracts}</span>
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
      title="Supplier Spend"
      subtitle={`${summary.reportingPeriod} • As of ${summary.asOfDate}`}
      className={className}
      ariaLabel="Supplier Spend"
      headerRight={headerRight}
      id="supplier"
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

      {/* Savings Tracker */}
      <div className="mb-6 bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold text-canon-black">
            Savings Tracker
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>
              Delivered: {formatCurrency(resolvedTotalSavingsDelivered, { abbreviate: true, showSymbol: true })}
            </span>
            <span className="text-gray-300">|</span>
            <span>
              Target: {formatCurrency(resolvedTotalSavingsTarget, { abbreviate: true, showSymbol: true })}
            </span>
          </div>
        </div>
        <ProgressBar
          value={savingsPercent}
          label={`Savings Achievement: ${savingsPercent}%`}
          color={savingsPercent >= 75 ? 'success' : savingsPercent >= 50 ? 'warning' : 'danger'}
          size="lg"
          showValue
          animate
          valuePosition="outside"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Line Chart - Supplier Spend Trend */}
        <div className="lg:col-span-2">
          <LineChart
            data={trendData}
            xKey="month"
            yKeys={trendYKeys}
            labels={trendYKeys}
            title="Top 5 Supplier Spend Trend"
            ariaLabel="Top 5 supplier spend trend line chart"
            ariaDescription="Line chart showing monthly spend trends for the top 5 suppliers by total spend over the current fiscal year."
            xAxisLabel="Month"
            yAxisLabel="Spend (₹)"
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

        {/* Donut Chart - Supplier Spend Distribution */}
        <div className="lg:col-span-1">
          <DonutChart
            data={donutData}
            title="Supplier Spend Distribution"
            ariaLabel="Supplier spend distribution donut chart"
            ariaDescription="Donut chart showing the distribution of year-to-date spend across all suppliers."
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

      {/* Supplier Table with Filter */}
      <div className="bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <h3 className="text-sm font-semibold text-canon-black">
            Supplier Spend Details
          </h3>
          <FilterDropdown
            options={categoryFilterOptions}
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            label="Procurement Category"
            placeholder="All Categories"
            showLabel={false}
            size="sm"
            ariaLabel="Filter suppliers by procurement category"
          />
        </div>
        <DataTable
          columns={supplierColumns}
          data={filteredSuppliers}
          caption="Supplier spend details with procurement category, contract status, and savings delivered"
          defaultSortKey="totalSpend"
          defaultSortDirection="desc"
          striped
          hoverable
          size="sm"
          rowKeyField="id"
          emptyMessage="No suppliers match the selected filter."
        />
      </div>
    </SectionCard>
  );
}

SupplierSpendSection.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.object,
    kpis: PropTypes.arrayOf(PropTypes.object),
    suppliers: PropTypes.arrayOf(PropTypes.object),
    trendData: PropTypes.arrayOf(PropTypes.object),
    trendYKeys: PropTypes.arrayOf(PropTypes.string),
    donutChartData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
        color: PropTypes.string,
      })
    ),
    totalSpend: PropTypes.number,
    totalSavingsDelivered: PropTypes.number,
    totalSavingsTarget: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default SupplierSpendSection;