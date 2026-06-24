const loc = require('./locators/gcash-login.locators');
const TD = require('../data/gcash-test-data');

class GCashLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.gcashApp, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async isLoginScreenDisplayed() {
    return await loc.loginScreen(this.page).isVisible();
  }

  async enterMobileNumber(mobileNumber) {
    await loc.mobileNumberInput(this.page).fill(mobileNumber);
  }

  async enterPassword(password) {
    await loc.passwordInput(this.page).fill(password);
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async login(mobileNumber, password) {
    await this.enterMobileNumber(mobileNumber);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginAsRecipient() {
    await this.login(TD.credentials.recipient.mobile, TD.credentials.recipient.password);
  }

  async loginAsSender() {
    await this.login(TD.credentials.sender.mobile, TD.credentials.sender.password);
  }
}

module.exports = GCashLoginPage;