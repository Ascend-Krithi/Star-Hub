const locators = {
  // Login Screen Locators
  loginScreen: (page) => page.locator('[data-testid="login-screen"]').first(),
  usernameInput: (page) => page.locator('[data-testid="username-input"]').first(),
  passwordInput: (page) => page.locator('[data-testid="password-input"]').first(),
  loginButton: (page) => page.locator('[data-testid="login-button"]').first(),
  
  // Home Screen Locators
  homeScreen: (page) => page.locator('[data-testid="home-screen"]').first(),
  cardManagementMenu: (page) => page.locator('[data-testid="card-management-menu"]').first(),
  
  // Card Management Screen Locators
  cardManagementScreen: (page) => page.locator('[data-testid="card-management-screen"]').first(),
  cardList: (page) => page.locator('[data-testid="card-list"]').first(),
  cardItem: (page, cardId) => page.locator(`[data-testid="card-item-${cardId}"]`).first(),
  cardStatusBadge: (page, cardId) => page.locator(`[data-testid="card-status-${cardId}"]`).first(),
  lockedStatusIndicator: (page) => page.locator('[data-testid="locked-status-indicator"]').first(),
  
  // Card Details Screen Locators
  cardDetailsScreen: (page) => page.locator('[data-testid="card-details-screen"]').first(),
  cardStatusLabel: (page) => page.locator('[data-testid="card-status-label"]').first(),
  unlockCardButton: (page) => page.locator('[data-testid="unlock-card-button"]').first(),
  transactionLimitsButton: (page) => page.locator('[data-testid="transaction-limits-button"]').first(),
  
  // Unlock Card Prompt Locators
  unlockPrompt: (page) => page.locator('[data-testid="unlock-card-prompt"]').first(),
  unlockPromptMessage: (page) => page.locator('[data-testid="unlock-prompt-message"]').first(),
  unlockPromptOkButton: (page) => page.locator('[data-testid="unlock-prompt-ok-button"]').first(),
  
  // Transaction Screen Locators
  transactionScreen: (page) => page.locator('[data-testid="transaction-screen"]').first(),
  merchantInput: (page) => page.locator('[data-testid="merchant-input"]').first(),
  amountInput: (page) => page.locator('[data-testid="amount-input"]').first(),
  purchaseButton: (page) => page.locator('[data-testid="purchase-button"]').first(),
  transactionErrorMessage: (page) => page.locator('[data-testid="transaction-error-message"]').first(),
  transactionDeclinedMessage: (page) => page.locator('[data-testid="transaction-declined-message"]').first()
};

module.exports = locators;