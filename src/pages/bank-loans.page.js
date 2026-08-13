const loc = require('./locators/bank-loans.locators');
const TD = require('../data/bank-test-data');

class BankLoansPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.homePage, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async navigateToFlexiblePersonalLoan() {
    await expect(loc.loansMenu(this.page)).toBeVisible();
    await loc.loansMenu(this.page).click();
    await expect(loc.personalLoansSubmenu(this.page)).toBeVisible();
    await loc.personalLoansSubmenu(this.page).click();
    await expect(loc.flexiblePersonalLoanOption(this.page)).toBeVisible();
    await loc.flexiblePersonalLoanOption(this.page).click();
  }

  async isLoanAmountFieldVisible() {
    return await loc.loanAmountField(this.page).isVisible();
  }

  async getLoanAmountValue() {
    return await loc.loanAmountField(this.page).inputValue();
  }

  async getLoanTenureValue() {
    return await loc.loanTenureSelected(this.page).textContent();
  }

  async getRepaymentFrequencyValue() {
    return await loc.repaymentFrequencySelected(this.page).textContent();
  }

  async getEstimatedMonthlyRepayment() {
    return await loc.estimatedMonthlyRepayment(this.page).textContent();
  }

  async isLoanAmountLabelVisible() {
    return await loc.loanAmountLabel(this.page).isVisible();
  }

  async isLoanTenureLabelVisible() {
    return await loc.loanTenureLabel(this.page).isVisible();
  }

  async isRepaymentFrequencyLabelVisible() {
    return await loc.repaymentFrequencyLabel(this.page).isVisible();
  }

  async isEstimatedRepaymentLabelVisible() {
    return await loc.estimatedRepaymentLabel(this.page).isVisible();
  }

  async isEstimatedMonthlyRepaymentVisible() {
    return await loc.estimatedMonthlyRepayment(this.page).isVisible();
  }

  async clickApplyNow() {
    await loc.applyNowButton(this.page).click();
  }

  async isApplyNowButtonVisible() {
    return await loc.applyNowButton(this.page).isVisible();
  }

  async isAuthenticationPopupVisible() {
    return await loc.authenticationPopup(this.page).isVisible();
  }

  async getAuthPopupMessage() {
    return await loc.authPopupMessage(this.page).textContent();
  }

  async isLoginButtonVisible() {
    return await loc.loginButton(this.page).isVisible();
  }

  async isSignupButtonVisible() {
    return await loc.signupButton(this.page).isVisible();
  }

  async isLoginButtonEnabled() {
    return await loc.loginButton(this.page).isEnabled();
  }

  async isSignupButtonEnabled() {
    return await loc.signupButton(this.page).isEnabled();
  }

  async isUserLoggedIn() {
    try {
      return await loc.userProfileIcon(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isUserLoggedOut() {
    try {
      return !(await loc.userProfileIcon(this.page).isVisible({ timeout: 5000 }));
    } catch {
      return true;
    }
  }

  async getPageTitle() {
    return await loc.pageTitle(this.page).textContent();
  }

  async isLoanConfigurationSectionVisible() {
    return await loc.loanConfigurationSection(this.page).isVisible();
  }

  async isLoansMenuVisible() {
    try {
      return await loc.loansMenu(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }
}

module.exports = BankLoansPage;