const loc = require('./locators/flexible-loan-details.locators');

class FlexibleLoanDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async isPageHeadingVisible() {
    return await loc.pageHeading(this.page).isVisible();
  }

  async getLoanAmount() {
    return await loc.loanAmountField(this.page).inputValue();
  }

  async getLoanTenure() {
    return await loc.loanTenureField(this.page).inputValue();
  }

  async getRepaymentFrequency() {
    return await loc.repaymentFrequencyField(this.page).inputValue();
  }

  async getMonthlyRepaymentAmount() {
    return await loc.monthlyRepaymentAmount(this.page).textContent();
  }

  async isLoanAmountVisible() {
    return await loc.loanAmountField(this.page).isVisible();
  }

  async isLoanTenureVisible() {
    return await loc.loanTenureField(this.page).isVisible();
  }

  async isRepaymentFrequencyVisible() {
    return await loc.repaymentFrequencyField(this.page).isVisible();
  }

  async isMonthlyRepaymentVisible() {
    return await loc.monthlyRepaymentAmount(this.page).isVisible();
  }

  async isApplyNowButtonVisible() {
    return await loc.applyNowButton(this.page).isVisible();
  }

  async isApplyNowButtonEnabled() {
    return await loc.applyNowButton(this.page).isEnabled();
  }

  async clickApplyNowButton() {
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

  async isSignupButtonVisible() {
    return await loc.signupButton(this.page).isVisible();
  }

  async isLoginButtonEnabled() {
    return await loc.loginButton(this.page).isEnabled();
  }

  async isSignupButtonEnabled() {
    return await loc.signupButton(this.page).isEnabled();
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async clickSignupButton() {
    await loc.signupButton(this.page).click();
  }

  async areAllConfigurationOptionsVisible() {
    const loanAmountVisible = await this.isLoanAmountVisible();
    const tenureVisible = await this.isLoanTenureVisible();
    const frequencyVisible = await this.isRepaymentFrequencyVisible();
    const repaymentVisible = await this.isMonthlyRepaymentVisible();
    return loanAmountVisible && tenureVisible && frequencyVisible && repaymentVisible;
  }
}

module.exports = FlexibleLoanDetailsPage;