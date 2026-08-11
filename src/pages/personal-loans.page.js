const loc = require('./locators/personal-loans.locators');

class PersonalLoansPage {
  constructor(page) {
    this.page = page;
  }

  async isPageHeadingVisible() {
    return await loc.pageHeading(this.page).isVisible();
  }

  async isLoanProductsListVisible() {
    return await loc.loanProductsList(this.page).isVisible();
  }

  async clickFlexiblePersonalLoan() {
    await loc.flexiblePersonalLoan(this.page).click();
  }

  async getLoanProductsCount() {
    return await loc.loanProductItems(this.page).count();
  }

  async isFlexiblePersonalLoanVisible() {
    return await loc.flexiblePersonalLoan(this.page).isVisible();
  }

  async getLoanProductNames() {
    const names = [];
    const count = await this.getLoanProductsCount();
    for (let i = 0; i < count; i++) {
      const name = await loc.loanProductName(this.page).nth(i).textContent();
      names.push(name.trim());
    }
    return names;
  }

  async areLoanProductDetailsVisible() {
    const count = await this.getLoanProductsCount();
    if (count === 0) return false;
    
    for (let i = 0; i < count; i++) {
      const nameVisible = await loc.loanProductName(this.page).nth(i).isVisible();
      if (!nameVisible) return false;
    }
    return true;
  }
}

module.exports = PersonalLoansPage;