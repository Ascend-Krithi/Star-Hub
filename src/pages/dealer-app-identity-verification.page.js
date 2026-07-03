const loc = require('./locators/dealer-app-identity-verification.locators');
const TD = require('../data/dealer-app-test-data');

class DealerAppIdentityVerificationPage {
  constructor(page) {
    this.page = page;
  }

  async isIdentityVerificationScreenVisible() {
    return await loc.identityVerificationScreen(this.page).isVisible();
  }

  async getBusinessOwnerName() {
    return await loc.businessOwnerName(this.page).textContent();
  }

  async enterOTP(otp) {
    await loc.otpField(this.page).fill(otp);
  }

  async uploadDocument(filePath) {
    await loc.documentUploadField(this.page).setInputFiles(filePath);
  }

  async clickVerify() {
    await loc.verifyButton(this.page).click();
  }

  async completeVerification(method, value) {
    if (method === 'OTP') {
      await this.enterOTP(value);
    } else if (method === 'document') {
      await this.uploadDocument(value);
    }
    await this.clickVerify();
  }

  async isVerificationSuccessful() {
    return await loc.verificationSuccessMessage(this.page).isVisible();
  }
}

module.exports = DealerAppIdentityVerificationPage;