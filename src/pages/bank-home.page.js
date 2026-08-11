const loc = require('./locators/bank-home.locators');

class BankHomePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async clickLoansMenu() {
    await loc.loansMenu(this.page).click();
  }

  async clickPersonalLoansSubmenu() {
    await loc.personalLoansSubmenu(this.page).click();
  }

  async navigateToPersonalLoans() {
    await this.clickLoansMenu();
    await loc.personalLoansSubmenu(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await this.clickPersonalLoansSubmenu();
  }

  async isLoansMenuVisible() {
    return await loc.loansMenu(this.page).isVisible();
  }
}

module.exports = BankHomePage;