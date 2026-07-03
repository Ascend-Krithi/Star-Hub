/**
 * Helpdesk Admin Portal Locators
 */

const locators = {
  // Login
  usernameField: (page) => page.locator('input[name="username"], input[id="username"], input[type="email"]').first(),
  passwordField: (page) => page.locator('input[name="password"], input[id="password"], input[type="password"]').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first(),
  
  // Dashboard
  dashboard: (page) => page.locator('[class*="dashboard"], [id*="dashboard"]').first(),
  
  // Navigation
  ticketQueueLink: (page) => page.locator('a:has-text("Ticket Queue"), [href*="ticket"][href*="queue"]').first(),
  reportsLink: (page) => page.locator('a:has-text("Reports"), [href*="report"]').first(),
  slaDashboardLink: (page) => page.locator('a:has-text("SLA Dashboard"), [href*="sla"]').first(),
  
  // Ticket Queue
  ticketList: (page) => page.locator('[class*="ticket-list"], table[class*="ticket"]').first(),
  ticketRow: (page, ticketRef) => page.locator(`tr:has-text("${ticketRef}"), [data-ticket-ref="${ticketRef}"]`).first(),
  newStatusFilter: (page) => page.locator('select[name="status"], [class*="status-filter"]').first(),
  
  // Ticket Details
  ticketDetailsPage: (page) => page.locator('[class*="ticket-details"], [id*="ticket-details"]').first(),
  ticketStatus: (page) => page.locator('[class*="ticket-status"], [id*="status"]').first(),
  
  // Classification dropdowns (3-level)
  classificationDropdown: (page) => page.locator('select[name="classification"], select[id="classification"]').first(),
  requestTypeDropdown: (page) => page.locator('select[name="requestType"], select[id="requestType"]').first(),
  detailsDropdown: (page) => page.locator('select[name="details"], select[id="details"]').first(),
  
  // Classification options
  classificationOption: (page, value) => page.locator(`select[name="classification"] option:has-text("${value}"), option[value="${value}"]`).first(),
  requestTypeOption: (page, value) => page.locator(`select[name="requestType"] option:has-text("${value}")`).first(),
  detailsOption: (page, value) => page.locator(`select[name="details"] option:has-text("${value}")`).first(),
  
  // Action Owner Assignment
  assignActionOwnerButton: (page) => page.locator('button:has-text("Assign to Action Owner"), button[id*="assign"]').first(),
  actionOwnerDropdown: (page) => page.locator('select[name="actionOwner"], select[id="actionOwner"]').first(),
  actionOwnerOption: (page, email) => page.locator(`option:has-text("${email}")`).first(),
  submitAssignmentButton: (page) => page.locator('button:has-text("Submit Assignment"), button[type="submit"]').first(),
  
  // Action Owner Response
  responseField: (page) => page.locator('textarea[name="response"], textarea[id="response"]').first(),
  submitResponseButton: (page) => page.locator('button:has-text("Submit Response"), button[type="submit"]').first(),
  
  // Ticket Closure
  vendorCodeField: (page) => page.locator('input[name="vendorCode"], input[id="vendorCode"]').first(),
  vendorNameField: (page) => page.locator('input[name="vendorName"], input[id="vendorName"]').first(),
  resolutionStatusDropdown: (page) => page.locator('select[name="resolutionStatus"], select[id="resolutionStatus"]').first(),
  resolvedFirstContactYes: (page) => page.locator('input[type="radio"][value="Yes"], input[id*="firstContact"][value="Yes"]').first(),
  closeTicketButton: (page) => page.locator('button:has-text("Close Ticket"), button[id*="close"]').first(),
  dateClosedField: (page) => page.locator('[class*="date-closed"], [id*="dateClosed"]').first(),
  
  // Status Management
  statusDropdown: (page) => page.locator('select[name="status"], select[id="ticketStatus"]').first(),
  statusOption: (page, status) => page.locator(`option:has-text("${status}")`).first(),
  statusHistorySection: (page) => page.locator('[class*="status-history"], [id*="history"]').first(),
  
  // SLA Dashboard
  slaMetrics: (page) => page.locator('[class*="sla-metrics"], [id*="sla"]').first(),
  slaTimer: (page, ticketRef) => page.locator(`[data-ticket="${ticketRef}"] [class*="timer"], tr:has-text("${ticketRef}") [class*="sla"]`).first(),
  overdueAlert: (page) => page.locator('[class*="overdue"], [class*="alert"][class*="sla"]').first(),
  overdueTicket: (page, ticketRef) => page.locator(`tr:has-text("${ticketRef}")[class*="overdue"]`).first(),
  
  // Email Communication
  sendEmailButton: (page) => page.locator('button:has-text("Send Email"), button[id*="email"]').first(),
  emailSubjectField: (page) => page.locator('input[name="subject"], input[id="subject"]').first(),
  emailBodyField: (page) => page.locator('textarea[name="body"], textarea[id="emailBody"]').first(),
  sendEmailSubmitButton: (page) => page.locator('button:has-text("Send")[type="submit"]').first(),
  communicationHistory: (page) => page.locator('[class*="communication-history"], [id*="comm-history"]').first(),
  emailSentTimestamp: (page) => page.locator('[class*="email-sent"] [class*="timestamp"]').first(),
  vendorReplyEmail: (page) => page.locator('[class*="vendor-reply"], [class*="reply"]').first(),
  
  // Reports
  reportExtractionPage: (page) => page.locator('[class*="report-extraction"], [id*="report"]').first(),
  fromDateField: (page) => page.locator('input[name="fromDate"], input[id="fromDate"]').first(),
  toDateField: (page) => page.locator('input[name="toDate"], input[id="toDate"]').first(),
  statusFilterDropdown: (page) => page.locator('select[name="statusFilter"], select[id="statusFilter"]').first(),
  generateReportButton: (page) => page.locator('button:has-text("Generate Report"), button[id*="generate"]').first(),
  reportPreview: (page) => page.locator('[class*="report-preview"], table[class*="report"]').first(),
  downloadButton: (page) => page.locator('button:has-text("Download"), a:has-text("Download")').first(),
  reportColumn: (page, columnName) => page.locator(`th:has-text("${columnName}")`).first(),
  
  // Confirmation messages
  successMessage: (page) => page.locator('[class*="success"], [role="alert"][class*="success"]').first(),
  errorMessage: (page) => page.locator('[class*="error"], [role="alert"][class*="error"]').first(),
  confirmationMessage: (page) => page.locator('[class*="confirmation"], [role="alert"]').first(),
  
  // Save button
  saveButton: (page) => page.locator('button:has-text("Save"), button[type="submit"]').first(),
  
  // Logout
  logoutButton: (page) => page.locator('button:has-text("Logout"), a:has-text("Logout"), [href*="logout"]').first()
};

module.exports = locators;