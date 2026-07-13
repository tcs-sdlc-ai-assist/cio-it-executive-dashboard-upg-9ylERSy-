# Changelog

All notable changes to the CIO IT Executive Dashboard project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-06-10

### Added

#### Dashboard Sections
- **Executive CIO Scorecard (FR-001):** High-level KPI overview with RAG status indicators for IT Spend vs Budget, Mid-Term Plan Progress, Operational Health, Compliance & Risk, Transformation Progress, and Application Utilization.
- **IT Financial Overview (FR-002):** Budget vs actual spend tracking with monthly bar chart, run vs change spend donut chart, category breakdown with progress bars, and five financial KPI metric cards.
- **License Spend Split (FR-003):** License cost distribution donut chart across Microsoft, SAP, Oracle, Salesforce, Cloud, and Other vendors. Includes utilization breakdown data table with sortable columns and RAG indicators.
- **Vendor Spend (FR-004):** Top 10 vendor analysis with annual spend vs contract value bar chart, spend distribution donut chart, dependency risk assessment, and filterable data table.
- **Supplier Spend (FR-005):** Supplier-wise spend data table with procurement category filtering, contract status tracking, savings tracker progress bar, top 5 supplier trend line chart, and spend distribution donut chart.
- **Mid-Term Plan Progress (FR-006):** Strategic pillar tracking with milestone completion bar chart, benefits realization donut chart, overall progress bar, and detailed pillar cards with progress indicators.
- **Top 3 Transformation Programs (FR-007):** Program status cards for ERP Transformation (SAP S/4HANA), Cloud Migration & Infrastructure Modernization, and Digital Customer Experience Platform. Each card displays budget, milestones, benefits, key risks, and RAG status.
- **Transformation Budget Progress (FR-008):** Budget burn-rate S-curve line chart (cumulative planned vs actual vs forecast), monthly planned vs actual bar chart, budget allocation donut chart, benefits realization tracker, and program budget breakdown data table.
- **Manpower Cost (FR-009):** Workforce cost by type donut chart, location split donut chart, department cost stacked bar chart, monthly cost trend line chart, workforce composition progress bars, and department cost breakdown data table.

#### Design System
- Canon India Consumer Experience design tokens centralised in `src/design-system/designTokens.js` covering colours, typography, spacing, breakpoints, and container constraints.
- `ThemeProvider` context component exposing design tokens and light/dark theme toggle via React Context.
- `BrandWrapper` component enforcing consistent Canon India branding (padding, max-width, background, typography).
- Primary brand colour Canon Red `#E60012` applied across all interactive elements and accent areas.
- RAG status colours: Red `#E60012`, Amber `#FFC107`, Green `#28A745`.
- Typography stack: Arial, Helvetica, Roboto, Segoe UI, sans-serif.
- Maximum container width of 1200px with responsive breakpoints at 0px (mobile), 768px (tablet), and 1024px (desktop).

#### Visualisation Components (D3.js v7)
- `BarChart` — Grouped and stacked bar chart with axes, gridlines, tooltips, legend, animation, and responsive SVG.
- `DonutChart` — Donut/pie chart with percentage labels, centre text, tooltips, legend, hover animation, and responsive SVG.
- `LineChart` — Multi-series line chart with data point dots, area fill, curved/linear interpolation, tooltips, legend, animation, and responsive SVG.
- `MetricCard` — KPI metric display card with value, unit, prefix, trend indicator, RAG status badge, and description.
- `ProgressBar` — Animated horizontal progress bar with ARIA progressbar role, value clamping, and multiple size/colour variants.
- `RAGIndicator` — Red/Amber/Green status badge with icon, dot, and text label for WCAG AA non-colour-only indication.
- `DataTable` — Sortable, accessible data table with column header click sorting, ascending/descending toggle, `aria-sort` attributes, keyboard navigation, striped/hoverable rows, and custom cell render functions.

#### Layout Components
- `Header` — Dashboard header with Canon India logo placeholder, title, mobile hamburger menu toggle, and branding labels.
- `Sidebar` — Persistent sidebar navigation for desktop with category-led navigation items, mobile hamburger menu with overlay, focus trapping, Escape key close, and click-outside close.
- `GridLayout` / `GridItem` — Responsive 12-column CSS Grid layout with configurable column spans at mobile, tablet, and desktop breakpoints.
- `StackLayout` / `StackItem` — Vertical stack layout for mobile/tablet views with configurable gap, alignment, and justification.
- `DashboardContainer` — Main dashboard container composing all nine sections with scroll-based active section tracking, sidebar navigation, header, footer, and `ThemeProvider` integration.

#### Common Components
- `SectionCard` — Dashboard section card wrapper with title, subtitle, header right content, consistent Canon India card styling, and ARIA label.
- `FilterDropdown` — Accessible filter dropdown for data tables with options array, label, placeholder, size variants, and ARIA attributes.

#### Accessibility (WCAG AA)
- `SkipLink` component for keyboard navigation to skip to main content.
- `AccessibleButton` with ARIA label, focus ring, keyboard event handling (Enter and Space), and variant styling.
- `AccessibleLabel` for screen-reader-only form field labels.
- `VisuallyHidden` wrapper for screen-reader-only content using `sr-only` utility.
- `StatusIndicator` for non-colour status indication with icon and text label.
- ARIA roles (`banner`, `navigation`, `main`, `contentinfo`) on semantic HTML landmarks.
- `role="table"`, `role="columnheader"`, `role="row"`, `role="cell"` on data tables.
- `role="img"` with `aria-label` and `aria-describedby` on all D3.js chart containers.
- Screen-reader-only `<table>` elements rendered alongside each D3.js chart for accessible data consumption.
- `aria-sort` attributes on sortable table column headers with keyboard support.
- `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on progress bars.
- `role="status"` with `aria-label` on RAG indicators.
- Visible focus rings (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canon-red`) on all focusable elements.
- RAG indicators use icon + text labels, not colour alone.

#### Responsive Layout
- Mobile-first responsive design with Tailwind CSS breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- Sidebar collapses to hamburger menu on mobile with overlay and focus management.
- Dashboard sections stack vertically on mobile, use grid layouts on tablet and desktop.
- Chart components use `ResizeObserver` for responsive SVG rendering.

#### Data Layer
- Mock data fixtures for all nine dashboard sections in `src/data/` directory.
- Reference date for all mock data: 2024-06-10.
- Data modules export typed arrays and summary objects ready for live API replacement.
- Formatter utilities (`formatCurrency`, `formatPercentage`, `formatNumber`, `formatDate`, `formatCompactNumber`, `formatVariance`) in `src/utils/formatters.js`.
- Application-wide constants (`RAG_STATUSES`, `TREND_DIRECTIONS`, `CONTRACT_STATUSES`, `CHART_COLORS`, etc.) in `src/utils/constants.js`.

#### Testing
- Vitest test configuration with jsdom environment and `@testing-library/jest-dom` matchers.
- Unit tests for `DataTable` component covering rendering, sorting, keyboard navigation, row interaction, styling variants, and edge cases.
- Unit tests for `RAGIndicator` component covering status rendering, accessible labels, icon rendering, non-colour indicators, size variants, and edge cases.
- Unit tests for `ExecutiveScorecardSection` covering rendering, metric values, RAG indicators, trend indicators, descriptions, custom data, and accessibility.
- Unit tests for `ITFinancialOverviewSection` covering rendering, metric cards, variance display, progress bars, charts, category breakdown, custom data, and accessibility.
- Unit tests for `DashboardContainer` covering all nine sections rendering, layout structure, accessibility landmarks, sidebar navigation, mobile menu toggle, section ordering, scroll tracking, and ThemeProvider integration.
- Unit tests for `formatters` utility covering `formatCurrency`, `formatPercentage`, `formatNumber`, `formatDate`, `formatCompactNumber`, and `formatVariance` with happy-path and edge-case coverage.

#### Build & Deployment
- Vite 6 build configuration with React plugin, path aliases, source maps, and development server on port 3000.
- Tailwind CSS 3 configuration with Canon India custom colours, font family, spacing, and max-width tokens.
- PostCSS configuration with Tailwind CSS and Autoprefixer plugins.
- ESLint configuration with React and React Hooks plugins.
- Vercel deployment configuration with SPA rewrite rules.
- Environment variable support via `.env` with `VITE_APP_TITLE`, `VITE_API_BASE_URL`, and `VITE_APP_ENV`.