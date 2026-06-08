/**
 * Locators — Lending Portal
 * All UI element locators for Lending Portal application
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
  bookingsOption: (page) => page.locator('a:has-text("Bookings"), [data-testid="bookings-option"]').first(),
  
  // Bookings Report Page
  bookingsReportPage: (page) => page.locator('[data-testid="bookings-report"], .bookings-report').first(),
  
  // Filter Fields
  dateFromField: (page) => page.locator('input[name="dateFrom"], input[placeholder*="Date From"], #dateFrom').first(),
  dateToField: (page) => page.locator('input[name="dateTo"], input[placeholder*="Date To"], #dateTo').first(),
  statusDropdown: (page) => page.locator('select[name="status"], [data-testid="status-filter"]').first(),
  loanTypeDropdown: (page) => page.locator('select[name="loanType"], [data-testid="loantype-filter"]').first(),
  
  // Buttons
  generateReportButton: (page) => page.locator('button:has-text("Generate Report"), button:has-text("Apply Filter"), [data-testid="generate-report"]').first(),
  exportButton: (page) => page.locator('button:has-text("Export"), [data-testid="export-button"]').first(),
  downloadButton: (page) => page.locator('button:has-text("Download"), button:has-text("Confirm Export"), [data-testid="download-button"]').first(),
  viewDetailsButton: (page) => page.locator('button:has-text("View Details"), button:has-text("Transaction-Level View"), [data-testid="view-details"]').first(),
  
  // Export Format
  exportFormatDropdown: (page) => page.locator('select[name="exportFormat"], [data-testid="export-format"]').first(),
  csvOption: (page) => page.locator('option[value="CSV"], option:has-text("CSV")').first(),
  xlsxOption: (page) => page.locator('option[value="XLSX"], option:has-text("XLSX")').first(),
  
  // Summary View
  summaryView: (page) => page.locator('[data-testid="summary-view"], .summary-view, .report-summary').first(),
  totalBookings: (page) => page.locator('[data-testid="total-bookings"], .total-bookings').first(),
  totalAmount: (page) => page.locator('[data-testid="total-amount"], .total-amount').first(),
  confirmedBookings: (page) => page.locator('[data-testid="confirmed-bookings"], .confirmed-bookings').first(),
  pendingBookings: (page) => page.locator('[data-testid="pending-bookings"], .pending-bookings').first(),
  
  // Transaction-Level View
  transactionView: (page) => page.locator('[data-testid="transaction-view"], .transaction-view, .data-grid').first(),
  dataGrid: (page) => page.locator('table, [role="grid"], .data-grid').first(),
  gridHeaders: (page) => page.locator('th, [role="columnheader"]'),
  gridRows: (page) => page.locator('tbody tr, [role="row"]')
};

module.exports = locators;