const loc = require('./locators/login.locators');
const TD = require('../data/login-test-data');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.loginPage, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async enterUsername(username) {
    await loc.usernameField(this.page).fill(username);
  }

  async enterPassword(password) {
    await loc.passwordField(this.page).fill(password);
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isWelcomeMessageVisible() {
    return await loc.welcomeMessage(this.page).isVisible();
  }

  async isErrorMessageVisible() {
    return await loc.errorMessage(this.page).isVisible();
  }

  async getErrorMessageText() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isLogoutButtonVisible() {
    return await loc.logoutButton(this.page).isVisible();
  }
}

module.exports = LoginPage;