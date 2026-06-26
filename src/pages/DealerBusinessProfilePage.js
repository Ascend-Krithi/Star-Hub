const loc = require('./locators/dealer-business-profile.locators');
const TD = require('../data/dealer-test-data');

class DealerBusinessProfilePage {
  constructor(page) {
    this.page = page;
  }

  async isWelcomeMessageDisplayed() {
    const welcomeMsg = loc.welcomeMessage(this.page);
    await welcomeMsg.waitFor({ state: 'visible', timeout: 30000 });
    return await welcomeMsg.isVisible();
  }

  async getWelcomeMessageText() {
    const welcomeMsg = loc.welcomeMessage(this.page);
    return await welcomeMsg.textContent();
  }

  async isBusinessProfileSectionDisplayed() {
    const profileSection = loc.businessProfileSection(this.page);
    return await profileSection.isVisible();
  }

  async isBusinessNameFieldDisplayed() {
    try {
      const businessNameField = loc.businessNameField(this.page);
      if (await businessNameField.isVisible()) {
        return true;
      }
    } catch (error) {
      const businessNameValue = loc.businessNameValue(this.page);
      return await businessNameValue.isVisible();
    }
    return false;
  }

  async getBusinessNameValue() {
    try {
      const businessNameField = loc.businessNameField(this.page);
      if (await businessNameField.isVisible()) {
        return await businessNameField.inputValue();
      }
    } catch (error) {
      const businessNameValue = loc.businessNameValue(this.page);
      return await businessNameValue.textContent();
    }
    return '';
  }

  async isRegistrationNumberFieldDisplayed() {
    try {
      const regNumberField = loc.registrationNumberField(this.page);
      if (await regNumberField.isVisible()) {
        return true;
      }
    } catch (error) {
      const regNumberValue = loc.registrationNumberValue(this.page);
      return await regNumberValue.isVisible();
    }
    return false;
  }

  async getRegistrationNumberValue() {
    try {
      const regNumberField = loc.registrationNumberField(this.page);
      if (await regNumberField.isVisible()) {
        return await regNumberField.inputValue();
      }
    } catch (error) {
      const regNumberValue = loc.registrationNumberValue(this.page);
      return await regNumberValue.textContent();
    }
    return '';
  }

  async isGSTNumberFieldDisplayed() {
    try {
      const gstNumberField = loc.gstNumberField(this.page);
      if (await gstNumberField.isVisible()) {
        return true;
      }
    } catch (error) {
      const gstNumberValue = loc.gstNumberValue(this.page);
      return await gstNumberValue.isVisible();
    }
    return false;
  }

  async getGSTNumberValue() {
    try {
      const gstNumberField = loc.gstNumberField(this.page);
      if (await gstNumberField.isVisible()) {
        return await gstNumberField.inputValue();
      }
    } catch (error) {
      const gstNumberValue = loc.gstNumberValue(this.page);
      return await gstNumberValue.textContent();
    }
    return '';
  }
}

module.exports = DealerBusinessProfilePage;