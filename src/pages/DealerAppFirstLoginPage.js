const firstLoginLoc = require('../locators/dealerApp-firstLogin.locators');
const TD = require('../data/dealerApp-test-data');

class DealerAppFirstLoginPage {
  constructor(page) {
    this.page = page;
  }

  async isWelcomeMessageDisplayed() {
    try {
      await firstLoginLoc.welcomeMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await firstLoginLoc.welcomeMessage(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async getWelcomeMessage() {
    try {
      return await firstLoginLoc.welcomeMessage(this.page).textContent();
    } catch (error) {
      return null;
    }
  }

  async getBusinessName() {
    try {
      await firstLoginLoc.businessNameField(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await firstLoginLoc.businessNameField(this.page).inputValue();
    } catch (error) {
      return null;
    }
  }

  async getRegistrationNumber() {
    try {
      await firstLoginLoc.registrationNumberField(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await firstLoginLoc.registrationNumberField(this.page).inputValue();
    } catch (error) {
      return null;
    }
  }

  async getGSTNumber() {
    try {
      await firstLoginLoc.gstNumberField(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await firstLoginLoc.gstNumberField(this.page).inputValue();
    } catch (error) {
      return null;
    }
  }

  async isBusinessProfileSectionVisible() {
    try {
      await firstLoginLoc.businessProfileSection(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await firstLoginLoc.businessProfileSection(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async navigateToContactDetails() {
    try {
      await firstLoginLoc.contactDetailsSection(this.page).scrollIntoViewIfNeeded();
      await firstLoginLoc.contactDetailsSection(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      throw new Error(`Failed to navigate to contact details: ${error.message}`);
    }
  }

  async isContactDetailsSectionVisible() {
    try {
      return await firstLoginLoc.contactDetailsSection(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async getContactPersonName() {
    try {
      return await firstLoginLoc.contactPersonField(this.page).inputValue();
    } catch (error) {
      return null;
    }
  }

  async getMobileNumber() {
    try {
      return await firstLoginLoc.mobileField(this.page).inputValue();
    } catch (error) {
      return null;
    }
  }

  async getEmail() {
    try {
      return await firstLoginLoc.emailField(this.page).inputValue();
    } catch (error) {
      return null;
    }
  }

  async scrollToTipsSection() {
    try {
      await firstLoginLoc.tipsSection(this.page).scrollIntoViewIfNeeded();
      await firstLoginLoc.tipsSection(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isTipsSectionVisible() {
    try {
      return await firstLoginLoc.tipsSection(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async getTipsContent() {
    try {
      return await firstLoginLoc.tipsSection(this.page).textContent();
    } catch (error) {
      return null;
    }
  }

  async isContinueButtonEnabled() {
    try {
      return await firstLoginLoc.continueButton(this.page).isEnabled();
    } catch (error) {
      return false;
    }
  }

  async isContinueButtonDisabled() {
    try {
      return await firstLoginLoc.continueButton(this.page).isDisabled();
    } catch (error) {
      return false;
    }
  }

  async checkAcknowledgement() {
    try {
      await firstLoginLoc.acknowledgementCheckbox(this.page).check();
      return true;
    } catch (error) {
      throw new Error(`Failed to check acknowledgement: ${error.message}`);
    }
  }

  async uncheckAcknowledgement() {
    try {
      await firstLoginLoc.acknowledgementCheckbox(this.page).uncheck();
      return true;
    } catch (error) {
      throw new Error(`Failed to uncheck acknowledgement: ${error.message}`);
    }
  }

  async isAcknowledgementChecked() {
    try {
      return await firstLoginLoc.acknowledgementCheckbox(this.page).isChecked();
    } catch (error) {
      return false;
    }
  }

  async getInlineError() {
    try {
      await firstLoginLoc.inlineError(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return await firstLoginLoc.inlineError(this.page).textContent();
    } catch (error) {
      return null;
    }
  }

  async isInlineErrorVisible() {
    try {
      return await firstLoginLoc.inlineError(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async clickContinue() {
    try {
      await firstLoginLoc.continueButton(this.page).click();
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
      return true;
    } catch (error) {
      throw new Error(`Failed to click continue: ${error.message}`);
    }
  }
}

module.exports = DealerAppFirstLoginPage;