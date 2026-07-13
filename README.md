# CIO IT Executive Dashboard

A comprehensive CIO IT Executive Dashboard built for Canon India, providing real-time visibility into IT financial performance, vendor management, license utilization, transformation program tracking, and workforce cost analysis.

## Tech Stack

- **[Vite](https://vitejs.dev/)** — Fast build tool and development server
- **[React 18](https://react.dev/)** — Component-based UI library
- **[Tailwind CSS 3](https://tailwindcss.com/)** — Utility-first CSS framework
- **[D3.js 7](https://d3js.org/)** — Data-driven visualizations (bar charts, donut charts, line charts)
- **[Vitest](https://vitest.dev/)** — Unit testing framework
- **[Testing Library](https://testing-library.com/)** — React component testing utilities

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd cio-it-executive-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and adjust values as needed:

```bash
cp .env.example .env
```

Available environment variables:

| Variable | Description | Default |
|---|---|---|
| `VITE_APP_TITLE` | Dashboard title displayed in the header | `CIO IT Executive Dashboard` |
| `VITE_API_BASE_URL` | Base URL for API requests (optional) | _(empty, uses relative paths)_ |
| `VITE_APP_ENV` | Environment mode | `development` |

### 4. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
```

The production build output is generated in the `dist/` directory.

### 6. Preview the production build

```bash
npm run preview
```

### 7. Run tests

```bash
npm test
```

To run tests in watch mode during development:

```bash
npm run test:watch
```

### 8. Lint the codebase

```bash
npm run lint
```

## Folder Structure

```
cio-it-executive-dashboard/
├── index.html                          # HTML entry point
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration
├── vitest.config.js                    # Vitest test configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── vercel.json                         # Vercel deployment configuration
├── .env.example                        # Environment variable template
├── .gitignore                          # Git ignore rules
│
├── src/
│   ├── main.jsx                        # Application entry point
│   ├── App.jsx                         # Root application component
│   ├── index.css                       # Global styles and Tailwind directives
│   │
│   ├── components/
│   │   ├── accessibility/
│   │   │   └── AccessibilityUtils.jsx  # AccessibleButton, SkipLink, VisuallyHidden, StatusIndicator
│   │   │
│   │   ├── common/
│   │   │   ├── BrandWrapper.jsx        # Canon India brand consistency wrapper
│   │   │   ├── FilterDropdown.jsx      # Accessible filter dropdown for data tables
│   │   │   └── SectionCard.jsx         # Dashboard section card wrapper
│   │   │
│   │   ├── layout/
│   │   │   ├── GridLayout.jsx          # Responsive 12-column grid layout
│   │   │   ├── Header.jsx             # Dashboard header with branding
│   │   │   ├── Sidebar.jsx            # Navigation sidebar with hamburger menu
│   │   │   └── StackLayout.jsx        # Vertical stack layout for mobile/tablet
│   │   │
│   │   └── visualizations/
│   │       ├── BarChart.jsx            # D3.js bar chart (grouped/stacked)
│   │       ├── DataTable.jsx           # Sortable, accessible data table
│   │       ├── DonutChart.jsx          # D3.js donut/pie chart
│   │       ├── LineChart.jsx           # D3.js multi-series line chart
│   │       ├── MetricCard.jsx          # KPI metric display card
│   │       ├── ProgressBar.jsx         # Animated progress bar
│   │       └── RAGIndicator.jsx        # Red/Amber/Green status indicator
│   │
│   ├── data/
│   │   ├── financialData.js            # IT Financial Overview mock data
│   │   ├── licenseData.js              # License Spend Split mock data
│   │   ├── manpowerData.js             # Manpower Cost mock data
│   │   ├── midTermPlanData.js          # Mid-Term Plan Progress mock data
│   │   ├── scorecardData.js            # Executive CIO Scorecard mock data
│   │   ├── supplierData.js             # Supplier Spend mock data
│   │   ├── transformationBudgetData.js # Transformation Budget mock data
│   │   ├── transformationProgramsData.js # Transformation Programs mock data
│   │   └── vendorData.js               # Vendor Spend mock data
│   │
│   ├── design-system/
│   │   ├── designTokens.js             # Canon India design tokens (colours, typography, spacing)
│   │   └── ThemeProvider.jsx           # Theme context provider
│   │
│   ├── pages/
│   │   └── DashboardContainer.jsx      # Main dashboard container composing all sections
│   │
│   ├── sections/
│   │   ├── ExecutiveScorecardSection.jsx       # FR-001: Executive CIO Scorecard
│   │   ├── ITFinancialOverviewSection.jsx      # FR-002: IT Financial Overview
│   │   ├── LicenseSpendSplitSection.jsx        # FR-003: License Spend Split
│   │   ├── VendorSpendSection.jsx              # FR-004: Vendor Spend
│   │   ├── SupplierSpendSection.jsx            # FR-005: Supplier Spend
│   │   ├── MidTermPlanProgressSection.jsx      # FR-006: Mid-Term Plan Progress
│   │   ├── TransformationProgramsSection.jsx   # FR-007: Top 3 Transformation Programs
│   │   ├── TransformationBudgetSection.jsx     # FR-008: Transformation Budget
│   │   └── ManpowerCostSection.jsx             # FR-009: Manpower Cost
│   │
│   ├── utils/
│   │   ├── constants.js                # Application-wide constants
│   │   └── formatters.js               # Currency, percentage, number, date formatters
│   │
│   └── test/
│       └── setup.js                    # Test setup (jest-dom matchers)
│
└── dist/                               # Production build output (git-ignored)
```

## Dashboard Sections

The dashboard is composed of nine sections, each addressing a specific area of IT executive oversight:

| # | Section | Description |
|---|---|---|
| 1 | **Executive CIO Scorecard** | High-level KPI overview with RAG status indicators |
| 2 | **IT Financial Overview** | Budget vs actual spend, run vs change split, category breakdown |
| 3 | **License Spend Split** | License cost distribution by vendor with utilization tracking |
| 4 | **Vendor Spend** | Top 10 vendor analysis with dependency risk assessment |
| 5 | **Supplier Spend** | Supplier-wise spend with procurement category filtering and savings tracker |
| 6 | **Mid-Term Plan Progress** | Strategic pillar tracking with milestone and benefits realization |
| 7 | **Top 3 Transformation Programs** | Program status cards with budget, milestones, risks, and benefits |
| 8 | **Transformation Budget** | Budget burn-rate S-curve, planned vs actual, and benefits realization |
| 9 | **Manpower Cost** | Workforce cost by type, location, department with monthly trends |

## Design System

The dashboard follows Canon India Consumer Experience design guidelines:

- **Primary Brand Colour:** Canon Red `#E60012`
- **RAG Status Colours:** Red `#E60012`, Amber `#FFC107`, Green `#28A745`
- **Typography:** Arial, Helvetica, Roboto, Segoe UI, sans-serif
- **Max Container Width:** 1200px
- **Responsive Breakpoints:** Mobile (0px), Tablet (768px), Desktop (1024px)

All design tokens are centralized in `src/design-system/designTokens.js` and exposed via the `ThemeProvider` context.

## Accessibility

The dashboard is built with WCAG AA compliance in mind:

- Skip-to-main-content link for keyboard navigation
- ARIA roles, labels, and descriptions on all interactive elements
- RAG indicators use icon + text labels (not colour alone)
- Visible focus rings on all focusable elements
- Screen-reader-only data tables for all D3.js chart visualizations
- Sortable table headers with `aria-sort` attributes and keyboard support
- Semantic HTML landmarks (`banner`, `navigation`, `main`, `contentinfo`)

## Deployment

### Vercel (Recommended)

The project includes a `vercel.json` configuration for single-page application routing.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project in [Vercel](https://vercel.com/).
3. Vercel will auto-detect the Vite framework and configure the build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Set any required environment variables in the Vercel project settings.
5. Deploy.

### Manual / Other Platforms

1. Build the project:

   ```bash
   npm run build
   ```

2. Serve the contents of the `dist/` directory using any static file server (e.g., Nginx, Apache, Cloudflare Pages, Netlify).

3. Ensure all routes are rewritten to `index.html` for client-side routing support.

## Scripts Reference

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start Vite development server on port 3000 |
| `build` | `npm run build` | Create optimized production build in `dist/` |
| `preview` | `npm run preview` | Preview the production build locally |
| `test` | `npm test` | Run all tests once with Vitest |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |
| `lint` | `npm run lint` | Lint `.js` and `.jsx` files with ESLint |

## Data

All dashboard data is currently sourced from mock data fixtures located in `src/data/`. Each data module exports typed arrays and summary objects that can be replaced with live API responses when backend integration is implemented. The reference date for all mock data is **2024-06-10**.

## License

This project is private and proprietary. Unauthorized copying, distribution, or modification of this project, via any medium, is strictly prohibited.