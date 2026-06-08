/**
 * Locators — Admin Portal
 * All UI element locators for Admin Portal application
 */

const locators = {
  // Login Page
  usernameField: (page) => page.locator('input[name="username"], input[type="email"], #username').first(),
  passwordField: (page) => page.locator('input[name="password"], input[type="password"], #password').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first(),
  
  // Dashboard
  dashboard: (page) => page.locator('[data-testid="dashboard"], .dashboard, #dashboard').first(),
  
  // Reports Menu
  reportsDropdown: (page) => page.locator('button:has-text("Reports"), a:has-text("Reports"), [data-testid="reports-menu"]').first(),
  reportListsOption: (page) => page.locator('a:has-text("Report Lists"), [data-testid="report-lists-option"]').first(),
  
  // Report Lists Page
  reportListsPage: (page) => page.locator('[data-testid="report-lists"], .report-lists, .audit-trail').first(),
  
  // Search/Filter Fields
  reportTypeFilter: (page) => page.locator('select[name="reportType"], input[name="reportType"], [data-testid="report-type-filter"]').first(),
  dateFilter: (page) => page.locator('input[name="date"], input[type="date"], [data-testid="date-filter"]').first(),
  searchButton: (page) => page.locator('button:has-text("Search"), [data-testid="search-button"]').first(),
  
  // Audit Trail Table
  auditTrailTable: (page) => page.locator('table, [role="grid"], .audit-trail-table').first(),
  auditTrailRows: (page) => page.locator('tbody tr, [role="row"]'),
  
  // Audit Trail Columns
  reportTypeColumn: (page) => page.locator('td:has-text("Bookings"), [data-column="reportType"]'),
  actionColumn: (page) => page.locator('td:has-text("Export"), [data-column="action"]'),
  formatColumn: (page) => page.locator('td:has-text("CSV"), [data-column="format"]'),
  operatorColumn: (page) => page.locator('td:has-text("admin@uniondigital.com"), [data-column="operator"]'),
  timestampColumn: (page) => page.locator('[data-column="timestamp"]')
};

module.exports = locators;