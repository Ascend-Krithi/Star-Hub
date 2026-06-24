const loc = require('./locators/gcash-profile.locators');
const TD = require('../data/gcash-test-data');

class GCashProfilePage {
  constructor(page) {
    this.page = page;
  }

  async isProfileScreenDisplayed() {
    return await loc.profileScreen(this.page).isVisible();
  }

  async selectGenerateQROption() {
    await loc.generateQROption(this.page).click();
  }
}

module.exports = GCashProfilePage;