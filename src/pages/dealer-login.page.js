const { expect } = require('@playwright/test');
const loc = require('./locators/dealer-login.locators');
const TD = require('../data/dealer-app-test-data');

class DealerLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.dealerAppLogin, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async fillEmail(email) {
    await loc.emailInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.emailInput(this.page).fill(email);
  }

  async fillPassword(password) {
    await loc.passwordInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.passwordInput(this.page).fill(password);
  }

  async clickLogin() {
    await loc.loginButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.loginButton(this.page).click();
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    await loc.errorMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.errorMessage(this.page).textContent();
  }

  async isErrorMessageVisible() {
    try {
      await loc.errorMessage(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isDashboardVisible() {
    try {
      await loc.dashboardContainer(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async isWelcomeMessageVisible() {
    try {
      await loc.welcomeMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getEmailFieldValue() {
    return await loc.emailInput(this.page).inputValue();
  }

  async isPasswordMasked() {
    const inputType = await loc.passwordInput(this.page).getAttribute('type');
    return inputType === 'password';
  }
}

module.exports = DealerLoginPage;