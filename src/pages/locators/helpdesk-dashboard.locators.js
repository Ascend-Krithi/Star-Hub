const locators = {
  // Login Page
  usernameInput: (page) => page.locator('[data-testid="username-input"]').first(),
  passwordInput: (page) => page.locator('[data-testid="password-input"]').first(),
  loginButton: (page) => page.locator('[data-testid="login-button"]').first(),

  // Navigation
  dashboardMenuItem: (page) => page.locator('[data-testid="dashboard-menu"]').first(),

  // Ticket Status Section
  newStatusCount: (page) => page.locator('[data-testid="status-new-count"]').first(),
  ongoingStatusCount: (page) => page.locator('[data-testid="status-ongoing-count"]').first(),
  rejectStatusCount: (page) => page.locator('[data-testid="status-reject-count"]').first(),
  closedStatusCount: (page) => page.locator('[data-testid="status-closed-count"]').first(),

  // Ticket Volume Section
  inquiryCategoryCount: (page) => page.locator('[data-testid="category-inquiry-count"]').first(),
  requestCategoryCount: (page) => page.locator('[data-testid="category-request-count"]').first(),
  disputeCategoryCount: (page) => page.locator('[data-testid="category-dispute-count"]').first(),
  nuisanceCategoryCount: (page) => page.locator('[data-testid="category-nuisance-count"]').first(),
  invalidCategoryCount: (page) => page.locator('[data-testid="category-invalid-count"]').first(),

  // Backlog and Trends
  backlogCount: (page) => page.locator('[data-testid="backlog-count"]').first(),
  resolutionTrendsChart: (page) => page.locator('[data-testid="resolution-trends-chart"]').first(),

  // Filters
  categoryFilterDropdown: (page) => page.locator('[data-testid="category-filter-dropdown"]').first(),
  statusFilterDropdown: (page) => page.locator('[data-testid="status-filter-dropdown"]').first(),
  categoryFilterOption: (page, category) => page.locator(`[data-testid="category-option-${category.toLowerCase()}"]`).first(),
  statusFilterOption: (page, status) => page.locator(`[data-testid="status-option-${status.toLowerCase()}"]`).first(),
  applyFilterButton: (page) => page.locator('[data-testid="apply-filter-button"]').first(),
  clearAllFiltersButton: (page) => page.locator('[data-testid="clear-all-filters-button"]').first(),
  activeFilterBadge: (page) => page.locator('[data-testid="active-filter-badge"]').first(),

  // SLA Metrics Section
  slaMetricsSection: (page) => page.locator('[data-testid="sla-metrics-section"]').first(),
  sla1DayTotal: (page) => page.locator('[data-testid="sla-1day-total"]').first(),
  sla1DayWithinSLA: (page) => page.locator('[data-testid="sla-1day-within"]').first(),
  sla1DayBreached: (page) => page.locator('[data-testid="sla-1day-breached"]').first(),
  sla2DayTotal: (page) => page.locator('[data-testid="sla-2day-total"]').first(),
  sla2DayWithinSLA: (page) => page.locator('[data-testid="sla-2day-within"]').first(),
  sla2DayBreached: (page) => page.locator('[data-testid="sla-2day-breached"]').first(),
  sla3DayTotal: (page) => page.locator('[data-testid="sla-3day-total"]').first(),
  sla3DayWithinSLA: (page) => page.locator('[data-testid="sla-3day-within"]').first(),
  sla3DayBreached: (page) => page.locator('[data-testid="sla-3day-breached"]').first(),
  sla5DayTotal: (page) => page.locator('[data-testid="sla-5day-total"]').first(),
  sla5DayWithinSLA: (page) => page.locator('[data-testid="sla-5day-within"]').first(),
  sla5DayBreached: (page) => page.locator('[data-testid="sla-5day-breached"]').first(),
  slaCompliancePercentage: (page, days) => page.locator(`[data-testid="sla-${days}day-compliance"]`).first(),
  slaResolutionTrendsChart: (page) => page.locator('[data-testid="sla-resolution-trends-chart"]').first(),

  // Messages and Notifications
  noTicketsMessage: (page) => page.locator('[data-testid="no-tickets-message"]').first(),
  connectionErrorMessage: (page) => page.locator('[data-testid="connection-error-message"]').first(),
  syncWarningMessage: (page) => page.locator('[data-testid="sync-warning-message"]').first(),
  lastSyncTimestamp: (page) => page.locator('[data-testid="last-sync-timestamp"]').first(),

  // Ticket List
  ticketListGrid: (page) => page.locator('[data-testid="ticket-list-grid"]').first(),
  ticketRecord: (page) => page.locator('[data-testid="ticket-record"]')
};

module.exports = locators;