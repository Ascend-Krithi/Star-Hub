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

  async enterUsername(username) {
    const usernameField = loc.usernameField(this.page);
    await usernameField.fill(username);
  }

  async enterPassword(password) {
    const passwordField = loc.passwordField(this.page);
    await passwordField.fill(password);
  }

  async clickSignIn() {
    const signInButton = loc.signInButton(this.page);
    await signInButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async isErrorMessageVisible() {
    const errorMessage = loc.errorMessage(this.page);
    return await errorMessage.isVisible();
  }

  async getErrorMessageText() {
    const errorMessage = loc.errorMessage(this.page);
    return await errorMessage.textContent();
  }

  async isDashboardHeaderVisible() {
    const dashboardHeader = loc.dashboardHeader(this.page);
    return await dashboardHeader.isVisible();
  }

  async isUserProfileIconVisible() {
    const userProfileIcon = loc.userProfileIcon(this.page);
    return await userProfileIcon.isVisible();
  }
}

module.exports = WorkdayLoginPage;