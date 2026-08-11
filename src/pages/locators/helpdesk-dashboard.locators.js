const locators = {
  // Login Page
  usernameInput: (page) => page.locator('input[name="username"], input[type="email"]').first(),
  passwordInput: (page) => page.locator('input[name="password"], input[type="password"]').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first(),
  
  // Navigation
  dashboardMenu: (page) => page.locator('a:has-text("Dashboard"), nav >> text=Dashboard').first(),
  
  // Dashboard Page
  pageHeading: (page) => page.locator('h1, h2').first(),
  
  // Ticket Status Section
  newStatusCount: (page) => page.locator('[data-testid="new-status-count"], .status-new .count, [data-status="new"] .count').first(),
  ongoingStatusCount: (page) => page.locator('[data-testid="ongoing-status-count"], .status-ongoing .count, [data-status="ongoing"] .count').first(),
  rejectStatusCount: (page) => page.locator('[data-testid="reject-status-count"], .status-reject .count, [data-status="reject"] .count').first(),
  closedStatusCount: (page) => page.locator('[data-testid="closed-status-count"], .status-closed .count, [data-status="closed"] .count').first(),
  
  // Ticket Category Section
  inquiryCategoryCount: (page) => page.locator('[data-testid="inquiry-category-count"], .category-inquiry .count, [data-category="inquiry"] .count').first(),
  requestCategoryCount: (page) => page.locator('[data-testid="request-category-count"], .category-request .count, [data-category="request"] .count').first(),
  disputeCategoryCount: (page) => page.locator('[data-testid="dispute-category-count"], .category-dispute .count, [data-category="dispute"] .count').first(),
  nuisanceCategoryCount: (page) => page.locator('[data-testid="nuisance-category-count"], .category-nuisance .count, [data-category="nuisance"] .count').first(),
  invalidCategoryCount: (page) => page.locator('[data-testid="invalid-category-count"], .category-invalid .count, [data-category="invalid"] .count').first(),
  
  // Backlog and Trends
  backlogCount: (page) => page.locator('[data-testid="backlog-count"], .backlog .count, #backlog-count').first(),
  resolutionTrendsChart: (page) => page.locator('[data-testid="resolution-trends"], .resolution-trends, #resolution-trends-chart').first(),
  
  // Filters
  categoryFilterDropdown: (page) => page.locator('[data-testid="category-filter"], select[name="category"], #category-filter').first(),
  statusFilterDropdown: (page) => page.locator('[data-testid="status-filter"], select[name="status"], #status-filter').first(),
  applyFilterButton: (page) => page.locator('button:has-text("Apply"), button[type="submit"]').first(),
  clearFiltersButton: (page) => page.locator('button:has-text("Clear"), button:has-text("Clear All Filters"), [data-testid="clear-filters"]').first(),
  activeFilterBadge: (page) => page.locator('.filter-badge, .active-filter, [data-testid="active-filter"]').first(),
  
  // SLA Metrics Section
  slaMetricsSection: (page) => page.locator('[data-testid="sla-metrics"], .sla-metrics, #sla-metrics-section').first(),
  oneDaySLATotal: (page) => page.locator('[data-testid="1day-sla-total"], [data-sla="1day"] .total').first(),
  oneDaySLAWithin: (page) => page.locator('[data-testid="1day-sla-within"], [data-sla="1day"] .within').first(),
  oneDaySLABreached: (page) => page.locator('[data-testid="1day-sla-breached"], [data-sla="1day"] .breached').first(),
  twoDaySLATotal: (page) => page.locator('[data-testid="2day-sla-total"], [data-sla="2day"] .total').first(),
  twoDaySLAWithin: (page) => page.locator('[data-testid="2day-sla-within"], [data-sla="2day"] .within').first(),
  twoDaySLABreached: (page) => page.locator('[data-testid="2day-sla-breached"], [data-sla="2day"] .breached').first(),
  threeDaySLATotal: (page) => page.locator('[data-testid="3day-sla-total"], [data-sla="3day"] .total').first(),
  threeDaySLAWithin: (page) => page.locator('[data-testid="3day-sla-within"], [data-sla="3day"] .within').first(),
  threeDaySLABreached: (page) => page.locator('[data-testid="3day-sla-breached"], [data-sla="3day"] .breached').first(),
  fiveDaySLATotal: (page) => page.locator('[data-testid="5day-sla-total"], [data-sla="5day"] .total').first(),
  fiveDaySLAWithin: (page) => page.locator('[data-testid="5day-sla-within"], [data-sla="5day"] .within').first(),
  fiveDaySLABreached: (page) => page.locator('[data-testid="5day-sla-breached"], [data-sla="5day"] .breached').first(),
  slaCompliancePercentage: (page) => page.locator('[data-testid="sla-compliance"], .sla-compliance-percentage').first(),
  
  // Messages and Indicators
  noTicketsMessage: (page) => page.locator('text=/No tickets found/i, .no-data-message, .empty-state').first(),
  errorMessage: (page) => page.locator('.error-message, .alert-error, [role="alert"]').first(),
  syncIndicator: (page) => page.locator('[data-testid="sync-status"], .sync-indicator, .connection-status').first(),
  lastUpdatedTimestamp: (page) => page.locator('[data-testid="last-updated"], .last-updated, .timestamp').first(),
  loadingIndicator: (page) => page.locator('.loading, .spinner, [data-testid="loading"]').first()
};

module.exports = locators;