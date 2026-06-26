const { expect } = require('@playwright/test');

class IdentityVerificationPage {
  constructor(page) {
    this.page = page;
    this.verificationScreen = page.locator('[data-testid="verification-screen"], .verification-screen');
    this.ownerNameField = page.locator('[data-testid="owner-name"], #ownerName, input[name="ownerName"]');
    this.idNumberField = page.locator('[data-testid="id-number"], #idNumber, input[name="idNumber"]');
    this.submitButton = page.locator('[data-testid="submit-verification"], button[type="submit"], button:has-text("Submit")');
  }

  async enterOwnerName(name) {
    await this.ownerNameField.fill(name);
  }

  async enterIdNumber(idNumber) {
    await this.idNumberField.fill(idNumber);
  }

  async submitVerification() {
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async completeVerification(ownerName, idNumber) {
    await this.enterOwnerName(ownerName);
    await this.enterIdNumber(idNumber);
    await this.submitVerification();
  }
}

module.exports = { IdentityVerificationPage };