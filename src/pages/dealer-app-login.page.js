const loc = require('./locators/dealer-app-login.locators');
const TD = require('../data/dealer-app-test-data');

class DealerAppLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.login, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async enterEmail(email) {
    await loc.emailField(this.page).fill(email);
  }

  async enterPassword(password) {
    await loc.passwordField(this.page).fill(password);
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isErrorMessageVisible() {
    return await loc.errorMessage(this.page).isVisible();
  }

  async isPasswordMasked() {
    const passwordType = await loc.passwordField(this.page).getAttribute('type');
    return passwordType === 'password';
  }

  async isEmailDisplayed() {
    return await loc.emailField(this.page).isVisible();
  }
}

module.exports = DealerAppLoginPage;