const loc = require('./locators/mobile-card-management.locators');

class MobileCardManagementPage {
  constructor(page) {
    this.page = page;
  }

  async launchMobileApp(appUrl) {
    await this.page.goto(appUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isLoginScreenDisplayed() {
    return await loc.loginScreen(this.page).isVisible();
  }

  async enterUsername(username) {
    await loc.usernameInput(this.page).fill(username);
  }

  async enterPassword(password) {
    await loc.passwordInput(this.page).fill(password);
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isHomeScreenDisplayed() {
    return await loc.homeScreen(this.page).isVisible();
  }

  async navigateToCardManagement() {
    await loc.cardManagementMenu(this.page).click();
  }

  async isCardManagementScreenDisplayed() {
    return await loc.cardManagementScreen(this.page).isVisible();
  }

  async isCardListDisplayed() {
    return await loc.cardList(this.page).isVisible();
  }

  async getCardStatus(cardId) {
    return await loc.cardStatusBadge(this.page, cardId).textContent();
  }

  async isLockedStatusVisible() {
    return await loc.lockedStatusIndicator(this.page).isVisible();
  }

  async selectCard(cardId) {
    await loc.cardItem(this.page, cardId).click();
  }

  async isCardDetailsScreenDisplayed() {
    return await loc.cardDetailsScreen(this.page).isVisible();
  }

  async getCardDetailsStatus() {
    return await loc.cardStatusLabel(this.page).textContent();
  }

  async clickUnlockCardButton() {
    await loc.unlockCardButton(this.page).click();
  }

  async isUnlockPromptDisplayed() {
    return await loc.unlockPrompt(this.page).isVisible();
  }

  async getUnlockPromptMessage() {
    return await loc.unlockPromptMessage(this.page).textContent();
  }

  async isUnlockPromptOkButtonDisplayed() {
    return await loc.unlockPromptOkButton(this.page).isVisible();
  }

  async clickUnlockPromptOkButton() {
    await loc.unlockPromptOkButton(this.page).click();
  }

  async attemptPurchaseTransaction(cardId, merchant, amount) {
    await loc.merchantInput(this.page).fill(merchant);
    await loc.amountInput(this.page).fill(amount);
    await loc.purchaseButton(this.page).click();
  }

  async getTransactionErrorMessage() {
    return await loc.transactionErrorMessage(this.page).textContent();
  }

  async isTransactionDeclined() {
    return await loc.transactionDeclinedMessage(this.page).isVisible();
  }

  async isTransactionLimitsButtonEnabled() {
    return await loc.transactionLimitsButton(this.page).isEnabled();
  }

  async isTransactionLimitsButtonDisabled() {
    const isEnabled = await loc.transactionLimitsButton(this.page).isEnabled();
    return !isEnabled;
  }

  async getTransactionLimitsButtonState() {
    const isDisabled = await loc.transactionLimitsButton(this.page).getAttribute('disabled');
    return isDisabled !== null;
  }
}

module.exports = MobileCardManagementPage;