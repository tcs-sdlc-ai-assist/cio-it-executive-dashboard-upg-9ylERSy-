import { useCallback, useId } from 'react';
import PropTypes from 'prop-types';

/**
 * FilterDropdown - Accessible filter dropdown for data tables.
 *
 * Reusable filter dropdown component for filtering data tables by category.
 * Accepts options array, selected value, onChange handler, and label.
 * Includes accessible label, focus states, and Canon India form field styling.
 *
 * @param {Object} props
 * @param {Array<{value: string, label: string}>} props.options - Array of option objects with value and label
 * @param {string} [props.value=''] - Currently selected value
 * @param {function} props.onChange - Callback when selection changes, receives the new value string
 * @param {string} [props.label='Filter'] - Accessible label for the dropdown
 * @param {string} [props.placeholder='All'] - Placeholder option text shown when no value is selected
 * @param {boolean} [props.showLabel=true] - Whether to show the visible label text
 * @param {boolean} [props.disabled=false] - Whether the dropdown is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Dropdown size variant
 * @param {string} [props.ariaLabel] - Custom ARIA label (overrides label prop for screen readers)
 * @param {boolean} [props.fullWidth=false] - Whether the dropdown should take full width
 * @returns {React.ReactElement}
 */
export function FilterDropdown({
  options,
  value = '',
  onChange,
  label = 'Filter',
  placeholder = 'All',
  showLabel = true,
  disabled = false,
  className = '',
  size = 'md',
  ariaLabel,
  fullWidth = false,
}) {
  const generatedId = useId();
  const selectId = `filter-dropdown-${generatedId}`;

  const handleChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );

  const validOptions = Array.isArray(options) ? options : [];

  if (!Array.isArray(options)) {
    console.warn('[FilterDropdown] options prop must be an array.');
  }

  const sizeClassMap = {
    sm: {
      select: 'px-2 py-1 text-xs',
      label: 'text-xs',
    },
    md: {
      select: 'px-3 py-2 text-sm',
      label: 'text-sm',
    },
    lg: {
      select: 'px-4 py-2.5 text-base',
      label: 'text-base',
    },
  };

  const sizeConfig = sizeClassMap[size];

  if (!sizeConfig) {
    console.warn(
      `[FilterDropdown] Invalid size "${size}" provided. Falling back to "md".`
    );
  }

  const resolvedSizeConfig = sizeConfig || sizeClassMap.md;

  const containerClasses = [
    'flex flex-col gap-1',
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const selectClasses = [
    'appearance-none rounded border border-gray-300 bg-canon-white text-canon-black',
    'transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red',
    'hover:border-gray-400',
    resolvedSizeConfig.select,
    disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer',
    fullWidth ? 'w-full' : '',
    'pr-8',
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedAriaLabel = ariaLabel || label;

  return (
    <div className={containerClasses}>
      {showLabel && (
        <label
          htmlFor={selectId}
          className={`font-medium text-canon-black ${resolvedSizeConfig.label}`}
        >
          {label}
        </label>
      )}
      <div className="relative inline-flex">
        <select
          id={selectId}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={selectClasses}
          aria-label={!showLabel ? resolvedAriaLabel : undefined}
        >
          <option value="">{placeholder}</option>
          {validOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500"
          aria-hidden="true"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

FilterDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  ariaLabel: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default FilterDropdown;