const locators = {
  // User View Form Fields
  fullNameField: (page) => page.locator('[name="fullName"], [id="fullName"], input[placeholder*="Full Name"]').first(),
  phoneNumberField: (page) => page.locator('[name="phoneNumber"], [id="phoneNumber"], input[placeholder*="Phone"]').first(),
  emailAddressField: (page) => page.locator('[name="emailAddress"], [id="emailAddress"], input[placeholder*="Email"]').first(),
  companyNameField: (page) => page.locator('[name="companyName"], [id="companyName"], input[placeholder*="Company"]').first(),
  titleMessageField: (page) => page.locator('[name="titleMessage"], [id="titleMessage"], input[placeholder*="Title"]').first(),
  askQuestionsField: (page) => page.locator('[name="askQuestions"], [id="askQuestions"], textarea[placeholder*="Question"]').first(),
  attachmentField: (page) => page.locator('[name="attachment"], [id="attachment"], input[type="file"]').first(),
  submitButton: (page) => page.getByRole('button', { name: /submit/i }).first(),
  
  // Validation Messages
  emailValidationError: (page) => page.locator('[id*="email"][class*="error"], .error-message:has-text("Email")').first(),
  companyValidationError: (page) => page.locator('[id*="company"][class*="error"], .error-message:has-text("Company")').first(),
  titleValidationError: (page) => page.locator('[id*="title"][class*="error"], .error-message:has-text("Title")').first(),
  questionValidationError: (page) => page.locator('[id*="question"][class*="error"], .error-message:has-text("Question")').first(),
  
  // Success/Confirmation
  ticketReferenceId: (page) => page.locator('[id*="ticketRef"], [class*="ticket-reference"], .confirmation-message').first(),
  successMessage: (page) => page.locator('.success-message, [class*="success"]').first(),
  timestamp: (page) => page.locator('[id*="timestamp"], [class*="timestamp"]').first(),
  
  // Admin Login
  usernameField: (page) => page.locator('[name="username"], [id="username"], input[type="email"]').first(),
  passwordField: (page) => page.locator('[name="password"], [id="password"], input[type="password"]').first(),
  loginButton: (page) => page.getByRole('button', { name: /login|sign in/i }).first(),
  
  // Admin View
  adminDashboard: (page) => page.locator('[class*="admin-dashboard"], [id*="admin"]').first(),
  ticketSearchField: (page) => page.locator('[name="search"], [placeholder*="Search"], [placeholder*="Ticket"]').first(),
  ticketRow: (page, ticketId) => page.locator(`[data-ticket-id="${ticketId}"], tr:has-text("${ticketId}")`).first(),
  
  // Admin Form Fields
  vendorCodeField: (page) => page.locator('[name="vendorCode"], [id="vendorCode"]').first(),
  vendorNameField: (page) => page.locator('[name="vendorName"], [id="vendorName"]').first(),
  classificationLevel1Dropdown: (page) => page.locator('[name="classificationLevel1"], [id="classification"], select[id*="level1"]').first(),
  requestTypeLevel2Dropdown: (page) => page.locator('[name="requestType"], [id="requestType"], select[id*="level2"]').first(),
  inquiriesLevel3Field: (page) => page.locator('[name="inquiriesLevel3"], [id="inquiries"]').first(),
  resolutionStatusDropdown: (page) => page.locator('[name="resolutionStatus"], [id="status"], select[id*="resolution"]').first(),
  resolvedFirstContactDropdown: (page) => page.locator('[name="resolvedFirstContact"], [id="firstContact"]').first(),
  
  // SLA Dashboard
  slaDashboard: (page) => page.locator('[class*="sla-dashboard"], [id*="sla"]').first(),
  slaWarningAlert: (page) => page.locator('[class*="warning"], [class*="alert-warning"]').first(),
  slaCriticalAlert: (page) => page.locator('[class*="critical"], [class*="alert-danger"]').first(),
  slaRemainingTime: (page) => page.locator('[class*="remaining-time"], [id*="countdown"]').first(),
  
  // Reports
  reportsSection: (page) => page.locator('[href*="report"], a:has-text("Report")').first(),
  extractDataButton: (page) => page.getByRole('button', { name: /extract|generate|export/i }).first(),
  reportTable: (page) => page.locator('table[class*="report"], .data-table').first(),
  
  // Dropdown Options
  dropdownOption: (page, optionText) => page.locator(`option:has-text("${optionText}"), [role="option"]:has-text("${optionText}")`).first(),
};

module.exports = locators;