import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * DataTable - Sortable, accessible data table component.
 *
 * Reusable data table with sortable columns. Accepts columns definition
 * and data array. Implements column header click sorting with ascending/descending
 * toggle. Includes ARIA table roles, accessible column headers, and keyboard
 * navigation. Styled with Canon India design tokens.
 *
 * @param {Object} props
 * @param {Array<{key: string, label: string, sortable?: boolean, align?: string, render?: function}>} props.columns - Column definitions
 * @param {Array<Object>} props.data - Array of row data objects
 * @param {string} [props.caption] - Accessible table caption
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.emptyMessage='No data available'] - Message when data is empty
 * @param {string} [props.defaultSortKey] - Default column key to sort by
 * @param {'asc' | 'desc'} [props.defaultSortDirection='asc'] - Default sort direction
 * @param {boolean} [props.striped=true] - Whether to apply striped row styling
 * @param {boolean} [props.hoverable=true] - Whether to apply hover styling on rows
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Table size variant
 * @param {function} [props.onRowClick] - Callback when a row is clicked, receives row data and index
 * @param {string} [props.rowKeyField] - Field name to use as unique key for rows
 * @returns {React.ReactElement}
 */
export function DataTable({
  columns,
  data,
  caption,
  className = '',
  emptyMessage = 'No data available',
  defaultSortKey,
  defaultSortDirection = 'asc',
  striped = true,
  hoverable = true,
  size = 'md',
  onRowClick,
  rowKeyField,
}) {
  const [sortKey, setSortKey] = useState(defaultSortKey || null);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);

  const handleSort = useCallback(
    (columnKey) => {
      if (sortKey === columnKey) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(columnKey);
        setSortDirection('asc');
      }
    },
    [sortKey]
  );

  const handleHeaderKeyDown = useCallback(
    (event, columnKey) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleSort(columnKey);
      }
    },
    [handleSort]
  );

  const handleRowClick = useCallback(
    (rowData, index) => {
      if (onRowClick) {
        onRowClick(rowData, index);
      }
    },
    [onRowClick]
  );

  const handleRowKeyDown = useCallback(
    (event, rowData, index) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleRowClick(rowData, index);
      }
    },
    [handleRowClick]
  );

  const validColumns = useMemo(() => {
    if (!Array.isArray(columns) || columns.length === 0) {
      console.warn('[DataTable] columns prop must be a non-empty array.');
      return [];
    }
    return columns;
  }, [columns]);

  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) {
      console.warn('[DataTable] data prop must be an array.');
      return [];
    }

    if (!sortKey) {
      return [...data];
    }

    const column = validColumns.find((col) => col.key === sortKey);
    if (!column || column.sortable === false) {
      return [...data];
    }

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortDirection === 'asc' ? 1 : -1;
      if (bVal == null) return sortDirection === 'asc' ? -1 : 1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection, validColumns]);

  const sizeClassMap = {
    sm: {
      cell: 'px-3 py-1.5 text-xs',
      header: 'px-3 py-2 text-xs',
    },
    md: {
      cell: 'px-4 py-3 text-sm',
      header: 'px-4 py-3 text-sm',
    },
    lg: {
      cell: 'px-5 py-4 text-base',
      header: 'px-5 py-4 text-base',
    },
  };

  const sizeConfig = sizeClassMap[size];

  if (!sizeConfig) {
    console.warn(
      `[DataTable] Invalid size "${size}" provided. Falling back to "md".`
    );
  }

  const resolvedSizeConfig = sizeConfig || sizeClassMap.md;

  const alignClassMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const getSortIcon = (columnKey) => {
    if (sortKey !== columnKey) {
      return (
        <span className="ml-1 text-gray-300 inline-block" aria-hidden="true">
          ↕
        </span>
      );
    }
    return (
      <span className="ml-1 text-canon-red inline-block" aria-hidden="true">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const getAriaSort = (columnKey) => {
    if (sortKey !== columnKey) {
      return 'none';
    }
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  const tableClasses = [
    'w-full border-collapse',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'w-full overflow-x-auto rounded-lg border border-gray-200 bg-canon-white shadow-sm',
  ]
    .filter(Boolean)
    .join(' ');

  if (validColumns.length === 0) {
    return (
      <div className={containerClasses} role="alert">
        <p className="p-4 text-sm text-gray-500 text-center">
          Table configuration error: no columns defined.
        </p>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <table className={tableClasses} role="table">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr role="row">
            {validColumns.map((column) => {
              const isSortable = column.sortable !== false;
              const alignClass = alignClassMap[column.align] || 'text-left';

              const headerClasses = [
                resolvedSizeConfig.header,
                'font-semibold text-canon-black whitespace-nowrap',
                alignClass,
                isSortable
                  ? 'cursor-pointer select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red transition-colors'
                  : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <th
                  key={column.key}
                  className={headerClasses}
                  role="columnheader"
                  scope="col"
                  aria-sort={isSortable ? getAriaSort(column.key) : undefined}
                  tabIndex={isSortable ? 0 : undefined}
                  onClick={isSortable ? () => handleSort(column.key) : undefined}
                  onKeyDown={
                    isSortable
                      ? (e) => handleHeaderKeyDown(e, column.key)
                      : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {column.label}
                    {isSortable && getSortIcon(column.key)}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr role="row">
              <td
                colSpan={validColumns.length}
                className="px-4 py-8 text-center text-sm text-gray-500"
                role="cell"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => {
              const rowKey = rowKeyField && row[rowKeyField] != null
                ? String(row[rowKeyField])
                : String(rowIndex);

              const isClickable = !!onRowClick;

              const rowClasses = [
                'border-b border-gray-100 last:border-b-0',
                striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-canon-white',
                hoverable ? 'hover:bg-gray-100 transition-colors' : '',
                isClickable
                  ? 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red'
                  : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <tr
                  key={rowKey}
                  className={rowClasses}
                  role="row"
                  tabIndex={isClickable ? 0 : undefined}
                  onClick={
                    isClickable
                      ? () => handleRowClick(row, rowIndex)
                      : undefined
                  }
                  onKeyDown={
                    isClickable
                      ? (e) => handleRowKeyDown(e, row, rowIndex)
                      : undefined
                  }
                >
                  {validColumns.map((column) => {
                    const alignClass =
                      alignClassMap[column.align] || 'text-left';

                    const cellClasses = [
                      resolvedSizeConfig.cell,
                      'text-canon-black',
                      alignClass,
                    ]
                      .filter(Boolean)
                      .join(' ');

                    const cellValue = row[column.key];
                    const displayValue =
                      column.render
                        ? column.render(cellValue, row, rowIndex)
                        : cellValue != null
                          ? String(cellValue)
                          : '—';

                    return (
                      <td
                        key={column.key}
                        className={cellClasses}
                        role="cell"
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  caption: PropTypes.string,
  className: PropTypes.string,
  emptyMessage: PropTypes.string,
  defaultSortKey: PropTypes.string,
  defaultSortDirection: PropTypes.oneOf(['asc', 'desc']),
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onRowClick: PropTypes.func,
  rowKeyField: PropTypes.string,
};

export default DataTable;