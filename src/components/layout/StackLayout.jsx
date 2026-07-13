import PropTypes from 'prop-types';

/**
 * StackLayout - Vertical stack layout component for mobile/tablet views.
 *
 * Renders children in a single-column vertical stack with consistent spacing.
 * Used as a fallback layout on smaller screens or when a simple vertical
 * arrangement is needed.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render in the stack
 * @param {string} [props.gap='4'] - Tailwind gap/spacing value (e.g., '4' for gap-4)
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.as='div'] - HTML element to render as
 * @param {string} [props.align='stretch'] - Cross-axis alignment (stretch | start | center | end)
 * @param {string} [props.justify='start'] - Main-axis justification (start | center | end | between | around | evenly)
 * @param {string} [props.padding='4'] - Tailwind padding value (e.g., '4' for px-4)
 * @param {boolean} [props.fullWidth=true] - Whether the stack should take full width
 * @returns {React.ReactElement}
 */
export function StackLayout({
  children,
  gap = '4',
  className = '',
  as: Component = 'div',
  align = 'stretch',
  justify = 'start',
  padding = '4',
  fullWidth = true,
}) {
  const gapClassMap = {
    '0': 'gap-0',
    '1': 'gap-1',
    '2': 'gap-2',
    '3': 'gap-3',
    '4': 'gap-4',
    '5': 'gap-5',
    '6': 'gap-6',
    '8': 'gap-8',
    '10': 'gap-10',
    '12': 'gap-12',
    '16': 'gap-16',
  };

  const alignClassMap = {
    stretch: 'items-stretch',
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  const justifyClassMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const paddingClassMap = {
    '0': 'px-0',
    '1': 'px-1',
    '2': 'px-2',
    '3': 'px-3',
    '4': 'px-4',
    '5': 'px-5',
    '6': 'px-6',
    '8': 'px-8',
    '10': 'px-10',
    '12': 'px-12',
    '16': 'px-16',
  };

  const gapClass = gapClassMap[gap] || 'gap-4';
  const alignClass = alignClassMap[align] || 'items-stretch';
  const justifyClass = justifyClassMap[justify] || 'justify-start';
  const paddingClass = paddingClassMap[padding] || 'px-4';

  if (!gapClassMap[gap]) {
    console.warn(
      `[StackLayout] Invalid gap "${gap}" provided. Falling back to "4".`
    );
  }

  if (!alignClassMap[align]) {
    console.warn(
      `[StackLayout] Invalid align "${align}" provided. Falling back to "stretch".`
    );
  }

  if (!justifyClassMap[justify]) {
    console.warn(
      `[StackLayout] Invalid justify "${justify}" provided. Falling back to "start".`
    );
  }

  const stackClasses = [
    'flex',
    'flex-col',
    gapClass,
    alignClass,
    justifyClass,
    paddingClass,
    'mx-auto',
    'max-w-dashboard',
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={stackClasses}>{children}</Component>;
}

StackLayout.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.string,
  className: PropTypes.string,
  as: PropTypes.string,
  align: PropTypes.oneOf(['stretch', 'start', 'center', 'end']),
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'evenly']),
  padding: PropTypes.string,
  fullWidth: PropTypes.bool,
};

/**
 * StackItem - A child component for StackLayout that supports optional ordering and sizing.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.as='div'] - HTML element to render as
 * @param {boolean} [props.grow=false] - Whether the item should grow to fill available space
 * @param {boolean} [props.shrink=true] - Whether the item should shrink if needed
 * @returns {React.ReactElement}
 */
export function StackItem({
  children,
  className = '',
  as: Component = 'div',
  grow = false,
  shrink = true,
}) {
  const itemClasses = [
    grow ? 'flex-grow' : 'flex-grow-0',
    shrink ? 'flex-shrink' : 'flex-shrink-0',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={itemClasses}>{children}</Component>;
}

StackItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.string,
  grow: PropTypes.bool,
  shrink: PropTypes.bool,
};

export default StackLayout;