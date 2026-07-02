const locators = {
  // User View Form Fields
  fullNameField: (page) => page.locator('input[name="fullName"], input[id*="fullName"], [data-testid="full-name"]').first(),
  phoneNumberField: (page) => page.locator('input[name="phoneNumber"], input[id*="phoneNumber"], [data-testid="phone-number"]').first(),
  emailAddressField: (page) => page.locator('input[name="emailAddress"], input[id*="email"], [data-testid="email-address"]').first(),
  companyNameField: (page) => page.locator('input[name="companyName"], input[id*="company"], [data-testid="company-name"]').first(),
  titleMessageField: (page) => page.locator('input[name="titleMessage"], textarea[name="titleMessage"], [data-testid="title-message"]').first(),
  questionsField: (page) => page.locator('textarea[name="questions"], textarea[id*="questions"], [data-testid="ask-questions"]').first(),
  attachmentField: (page) => page.locator('input[type="file"], [data-testid="attachment"]').first(),
  submitButton: (page) => page.locator('button[type="submit"], button:has-text("Submit")').first(),
  
  // Mandatory Field Indicators
  emailMandatoryIndicator: (page) => page.locator('label:has-text("Email") span.mandatory, label:has-text("Email"):has-text("*")').first(),
  companyMandatoryIndicator: (page) => page.locator('label:has-text("Company") span.mandatory, label:has-text("Company"):has-text("*")').first(),
  titleMandatoryIndicator: (page) => page.locator('label:has-text("Title") span.mandatory, label:has-text("Title"):has-text("*")').first(),
  questionsMandatoryIndicator: (page) => page.locator('label:has-text("Questions") span.mandatory, label:has-text("Questions"):has-text("*")').first(),
  attachmentOptionalIndicator: (page) => page.locator('label:has-text("Attachment"):has-text("As needed")').first(),
  
  // Success Messages
  ticketReferenceId: (page) => page.locator('[data-testid="ticket-reference"], .ticket-id, .reference-id').first(),
  successMessage: (page) => page.locator('.success-message, .alert-success, [role="alert"]:has-text("success")').first(),
  timestamp: (page) => page.locator('[data-testid="timestamp"], .timestamp, .created-date').first(),
  
  // Validation Error Messages
  emailErrorMessage: (page) => page.locator('.error:has-text("Email"), .validation-error:has-text("Email")').first(),
  companyErrorMessage: (page) => page.locator('.error:has-text("Company"), .validation-error:has-text("Company")').first(),
  titleErrorMessage: (page) => page.locator('.error:has-text("Title"), .validation-error:has-text("Title")').first(),
  questionsErrorMessage: (page) => page.locator('.error:has-text("Questions"), .validation-error:has-text("Questions")').first(),
  
  // Admin View - Login
  usernameField: (page) => page.locator('input[name="username"], input[type="text"][id*="user"]').first(),
  passwordField: (page) => page.locator('input[name="password"], input[type="password"]').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first(),
  
  // Admin View - Dashboard
  adminDashboard: (page) => page.locator('[data-testid="admin-dashboard"], .admin-view, h1:has-text("Admin")').first(),
  ticketSearchField: (page) => page.locator('input[name="search"], input[placeholder*="Search"], input[placeholder*="Ticket"]').first(),
  ticketLink: (ticketId) => (page) => page.locator(`a:has-text("${ticketId}"), [data-ticket-id="${ticketId}"]`).first(),
  
  // Admin View - Ticket Details
  vendorCodeField: (page) => page.locator('input[name="vendorCode"], input[id*="vendorCode"], [data-testid="vendor-code"]').first(),
  vendorNameField: (page) => page.locator('input[name="vendorName"], input[id*="vendorName"], [data-testid="vendor-name"]').first(),
  classificationLevel1Dropdown: (page) => page.locator('select[name="classificationLevel1"], select[id*="classification"], [data-testid="classification-level1"]').first(),
  requestTypeLevel2Dropdown: (page) => page.locator('select[name="requestType"], select[id*="requestType"], [data-testid="request-type-level2"]').first(),
  inquiriesLevel3Field: (page) => page.locator('input[name="inquiriesLevel3"], textarea[name="inquiriesLevel3"], [data-testid="inquiries-level3"]').first(),
  resolutionStatusDropdown: (page) => page.locator('select[name="resolutionStatus"], select[id*="status"], [data-testid="resolution-status"]').first(),
  resolvedFirstContactDropdown: (page) => page.locator('select[name="resolvedFirstContact"], select[id*="firstContact"], [data-testid="resolved-first-contact"]').first(),
  
  // Admin View - User View Fields (Read-only)
  displayedFullName: (page) => page.locator('[data-field="fullName"], .field-fullName, label:has-text("Full Name") + *').first(),
  displayedPhoneNumber: (page) => page.locator('[data-field="phoneNumber"], .field-phoneNumber, label:has-text("Phone") + *').first(),
  displayedEmail: (page) => page.locator('[data-field="email"], .field-email, label:has-text("Email") + *').first(),
  displayedCompany: (page) => page.locator('[data-field="company"], .field-company, label:has-text("Company") + *').first(),
  displayedTitle: (page) => page.locator('[data-field="title"], .field-title, label:has-text("Title") + *').first(),
  displayedQuestions: (page) => page.locator('[data-field="questions"], .field-questions, label:has-text("Questions") + *').first(),
  displayedAttachment: (page) => page.locator('[data-field="attachment"], .field-attachment, label:has-text("Attachment") + *').first(),
  
  // Admin View - SLA and Alerts
  leadTimeDisplay: (page) => page.locator('[data-testid="lead-time"], .lead-time, .elapsed-time').first(),
  slaWarningAlert: (page) => page.locator('.alert-warning, .sla-warning, [class*="warning"]').first(),
  slaCriticalAlert: (page) => page.locator('.alert-danger, .sla-critical, [class*="critical"], [class*="breach"]').first(),
  
  // Admin View - Save/Update
  saveButton: (page) => page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]').first(),
  validationErrorModal: (page) => page.locator('.modal .error, .validation-modal, [role="dialog"]:has-text("error")').first(),
  closureTimestamp: (page) => page.locator('[data-testid="closure-timestamp"], .closure-date, .closed-at').first(),
  auditLog: (page) => page.locator('[data-testid="audit-log"], .audit-log, .history-log').first(),
  
  // Report Extraction
  reportExtractionSection: (page) => page.locator('[data-testid="report-extraction"], .report-section, h2:has-text("Report")').first(),
  extractDataButton: (page) => page.locator('button:has-text("Extract"), button:has-text("Export"), button:has-text("Generate Report")').first(),
  reportTable: (page) => page.locator('table[data-report="extraction"], .report-table, table').first(),
  reportColumns: (page) => page.locator('table thead th').all(),
};

module.exports = locators;