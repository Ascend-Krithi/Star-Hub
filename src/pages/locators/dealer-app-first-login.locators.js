const locators = {
  welcomeMessage: (page) => page.locator('h1:has-text("Welcome"), .welcome-message').first(),
  businessNameField: (page) => page.locator('text=Business Name, [data-testid="business-name"]').first(),
  registrationNumberField: (page) => page.locator('text=Registration Number, [data-testid="registration-number"]').first(),
  gstNumberField: (page) => page.locator('text=GST, [data-testid="gst-number"]').first(),
  contactPersonField: (page) => page.locator('text=Contact Person, [data-testid="contact-person"]').first(),
  mobileNumberField: (page) => page.locator('text=Mobile, [data-testid="mobile-number"]').first(),
  emailField: (page) => page.locator('text=Email, [data-testid="email-display"]').first(),
  tipsSection: (page) => page.locator('.tips-section, [data-testid="tips-section"]').first(),
  acknowledgementCheckbox: (page) => page.locator('input[type="checkbox"], [data-testid="acknowledgement-checkbox"]').first(),
  continueButton: (page) => page.locator('button:has-text("Continue"), [data-testid="continue-button"]').first(),
  inlineErrorMessage: (page) => page.locator('.inline-error, .checkbox-error, [role="alert"]').first(),
  businessProfileSection: (page) => page.locator('.business-profile, [data-testid="business-profile"]').first(),
  contactDetailsSection: (page) => page.locator('.contact-details, [data-testid="contact-details"]').first()
};

module.exports = locators;