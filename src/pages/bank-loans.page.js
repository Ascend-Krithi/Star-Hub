const loc = require('./locators/bank-loans.locators');
const TD = require('../data/bank-test-data');

class BankLoansPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.home, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async navigateToLoans() {
    await loc.loansNavLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToPersonalLoans() {
    await loc.personalLoansLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectFlexiblePersonalLoan() {
    await loc.flexiblePersonalLoanLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isLoansNavVisible() {
    return await loc.loansNavLink(this.page).isVisible();
  }

  async isPersonalLoansLinkVisible() {
    return await loc.personalLoansLink(this.page).isVisible();
  }

  async isFlexiblePersonalLoanVisible() {
    return await loc.flexiblePersonalLoanLink(this.page).isVisible();
  }

  async getLoanAmountValue() {
    return await loc.loanAmountControl(this.page).inputValue();
  }

  async getLoanTenureText() {
    return await loc.loanTenureControl(this.page).textContent();
  }

  async getRepaymentFrequencyText() {
    return await loc.repaymentFrequencyControl(this.page).textContent();
  }

  async getEstimatedRepaymentText() {
    return await loc.estimatedRepaymentDisplay(this.page).textContent();
  }

  async isLoanAmountControlVisible() {
    return await loc.loanAmountControl(this.page).isVisible();
  }

  async isLoanTenureControlVisible() {
    return await loc.loanTenureControl(this.page).isVisible();
  }

  async isRepaymentFrequencyControlVisible() {
    return await loc.repaymentFrequencyControl(this.page).isVisible();
  }

  async isEstimatedRepaymentDisplayVisible() {
    return await loc.estimatedRepaymentDisplay(this.page).isVisible();
  }

  async clickApplyNow() {
    await loc.applyNowButton(this.page).click();
  }

  async clickApplyNowMultipleTimes(count) {
    for (let i = 0; i < count; i++) {
      await loc.applyNowButton(this.page).click({ delay: 50 });
    }
  }

  async isAuthenticationPopupVisible() {
    return await loc.authenticationPopup(this.page).isVisible();
  }

  async getAuthPopupMessageText() {
    return await loc.authPopupMessage(this.page).textContent();
  }

  async isLoginButtonVisible() {
    return await loc.loginButton(this.page).isVisible();
  }

  async isSignUpButtonVisible() {
    return await loc.signUpButton(this.page).isVisible();
  }

  async countAuthenticationPopups() {
    return await this.page.locator('[role="dialog"]').count();
  }

  async isApplyNowButtonVisible() {
    return await loc.applyNowButton(this.page).isVisible();
  }

  async isLoanDetailsPageDisplayed() {
    return await loc.loanDetailsSection(this.page).isVisible();
  }
}

module.exports = BankLoansPage;