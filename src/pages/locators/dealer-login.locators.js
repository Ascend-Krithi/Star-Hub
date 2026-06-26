const locators = {
  emailField: (page) => page.locator('input[type="email"], input[name="email"], #email').first(),
  passwordField: (page) => page.locator('input[type="password"], input[name="password"], #password').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), input[type="submit"]').first(),
  errorMessage: (page) => page.locator('.error-message, .alert-danger, [role="alert"]').first(),
  dashboard: (page) => page.locator('.dashboard, #dashboard, [data-testid="dashboard"]').first(),
  welcomeMessage: (page) => page.locator('.welcome-message, h1:has-text("Welcome"), [data-testid="welcome-message"]').first(),
  businessNameField: (page) => page.locator('input[name="businessName"], #businessName, [data-testid="business-name"]').first(),
  registrationNumberField: (page) => page.locator('input[name="registrationNumber"], #registrationNumber, [data-testid="registration-number"]').first(),
  gstNumberField: (page) => page.locator('input[name="gstNumber"], #gstNumber, [data-testid="gst-number"]').first(),
  contactPersonField: (page) => page.locator('[data-testid="contact-person"], .contact-person, #contactPerson').first(),
  mobileNumberField: (page) => page.locator('[data-testid="mobile-number"], .mobile-number, #mobileNumber').first(),
  emailDisplayField: (page) => page.locator('[data-testid="email-display"], .email-display, #emailDisplay').first(),
  tipsSection: (page) => page.locator('.tips-section, [data-testid="tips-section"], .help-text').first(),
  acknowledgementCheckbox: (page) => page.locator('input[type="checkbox"][name="acknowledgement"], #acknowledgement, [data-testid="acknowledgement-checkbox"]').first(),
  continueButton: (page) => page.locator('button:has-text("Continue"), [data-testid="continue-button"]').first(),
  inlineErrorMessage: (page) => page.locator('.inline-error, .field-error, [data-testid="inline-error"]').first(),
  identityVerificationScreen: (page) => page.locator('.identity-verification, [data-testid="identity-verification"]').first(),
  ownerNameField: (page) => page.locator('input[name="ownerName"], #ownerName, [data-testid="owner-name"]').first(),
  idNumberField: (page) => page.locator('input[name="idNumber"], #idNumber, [data-testid="id-number"]').first(),
  submitVerificationButton: (page) => page.locator('button[type="submit"]:has-text("Submit"), [data-testid="submit-verification"]').first(),
  logoutButton: (page) => page.locator('button:has-text("Logout"), a:has-text("Logout"), [data-testid="logout-button"]').first(),
  sessionTimeoutMessage: (page) => page.locator('.session-timeout, [data-testid="session-timeout-message"]').first(),
  securityMessage: (page) => page.locator('.security-message, [data-testid="security-message"]').first()
};

module.exports = locators;