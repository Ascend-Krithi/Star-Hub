const loc = require('./locators/dealer-app-login.locators');

class DealerAppLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async enterEmail(email) {
    await loc.emailField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.emailField(this.page).fill(email);
  }

  async enterPassword(password) {
    await loc.passwordField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.passwordField(this.page).fill(password);
  }

  async clickLogin() {
    await loc.loginButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.loginButton(this.page).click();
  }

  async isErrorMessageVisible() {
    try {
      await loc.errorMessage(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorMessageText() {
    await loc.errorMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.errorMessage(this.page).textContent();
  }

  async isWelcomeMessageVisible() {
    try {
      await loc.welcomeMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getBusinessName() {
    await loc.businessNameField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.businessNameField(this.page).textContent();
  }

  async getRegistrationNumber() {
    await loc.registrationNumberField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.registrationNumberField(this.page).textContent();
  }

  async getGSTNumber() {
    await loc.gstNumberField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.gstNumberField(this.page).textContent();
  }

  async getContactPersonName() {
    await loc.contactPersonName(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.contactPersonName(this.page).textContent();
  }

  async getMaskedMobile() {
    await loc.maskedMobile(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.maskedMobile(this.page).textContent();
  }

  async getMaskedEmail() {
    await loc.maskedEmail(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.maskedEmail(this.page).textContent();
  }

  async isTipsSectionVisible() {
    try {
      await loc.tipsSection(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async isContinueButtonEnabled() {
    await loc.continueButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.continueButton(this.page).isEnabled();
  }

  async checkAcknowledgement() {
    await loc.acknowledgementCheckbox(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.acknowledgementCheckbox(this.page).check();
  }

  async uncheckAcknowledgement() {
    await loc.acknowledgementCheckbox(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.acknowledgementCheckbox(this.page).uncheck();
  }

  async isAcknowledgementChecked() {
    return await loc.acknowledgementCheckbox(this.page).isChecked();
  }

  async isInlineErrorVisible() {
    try {
      await loc.inlineErrorMessage(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getInlineErrorText() {
    await loc.inlineErrorMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.inlineErrorMessage(this.page).textContent();
  }

  async isDashboardVisible() {
    try {
      await loc.dashboardHeader(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async isMenuItemVisible(menuLocator) {
    try {
      await menuLocator(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async clickLogout() {
    await loc.userProfileMenu(this.page).click();
    await loc.logoutButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.logoutButton(this.page).click();
  }

  async isSessionTimeoutMessageVisible() {
    try {
      await loc.sessionTimeoutMessage(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isSecurityMessageVisible() {
    try {
      await loc.securityMessage(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async waitForInactivity(hours) {
    const milliseconds = hours * 60 * 60 * 1000;
    await this.page.waitForTimeout(milliseconds);
  }
}

module.exports = DealerAppLoginPage;