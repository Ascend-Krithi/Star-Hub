const locators = {
  businessNameField: (page) => page.locator('[data-testid="business-name"]').first(),
  registrationNumberField: (page) => page.locator('[data-testid="registration-number"]').first(),
  gstNumberField: (page) => page.locator('[data-testid="gst-number"]').first(),
  contactPersonField: (page) => page.locator('[data-testid="contact-person"]').first(),
  mobileNumberField: (page) => page.locator('[data-testid="mobile-number"]').first(),
  emailField: (page) => page.locator('[data-testid="contact-email"]').first(),
  tipsSection: (page) => page.locator('[data-testid="tips-section"]').first(),
  acknowledgementCheckbox: (page) => page.locator('[data-testid="acknowledgement-checkbox"]').first(),
  continueButton: (page) => page.getByRole('button', { name: 'Continue' }).first(),
  inlineErrorMessage: (page) => page.locator('[data-testid="inline-error"]').first()
};

module.exports = locators;