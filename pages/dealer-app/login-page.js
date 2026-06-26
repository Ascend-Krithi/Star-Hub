const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('[data-testid="email-input"], #email, input[name="email"]');
    this.passwordField = page.locator('[data-testid="password-input"], #password, input[name="password"]');
    this.loginButton = page.locator('[data-testid="login-button"], button[type="submit"], button:has-text("Login")');
    this.errorMessage = page.locator('[data-testid="error-message"], .error-message, .alert-error');
    this.timeoutMessage = page.locator('[data-testid="timeout-message"], .timeout-message');
    this.securityMessage = page.locator('[data-testid="security-message"], .security-message');
  }

  async navigate() {
    await this.page.goto('https://dealerapp.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async enterEmail(email) {
    await this.emailField.waitFor({ state: 'visible' });
    await this.emailField.fill(email);
  }

  async enterPassword(password) {
    await this.passwordField.waitFor({ state: 'visible' });
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async loginAsFirstTime() {
    await this.login('firsttime@example.com', 'FirstLogin123');
  }
}

module.exports = { LoginPage };