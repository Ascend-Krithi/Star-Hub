const locators = {
  usernameInput: (page) => page.locator('input[name="username"], input[id="username"], input[type="email"]').first(),
  passwordInput: (page) => page.locator('input[name="password"], input[id="password"], input[type="password"]').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first(),
  dashboard: (page) => page.locator('[data-testid="dashboard"], .dashboard, #dashboard').first(),
  reportsDropdown: (page) => page.locator('[data-testid="reports-dropdown"], button:has-text("Reports"), a:has-text("Reports")').first(),
  reportListsOption: (page) => page.locator('[data-testid="report-lists"], a:has-text("Report Lists"), li:has-text("Report Lists")').first(),
  reportListsPage: (page) => page.locator('[data-testid="report-lists-page"], .report-lists, #report-lists').first(),
  searchReportType: (page) => page.locator('[data-testid="search-report-type"], input[name="reportType"], select[name="reportType"]').first(),
  searchDateFilter: (page) => page.locator('[data-testid="search-date"], input[name="date"], input[type="date"]').first(),
  searchButton: (page) => page.locator('[data-testid="search-button"], button:has-text("Search"), button[type="submit"]').first(),
  auditTrailEntry: (page) => page.locator('[data-testid="audit-entry"], .audit-entry, tr.audit-row').first(),
  reportTypeField: (page) => page.locator('[data-testid="report-type-field"], td:has-text("Report Type"), .report-type').first(),
  actionField: (page) => page.locator('[data-testid="action-field"], td:has-text("Export"), .action').first(),
  formatField: (page) => page.locator('[data-testid="format-field"], .format').first(),
  operatorIdField: (page) => page.locator('[data-testid="operator-id-field"], .operator-id').first(),
  timestampField: (page) => page.locator('[data-testid="timestamp-field"], .timestamp').first()
};

module.exports = locators;