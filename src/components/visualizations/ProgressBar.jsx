import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * ProgressBar - Animated progress bar visualization component.
 *
 * Renders a horizontal progress bar with percentage text, ARIA progressbar role,
 * and aria-valuenow/min/max attributes. Styled with Canon India design tokens.
 * Accepts value (0-100), label, and optional colour prop.
 *
 * @param {Object} props
 * @param {number} [props.value=0] - Progress value between 0 and 100
 * @param {string} [props.label] - Accessible label for the progress bar
 * @param {string} [props.color='canon-red'] - Tailwind colour class for the bar fill
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Height variant of the progress bar
 * @param {boolean} [props.showValue=true] - Whether to display the percentage text
 * @param {boolean} [props.animate=true] - Whether to animate the bar width transition
 * @param {string} [props.className] - Additional CSS classes
 * @param {'inside' | 'outside' | 'none'} [props.valuePosition='outside'] - Position of the percentage text
 * @param {string} [props.trackColor] - Tailwind background class for the track
 * @returns {React.ReactElement}
 */
export function ProgressBar({
  value = 0,
  label,
  color = 'canon-red',
  size = 'md',
  showValue = true,
  animate = true,
  className = '',
  valuePosition = 'outside',
  trackColor,
}) {
  const clampedValue = useMemo(() => {
    const num = typeof value === 'number' ? value : 0;
    if (num < 0) {
      console.warn(
        `[ProgressBar] Value "${value}" is below 0. Clamping to 0.`
      );
      return 0;
    }
    if (num > 100) {
      console.warn(
        `[ProgressBar] Value "${value}" is above 100. Clamping to 100.`
      );
      return 100;
    }
    return Math.round(num);
  }, [value]);

  const sizeClassMap = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  const sizeClass = sizeClassMap[size];

  if (!sizeClass) {
    console.warn(
      `[ProgressBar] Invalid size "${size}" provided. Falling back to "md".`
    );
  }

  const resolvedSizeClass = sizeClass || sizeClassMap.md;

  const colorClassMap = {
    'canon-red': 'bg-canon-red',
    'success': 'bg-success',
    'warning': 'bg-warning',
    'danger': 'bg-danger',
    'green': 'bg-success',
    'amber': 'bg-warning',
    'red': 'bg-danger',
  };

  const barColorClass = colorClassMap[color] || `bg-${color}`;

  const resolvedTrackColor = trackColor || 'bg-gray-200';

  const displayLabel = label || 'Progress';

  const containerClasses = [
    'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trackClasses = [
    'w-full rounded-full overflow-hidden',
    resolvedTrackColor,
    resolvedSizeClass,
  ]
    .filter(Boolean)
    .join(' ');

  const barClasses = [
    'h-full rounded-full',
    barColorClass,
    animate ? 'transition-all duration-500 ease-in-out' : '',
    valuePosition === 'inside' && size === 'lg'
      ? 'flex items-center justify-end'
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  const barStyle = {
    width: `${clampedValue}%`,
  };

  const showOutsideValue = showValue && valuePosition === 'outside';
  const showInsideValue =
    showValue && valuePosition === 'inside' && size === 'lg' && clampedValue > 10;

  return (
    <div className={containerClasses}>
      {(label || showOutsideValue) && (
        <div className="flex items-center justify-between mb-1">
          {label && (
            <span className="text-sm font-medium text-canon-black truncate">
              {displayLabel}
            </span>
          )}
          {showOutsideValue && (
            <span className="text-sm font-semibold text-canon-black ml-2 flex-shrink-0">
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div
        className={trackClasses}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={displayLabel}
      >
        <div
          className={barClasses}
          style={barStyle}
        >
          {showInsideValue && (
            <span className="text-xs font-semibold text-canon-white pr-2">
              {clampedValue}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showValue: PropTypes.bool,
  animate: PropTypes.bool,
  className: PropTypes.string,
  valuePosition: PropTypes.oneOf(['inside', 'outside', 'none']),
  trackColor: PropTypes.string,
};

export default ProgressBar;