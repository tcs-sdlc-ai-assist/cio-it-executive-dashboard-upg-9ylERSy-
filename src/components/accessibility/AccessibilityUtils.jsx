import { useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * AccessibleButton - Button component with ARIA label, focus ring, and keyboard support.
 *
 * Renders a button element with proper ARIA attributes, visible focus ring
 * (WCAG AA compliant), and keyboard event handling (Enter and Space).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.label] - Visible button text (used if children not provided)
 * @param {function} [props.onClick] - Click handler callback
 * @param {string} [props.ariaLabel] - Accessible label for screen readers
 * @param {number} [props.tabIndex=0] - Tab index for focus order
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.type='button'] - Button type attribute
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant='default'] - Button style variant (default | primary | ghost)
 * @param {Object} [props.rest] - Additional props passed to the button element
 * @returns {React.ReactElement}
 */
export function AccessibleButton({
  children,
  label,
  onClick,
  ariaLabel,
  tabIndex = 0,
  disabled = false,
  type = 'button',
  className = '',
  variant = 'default',
  ...rest
}) {
  const handleClick = useCallback(
    (event) => {
      if (!disabled && onClick) {
        onClick(event);
      }
    },
    [disabled, onClick]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!disabled && onClick) {
          onClick(event);
        }
      }
    },
    [disabled, onClick]
  );

  const variantClassMap = {
    default:
      'bg-canon-white text-canon-black border border-gray-300 hover:bg-gray-100',
    primary:
      'bg-canon-red text-canon-white hover:bg-red-700',
    ghost:
      'bg-transparent text-canon-black hover:bg-gray-100',
  };

  const variantClass = variantClassMap[variant] || variantClassMap.default;

  const buttonClasses = [
    'inline-flex items-center justify-center px-4 py-2 rounded font-medium text-sm',
    'transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red',
    variantClass,
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = children || label;

  if (!content && !ariaLabel) {
    console.warn(
      '[AccessibleButton] Button must have either children, label, or ariaLabel for accessibility.'
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel || undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={tabIndex}
      {...rest}
    >
      {content}
    </button>
  );
}

AccessibleButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'ghost']),
};

/**
 * AccessibleLabel - Screen-reader-only label for form fields and icons.
 *
 * Renders a label element that is visually hidden but accessible to screen readers.
 * Useful for providing accessible names to form controls or icon-only buttons.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Label text content
 * @param {string} [props.htmlFor] - ID of the associated form element
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.as='label'] - HTML element to render as
 * @returns {React.ReactElement}
 */
export function AccessibleLabel({
  children,
  htmlFor,
  className = '',
  as: Component = 'label',
}) {
  const labelClasses = [
    'sr-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const props = {
    className: labelClasses,
  };

  if (Component === 'label' && htmlFor) {
    props.htmlFor = htmlFor;
  }

  return <Component {...props}>{children}</Component>;
}

AccessibleLabel.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  as: PropTypes.string,
};

/**
 * SkipLink - Skip to main content link for keyboard navigation.
 *
 * Renders an anchor element that is visually hidden until focused,
 * allowing keyboard users to skip repetitive navigation and jump
 * directly to the main content area.
 *
 * @param {Object} props
 * @param {string} [props.targetId='main-content'] - ID of the target element to skip to
 * @param {string} [props.label='Skip to main content'] - Link text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function SkipLink({
  targetId = 'main-content',
  label = 'Skip to main content',
  className = '',
}) {
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.removeAttribute('tabindex');
      }
    },
    [targetId]
  );

  const linkClasses = [
    'sr-only focus:not-sr-only',
    'focus:fixed focus:top-2 focus:left-2 focus:z-50',
    'focus:bg-canon-red focus:text-canon-white',
    'focus:px-4 focus:py-2 focus:rounded focus:shadow-lg',
    'focus:font-semibold focus:text-sm',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red',
    'transition-colors',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={`#${targetId}`}
      className={linkClasses}
      onClick={handleClick}
    >
      {label}
    </a>
  );
}

SkipLink.propTypes = {
  targetId: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

/**
 * VisuallyHidden - Screen-reader-only text wrapper.
 *
 * Renders content that is visually hidden but remains accessible
 * to screen readers and assistive technologies. Uses the sr-only
 * Tailwind utility for proper hiding technique.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to hide visually
 * @param {string} [props.as='span'] - HTML element to render as
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.role] - ARIA role attribute
 * @returns {React.ReactElement}
 */
export function VisuallyHidden({
  children,
  as: Component = 'span',
  className = '',
  role,
}) {
  const hiddenClasses = [
    'sr-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={hiddenClasses} role={role || undefined}>
      {children}
    </Component>
  );
}

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
};

/**
 * StatusIndicator - Non-colour status indicator for WCAG AA compliance.
 *
 * Renders a status indicator that uses both colour and a text/icon label
 * to convey status, ensuring information is not communicated by colour alone.
 *
 * @param {Object} props
 * @param {'success' | 'warning' | 'danger' | 'neutral'} [props.status='neutral'] - Status type
 * @param {string} [props.label] - Status label text
 * @param {boolean} [props.showDot=true] - Whether to show the coloured dot indicator
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function StatusIndicator({
  status = 'neutral',
  label,
  showDot = true,
  className = '',
}) {
  const statusConfig = {
    success: {
      dotClass: 'bg-success',
      textClass: 'text-success',
      defaultLabel: 'Success',
      icon: '✓',
    },
    warning: {
      dotClass: 'bg-warning',
      textClass: 'text-yellow-700',
      defaultLabel: 'Warning',
      icon: '⚠',
    },
    danger: {
      dotClass: 'bg-danger',
      textClass: 'text-danger',
      defaultLabel: 'Danger',
      icon: '✕',
    },
    neutral: {
      dotClass: 'bg-gray-400',
      textClass: 'text-gray-600',
      defaultLabel: 'Neutral',
      icon: '—',
    },
  };

  const config = statusConfig[status] || statusConfig.neutral;
  const displayLabel = label || config.defaultLabel;

  const containerClasses = [
    'inline-flex items-center gap-1.5 text-sm font-medium',
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
          className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${config.dotClass}`}
          aria-hidden="true"
        />
      )}
      <span className={config.textClass} aria-hidden="true">
        {config.icon}
      </span>
      <span className={config.textClass}>{displayLabel}</span>
    </span>
  );
}

StatusIndicator.propTypes = {
  status: PropTypes.oneOf(['success', 'warning', 'danger', 'neutral']),
  label: PropTypes.string,
  showDot: PropTypes.bool,
  className: PropTypes.string,
};

export default {
  AccessibleButton,
  AccessibleLabel,
  SkipLink,
  VisuallyHidden,
  StatusIndicator,
};