const loc = require('./locators/workday-login.locators');
const TD = require('../data/workday-test-data');

class WorkdayLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.login, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async fillUsername(username) {
    await loc.usernameField(this.page).fill(username);
  }

  async fillPassword(password) {
    await loc.passwordField(this.page).fill(password);
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async isLoginFormVisible() {
    return await loc.loginForm(this.page).isVisible();
  }

  async getErrorMessage() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isUserProfileIconVisible() {
    return await loc.userProfileIcon(this.page).isVisible();
  }

  async getWelcomeMessage() {
    return await loc.welcomeMessage(this.page).textContent();
  }
}

module.exports = WorkdayLoginPage;