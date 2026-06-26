const { expect } = require('@playwright/test');

class FirstLoginPage {
  constructor(page) {
    this.page = page;
    this.welcomeMessage = page.locator('[data-testid="welcome-message"], .welcome-message, h1:has-text("Welcome")');
    this.businessNameField = page.locator('[data-testid="business-name"], #businessName, .business-name');
    this.registrationNumberField = page.locator('[data-testid="registration-number"], #registrationNumber, .registration-number');
    this.gstNumberField = page.locator('[data-testid="gst-number"], #gstNumber, .gst-number');
    this.contactDetailsSection = page.locator('[data-testid="contact-details"], .contact-details-section');
    this.contactPersonField = page.locator('[data-testid="contact-person"], .contact-person');
    this.mobileNumberField = page.locator('[data-testid="mobile-number"], .mobile-number');
    this.emailField = page.locator('[data-testid="contact-email"], .contact-email');
    this.tipsSection = page.locator('[data-testid="tips-section"], .tips-section');
    this.acknowledgementCheckbox = page.locator('[data-testid="acknowledgement-checkbox"], input[type="checkbox"][name="acknowledgement"]');
    this.continueButton = page.locator('[data-testid="continue-button"], button:has-text("Continue")');
    this.inlineError = page.locator('[data-testid="inline-error"], .inline-error, .error-text');
  }

  async verifyWelcomeMessage(expectedText) {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.welcomeMessage).toContainText(expectedText);
  }

  async verifyBusinessProfile(businessName, regNumber, gstNumber) {
    await expect(this.businessNameField).toContainText(businessName);
    await expect(this.registrationNumberField).toContainText(regNumber);
    await expect(this.gstNumberField).toContainText(gstNumber);
  }

  async verifyContactDetailsMasking() {
    const mobileText = await this.mobileNumberField.textContent();
    const emailText = await this.emailField.textContent();
    expect(mobileText).toMatch(/\*{6}\d{4}/);
    expect(emailText).toMatch(/\w\*+\w@\w\*+\w\.com/);
  }

  async checkAcknowledgement() {
    await this.acknowledgementCheckbox.check();
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { FirstLoginPage };