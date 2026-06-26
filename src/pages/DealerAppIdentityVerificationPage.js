const identityLoc = require('../locators/dealerApp-identityVerification.locators');
const TD = require('../data/dealerApp-test-data');

class DealerAppIdentityVerificationPage {
  constructor(page) {
    this.page = page;
  }

  async isIdentityVerificationScreenDisplayed() {
    try {
      await identityLoc.identityVerificationScreen(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await identityLoc.identityVerificationScreen(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async fillOwnerName(ownerName) {
    try {
      await identityLoc.ownerNameField(this.page).waitFor({ state: 'visible', timeout: 10000 });
      await identityLoc.ownerNameField(this.page).fill(ownerName);
      return ownerName;
    } catch (error) {
      throw new Error(`Failed to fill owner name: ${error.message}`);
    }
  }

  async fillIdNumber(idNumber) {
    try {
      await identityLoc.idNumberField(this.page).waitFor({ state: 'visible', timeout: 10000 });
      await identityLoc.idNumberField(this.page).fill(idNumber);
      return idNumber;
    } catch (error) {
      throw new Error(`Failed to fill ID number: ${error.message}`);
    }
  }

  async submitVerification() {
    try {
      await identityLoc.submitButton(this.page).click();
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
      return true;
    } catch (error) {
      throw new Error(`Failed to submit verification: ${error.message}`);
    }
  }

  async fillAndSubmitVerification(ownerName, idNumber) {
    try {
      await this.fillOwnerName(ownerName);
      await this.fillIdNumber(idNumber);
      await this.submitVerification();
      return true;
    } catch (error) {
      throw new Error(`Identity verification failed: ${error.message}`);
    }
  }

  async getSuccessMessage() {
    try {
      await identityLoc.successMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await identityLoc.successMessage(this.page).textContent();
    } catch (error) {
      return null;
    }
  }
}

module.exports = DealerAppIdentityVerificationPage;