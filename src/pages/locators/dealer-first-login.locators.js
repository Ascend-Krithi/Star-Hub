const locators = {
  welcomeMessage: (page) => page.locator('[data-testid="welcome-message"]').or(page.getByText(/welcome to dealer app/i)).first(),
  businessProfileSection: (page) => page.locator('[data-testid="business-profile"]').or(page.locator('.business-profile-section')).first(),
  businessName: (page) => page.locator('[data-testid="business-name"]').or(page.locator('.business-name')).first(),
  registrationNumber: (page) => page.locator('[data-testid="registration-number"]').or(page.locator('.registration-number')).first(),
  gstNumber: (page) => page.locator('[data-testid="gst-number"]').or(page.locator('.gst-registration-number')).first(),
  contactDetailsSection: (page) => page.locator('[data-testid="contact-details"]').or(page.locator('.contact-details-section')).first(),
  contactPerson: (page) => page.locator('[data-testid="contact-person"]').or(page.locator('.contact-person-name')).first(),
  mobileNumber: (page) => page.locator('[data-testid="mobile-number"]').or(page.locator('.mobile-number')).first(),
  emailAddress: (page) => page.locator('[data-testid="email-address"]').or(page.locator('.email-address')).first(),
  tipsSection: (page) => page.locator('[data-testid="tips-section"]').or(page.locator('.tips-section')).or(page.getByText(/contact support/i)).first(),
  acknowledgementCheckbox: (page) => page.getByRole('checkbox', { name: /acknowledge/i }).or(page.locator('[data-testid="acknowledgement-checkbox"]')).first(),
  continueButton: (page) => page.getByRole('button', { name: /continue/i }).first(),
  inlineError: (page) => page.locator('[data-testid="inline-error"]').or(page.locator('.inline-error-message')).or(page.getByText(/please acknowledge/i)).first()
};

module.exports = locators;