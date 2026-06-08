const loc = require('./locators/lending-portal-login.locators');
const TD = require('../data/lending-portal-test-data');

class LendingPortalLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.lendingPortal, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(username, password) {
    await loc.usernameInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.usernameInput(this.page).fill(username);
    await loc.passwordInput(this.page).fill(password);
    await loc.loginButton(this.page).click();
    await loc.dashboard(this.page).waitFor({ state: 'visible', timeout: 30000 });
  }

  async isDashboardVisible() {
    return await loc.dashboard(this.page).isVisible();
  }
}

module.exports = LendingPortalLoginPage;