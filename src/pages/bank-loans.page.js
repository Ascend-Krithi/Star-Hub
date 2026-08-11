const loc = require('./locators/bank-loans.locators');
const URL = 'https://bank-website.com';

class BankLoansPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async navigateToLoansMenu() {
    await loc.loansMenu(this.page).click();
  }

  async clickPersonalLoans() {
    await loc.personalLoansLink(this.page).click();
  }

  async isLoanProductsListVisible() {
    return await loc.loanProductsList(this.page).isVisible();
  }

  async getLoanProductCardsCount() {
    return await loc.loanProductCards(this.page).count();
  }

  async clickFlexiblePersonalLoan() {
    await loc.flexiblePersonalLoanCard(this.page).click();
  }

  async isFlexiblePersonalLoanVisible() {
    return await loc.flexiblePersonalLoanCard(this.page).isVisible();
  }

  async getLoanAmount() {
    return await loc.loanAmountField(this.page).textContent();
  }

  async getLoanTenure() {
    return await loc.loanTenureField(this.page).textContent();
  }

  async getRepaymentFrequency() {
    return await loc.repaymentFrequencyField(this.page).textContent();
  }

  async getEstimatedMonthlyRepayment() {
    return await loc.estimatedMonthlyRepayment(this.page).textContent();
  }

  async isApplyNowButtonVisible() {
    return await loc.applyNowButton(this.page).isVisible();
  }

  async isApplyNowButtonEnabled() {
    return await loc.applyNowButton(this.page).isEnabled();
  }

  async clickApplyNow() {
    await loc.applyNowButton(this.page).click();
  }

  async isAuthPopupVisible() {
    return await loc.authPopup(this.page).isVisible();
  }

  async getAuthPopupMessage() {
    return await loc.authPopupMessage(this.page).textContent();
  }

  async isLoginButtonVisible() {
    return await loc.loginButton(this.page).isVisible();
  }

  async isSignUpButtonVisible() {
    return await loc.signUpButton(this.page).isVisible();
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async clickSignUpButton() {
    await loc.signUpButton(this.page).click();
  }

  async isPopupOverlayVisible() {
    return await loc.popupOverlay(this.page).isVisible();
  }

  async navigateToPersonalLoansPage() {
    await this.navigateToLoansMenu();
    await this.clickPersonalLoans();
  }

  async navigateToFlexiblePersonalLoanDetails() {
    await this.navigateToPersonalLoansPage();
    await this.clickFlexiblePersonalLoan();
  }
}

module.exports = BankLoansPage;