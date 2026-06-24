const loc = require('./locators/gcash-home.locators');
const TD = require('../data/gcash-test-data');

class GCashHomePage {
  constructor(page) {
    this.page = page;
  }

  async isHomeScreenDisplayed() {
    return await loc.homeScreen(this.page).isVisible();
  }

  async navigateToProfileTab() {
    await loc.profileTab(this.page).click();
  }

  async navigateToHomeTab() {
    await loc.homeTab(this.page).click();
  }

  async selectSendMoneyOption() {
    await loc.sendMoneyOption(this.page).click();
  }

  async getBalance() {
    return await loc.balanceDisplay(this.page).textContent();
  }
}

module.exports = GCashHomePage;