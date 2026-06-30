const loc = require('./locators/dealer-app-first-login.locators');
const TD = require('../data/dealer-app-test-data');

class DealerAppFirstLoginPage {
  constructor(page) {
    this.page = page;
  }

  async isWelcomeMessageVisible() {
    return await loc.welcomeMessage(this.page).isVisible();
  }

  async getWelcomeMessageText() {
    return await loc.welcomeMessage(this.page).textContent();
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

  async getMobileNumber() {
    return await loc.mobileNumberField(this.page).textContent();
  }

  async getEmail() {
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

  async clickContinueButton() {
    await loc.continueButton(this.page).click();
  }

  async isInlineErrorVisible() {
    return await loc.inlineErrorMessage(this.page).isVisible();
  }

  async getInlineErrorText() {
    return await loc.inlineErrorMessage(this.page).textContent();
  }

  async isBusinessProfileSectionVisible() {
    return await loc.businessProfileSection(this.page).isVisible();
  }

  async isContactDetailsSectionVisible() {
    return await loc.contactDetailsSection(this.page).isVisible();
  }

  async scrollToElement(element) {
    await element.scrollIntoViewIfNeeded();
  }
}

module.exports = DealerAppFirstLoginPage;