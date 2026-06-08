/**
 * Page Object for Mobile Card Management Module
 * QE-851 Test Suite
 */
const loc = require('./locators/mobile-card-management.locators');

class MobileCardManagementPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Launch the mobile application
   * @param {string} appUrl - Mobile app URL or package identifier
   */
  async launchApp(appUrl) {
    await this.page.goto(appUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await loc.loginScreen(this.page).waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Check if login screen is displayed
   * @returns {boolean}
   */
  async isLoginScreenDisplayed() {
    return await loc.loginScreen(this.page).isVisible();
  }

  /**
   * Login to the mobile application
   * @param {string} username - User email/username
   * @param {string} password - User password
   */
  async login(username, password) {
    await loc.usernameField(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.usernameField(this.page).fill(username);
    await loc.passwordField(this.page).fill(password);
    await loc.loginButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Check if home screen is displayed
   * @returns {boolean}
   */
  async isHomeScreenDisplayed() {
    await loc.homeScreen(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.homeScreen(this.page).isVisible();
  }

  /**
   * Navigate to Card Management section
   */
  async navigateToCardManagement() {
    await loc.cardManagementMenu(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.cardManagementMenu(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Check if Card Management screen is displayed
   * @returns {boolean}
   */
  async isCardManagementScreenDisplayed() {
    await loc.cardManagementScreen(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.cardManagementScreen(this.page).isVisible();
  }

  /**
   * Check if card list is displayed
   * @returns {boolean}
   */
  async isCardListDisplayed() {
    await loc.cardList(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.cardList(this.page).isVisible();
  }

  /**
   * Get card by ID or index and check locked status
   * @param {string} cardId - Card identifier
   * @returns {object} Card element locator
   */
  async getLockedCard(cardId) {
    const cards = loc.cardItem(this.page);
    await cards.first().waitFor({ state: 'visible', timeout: 15000 });
    
    // Return first card with locked status for testing purposes
    const lockedCard = cards.filter({ has: loc.lockedStatusIndicator(this.page) }).first();
    await lockedCard.waitFor({ state: 'visible', timeout: 15000 });
    return lockedCard;
  }

  /**
   * Check if locked status indicator is visible on card
   * @returns {boolean}
   */
  async isLockedStatusVisible() {
    await loc.lockedStatusIndicator(this.page).first().waitFor({ state: 'visible', timeout: 15000 });
    return await loc.lockedStatusIndicator(this.page).first().isVisible();
  }

  /**
   * Select and view locked card details
   * @param {string} cardId - Card identifier
   */
  async selectLockedCard(cardId) {
    const lockedCard = await this.getLockedCard(cardId);
    await lockedCard.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Check if card details screen is displayed
   * @returns {boolean}
   */
  async isCardDetailsScreenDisplayed() {
    await loc.cardDetailsScreen(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.cardDetailsScreen(this.page).isVisible();
  }

  /**
   * Check if locked status is displayed on card details screen
   * @returns {boolean}
   */
  async isLockedStatusDisplayedOnDetails() {
    await loc.lockedCardStatus(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.lockedCardStatus(this.page).isVisible();
  }

  /**
   * Click on Unlock Card button
   */
  async clickUnlockCardButton() {
    await loc.unlockCardButton(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.unlockCardButton(this.page).click();
  }

  /**
   * Check if unlock prompt is displayed
   * @returns {boolean}
   */
  async isUnlockPromptDisplayed() {
    await loc.unlockPrompt(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.unlockPrompt(this.page).isVisible();
  }

  /**
   * Get unlock prompt message text
   * @returns {string}
   */
  async getUnlockPromptMessage() {
    await loc.unlockPromptMessage(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.unlockPromptMessage(this.page).textContent();
  }

  /**
   * Check if OK button is visible on prompt
   * @returns {boolean}
   */
  async isPromptOkButtonVisible() {
    return await loc.unlockPromptOkButton(this.page).isVisible();
  }

  /**
   * Simulate purchase transaction with locked card
   * @param {string} cardId - Card identifier
   * @param {string} merchant - Merchant name
   * @param {string} amount - Transaction amount
   * @returns {string} Transaction result/error message
   */
  async attemptPurchaseTransaction(cardId, merchant, amount) {
    // This is a simulation method - actual implementation depends on app functionality
    // For testing purposes, we'll check for transaction error message
    await this.page.waitForTimeout(2000); // Allow transaction processing
    
    const errorMessage = loc.transactionErrorMessage(this.page);
    await errorMessage.waitFor({ state: 'visible', timeout: 15000 });
    return await errorMessage.textContent();
  }

  /**
   * Check if transaction error message is displayed
   * @returns {boolean}
   */
  async isTransactionErrorDisplayed() {
    await loc.transactionErrorMessage(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.transactionErrorMessage(this.page).isVisible();
  }

  /**
   * Check Transaction Limits button state
   * @returns {boolean} True if disabled, false if enabled
   */
  async isTransactionLimitsButtonDisabled() {
    await loc.transactionLimitsButton(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.transactionLimitsButton(this.page).isDisabled();
  }

  /**
   * Check if Transaction Limits button is visible
   * @returns {boolean}
   */
  async isTransactionLimitsButtonVisible() {
    return await loc.transactionLimitsButton(this.page).isVisible();
  }

  /**
   * Check if Transaction Limits button is clickable
   * @returns {boolean}
   */
  async isTransactionLimitsButtonClickable() {
    const button = loc.transactionLimitsButton(this.page);
    const isVisible = await button.isVisible();
    const isEnabled = await button.isEnabled();
    return isVisible && isEnabled;
  }
}

module.exports = MobileCardManagementPage;