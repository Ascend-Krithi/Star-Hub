module.exports = {
  welcomeMessage: (page) => page.locator('[data-testid="welcome-message"]').or(page.locator('text="Welcome to Dealer App!"')).first(),
  businessNameField: (page) => page.locator('[data-testid="business-name"]').or(page.locator('input[name="businessName"]')).or(page.locator('label:has-text("Business Name") + input')).first(),
  registrationNumberField: (page) => page.locator('[data-testid="registration-number"]').or(page.locator('input[name="registrationNumber"]')).first(),
  gstNumberField: (page) => page.locator('[data-testid="gst-number"]').or(page.locator('input[name="gstNumber"]')).first(),
  contactPersonField: (page) => page.locator('[data-testid="contact-person"]').or(page.locator('input[name="contactPerson"]')).first(),
  mobileField: (page) => page.locator('[data-testid="mobile"]').or(page.locator('input[name="mobile"]')).or(page.locator('input[type="tel"]')).first(),
  emailField: (page) => page.locator('[data-testid="contact-email"]').or(page.locator('input[name="contactEmail"]')).first(),
  tipsSection: (page) => page.locator('[data-testid="tips-section"]').or(page.locator('[class*="tips"]')).first(),
  acknowledgementCheckbox: (page) => page.locator('[data-testid="acknowledgement-checkbox"]').or(page.locator('input[type="checkbox"]')).first(),
  continueButton: (page) => page.locator('[data-testid="continue-button"]').or(page.locator('button:has-text("Continue")')).first(),
  inlineError: (page) => page.locator('[data-testid="inline-error"]').or(page.locator('.inline-error')).first(),
  businessProfileSection: (page) => page.locator('[data-testid="business-profile"]').or(page.locator('[class*="business-profile"]')).first(),
  contactDetailsSection: (page) => page.locator('[data-testid="contact-details"]').or(page.locator('[class*="contact-details"]')).first()
};