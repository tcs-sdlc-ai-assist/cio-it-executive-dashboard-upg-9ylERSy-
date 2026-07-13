import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/**
 * BarChart - D3.js bar chart visualization component.
 *
 * Renders a grouped or stacked bar chart using D3.js with responsive SVG.
 * Supports Budget vs Actual comparisons with axes, legends, tooltips,
 * and Canon India colour tokens. Includes ARIA labels and role='img'.
 *
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of data objects to visualize
 * @param {string} props.xKey - Key in data objects for x-axis categories
 * @param {Array<string>} props.yKeys - Keys in data objects for y-axis values (one per bar group)
 * @param {Array<string>} [props.labels] - Display labels for each yKey (defaults to yKeys)
 * @param {Array<string>} [props.colors] - Colour values for each yKey bar
 * @param {string} [props.title] - Chart title displayed above the chart
 * @param {string} [props.ariaLabel] - Accessible label for the chart
 * @param {string} [props.ariaDescription] - Accessible description for the chart
 * @param {'grouped' | 'stacked'} [props.mode='grouped'] - Bar chart mode
 * @param {string} [props.xAxisLabel] - Label for the x-axis
 * @param {string} [props.yAxisLabel] - Label for the y-axis
 * @param {number} [props.height=300] - Chart height in pixels
 * @param {boolean} [props.showLegend=true] - Whether to show the legend
 * @param {boolean} [props.showTooltip=true] - Whether to enable tooltips
 * @param {boolean} [props.animate=true] - Whether to animate bars on render
 * @param {string} [props.className] - Additional CSS classes
 * @param {function} [props.formatValue] - Custom value formatter for tooltips and axis
 * @returns {React.ReactElement}
 */
export function BarChart({
  data,
  xKey,
  yKeys,
  labels,
  colors,
  title,
  ariaLabel,
  ariaDescription,
  mode = 'grouped',
  xAxisLabel,
  yAxisLabel,
  height = 300,
  showLegend = true,
  showTooltip = true,
  animate = true,
  className = '',
  formatValue,
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const validData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('[BarChart] data prop must be a non-empty array.');
      return [];
    }
    return data;
  }, [data]);

  const validYKeys = useMemo(() => {
    if (!Array.isArray(yKeys) || yKeys.length === 0) {
      console.warn('[BarChart] yKeys prop must be a non-empty array.');
      return [];
    }
    return yKeys;
  }, [yKeys]);

  const resolvedLabels = useMemo(() => {
    if (Array.isArray(labels) && labels.length === validYKeys.length) {
      return labels;
    }
    return validYKeys;
  }, [labels, validYKeys]);

  const defaultColors = ['#E60012', '#28A745', '#FFC107', '#6C757D', '#007BFF', '#17A2B8'];

  const resolvedColors = useMemo(() => {
    if (Array.isArray(colors) && colors.length >= validYKeys.length) {
      return colors.slice(0, validYKeys.length);
    }
    return validYKeys.map((_, i) => defaultColors[i % defaultColors.length]);
  }, [colors, validYKeys]);

  const valueFormatter = useCallback(
    (val) => {
      if (formatValue) {
        return formatValue(val);
      }
      if (typeof val === 'number') {
        if (Math.abs(val) >= 1000000) {
          return `${(val / 1000000).toFixed(1)}M`;
        }
        if (Math.abs(val) >= 1000) {
          return `${(val / 1000).toFixed(0)}K`;
        }
        return val.toLocaleString();
      }
      return String(val);
    },
    [formatValue]
  );

  // Observe container width for responsiveness
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setContainerWidth(width);
        }
      }
    });

    resizeObserver.observe(container);

    // Set initial width
    const initialWidth = container.getBoundingClientRect().width;
    if (initialWidth > 0) {
      setContainerWidth(initialWidth);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Render chart with D3
  useEffect(() => {
    if (!svgRef.current || containerWidth === 0 || validData.length === 0 || validYKeys.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    if (width <= 0 || chartHeight <= 0) return;

    const g = svg
      .attr('width', containerWidth)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x0 = d3
      .scaleBand()
      .domain(validData.map((d) => String(d[xKey])))
      .range([0, width])
      .padding(0.2);

    if (mode === 'grouped') {
      const x1 = d3
        .scaleBand()
        .domain(validYKeys)
        .range([0, x0.bandwidth()])
        .padding(0.05);

      // Y scale
      const yMax = d3.max(validData, (d) =>
        d3.max(validYKeys, (key) => (typeof d[key] === 'number' ? d[key] : 0))
      ) || 0;

      const y = d3
        .scaleLinear()
        .domain([0, yMax * 1.1])
        .nice()
        .range([chartHeight, 0]);

      // X axis
      g.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .selectAll('text')
        .attr('class', 'text-xs fill-current text-gray-600')
        .style('font-size', '11px')
        .style('text-anchor', 'end')
        .attr('dx', '-0.5em')
        .attr('dy', '0.5em')
        .attr('transform', 'rotate(-25)');

      // Y axis
      g.append('g')
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickFormat((d) => valueFormatter(d))
        )
        .selectAll('text')
        .style('font-size', '11px');

      // Grid lines
      g.append('g')
        .attr('class', 'grid')
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickSize(-width)
            .tickFormat('')
        )
        .selectAll('line')
        .style('stroke', '#e5e7eb')
        .style('stroke-dasharray', '3,3');

      g.selectAll('.grid .domain').remove();

      // Bars
      const barGroups = g
        .selectAll('.bar-group')
        .data(validData)
        .enter()
        .append('g')
        .attr('class', 'bar-group')
        .attr('transform', (d) => `translate(${x0(String(d[xKey]))},0)`);

      barGroups
        .selectAll('rect')
        .data((d) =>
          validYKeys.map((key, i) => ({
            key,
            value: typeof d[key] === 'number' ? d[key] : 0,
            category: String(d[xKey]),
            label: resolvedLabels[i],
            color: resolvedColors[i],
          }))
        )
        .enter()
        .append('rect')
        .attr('x', (d) => x1(d.key))
        .attr('width', x1.bandwidth())
        .attr('fill', (d) => d.color)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('y', chartHeight)
        .attr('height', 0)
        .transition()
        .duration(animate ? 600 : 0)
        .delay((d, i) => (animate ? i * 80 : 0))
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => chartHeight - y(d.value));

      // Tooltip interaction
      if (showTooltip && tooltipRef.current) {
        const tooltip = d3.select(tooltipRef.current);

        barGroups
          .selectAll('rect')
          .on('mouseenter', function (event, d) {
            d3.select(this).style('opacity', 0.8);
            tooltip
              .style('opacity', 1)
              .style('visibility', 'visible')
              .html(
                `<div class="text-xs font-semibold text-canon-black">${d.category}</div>` +
                `<div class="text-xs text-gray-600">${d.label}: ${valueFormatter(d.value)}</div>`
              );
          })
          .on('mousemove', function (event) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const x = event.clientX - containerRect.left + 12;
            const y = event.clientY - containerRect.top - 28;
            tooltip.style('left', `${x}px`).style('top', `${y}px`);
          })
          .on('mouseleave', function () {
            d3.select(this).style('opacity', 1);
            tooltip.style('opacity', 0).style('visibility', 'hidden');
          });
      }
    } else {
      // Stacked mode
      const stackedData = d3.stack().keys(validYKeys)(
        validData.map((d) => {
          const obj = { [xKey]: d[xKey] };
          validYKeys.forEach((key) => {
            obj[key] = typeof d[key] === 'number' ? d[key] : 0;
          });
          return obj;
        })
      );

      const yMax =
        d3.max(stackedData, (layer) => d3.max(layer, (d) => d[1])) || 0;

      const y = d3
        .scaleLinear()
        .domain([0, yMax * 1.1])
        .nice()
        .range([chartHeight, 0]);

      // X axis
      g.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .selectAll('text')
        .style('font-size', '11px')
        .style('text-anchor', 'end')
        .attr('dx', '-0.5em')
        .attr('dy', '0.5em')
        .attr('transform', 'rotate(-25)');

      // Y axis
      g.append('g')
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickFormat((d) => valueFormatter(d))
        )
        .selectAll('text')
        .style('font-size', '11px');

      // Grid lines
      g.append('g')
        .attr('class', 'grid')
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickSize(-width)
            .tickFormat('')
        )
        .selectAll('line')
        .style('stroke', '#e5e7eb')
        .style('stroke-dasharray', '3,3');

      g.selectAll('.grid .domain').remove();

      // Stacked bars
      const layers = g
        .selectAll('.layer')
        .data(stackedData)
        .enter()
        .append('g')
        .attr('class', 'layer')
        .attr('fill', (d, i) => resolvedColors[i]);

      layers
        .selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d) => x0(String(d.data[xKey])))
        .attr('width', x0.bandwidth())
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('y', chartHeight)
        .attr('height', 0)
        .transition()
        .duration(animate ? 600 : 0)
        .delay((d, i) => (animate ? i * 80 : 0))
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) => y(d[0]) - y(d[1]));

      // Tooltip interaction for stacked
      if (showTooltip && tooltipRef.current) {
        const tooltip = d3.select(tooltipRef.current);

        layers
          .selectAll('rect')
          .on('mouseenter', function (event, d) {
            d3.select(this).style('opacity', 0.8);
            const layerIndex = stackedData.findIndex((layer) =>
              layer.some((item) => item === d)
            );
            const keyLabel =
              layerIndex >= 0 ? resolvedLabels[layerIndex] : '';
            const value = d[1] - d[0];
            tooltip
              .style('opacity', 1)
              .style('visibility', 'visible')
              .html(
                `<div class="text-xs font-semibold text-canon-black">${String(d.data[xKey])}</div>` +
                `<div class="text-xs text-gray-600">${keyLabel}: ${valueFormatter(value)}</div>`
              );
          })
          .on('mousemove', function (event) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const xPos = event.clientX - containerRect.left + 12;
            const yPos = event.clientY - containerRect.top - 28;
            tooltip.style('left', `${xPos}px`).style('top', `${yPos}px`);
          })
          .on('mouseleave', function () {
            d3.select(this).style('opacity', 1);
            tooltip.style('opacity', 0).style('visibility', 'hidden');
          });
      }
    }

    // X axis label
    if (xAxisLabel) {
      g.append('text')
        .attr('x', width / 2)
        .attr('y', chartHeight + margin.bottom - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', '#374151')
        .text(xAxisLabel);
    }

    // Y axis label
    if (yAxisLabel) {
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -chartHeight / 2)
        .attr('y', -margin.left + 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', '#374151')
        .text(yAxisLabel);
    }
  }, [
    containerWidth,
    height,
    validData,
    validYKeys,
    xKey,
    resolvedLabels,
    resolvedColors,
    mode,
    xAxisLabel,
    yAxisLabel,
    animate,
    showTooltip,
    valueFormatter,
  ]);

  const resolvedAriaLabel =
    ariaLabel || title || 'Bar chart visualization';

  const containerClasses = [
    'w-full bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (validData.length === 0 || validYKeys.length === 0) {
    return (
      <div className={containerClasses} role="img" aria-label={resolvedAriaLabel}>
        {title && (
          <h3 className="text-sm font-semibold text-canon-black mb-3">
            {title}
          </h3>
        )}
        <p className="text-sm text-gray-500 text-center py-8">
          No data available to display chart.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      role="img"
      aria-label={resolvedAriaLabel}
      aria-describedby={ariaDescription ? 'bar-chart-desc' : undefined}
    >
      {ariaDescription && (
        <span id="bar-chart-desc" className="sr-only">
          {ariaDescription}
        </span>
      )}
      {title && (
        <h3 className="text-sm font-semibold text-canon-black mb-3">
          {title}
        </h3>
      )}
      <div className="relative">
        <svg
          ref={svgRef}
          className="w-full"
          style={{ minHeight: `${height}px` }}
          aria-hidden="true"
        />
        {showTooltip && (
          <div
            ref={tooltipRef}
            className="absolute pointer-events-none bg-canon-white border border-gray-200 rounded shadow-lg px-3 py-2 z-10"
            style={{ opacity: 0, visibility: 'hidden' }}
            role="tooltip"
          />
        )}
      </div>
      {showLegend && validYKeys.length > 0 && (
        <div
          className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-100"
          aria-label="Chart legend"
        >
          {validYKeys.map((key, i) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: resolvedColors[i] }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-gray-600">
                {resolvedLabels[i]}
              </span>
            </div>
          ))}
        </div>
      )}
      {/* Accessible data table for screen readers */}
      <table className="sr-only">
        <caption>{resolvedAriaLabel}</caption>
        <thead>
          <tr>
            <th scope="col">{xKey}</th>
            {resolvedLabels.map((label) => (
              <th key={label} scope="col">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {validData.map((row, i) => (
            <tr key={i}>
              <td>{String(row[xKey])}</td>
              {validYKeys.map((key) => (
                <td key={key}>
                  {typeof row[key] === 'number'
                    ? valueFormatter(row[key])
                    : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xKey: PropTypes.string.isRequired,
  yKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaDescription: PropTypes.string,
  mode: PropTypes.oneOf(['grouped', 'stacked']),
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  height: PropTypes.number,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  animate: PropTypes.bool,
  className: PropTypes.string,
  formatValue: PropTypes.func,
};

export default BarChart;