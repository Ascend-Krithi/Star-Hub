const loc = require('./locators/gcash-qr-generation.locators');
const TD = require('../data/gcash-test-data');

class GCashQRGenerationPage {
  constructor(page) {
    this.page = page;
  }

  async isQRGenerationScreenDisplayed() {
    return await loc.qrGenerationScreen(this.page).isVisible();
  }

  async enterAmount(amount) {
    await loc.amountInput(this.page).fill(amount);
  }

  async clickGenerateQRButton() {
    await loc.generateQRButton(this.page).click();
  }

  async generateQRWithoutAmount() {
    await this.clickGenerateQRButton();
  }

  async generateQRWithAmount(amount) {
    await this.enterAmount(amount);
    await this.clickGenerateQRButton();
  }

  async isQRCodeDisplayed() {
    return await loc.generatedQRCode(this.page).isVisible();
  }

  async getDisplayedAmount() {
    return await loc.displayedAmount(this.page).textContent();
  }

  async getDisplayedMobile() {
    return await loc.displayedMobile(this.page).textContent();
  }
}

module.exports = GCashQRGenerationPage;