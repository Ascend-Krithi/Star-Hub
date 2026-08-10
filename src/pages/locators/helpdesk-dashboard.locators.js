const locators = {
  // Login Page
  usernameInput: (page) => page.locator('input[name="username"], input[type="email"], #username').first(),
  passwordInput: (page) => page.locator('input[name="password"], input[type="password"], #password').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), input[type="submit"]').first(),
  
  // Navigation
  dashboardMenuItem: (page) => page.locator('a:has-text("Dashboard"), nav >> text=Dashboard, [data-testid="dashboard-link"]').first(),
  
  // Ticket Status Section
  ticketStatusSection: (page) => page.locator('[data-testid="ticket-status-section"], .ticket-status, #ticket-status').first(),
  newStatusCount: (page) => page.locator('[data-testid="new-status-count"], .status-new .count, #new-count').first(),
  ongoingStatusCount: (page) => page.locator('[data-testid="ongoing-status-count"], .status-ongoing .count, #ongoing-count').first(),
  rejectStatusCount: (page) => page.locator('[data-testid="reject-status-count"], .status-reject .count, #reject-count').first(),
  closedStatusCount: (page) => page.locator('[data-testid="closed-status-count"], .status-closed .count, #closed-count').first(),
  
  // Ticket Volume Section
  ticketVolumeSection: (page) => page.locator('[data-testid="ticket-volume-section"], .ticket-volume, #ticket-volume').first(),
  inquiryCategoryCount: (page) => page.locator('[data-testid="inquiry-count"], .category-inquiry .count, #inquiry-count').first(),
  requestCategoryCount: (page) => page.locator('[data-testid="request-count"], .category-request .count, #request-count').first(),
  disputeCategoryCount: (page) => page.locator('[data-testid="dispute-count"], .category-dispute .count, #dispute-count').first(),
  nuisanceCategoryCount: (page) => page.locator('[data-testid="nuisance-count"], .category-nuisance .count, #nuisance-count').first(),
  invalidCategoryCount: (page) => page.locator('[data-testid="invalid-count"], .category-invalid .count, #invalid-count').first(),
  
  // Backlog Section
  backlogSection: (page) => page.locator('[data-testid="backlog-section"], .backlog, #backlog').first(),
  backlogCount: (page) => page.locator('[data-testid="backlog-count"], .backlog-count, #backlog-value').first(),
  
  // Resolution Trends Section
  resolutionTrendsSection: (page) => page.locator('[data-testid="resolution-trends"], .resolution-trends, #resolution-trends').first(),
  resolutionTrendsChart: (page) => page.locator('[data-testid="trends-chart"], .trends-chart, canvas, svg.chart').first(),
  
  // Filter Components
  categoryFilterDropdown: (page) => page.locator('[data-testid="category-filter"], select[name="category"], #category-filter').first(),
  statusFilterDropdown: (page) => page.locator('[data-testid="status-filter"], select[name="status"], #status-filter').first(),
  applyFilterButton: (page) => page.locator('[data-testid="apply-filter"], button:has-text("Apply"), .apply-filter').first(),
  clearFiltersButton: (page) => page.locator('[data-testid="clear-filters"], button:has-text("Clear"), .clear-filters').first(),
  activeFilterBadge: (page) => page.locator('[data-testid="active-filter"], .filter-badge, .active-filter').first(),
  
  // SLA Metrics Section
  slaMetricsSection: (page) => page.locator('[data-testid="sla-metrics"], .sla-metrics, #sla-metrics').first(),
  sla1DayTotal: (page) => page.locator('[data-testid="sla-1day-total"], .sla-1day .total').first(),
  sla1DayWithinSLA: (page) => page.locator('[data-testid="sla-1day-within"], .sla-1day .within-sla').first(),
  sla1DayBreached: (page) => page.locator('[data-testid="sla-1day-breached"], .sla-1day .breached').first(),
  sla2DayTotal: (page) => page.locator('[data-testid="sla-2day-total"], .sla-2day .total').first(),
  sla2DayWithinSLA: (page) => page.locator('[data-testid="sla-2day-within"], .sla-2day .within-sla').first(),
  sla2DayBreached: (page) => page.locator('[data-testid="sla-2day-breached"], .sla-2day .breached').first(),
  sla3DayTotal: (page) => page.locator('[data-testid="sla-3day-total"], .sla-3day .total').first(),
  sla3DayWithinSLA: (page) => page.locator('[data-testid="sla-3day-within"], .sla-3day .within-sla').first(),
  sla3DayBreached: (page) => page.locator('[data-testid="sla-3day-breached"], .sla-3day .breached').first(),
  sla5DayTotal: (page) => page.locator('[data-testid="sla-5day-total"], .sla-5day .total').first(),
  sla5DayWithinSLA: (page) => page.locator('[data-testid="sla-5day-within"], .sla-5day .within-sla').first(),
  sla5DayBreached: (page) => page.locator('[data-testid="sla-5day-breached"], .sla-5day .breached').first(),
  slaCompliancePercentage: (page) => page.locator('[data-testid="sla-compliance"], .sla-compliance, .compliance-rate').first(),
  
  // Messages and Notifications
  noDataMessage: (page) => page.locator('[data-testid="no-data-message"], .no-data, .empty-state, text="No tickets found"').first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"], .error-message, .alert-error').first(),
  syncErrorIndicator: (page) => page.locator('[data-testid="sync-error"], .sync-error, text="Connection lost"').first(),
  lastUpdatedTimestamp: (page) => page.locator('[data-testid="last-updated"], .last-updated, .timestamp').first(),
};

module.exports = locators;