import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/**
 * DonutChart - D3.js donut/pie chart visualization component.
 *
 * Renders a donut chart using D3.js with responsive SVG for spend split
 * visualizations. Accepts data array with {label, value, color} entries.
 * Includes legend, tooltips, percentage labels, and Canon India colour palette.
 * Includes ARIA labels and role='img'.
 *
 * @param {Object} props
 * @param {Array<{label: string, value: number, color?: string}>} props.data - Array of data entries
 * @param {string} [props.title] - Chart title displayed above the chart
 * @param {string} [props.ariaLabel] - Accessible label for the chart
 * @param {string} [props.ariaDescription] - Accessible description for the chart
 * @param {number} [props.height=300] - Chart height in pixels
 * @param {number} [props.innerRadiusRatio=0.55] - Inner radius as ratio of outer radius (0 = pie, >0 = donut)
 * @param {boolean} [props.showLegend=true] - Whether to show the legend
 * @param {boolean} [props.showTooltip=true] - Whether to enable tooltips
 * @param {boolean} [props.showLabels=true] - Whether to show percentage labels on slices
 * @param {boolean} [props.animate=true] - Whether to animate slices on render
 * @param {string} [props.className] - Additional CSS classes
 * @param {function} [props.formatValue] - Custom value formatter for tooltips and legend
 * @param {string} [props.centerLabel] - Text to display in the center of the donut
 * @param {string|number} [props.centerValue] - Value to display in the center of the donut
 * @returns {React.ReactElement}
 */
export function DonutChart({
  data,
  title,
  ariaLabel,
  ariaDescription,
  height = 300,
  innerRadiusRatio = 0.55,
  showLegend = true,
  showTooltip = true,
  showLabels = true,
  animate = true,
  className = '',
  formatValue,
  centerLabel,
  centerValue,
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const defaultColors = [
    '#E60012',
    '#28A745',
    '#FFC107',
    '#6C757D',
    '#007BFF',
    '#17A2B8',
    '#6F42C1',
    '#FD7E14',
    '#20C997',
    '#E83E8C',
  ];

  const validData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('[DonutChart] data prop must be a non-empty array.');
      return [];
    }
    return data.filter((d) => {
      if (d == null || typeof d.value !== 'number' || d.value < 0) {
        console.warn(
          '[DonutChart] Each data entry must have a non-negative numeric "value".'
        );
        return false;
      }
      return true;
    });
  }, [data]);

  const total = useMemo(() => {
    return validData.reduce((sum, d) => sum + d.value, 0);
  }, [validData]);

  const resolvedColors = useMemo(() => {
    return validData.map(
      (d, i) => d.color || defaultColors[i % defaultColors.length]
    );
  }, [validData]);

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

  const getPercentage = useCallback(
    (value) => {
      if (total === 0) return '0';
      return ((value / total) * 100).toFixed(1);
    },
    [total]
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
      total === 0
    ) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const size = Math.min(containerWidth, height);
    const margin = 10;
    const outerRadius = (size - margin * 2) / 2;
    const innerRadius = outerRadius * Math.max(0, Math.min(innerRadiusRatio, 0.95));

    svg.attr('width', containerWidth).attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${containerWidth / 2},${height / 2})`);

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.02);

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const arcHover = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius + 6);

    const labelArc = d3
      .arc()
      .innerRadius(outerRadius * 0.72)
      .outerRadius(outerRadius * 0.72);

    const pieData = pie(validData);

    // Draw slices
    const slices = g
      .selectAll('.slice')
      .data(pieData)
      .enter()
      .append('path')
      .attr('class', 'slice')
      .attr('fill', (d, i) => resolvedColors[i])
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    if (animate) {
      slices
        .transition()
        .duration(800)
        .attrTween('d', function (d) {
          const interpolate = d3.interpolate(
            { startAngle: d.startAngle, endAngle: d.startAngle },
            d
          );
          return function (t) {
            return arc(interpolate(t));
          };
        });
    } else {
      slices.attr('d', arc);
    }

    // Percentage labels on slices
    if (showLabels) {
      const labels = g
        .selectAll('.slice-label')
        .data(pieData)
        .enter()
        .append('text')
        .attr('class', 'slice-label')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('font-size', '11px')
        .style('font-weight', '600')
        .style('fill', '#FFFFFF')
        .style('pointer-events', 'none')
        .text((d) => {
          const pct = getPercentage(d.data.value);
          return parseFloat(pct) >= 5 ? `${pct}%` : '';
        });

      if (animate) {
        labels.style('opacity', 0).transition().delay(800).duration(300).style('opacity', 1);
      }

      labels.attr('transform', (d) => `translate(${labelArc.centroid(d)})`);
    }

    // Center text
    if (centerLabel || centerValue != null) {
      if (centerValue != null) {
        g.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', centerLabel ? '-0.3em' : '0.35em')
          .style('font-size', '18px')
          .style('font-weight', '700')
          .style('fill', '#000000')
          .text(
            typeof centerValue === 'number'
              ? valueFormatter(centerValue)
              : String(centerValue)
          );
      }

      if (centerLabel) {
        g.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', centerValue != null ? '1.2em' : '0.35em')
          .style('font-size', '12px')
          .style('font-weight', '500')
          .style('fill', '#6B7280')
          .text(centerLabel);
      }
    }

    // Tooltip interaction
    if (showTooltip && tooltipRef.current) {
      const tooltip = d3.select(tooltipRef.current);

      slices
        .on('mouseenter', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('d', arcHover);

          const pct = getPercentage(d.data.value);
          tooltip
            .style('opacity', 1)
            .style('visibility', 'visible')
            .html(
              `<div class="text-xs font-semibold text-canon-black">${d.data.label || 'Unknown'}</div>` +
              `<div class="text-xs text-gray-600">${valueFormatter(d.data.value)} (${pct}%)</div>`
            );
        })
        .on('mousemove', function (event) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const x = event.clientX - containerRect.left + 12;
          const y = event.clientY - containerRect.top - 28;
          tooltip.style('left', `${x}px`).style('top', `${y}px`);
        })
        .on('mouseleave', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('d', arc);

          tooltip.style('opacity', 0).style('visibility', 'hidden');
        });
    }
  }, [
    containerWidth,
    height,
    validData,
    total,
    resolvedColors,
    innerRadiusRatio,
    animate,
    showTooltip,
    showLabels,
    centerLabel,
    centerValue,
    valueFormatter,
    getPercentage,
  ]);

  const resolvedAriaLabel = ariaLabel || title || 'Donut chart visualization';

  const containerClasses = [
    'w-full bg-canon-white rounded-lg shadow-sm border border-gray-200 p-4',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (validData.length === 0) {
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
      aria-describedby={ariaDescription ? 'donut-chart-desc' : undefined}
    >
      {ariaDescription && (
        <span id="donut-chart-desc" className="sr-only">
          {ariaDescription}
        </span>
      )}
      {title && (
        <h3 className="text-sm font-semibold text-canon-black mb-3">
          {title}
        </h3>
      )}
      <div className="relative flex justify-center">
        <svg
          ref={svgRef}
          className="w-full"
          style={{ minHeight: `${height}px`, maxWidth: `${height}px` }}
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
      {showLegend && validData.length > 0 && (
        <div
          className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-100"
          aria-label="Chart legend"
        >
          {validData.map((entry, i) => (
            <div key={entry.label || i} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: resolvedColors[i] }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-gray-600">
                {entry.label || 'Unknown'}
              </span>
              <span className="text-xs text-gray-400">
                ({getPercentage(entry.value)}%)
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
            <th scope="col">Category</th>
            <th scope="col">Value</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {validData.map((entry, i) => (
            <tr key={entry.label || i}>
              <td>{entry.label || 'Unknown'}</td>
              <td>{valueFormatter(entry.value)}</td>
              <td>{getPercentage(entry.value)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaDescription: PropTypes.string,
  height: PropTypes.number,
  innerRadiusRatio: PropTypes.number,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  showLabels: PropTypes.bool,
  animate: PropTypes.bool,
  className: PropTypes.string,
  formatValue: PropTypes.func,
  centerLabel: PropTypes.string,
  centerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DonutChart;