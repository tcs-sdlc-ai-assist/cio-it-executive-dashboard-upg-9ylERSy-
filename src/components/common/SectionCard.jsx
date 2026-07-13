import PropTypes from 'prop-types';

/**
 * SectionCard - Dashboard section card wrapper with Canon India styling.
 *
 * Wraps each dashboard section with consistent Canon India card styling:
 * white background, subtle border, rounded corners, shadow, section title,
 * and optional subtitle. Provides consistent spacing and layout for all
 * dashboard modules.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content to render inside the card
 * @param {string} [props.title] - Section title displayed at the top of the card
 * @param {string} [props.subtitle] - Optional subtitle displayed below the title
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - HTML id attribute for the section
 * @param {string} [props.as='section'] - HTML element to render as
 * @param {'sm' | 'md' | 'lg'} [props.padding='md'] - Internal padding variant
 * @param {boolean} [props.noPadding=false] - Whether to remove internal padding from the content area
 * @param {React.ReactNode} [props.headerRight] - Optional content rendered on the right side of the header
 * @param {string} [props.ariaLabel] - Accessible label for the section
 * @returns {React.ReactElement}
 */
export function SectionCard({
  children,
  title,
  subtitle,
  className = '',
  id,
  as: Component = 'section',
  padding = 'md',
  noPadding = false,
  headerRight,
  ariaLabel,
}) {
  const paddingClassMap = {
    sm: 'p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
  };

  const paddingClass = paddingClassMap[padding];

  if (!paddingClass) {
    console.warn(
      `[SectionCard] Invalid padding "${padding}" provided. Falling back to "md".`
    );
  }

  const resolvedPaddingClass = paddingClass || paddingClassMap.md;

  const hasHeader = title || subtitle || headerRight;

  const containerClasses = [
    'bg-canon-white rounded-lg shadow-sm border border-gray-200',
    noPadding ? '' : resolvedPaddingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const componentProps = {
    className: containerClasses,
  };

  if (id) {
    componentProps.id = id;
  }

  if (ariaLabel) {
    componentProps['aria-label'] = ariaLabel;
  } else if (title) {
    componentProps['aria-label'] = title;
  }

  return (
    <Component {...componentProps}>
      {hasHeader && (
        <div
          className={[
            'flex items-start justify-between gap-3',
            noPadding ? 'px-4 pt-4 md:px-6 md:pt-6' : '',
            children ? 'mb-4' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            {title && (
              <h2 className="text-base md:text-lg font-bold text-canon-black leading-tight truncate">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs md:text-sm text-gray-500 leading-snug">
                {subtitle}
              </p>
            )}
          </div>
          {headerRight && (
            <div className="flex-shrink-0">
              {headerRight}
            </div>
          )}
        </div>
      )}
      {noPadding ? (
        children
      ) : (
        children
      )}
    </Component>
  );
}

SectionCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  as: PropTypes.string,
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
  noPadding: PropTypes.bool,
  headerRight: PropTypes.node,
  ariaLabel: PropTypes.string,
};

export default SectionCard;