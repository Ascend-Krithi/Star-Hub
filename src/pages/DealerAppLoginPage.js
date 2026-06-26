const loginLoc = require('../locators/dealerApp-login.locators');
const TD = require('../data/dealerApp-test-data');

class DealerAppLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.dealerAppLogin, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async fillEmail(email) {
    await loginLoc.emailField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loginLoc.emailField(this.page).fill(email);
    return email;
  }

  async fillPassword(password) {
    await loginLoc.passwordField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loginLoc.passwordField(this.page).fill(password);
    return password;
  }

  async clickLogin() {
    await loginLoc.loginButton(this.page).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    return true;
  }

  async login(email, password) {
    try {
      await this.fillEmail(email);
      await this.fillPassword(password);
      await this.clickLogin();
      return true;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async getErrorMessage() {
    try {
      await loginLoc.errorMessage(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return await loginLoc.errorMessage(this.page).textContent();
    } catch (error) {
      return null;
    }
  }

  async isErrorMessageVisible() {
    try {
      await loginLoc.errorMessage(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return await loginLoc.errorMessage(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async logout() {
    try {
      await loginLoc.logoutButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
      await loginLoc.logoutButton(this.page).click();
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
      return true;
    } catch (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  async isLoginScreenDisplayed() {
    try {
      await loginLoc.emailField(this.page).waitFor({ state: 'visible', timeout: 10000 });
      await loginLoc.passwordField(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isPasswordMasked() {
    const passwordType = await loginLoc.passwordField(this.page).getAttribute('type');
    return passwordType === 'password';
  }
}

module.exports = DealerAppLoginPage;