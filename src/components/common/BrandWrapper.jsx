import PropTypes from 'prop-types';
import { useTheme } from '../../design-system/ThemeProvider';

/**
 * BrandWrapper - Brand consistency wrapper enforcing Canon India design rules.
 *
 * Wraps dashboard sections to ensure Canon India Consumer Experience design
 * guidelines are consistently applied. Enforces consistent padding, max-width
 * container, background colour, typography, and brand-compliant styling.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.as='div'] - HTML element to render as
 * @param {string} [props.padding='4'] - Tailwind padding value (e.g., '4' for p-4)
 * @param {'default' | 'surface' | 'elevated'} [props.variant='default'] - Visual variant
 * @param {boolean} [props.fullWidth=false] - Whether to remove max-width constraint
 * @param {string} [props.id] - HTML id attribute
 * @param {string} [props.role] - ARIA role attribute
 * @param {string} [props.ariaLabel] - Accessible label for the wrapper
 * @returns {React.ReactElement}
 */
export function BrandWrapper({
  children,
  className = '',
  as: Component = 'div',
  padding = '4',
  variant = 'default',
  fullWidth = false,
  id,
  role,
  ariaLabel,
}) {
  const { tokens } = useTheme();

  const paddingClassMap = {
    '0': 'p-0',
    '1': 'p-1',
    '2': 'p-2',
    '3': 'p-3',
    '4': 'p-4',
    '5': 'p-5',
    '6': 'p-6',
    '8': 'p-8',
    '10': 'p-10',
    '12': 'p-12',
    '16': 'p-16',
  };

  const variantClassMap = {
    default: 'bg-canon-grey',
    surface: 'bg-canon-white rounded-lg shadow',
    elevated: 'bg-canon-white rounded-lg shadow-lg',
  };

  const paddingClass = paddingClassMap[padding] || 'p-4';
  const variantClass = variantClassMap[variant] || variantClassMap.default;

  if (!paddingClassMap[padding]) {
    console.warn(
      `[BrandWrapper] Invalid padding "${padding}" provided. Falling back to "4".`
    );
  }

  if (!variantClassMap[variant]) {
    console.warn(
      `[BrandWrapper] Invalid variant "${variant}" provided. Falling back to "default".`
    );
  }

  const wrapperClasses = [
    'font-sans',
    'text-canon-black',
    'antialiased',
    paddingClass,
    variantClass,
    fullWidth ? 'w-full' : 'mx-auto max-w-dashboard',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const componentProps = {
    className: wrapperClasses,
  };

  if (id) {
    componentProps.id = id;
  }

  if (role) {
    componentProps.role = role;
  }

  if (ariaLabel) {
    componentProps['aria-label'] = ariaLabel;
  }

  return <Component {...componentProps}>{children}</Component>;
}

BrandWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.string,
  padding: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'surface', 'elevated']),
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  role: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default BrandWrapper;