/**
 * Helpdesk Submit Ticket Form Locators
 */

const locators = {
  // Form fields
  fullNameField: (page) => page.locator('input[name="fullName"], input[id="fullName"], input[placeholder*="Full Name" i]').first(),
  phoneNumberField: (page) => page.locator('input[name="phoneNumber"], input[id="phoneNumber"], input[placeholder*="Phone" i]').first(),
  emailField: (page) => page.locator('input[name="email"], input[id="email"], input[type="email"], input[placeholder*="Email" i]').first(),
  companyNameField: (page) => page.locator('input[name="companyName"], input[id="companyName"], input[placeholder*="Company" i]').first(),
  titleMessageField: (page) => page.locator('input[name="title"], input[id="title"], input[placeholder*="Title" i]').first(),
  questionField: (page) => page.locator('textarea[name="question"], textarea[id="question"], textarea[placeholder*="Question" i]').first(),
  
  // Buttons
  submitButton: (page) => page.locator('button[type="submit"], button:has-text("Submit")').first(),
  
  // Messages and confirmations
  confirmationMessage: (page) => page.locator('[class*="success"], [class*="confirmation"], [role="alert"]').first(),
  ticketReference: (page) => page.locator('[class*="ticket-reference"], [class*="ticketRef"], text=/\d{13}/').first(),
  dateSubmitted: (page) => page.locator('[class*="date-submitted"], [class*="timestamp"]').first(),
  
  // Validation errors
  emailError: (page) => page.locator('[class*="error"]:near(input[type="email"]), [id*="email-error"]').first(),
  companyNameError: (page) => page.locator('[class*="error"]:near(input[name="companyName"]), [id*="company-error"]').first(),
  validationError: (page) => page.locator('[class*="error"], [role="alert"][class*="error"]').first()
};

module.exports = locators;