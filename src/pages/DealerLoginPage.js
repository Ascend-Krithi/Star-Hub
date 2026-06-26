const loc = require('./locators/dealer-login.locators');
const TD = require('../data/dealer-test-data');

const URL = TD.urls.dealerApp;

class DealerLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async enterEmail(email) {
    const emailField = loc.emailInput(this.page);
    await emailField.waitFor({ state: 'visible', timeout: 30000 });
    await emailField.fill(email);
  }

  async enterPassword(password) {
    const passwordField = loc.passwordInput(this.page);
    await passwordField.waitFor({ state: 'visible', timeout: 30000 });
    await passwordField.fill(password);
  }

  async clickLoginButton() {
    const loginBtn = loc.loginButton(this.page);
    await loginBtn.waitFor({ state: 'visible', timeout: 30000 });
    await loginBtn.click();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoginScreenDisplayed() {
    const emailField = loc.emailInput(this.page);
    const passwordField = loc.passwordInput(this.page);
    return await emailField.isVisible() && await passwordField.isVisible();
  }

  async getEmailValue() {
    const emailField = loc.emailInput(this.page);
    return await emailField.inputValue();
  }

  async getPasswordInputType() {
    const passwordField = loc.passwordInput(this.page);
    return await passwordField.getAttribute('type');
  }

  async isErrorMessageVisible() {
    const errorMsg = loc.errorMessage(this.page);
    return await errorMsg.isVisible();
  }

  async getErrorMessageText() {
    const errorMsg = loc.errorMessage(this.page);
    await errorMsg.waitFor({ state: 'visible', timeout: 10000 });
    return await errorMsg.textContent();
  }
}

module.exports = DealerLoginPage;