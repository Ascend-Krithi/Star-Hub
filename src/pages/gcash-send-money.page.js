const loc = require('./locators/gcash-send-money.locators');
const TD = require('../data/gcash-test-data');

class GCashSendMoneyPage {
  constructor(page) {
    this.page = page;
  }

  async isSendMoneyScreenDisplayed() {
    return await loc.sendMoneyScreen(this.page).isVisible();
  }

  async clickScanQRButton() {
    await loc.scanQRButton(this.page).click();
  }

  async isCameraOpen() {
    return await loc.cameraView(this.page).isVisible();
  }

  async scanQRCode() {
    // Simulates QR code scanning - in real implementation this would interact with camera
    await this.page.waitForTimeout(2000);
  }

  async getRecipientMobile() {
    return await loc.recipientMobileField(this.page).textContent();
  }

  async getAmountField() {
    return await loc.amountField(this.page).textContent();
  }

  async clickConfirmButton() {
    await loc.confirmButton(this.page).click();
  }

  async isTransactionSuccessDisplayed() {
    return await loc.transactionSuccess(this.page).isVisible();
  }

  async getTransactionReference() {
    return await loc.transactionReference(this.page).textContent();
  }

  async getErrorMessage() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isQRExpiredErrorDisplayed() {
    return await loc.qrExpiredError(this.page).isVisible();
  }

  async isUnableToReadQRErrorDisplayed() {
    return await loc.unableToReadQRError(this.page).isVisible();
  }

  async isRequestNewQRButtonDisplayed() {
    return await loc.requestNewQRButton(this.page).isVisible();
  }

  async clickRequestNewQRButton() {
    await loc.requestNewQRButton(this.page).click();
  }

  async isEnterManuallyButtonDisplayed() {
    return await loc.enterManuallyButton(this.page).isVisible();
  }

  async clickEnterManuallyButton() {
    await loc.enterManuallyButton(this.page).click();
  }

  async enterMobileNumberManually(mobileNumber) {
    await loc.manualMobileInput(this.page).fill(mobileNumber);
  }

  async clickContinueButton() {
    await loc.continueButton(this.page).click();
  }

  async isAdjustAmountScreenDisplayed() {
    return await loc.adjustAmountScreen(this.page).isVisible();
  }

  async getOriginalAmount() {
    return await loc.originalAmount(this.page).textContent();
  }

  async getLimitMessage() {
    return await loc.limitMessage(this.page).textContent();
  }

  async selectSuggestedAmount(amount) {
    await loc.suggestedAmount(this.page, amount).click();
  }

  async enterCustomAmount(amount) {
    await loc.customAmountInput(this.page).fill(amount);
  }
}

module.exports = GCashSendMoneyPage;