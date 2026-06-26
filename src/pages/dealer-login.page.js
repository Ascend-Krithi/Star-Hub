const loc = require('./locators/dealer-login.locators');

class DealerLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
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

  async isErrorMessageVisible() {
    return await loc.errorMessage(this.page).isVisible();
  }

  async isDashboardVisible() {
    return await loc.dashboard(this.page).isVisible();
  }

  async isWelcomeMessageVisible() {
    return await loc.welcomeMessage(this.page).isVisible();
  }

  async getWelcomeMessageText() {
    return await loc.welcomeMessage(this.page).textContent();
  }

  async getBusinessName() {
    return await loc.businessNameField(this.page).inputValue();
  }

  async getRegistrationNumber() {
    return await loc.registrationNumberField(this.page).inputValue();
  }

  async getGSTNumber() {
    return await loc.gstNumberField(this.page).inputValue();
  }

  async getContactPerson() {
    return await loc.contactPersonField(this.page).textContent();
  }

  async getMaskedMobile() {
    return await loc.mobileNumberField(this.page).textContent();
  }

  async getMaskedEmail() {
    return await loc.emailDisplayField(this.page).textContent();
  }

  async isTipsSectionVisible() {
    return await loc.tipsSection(this.page).isVisible();
  }

  async getTipsText() {
    return await loc.tipsSection(this.page).textContent();
  }

  async checkAcknowledgement() {
    await loc.acknowledgementCheckbox(this.page).check();
  }

  async uncheckAcknowledgement() {
    await loc.acknowledgementCheckbox(this.page).uncheck();
  }

  async isAcknowledgementChecked() {
    return await loc.acknowledgementCheckbox(this.page).isChecked();
  }

  async isContinueButtonEnabled() {
    return await loc.continueButton(this.page).isEnabled();
  }

  async clickContinueButton() {
    await loc.continueButton(this.page).click();
  }

  async isInlineErrorVisible() {
    return await loc.inlineErrorMessage(this.page).isVisible();
  }

  async getInlineErrorText() {
    return await loc.inlineErrorMessage(this.page).textContent();
  }

  async isIdentityVerificationScreenVisible() {
    return await loc.identityVerificationScreen(this.page).isVisible();
  }

  async enterOwnerName(name) {
    await loc.ownerNameField(this.page).fill(name);
  }

  async enterIdNumber(id) {
    await loc.idNumberField(this.page).fill(id);
  }

  async submitIdentityVerification() {
    await loc.submitVerificationButton(this.page).click();
  }

  async clickLogout() {
    await loc.logoutButton(this.page).click();
  }

  async isSessionTimeoutMessageVisible() {
    return await loc.sessionTimeoutMessage(this.page).isVisible();
  }

  async getSessionTimeoutMessage() {
    return await loc.sessionTimeoutMessage(this.page).textContent();
  }

  async isSecurityMessageVisible() {
    return await loc.securityMessage(this.page).isVisible();
  }

  async getSecurityMessage() {
    return await loc.securityMessage(this.page).textContent();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

module.exports = DealerLoginPage;