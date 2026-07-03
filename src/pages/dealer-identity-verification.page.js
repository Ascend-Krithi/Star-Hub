const { expect } = require('@playwright/test');
const loc = require('./locators/dealer-identity-verification.locators');
const TD = require('../data/dealer-app-test-data');

class DealerIdentityVerificationPage {
  constructor(page) {
    this.page = page;
  }

  async isIdentityVerificationScreenVisible() {
    try {
      await loc.identityVerificationScreen(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async isBusinessOwnerDetailsVisible() {
    try {
      await loc.businessOwnerDetails(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async enterOtp(otp) {
    await loc.otpInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.otpInput(this.page).fill(otp);
  }

  async uploadDocument(filePath) {
    await loc.documentUpload(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.documentUpload(this.page).setInputFiles(filePath);
  }

  async clickVerify() {
    await loc.verifyButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.verifyButton(this.page).click();
  }

  async isVerificationSuccessful() {
    try {
      await loc.verificationSuccess(this.page).waitFor({ state: 'visible', timeout: 15000 });
      return true;
    } catch {
      return false;
    }
  }

  async completeOtpVerification(otp) {
    await this.enterOtp(otp);
    await this.clickVerify();
  }
}

module.exports = DealerIdentityVerificationPage;