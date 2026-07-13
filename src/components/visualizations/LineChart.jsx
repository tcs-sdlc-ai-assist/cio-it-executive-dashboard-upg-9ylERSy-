import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/**
 * LineChart - D3.js line chart visualization component for trend data.
 *
 * Renders a multi-series line chart using D3.js with responsive SVG.
 * Supports supplier spend trends, budget burn-rate, and other time-series
 * visualizations. Includes axes, gridlines, tooltips, legend, and
 * Canon India colour tokens. Includes ARIA labels and role='img'.
 *
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of data objects to visualize
 * @param {string} props.xKey - Key in data objects for x-axis values (typically date/time)
 * @param {Array<string>} props.yKeys - Keys in data objects for y-axis values (one per line series)
 * @param {Array<string>} [props.labels] - Display labels for each yKey (defaults to yKeys)
 * @param {Array<string>} [props.colors] - Colour values for each yKey line
 * @param {string} [props.title] - Chart title displayed above the chart
 * @param {string} [props.ariaLabel] - Accessible label for the chart
 * @param {string} [props.ariaDescription] - Accessible description for the chart
 * @param {string} [props.xAxisLabel] - Label for the x-axis
 * @param {string} [props.yAxisLabel] - Label for the y-axis
 * @param {number} [props.height=300] - Chart height in pixels
 * @param {boolean} [props.showLegend=true] - Whether to show the legend
 * @param {boolean} [props.showTooltip=true] - Whether to enable tooltips
 * @param {boolean} [props.showDots=true] - Whether to show data point dots
 * @param {boolean} [props.showArea=false] - Whether to show filled area under lines
 * @param {boolean} [props.animate=true] - Whether to animate lines on render
 * @param {boolean} [props.curved=true] - Whether to use curved line interpolation
 * @param {string} [props.className] - Additional CSS classes
 * @param {function} [props.formatValue] - Custom value formatter for tooltips and axis
 * @param {function} [props.formatXValue] - Custom x-axis value formatter
 * @param {'date' | 'number' | 'category'} [props.xType='category'] - Type of x-axis data
 * @returns {React.ReactElement}
 */
export function LineChart({
  data,
  xKey,
  yKeys,
  labels,
  colors,
  title,
  ariaLabel,
  ariaDescription,
  xAxisLabel,
  yAxisLabel,
  height = 300,
  showLegend = true,
  showTooltip = true,
  showDots = true,
  showArea = false,
  animate = true,
  curved = true,
  className = '',
  formatValue,
  formatXValue,
  xType = 'category',
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const validData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('[LineChart] data prop must be a non-empty array.');
      return [];
    }
    return data;
  }, [data]);

  const validYKeys = useMemo(() => {
    if (!Array.isArray(yKeys) || yKeys.length === 0) {
      console.warn('[LineChart] yKeys prop must be a non-empty array.');
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

  const xValueFormatter = useCallback(
    (val) => {
      if (formatXValue) {
        return formatXValue(val);
      }
      if (xType === 'date' && val instanceof Date) {
        const month = val.toLocaleString('default', { month: 'short' });
        const year = val.getFullYear();
        return `${month} ${year}`;
      }
      return String(val);
    },
    [formatXValue, xType]
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
    if (
      !svgRef.current ||
      containerWidth === 0 ||
      validData.length === 0 ||
      validYKeys.length === 0
    ) {
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

    // Parse x values
    const parsedData = validData.map((d) => {
      const parsed = { ...d };
      if (xType === 'date') {
        const dateVal = d[xKey];
        if (dateVal instanceof Date) {
          parsed._xParsed = dateVal;
        } else {
          parsed._xParsed = new Date(dateVal);
        }
      } else if (xType === 'number') {
        parsed._xParsed = typeof d[xKey] === 'number' ? d[xKey] : Number(d[xKey]);
      } else {
        parsed._xParsed = String(d[xKey]);
      }
      return parsed;
    });

    // X scale
    let xScale;
    if (xType === 'date') {
      const xExtent = d3.extent(parsedData, (d) => d._xParsed);
      xScale = d3
        .scaleTime()
        .domain(xExtent)
        .range([0, width]);
    } else if (xType === 'number') {
      const xExtent = d3.extent(parsedData, (d) => d._xParsed);
      xScale = d3
        .scaleLinear()
        .domain(xExtent)
        .nice()
        .range([0, width]);
    } else {
      xScale = d3
        .scalePoint()
        .domain(parsedData.map((d) => d._xParsed))
        .range([0, width])
        .padding(0.5);
    }

    // Y scale
    const yMin = d3.min(validYKeys, (key) =>
      d3.min(parsedData, (d) => (typeof d[key] === 'number' ? d[key] : 0))
    ) || 0;
    const yMax = d3.max(validYKeys, (key) =>
      d3.max(parsedData, (d) => (typeof d[key] === 'number' ? d[key] : 0))
    ) || 0;

    const yPadding = (yMax - Math.min(yMin, 0)) * 0.1;
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(yMin, 0), yMax + yPadding])
      .nice()
      .range([chartHeight, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickSize(-width)
          .tickFormat('')
      )
      .selectAll('line')
      .style('stroke', '#e5e7eb')
      .style('stroke-dasharray', '3,3');

    g.selectAll('.grid .domain').remove();

    // X axis
    const xAxis = xType === 'date'
      ? d3.axisBottom(xScale).ticks(Math.min(parsedData.length, 8)).tickFormat((d) => xValueFormatter(d))
      : xType === 'number'
        ? d3.axisBottom(xScale).ticks(Math.min(parsedData.length, 8))
        : d3.axisBottom(xScale);

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis.tickSizeOuter(0))
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
          .axisLeft(yScale)
          .ticks(5)
          .tickFormat((d) => valueFormatter(d))
      )
      .selectAll('text')
      .style('font-size', '11px');

    // Line generator
    const curveType = curved ? d3.curveMonotoneX : d3.curveLinear;

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d._xParsed))
      .curve(curveType)
      .defined((d) => d._yVal != null && !isNaN(d._yVal));

    // Area generator
    const areaGenerator = d3
      .area()
      .x((d) => xScale(d._xParsed))
      .y0(chartHeight)
      .curve(curveType)
      .defined((d) => d._yVal != null && !isNaN(d._yVal));

    // Draw lines for each series
    validYKeys.forEach((key, i) => {
      const seriesData = parsedData.map((d) => ({
        ...d,
        _yVal: typeof d[key] === 'number' ? d[key] : null,
      }));

      // Area fill
      if (showArea) {
        const area = areaGenerator.y1((d) => yScale(d._yVal || 0));

        g.append('path')
          .datum(seriesData.filter((d) => d._yVal != null))
          .attr('fill', resolvedColors[i])
          .attr('fill-opacity', 0.1)
          .attr('stroke', 'none')
          .attr('d', area);
      }

      // Line path
      const line = lineGenerator.y((d) => yScale(d._yVal || 0));

      const path = g
        .append('path')
        .datum(seriesData.filter((d) => d._yVal != null))
        .attr('fill', 'none')
        .attr('stroke', resolvedColors[i])
        .attr('stroke-width', 2.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', line);

      // Animate line drawing
      if (animate) {
        const totalLength = path.node().getTotalLength();
        path
          .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
          .attr('stroke-dashoffset', totalLength)
          .transition()
          .duration(1000)
          .delay(i * 200)
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0);
      }

      // Data point dots
      if (showDots) {
        const dots = g
          .selectAll(`.dot-${i}`)
          .data(seriesData.filter((d) => d._yVal != null))
          .enter()
          .append('circle')
          .attr('class', `dot-${i}`)
          .attr('cx', (d) => xScale(d._xParsed))
          .attr('cy', (d) => yScale(d._yVal))
          .attr('r', 3.5)
          .attr('fill', resolvedColors[i])
          .attr('stroke', '#FFFFFF')
          .attr('stroke-width', 1.5)
          .style('cursor', 'pointer');

        if (animate) {
          dots
            .style('opacity', 0)
            .transition()
            .duration(300)
            .delay(i * 200 + 1000)
            .style('opacity', 1);
        }

        // Tooltip interaction on dots
        if (showTooltip && tooltipRef.current) {
          const tooltip = d3.select(tooltipRef.current);

          dots
            .on('mouseenter', function (event, d) {
              d3.select(this)
                .transition()
                .duration(150)
                .attr('r', 5.5);

              const xDisplay = xType === 'date'
                ? xValueFormatter(d._xParsed)
                : String(d[xKey]);

              tooltip
                .style('opacity', 1)
                .style('visibility', 'visible')
                .html(
                  `<div class="text-xs font-semibold text-canon-black">${xDisplay}</div>` +
                  `<div class="text-xs text-gray-600">${resolvedLabels[i]}: ${valueFormatter(d._yVal)}</div>`
                );
            })
            .on('mousemove', function (event) {
              const containerRect = containerRef.current.getBoundingClientRect();
              const xPos = event.clientX - containerRect.left + 12;
              const yPos = event.clientY - containerRect.top - 28;
              tooltip.style('left', `${xPos}px`).style('top', `${yPos}px`);
            })
            .on('mouseleave', function () {
              d3.select(this)
                .transition()
                .duration(150)
                .attr('r', 3.5);

              tooltip.style('opacity', 0).style('visibility', 'hidden');
            });
        }
      }
    });

    // Vertical hover line for tooltip (when dots are hidden)
    if (showTooltip && !showDots && tooltipRef.current) {
      const tooltip = d3.select(tooltipRef.current);

      const hoverLine = g
        .append('line')
        .attr('class', 'hover-line')
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .style('stroke', '#9ca3af')
        .style('stroke-width', 1)
        .style('stroke-dasharray', '4,4')
        .style('opacity', 0)
        .style('pointer-events', 'none');

      const overlay = g
        .append('rect')
        .attr('width', width)
        .attr('height', chartHeight)
        .style('fill', 'none')
        .style('pointer-events', 'all');

      overlay
        .on('mousemove', function (event) {
          const [mouseX] = d3.pointer(event);

          let closestIndex = 0;
          let closestDist = Infinity;

          parsedData.forEach((d, idx) => {
            const dist = Math.abs(xScale(d._xParsed) - mouseX);
            if (dist < closestDist) {
              closestDist = dist;
              closestIndex = idx;
            }
          });

          const closestData = parsedData[closestIndex];
          const xPos = xScale(closestData._xParsed);

          hoverLine
            .attr('x1', xPos)
            .attr('x2', xPos)
            .style('opacity', 1);

          const xDisplay = xType === 'date'
            ? xValueFormatter(closestData._xParsed)
            : String(closestData[xKey]);

          let tooltipHtml = `<div class="text-xs font-semibold text-canon-black">${xDisplay}</div>`;
          validYKeys.forEach((key, i) => {
            const val = typeof closestData[key] === 'number' ? closestData[key] : null;
            if (val != null) {
              tooltipHtml += `<div class="text-xs text-gray-600"><span style="color:${resolvedColors[i]}">●</span> ${resolvedLabels[i]}: ${valueFormatter(val)}</div>`;
            }
          });

          const containerRect = containerRef.current.getBoundingClientRect();
          const tipX = event.clientX - containerRect.left + 12;
          const tipY = event.clientY - containerRect.top - 28;

          tooltip
            .style('opacity', 1)
            .style('visibility', 'visible')
            .style('left', `${tipX}px`)
            .style('top', `${tipY}px`)
            .html(tooltipHtml);
        })
        .on('mouseleave', function () {
          hoverLine.style('opacity', 0);
          tooltip.style('opacity', 0).style('visibility', 'hidden');
        });
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
    xType,
    resolvedLabels,
    resolvedColors,
    xAxisLabel,
    yAxisLabel,
    animate,
    showTooltip,
    showDots,
    showArea,
    curved,
    valueFormatter,
    xValueFormatter,
  ]);

  const resolvedAriaLabel =
    ariaLabel || title || 'Line chart visualization';

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
      aria-describedby={ariaDescription ? 'line-chart-desc' : undefined}
    >
      {ariaDescription && (
        <span id="line-chart-desc" className="sr-only">
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
                className="inline-block w-3 h-0.5 flex-shrink-0 rounded"
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

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xKey: PropTypes.string.isRequired,
  yKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaDescription: PropTypes.string,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  height: PropTypes.number,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  showDots: PropTypes.bool,
  showArea: PropTypes.bool,
  animate: PropTypes.bool,
  curved: PropTypes.bool,
  className: PropTypes.string,
  formatValue: PropTypes.func,
  formatXValue: PropTypes.func,
  xType: PropTypes.oneOf(['date', 'number', 'category']),
};

export default LineChart;