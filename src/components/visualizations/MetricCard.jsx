import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { RAGIndicator } from './RAGIndicator';

/**
 * MetricCard - KPI metric display card component.
 *
 * Reusable metric card displaying a single KPI value with label,
 * optional trend indicator (up/down arrow), and optional RAG status.
 * Styled as a Canon India product card with consistent padding,
 * border radius, and shadow. Includes ARIA attributes for accessibility.
 *
 * @param {Object} props
 * @param {string} props.label - KPI metric label text
 * @param {string|number} props.value - KPI metric value to display
 * @param {string} [props.unit] - Unit suffix displayed after the value (e.g., '%', '₹', 'M')
 * @param {string} [props.prefix] - Prefix displayed before the value (e.g., '₹', '$')
 * @param {'up' | 'down' | 'flat' | null} [props.trend=null] - Trend direction indicator
 * @param {string} [props.trendValue] - Trend value text (e.g., '+5%', '-2.3%')
 * @param {'positive' | 'negative' | 'neutral'} [props.trendSentiment='neutral'] - Whether the trend is good or bad
 * @param {'red' | 'amber' | 'green' | null} [props.ragStatus=null] - Optional RAG status
 * @param {string} [props.ragLabel] - Custom label for the RAG indicator
 * @param {string} [props.description] - Additional description text below the value
 * @param {string} [props.className] - Additional CSS classes
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Card size variant
 * @param {function} [props.formatValue] - Custom value formatter function
 * @returns {React.ReactElement}
 */
export function MetricCard({
  label,
  value,
  unit,
  prefix,
  trend = null,
  trendValue,
  trendSentiment = 'neutral',
  ragStatus = null,
  ragLabel,
  description,
  className = '',
  size = 'md',
  formatValue,
}) {
  const formattedValue = useMemo(() => {
    if (formatValue) {
      return formatValue(value);
    }
    if (value == null) {
      return '—';
    }
    if (typeof value === 'number') {
      if (Math.abs(value) >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      }
      if (Math.abs(value) >= 1000) {
        return `${(value / 1000).toFixed(0)}K`;
      }
      return value.toLocaleString();
    }
    return String(value);
  }, [value, formatValue]);

  const sizeClassMap = {
    sm: {
      container: 'p-3',
      label: 'text-xs',
      value: 'text-lg',
      description: 'text-xs',
      trend: 'text-xs',
    },
    md: {
      container: 'p-4',
      label: 'text-sm',
      value: 'text-2xl',
      description: 'text-xs',
      trend: 'text-sm',
    },
    lg: {
      container: 'p-5',
      label: 'text-base',
      value: 'text-3xl',
      description: 'text-sm',
      trend: 'text-sm',
    },
  };

  const sizeConfig = sizeClassMap[size];

  if (!sizeConfig) {
    console.warn(
      `[MetricCard] Invalid size "${size}" provided. Falling back to "md".`
    );
  }

  const resolvedSizeConfig = sizeConfig || sizeClassMap.md;

  const trendConfig = useMemo(() => {
    const configs = {
      up: {
        icon: '↑',
        ariaLabel: 'Trending up',
      },
      down: {
        icon: '↓',
        ariaLabel: 'Trending down',
      },
      flat: {
        icon: '→',
        ariaLabel: 'No change',
      },
    };
    return trend ? configs[trend] || null : null;
  }, [trend]);

  const trendColorClass = useMemo(() => {
    const sentimentMap = {
      positive: 'text-success',
      negative: 'text-danger',
      neutral: 'text-gray-500',
    };
    return sentimentMap[trendSentiment] || sentimentMap.neutral;
  }, [trendSentiment]);

  const containerClasses = [
    'bg-canon-white rounded-lg shadow-sm border border-gray-200',
    'flex flex-col justify-between',
    'transition-shadow hover:shadow-md',
    resolvedSizeConfig.container,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const displayLabel = label || 'Metric';

  const ariaDescription = [
    displayLabel,
    `${prefix || ''}${formattedValue}${unit || ''}`,
    trendConfig ? trendConfig.ariaLabel : '',
    trendValue || '',
    ragStatus ? `Status: ${ragLabel || ragStatus}` : '',
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className={containerClasses}
      role="group"
      aria-label={ariaDescription}
    >
      {/* Header row: label + RAG */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`${resolvedSizeConfig.label} font-medium text-gray-500 leading-tight`}
        >
          {displayLabel}
        </span>
        {ragStatus && (
          <RAGIndicator
            status={ragStatus}
            label={ragLabel}
            size="sm"
            showIcon
            showDot={false}
            showLabel={false}
          />
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span
            className={`${resolvedSizeConfig.value} font-bold text-canon-black`}
          >
            {prefix}
          </span>
        )}
        <span
          className={`${resolvedSizeConfig.value} font-bold text-canon-black leading-tight`}
        >
          {formattedValue}
        </span>
        {unit && (
          <span
            className={`${resolvedSizeConfig.label} font-medium text-gray-500 ml-0.5`}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Trend + Description row */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          {trendConfig && (
            <span
              className={`${resolvedSizeConfig.trend} font-semibold ${trendColorClass}`}
              aria-hidden="true"
            >
              {trendConfig.icon}
            </span>
          )}
          {trendValue && (
            <span
              className={`${resolvedSizeConfig.trend} font-medium ${trendColorClass}`}
            >
              {trendValue}
            </span>
          )}
          {trendConfig && (
            <span className="sr-only">
              {trendConfig.ariaLabel}
              {trendValue ? ` ${trendValue}` : ''}
            </span>
          )}
        </div>
        {ragStatus && ragLabel && (
          <span
            className={`${resolvedSizeConfig.description} text-gray-400 hidden sm:inline`}
          >
            {ragLabel}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p
          className={`${resolvedSizeConfig.description} text-gray-400 mt-1 leading-snug`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
  prefix: PropTypes.string,
  trend: PropTypes.oneOf(['up', 'down', 'flat']),
  trendValue: PropTypes.string,
  trendSentiment: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  ragStatus: PropTypes.oneOf(['red', 'amber', 'green']),
  ragLabel: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  formatValue: PropTypes.func,
};

export default MetricCard;