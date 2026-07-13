import PropTypes from 'prop-types';

/**
 * RAGIndicator - RAG (Red/Amber/Green) status indicator with accessible labels.
 *
 * Renders a coloured badge with icon and accessible text label.
 * Uses Canon India colours (dangerRed, warningAmber, successGreen).
 * Does not rely on colour alone — includes icon and text for WCAG AA compliance.
 *
 * @param {Object} props
 * @param {'red' | 'amber' | 'green'} [props.status='green'] - RAG status value
 * @param {string} [props.label] - Custom label text (overrides default status label)
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Badge size variant
 * @param {boolean} [props.showIcon=true] - Whether to show the status icon
 * @param {boolean} [props.showDot=true] - Whether to show the coloured dot indicator
 * @param {boolean} [props.showLabel=true] - Whether to show the text label
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function RAGIndicator({
  status = 'green',
  label,
  size = 'md',
  showIcon = true,
  showDot = true,
  showLabel = true,
  className = '',
}) {
  const statusConfig = {
    red: {
      dotClass: 'bg-danger',
      textClass: 'text-danger',
      badgeBgClass: 'bg-red-50',
      badgeBorderClass: 'border-danger',
      defaultLabel: 'At Risk',
      icon: '✕',
    },
    amber: {
      dotClass: 'bg-warning',
      textClass: 'text-yellow-700',
      badgeBgClass: 'bg-yellow-50',
      badgeBorderClass: 'border-warning',
      defaultLabel: 'Needs Attention',
      icon: '⚠',
    },
    green: {
      dotClass: 'bg-success',
      textClass: 'text-success',
      badgeBgClass: 'bg-green-50',
      badgeBorderClass: 'border-success',
      defaultLabel: 'On Track',
      icon: '✓',
    },
  };

  const config = statusConfig[status];

  if (!config) {
    console.warn(
      `[RAGIndicator] Invalid status "${status}" provided. Must be one of "red", "amber", "green". Falling back to "green".`
    );
  }

  const resolvedConfig = config || statusConfig.green;
  const displayLabel = label || resolvedConfig.defaultLabel;

  const sizeClassMap = {
    sm: {
      container: 'px-2 py-0.5 text-xs gap-1',
      dot: 'w-1.5 h-1.5',
      icon: 'text-xs',
    },
    md: {
      container: 'px-2.5 py-1 text-sm gap-1.5',
      dot: 'w-2 h-2',
      icon: 'text-sm',
    },
    lg: {
      container: 'px-3 py-1.5 text-base gap-2',
      dot: 'w-2.5 h-2.5',
      icon: 'text-base',
    },
  };

  const sizeConfig = sizeClassMap[size];

  if (!sizeConfig) {
    console.warn(
      `[RAGIndicator] Invalid size "${size}" provided. Falling back to "md".`
    );
  }

  const resolvedSizeConfig = sizeConfig || sizeClassMap.md;

  const containerClasses = [
    'inline-flex items-center rounded-full border font-medium',
    resolvedConfig.badgeBgClass,
    resolvedConfig.badgeBorderClass,
    resolvedSizeConfig.container,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={containerClasses}
      role="status"
      aria-label={displayLabel}
    >
      {showDot && (
        <span
          className={`inline-block rounded-full flex-shrink-0 ${resolvedSizeConfig.dot} ${resolvedConfig.dotClass}`}
          aria-hidden="true"
        />
      )}
      {showIcon && (
        <span
          className={`flex-shrink-0 ${resolvedSizeConfig.icon} ${resolvedConfig.textClass}`}
          aria-hidden="true"
        >
          {resolvedConfig.icon}
        </span>
      )}
      {showLabel && (
        <span className={resolvedConfig.textClass}>
          {displayLabel}
        </span>
      )}
      {!showLabel && (
        <span className="sr-only">{displayLabel}</span>
      )}
    </span>
  );
}

RAGIndicator.propTypes = {
  status: PropTypes.oneOf(['red', 'amber', 'green']),
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showIcon: PropTypes.bool,
  showDot: PropTypes.bool,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};

export default RAGIndicator;