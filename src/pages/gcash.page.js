const loc = require('./locators/gcash.locators');
const URL = 'gcash://app';

class GCashPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  // Login Methods
  async isLoginScreenVisible() {
    return await loc.loginScreen(this.page).isVisible();
  }

  async login(username, password) {
    await loc.usernameInput(this.page).fill(username);
    await loc.passwordInput(this.page).fill(password);
    await loc.loginButton(this.page).click();
  }

  // Dashboard Methods
  async isCoreWalletDashboardVisible() {
    return await loc.coreWalletDashboard(this.page).isVisible();
  }

  async getWalletBalance() {
    const balanceText = await loc.walletBalance(this.page).textContent();
    return balanceText;
  }

  async navigateToSendMoney() {
    await loc.sendMoneyOption(this.page).click();
  }

  // Send Money Methods
  async isSendMoneyScreenVisible() {
    return await loc.sendMoneyScreen(this.page).isVisible();
  }

  async selectExpressSend() {
    await loc.expressendOption(this.page).click();
  }

  // Express Send Methods
  async isExpressSendScreenVisible() {
    return await loc.expressSendScreen(this.page).isVisible();
  }

  async enterRecipientMobile(mobileNumber) {
    await loc.recipientInput(this.page).fill(mobileNumber);
  }

  async enterTransferAmount(amount) {
    await loc.amountInput(this.page).fill(amount);
  }

  async confirmTransaction() {
    await loc.confirmButton(this.page).click();
  }

  // MPIN Methods
  async enterMPIN(mpin) {
    await loc.mpinInput(this.page).fill(mpin);
    await loc.mpinSubmitButton(this.page).click();
  }

  // Transaction Status Methods
  async isSuccessMessageVisible() {
    return await loc.successMessage(this.page).isVisible();
  }

  async getSuccessMessageText() {
    return await loc.successMessage(this.page).textContent();
  }

  async isErrorMessageVisible() {
    return await loc.errorMessage(this.page).isVisible();
  }

  async getErrorMessageText() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isFailureMessageVisible() {
    return await loc.failureMessage(this.page).isVisible();
  }

  async getFailureMessageText() {
    return await loc.failureMessage(this.page).textContent();
  }

  async isRetryIndicatorVisible() {
    return await loc.retryIndicator(this.page).isVisible();
  }

  // Insufficient Balance Methods
  async isInsufficientBalanceErrorVisible() {
    return await loc.insufficientBalanceError(this.page).isVisible();
  }

  async areCashInOptionsVisible() {
    return await loc.cashInOptions(this.page).isVisible();
  }

  async isBankTransferOptionVisible() {
    return await loc.bankTransferOption(this.page).isVisible();
  }

  async isOverTheCounterOptionVisible() {
    return await loc.overTheCounterOption(this.page).isVisible();
  }

  async isOnlineBankingOptionVisible() {
    return await loc.onlineBankingOption(this.page).isVisible();
  }

  async selectCashInOption(option) {
    if (option === 'Bank Transfer') {
      await loc.bankTransferOption(this.page).click();
    } else if (option === 'Over the Counter') {
      await loc.overTheCounterOption(this.page).click();
    } else if (option === 'Online Banking') {
      await loc.onlineBankingOption(this.page).click();
    }
  }

  // Recipient Account Status Error Methods
  async isSuspendedAccountErrorVisible() {
    return await loc.suspendedAccountError(this.page).isVisible();
  }

  async isFrozenAccountErrorVisible() {
    return await loc.frozenAccountError(this.page).isVisible();
  }

  async isCustomerSupportHotlineVisible() {
    return await loc.customerSupportHotline(this.page).isVisible();
  }

  async isCustomerSupportEmailVisible() {
    return await loc.customerSupportEmail(this.page).isVisible();
  }

  async isInAppChatLinkVisible() {
    return await loc.inAppChatLink(this.page).isVisible();
  }

  async clickCustomerSupportHotline() {
    await loc.customerSupportHotline(this.page).click();
  }

  async clickCustomerSupportEmail() {
    await loc.customerSupportEmail(this.page).click();
  }

  async clickInAppChatLink() {
    await loc.inAppChatLink(this.page).click();
  }

  // Transaction History Methods
  async navigateToTransactionHistory() {
    await loc.transactionHistory(this.page).click();
  }

  async isTransactionInHistory(recipient, amount) {
    const historyItems = await loc.transactionHistoryItem(this.page).all();
    for (const item of historyItems) {
      const text = await item.textContent();
      if (text.includes(recipient) && text.includes(amount)) {
        return true;
      }
    }
    return false;
  }

  // Network Simulation Methods
  async simulateNetworkTimeout(page) {
    await page.route('**/api/transfer', route => {
      setTimeout(() => route.abort('timedout'), 30000);
    });
  }

  async simulatePersistentNetworkTimeout(page) {
    let attemptCount = 0;
    await page.route('**/api/transfer', route => {
      attemptCount++;
      setTimeout(() => route.abort('timedout'), 30000);
    });
  }

  async simulateNetworkTimeoutWithRetrySuccess(page, successOnAttempt) {
    let attemptCount = 0;
    await page.route('**/api/transfer', route => {
      attemptCount++;
      if (attemptCount === successOnAttempt) {
        route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
      } else {
        setTimeout(() => route.abort('timedout'), 30000);
      }
    });
  }

  // Retry Timing Methods
  async waitForRetryAttempt(seconds) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async measureRetryInterval(startTime) {
    const endTime = Date.now();
    return (endTime - startTime) / 1000;
  }
}

module.exports = GCashPage;