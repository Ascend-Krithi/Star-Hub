const loc = require('./locators/dealer-app-business-profile.locators');
const TD = require('../data/dealer-app-test-data');

class DealerAppBusinessProfilePage {
  constructor(page) {
    this.page = page;
  }

  async getBusinessName() {
    return await loc.businessNameField(this.page).textContent();
  }

  async getRegistrationNumber() {
    return await loc.registrationNumberField(this.page).textContent();
  }

  async getGSTNumber() {
    return await loc.gstNumberField(this.page).textContent();
  }

  async getContactPerson() {
    return await loc.contactPersonField(this.page).textContent();
  }

  async getMaskedMobileNumber() {
    return await loc.mobileNumberField(this.page).textContent();
  }

  async getMaskedEmail() {
    return await loc.emailField(this.page).textContent();
  }

  async isTipsSectionVisible() {
    return await loc.tipsSection(this.page).isVisible();
  }

  async getTipsText() {
    return await loc.tipsSection(this.page).textContent();
  }

  async checkAcknowledgement() {
    await loc.acknowledgementCheckbox(this.page).check();
  }

  async uncheckAcknowledgement() {
    await loc.acknowledgementCheckbox(this.page).uncheck();
  }

  async isAcknowledgementChecked() {
    return await loc.acknowledgementCheckbox(this.page).isChecked();
  }

  async isContinueButtonEnabled() {
    return await loc.continueButton(this.page).isEnabled();
  }

  async clickContinue() {
    await loc.continueButton(this.page).click();
  }

  async getInlineErrorMessage() {
    return await loc.inlineErrorMessage(this.page).textContent();
  }

  async isInlineErrorVisible() {
    return await loc.inlineErrorMessage(this.page).isVisible();
  }
}

module.exports = DealerAppBusinessProfilePage;