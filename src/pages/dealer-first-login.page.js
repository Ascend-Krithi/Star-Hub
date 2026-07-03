const { expect } = require('@playwright/test');
const loc = require('./locators/dealer-first-login.locators');
const TD = require('../data/dealer-app-test-data');

class DealerFirstLoginPage {
  constructor(page) {
    this.page = page;
  }

  async isWelcomeMessageVisible() {
    try {
      await loc.welcomeMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getWelcomeMessageText() {
    await loc.welcomeMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.welcomeMessage(this.page).textContent();
  }

  async getBusinessName() {
    await loc.businessName(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.businessName(this.page).textContent();
  }

  async getRegistrationNumber() {
    await loc.registrationNumber(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.registrationNumber(this.page).textContent();
  }

  async getGstNumber() {
    await loc.gstNumber(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.gstNumber(this.page).textContent();
  }

  async getContactPersonName() {
    await loc.contactPerson(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.contactPerson(this.page).textContent();
  }

  async getMobileNumber() {
    await loc.mobileNumber(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.mobileNumber(this.page).textContent();
  }

  async getEmailAddress() {
    await loc.emailAddress(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.emailAddress(this.page).textContent();
  }

  async isTipsSectionVisible() {
    try {
      await loc.tipsSection(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getTipsSectionText() {
    await loc.tipsSection(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.tipsSection(this.page).textContent();
  }

  async isContinueButtonEnabled() {
    await loc.continueButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.continueButton(this.page).isEnabled();
  }

  async isContinueButtonDisabled() {
    await loc.continueButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.continueButton(this.page).isDisabled();
  }

  async checkAcknowledgement() {
    await loc.acknowledgementCheckbox(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.acknowledgementCheckbox(this.page).check();
  }

  async uncheckAcknowledgement() {
    await loc.acknowledgementCheckbox(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.acknowledgementCheckbox(this.page).uncheck();
  }

  async isAcknowledgementChecked() {
    return await loc.acknowledgementCheckbox(this.page).isChecked();
  }

  async clickContinue() {
    await loc.continueButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.continueButton(this.page).click();
  }

  async isInlineErrorVisible() {
    try {
      await loc.inlineError(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getInlineErrorText() {
    await loc.inlineError(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.inlineError(this.page).textContent();
  }

  async scrollToSection(sectionName) {
    if (sectionName.toLowerCase().includes('contact')) {
      await loc.contactDetailsSection(this.page).scrollIntoViewIfNeeded();
    } else if (sectionName.toLowerCase().includes('business')) {
      await loc.businessProfileSection(this.page).scrollIntoViewIfNeeded();
    } else if (sectionName.toLowerCase().includes('tips')) {
      await loc.tipsSection(this.page).scrollIntoViewIfNeeded();
    }
  }
}

module.exports = DealerFirstLoginPage;