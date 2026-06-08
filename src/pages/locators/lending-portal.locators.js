const locators = {
  // Login Page
  usernameInput: (page) => page.locator('input[name="username"], input[type="email"], #username').first(),
  passwordInput: (page) => page.locator('input[name="password"], input[type="password"], #password').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first(),
  
  // Dashboard
  dashboardContainer: (page) => page.locator('[data-testid="dashboard"], .dashboard, #dashboard').first(),
  
  // Reports Menu
  reportsDropdown: (page) => page.locator('a:has-text("Reports"), button:has-text("Reports"), [data-testid="reports-menu"]').first(),
  bookingsOption: (page) => page.locator('a:has-text("Bookings"), li:has-text("Bookings"), [data-testid="bookings-report"]').first(),
  
  // Bookings Report Page
  bookingsReportContainer: (page) => page.locator('[data-testid="bookings-report"], .bookings-report, #bookings-report').first(),
  dateFromInput: (page) => page.locator('input[name="dateFrom"], input[placeholder*="Date From"], #dateFrom').first(),
  dateToInput: (page) => page.locator('input[name="dateTo"], input[placeholder*="Date To"], #dateTo').first(),
  statusDropdown: (page) => page.locator('select[name="status"], [data-testid="status-filter"], #status').first(),
  loanTypeDropdown: (page) => page.locator('select[name="loanType"], [data-testid="loan-type-filter"], #loanType').first(),
  generateReportButton: (page) => page.locator('button:has-text("Generate Report"), button:has-text("Apply Filter"), [data-testid="generate-report"]').first(),
  
  // Summary View
  summaryView: (page) => page.locator('[data-testid="summary-view"], .summary-view, #summary-view').first(),
  totalBookingsMetric: (page) => page.locator('[data-testid="total-bookings"], .total-bookings, *:has-text("Total Bookings")').first(),
  totalAmountMetric: (page) => page.locator('[data-testid="total-amount"], .total-amount, *:has-text("Total Amount")').first(),
  confirmedBookingsMetric: (page) => page.locator('[data-testid="confirmed-bookings"], .confirmed-bookings, *:has-text("Confirmed Bookings")').first(),
  pendingBookingsMetric: (page) => page.locator('[data-testid="pending-bookings"], .pending-bookings, *:has-text("Pending Bookings")').first(),
  
  // Transaction-Level View
  transactionViewButton: (page) => page.locator('button:has-text("Transaction-Level View"), button:has-text("View Details"), [data-testid="transaction-view"]').first(),
  transactionDataGrid: (page) => page.locator('[data-testid="transaction-grid"], .transaction-grid, table').first(),
  bookingIdColumn: (page) => page.locator('th:has-text("Booking ID"), [data-testid="booking-id-header"]').first(),
  customerNameColumn: (page) => page.locator('th:has-text("Customer Name"), [data-testid="customer-name-header"]').first(),
  loanTypeColumn: (page) => page.locator('th:has-text("Loan Type"), [data-testid="loan-type-header"]').first(),
  bookingDateColumn: (page) => page.locator('th:has-text("Booking Date"), [data-testid="booking-date-header"]').first(),
  amountColumn: (page) => page.locator('th:has-text("Amount"), [data-testid="amount-header"]').first(),
  statusColumn: (page) => page.locator('th:has-text("Status"), [data-testid="status-header"]').first(),
  
  // Export Functionality
  exportButton: (page) => page.locator('button:has-text("Export"), [data-testid="export-button"]').first(),
  csvFormatOption: (page) => page.locator('option[value="csv"], li:has-text("CSV"), [data-testid="csv-format"]').first(),
  xlsxFormatOption: (page) => page.locator('option[value="xlsx"], li:has-text("XLSX"), [data-testid="xlsx-format"]').first(),
  downloadButton: (page) => page.locator('button:has-text("Download"), button:has-text("Confirm Export"), [data-testid="download-button"]').first(),
  
  // Admin Portal - Report Lists
  reportListsOption: (page) => page.locator('a:has-text("Report Lists"), li:has-text("Report Lists"), [data-testid="report-lists"]').first(),
  reportListsContainer: (page) => page.locator('[data-testid="report-lists"], .report-lists, #report-lists').first(),
  searchReportInput: (page) => page.locator('input[name="search"], input[placeholder*="Search"], [data-testid="search-report"]').first(),
  auditTrailGrid: (page) => page.locator('[data-testid="audit-trail"], .audit-trail, table').first(),
  reportTypeCell: (page) => page.locator('td:has-text("Bookings")').first(),
  actionCell: (page) => page.locator('td:has-text("Export")').first(),
  formatCell: (page) => page.locator('td:has-text("CSV")').first(),
  operatorIdCell: (page) => page.locator('td:has-text("admin@uniondigital.com")').first()
};

module.exports = locators;