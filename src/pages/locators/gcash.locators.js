const locators = {
  // Login Screen
  loginScreen: (page) => page.locator('[data-testid="login-screen"]').first(),
  usernameInput: (page) => page.locator('[data-testid="username-input"]').first(),
  passwordInput: (page) => page.locator('[data-testid="password-input"]').first(),
  loginButton: (page) => page.locator('[data-testid="login-button"]').first(),
  
  // Core Wallet Dashboard
  coreWalletDashboard: (page) => page.locator('[data-testid="core-wallet-dashboard"]').first(),
  walletBalance: (page) => page.locator('[data-testid="wallet-balance"]').first(),
  sendMoneyOption: (page) => page.locator('[data-testid="send-money-option"]').first(),
  
  // Send Money Screen
  sendMoneyScreen: (page) => page.locator('[data-testid="send-money-screen"]').first(),
  expressendOption: (page) => page.locator('[data-testid="express-send-option"]').first(),
  
  // Express Send Screen
  expressSendScreen: (page) => page.locator('[data-testid="express-send-screen"]').first(),
  recipientInput: (page) => page.locator('[data-testid="recipient-mobile-input"]').first(),
  amountInput: (page) => page.locator('[data-testid="transfer-amount-input"]').first(),
  confirmButton: (page) => page.locator('[data-testid="confirm-transaction-button"]').first(),
  
  // MPIN Screen
  mpinInput: (page) => page.locator('[data-testid="mpin-input"]').first(),
  mpinSubmitButton: (page) => page.locator('[data-testid="mpin-submit-button"]').first(),
  
  // Transaction Status
  successMessage: (page) => page.locator('[data-testid="transaction-success-message"]').first(),
  errorMessage: (page) => page.locator('[data-testid="transaction-error-message"]').first(),
  failureMessage: (page) => page.locator('[data-testid="transaction-failure-message"]').first(),
  retryIndicator: (page) => page.locator('[data-testid="retry-indicator"]').first(),
  
  // Insufficient Balance Error
  insufficientBalanceError: (page) => page.locator('[data-testid="insufficient-balance-error"]').first(),
  cashInOptions: (page) => page.locator('[data-testid="cash-in-options"]').first(),
  bankTransferOption: (page) => page.locator('[data-testid="bank-transfer-option"]').first(),
  overTheCounterOption: (page) => page.locator('[data-testid="over-the-counter-option"]').first(),
  onlineBankingOption: (page) => page.locator('[data-testid="online-banking-option"]').first(),
  
  // Recipient Account Status Errors
  suspendedAccountError: (page) => page.locator('[data-testid="suspended-account-error"]').first(),
  frozenAccountError: (page) => page.locator('[data-testid="frozen-account-error"]').first(),
  customerSupportHotline: (page) => page.locator('[data-testid="customer-support-hotline"]').first(),
  customerSupportEmail: (page) => page.locator('[data-testid="customer-support-email"]').first(),
  inAppChatLink: (page) => page.locator('[data-testid="in-app-chat-link"]').first(),
  
  // Transaction History
  transactionHistory: (page) => page.locator('[data-testid="transaction-history"]').first(),
  transactionHistoryItem: (page) => page.locator('[data-testid="transaction-history-item"]').first()
};

module.exports = locators;