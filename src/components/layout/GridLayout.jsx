import PropTypes from 'prop-types';

/**
 * GridLayout - Responsive 12-column grid layout component.
 *
 * Renders a CSS Grid container with max-width 1200px, centered,
 * with responsive breakpoints: 12 columns on desktop, stacked (1 column) on mobile.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render within the grid
 * @param {number} [props.columns=12] - Number of grid columns (desktop)
 * @param {string} [props.gap='4'] - Tailwind gap value (e.g., '4' for gap-4)
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.as='div'] - HTML element to render as
 * @returns {React.ReactElement}
 */
export function GridLayout({
  children,
  columns = 12,
  gap = '4',
  className = '',
  as: Component = 'div',
}) {
  const validColumns = Number.isInteger(columns) && columns > 0 ? columns : 12;

  if (!Number.isInteger(columns) || columns <= 0) {
    console.warn(
      `[GridLayout] Invalid columns "${columns}" provided. Falling back to 12.`
    );
  }

  const columnClassMap = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    7: 'md:grid-cols-7',
    8: 'md:grid-cols-8',
    9: 'md:grid-cols-9',
    10: 'md:grid-cols-10',
    11: 'md:grid-cols-11',
    12: 'md:grid-cols-12',
  };

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

  const colClass = columnClassMap[validColumns] || 'md:grid-cols-12';
  const gapClass = gapClassMap[gap] || 'gap-4';

  const gridClasses = [
    'grid',
    'grid-cols-1',
    colClass,
    gapClass,
    'mx-auto',
    'max-w-dashboard',
    'px-4',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={gridClasses}>{children}</Component>;
}

GridLayout.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
  gap: PropTypes.string,
  className: PropTypes.string,
  as: PropTypes.string,
};

/**
 * GridItem - A child component for GridLayout that supports column spanning.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child content
 * @param {number} [props.colSpan=1] - Number of columns to span
 * @param {number} [props.colSpanMd] - Number of columns to span at md breakpoint
 * @param {number} [props.colSpanLg] - Number of columns to span at lg breakpoint
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.as='div'] - HTML element to render as
 * @returns {React.ReactElement}
 */
export function GridItem({
  children,
  colSpan = 1,
  colSpanMd,
  colSpanLg,
  className = '',
  as: Component = 'div',
}) {
  const spanClassMap = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  };

  const mdSpanClassMap = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  };

  const lgSpanClassMap = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
  };

  const spanClass = spanClassMap[colSpan] || 'col-span-1';
  const mdClass = colSpanMd ? mdSpanClassMap[colSpanMd] || '' : '';
  const lgClass = colSpanLg ? lgSpanClassMap[colSpanLg] || '' : '';

  const itemClasses = [spanClass, mdClass, lgClass, className]
    .filter(Boolean)
    .join(' ');

  return <Component className={itemClasses}>{children}</Component>;
}

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
  colSpan: PropTypes.number,
  colSpanMd: PropTypes.number,
  colSpanLg: PropTypes.number,
  className: PropTypes.string,
  as: PropTypes.string,
};

export default GridLayout;