import { DashboardContainer } from './pages/DashboardContainer';

/**
 * App - Root application component with layout composition.
 *
 * Wraps the entire app in ThemeProvider. Renders Header, Sidebar, and
 * DashboardContainer in a responsive layout (sidebar + main content on
 * desktop, stacked on mobile). Manages sidebar open/close state for
 * mobile hamburger menu. Includes SkipLink for accessibility.
 *
 * Note: ThemeProvider, Header, Sidebar, SkipLink, and layout management
 * are handled internally by DashboardContainer, which composes all nine
 * dashboard sections into a single scrollable view with consistent
 * Canon India branding and accessibility features.
 *
 * @returns {React.ReactElement}
 */
function App() {
  return <DashboardContainer />;
}

export default App;