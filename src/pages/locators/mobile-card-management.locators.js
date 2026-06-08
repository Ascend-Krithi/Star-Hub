/**
 * Locators for Mobile Card Management Module
 * QE-851 Test Suite
 */
const locators = {
  // Login Screen Elements
  loginScreen: (page) => page.locator('[data-testid="login-screen"], .login-container').first(),
  usernameField: (page) => page.locator('input[name="username"], input[type="email"], [data-testid="username-input"]').first(),
  passwordField: (page) => page.locator('input[name="password"], input[type="password"], [data-testid="password-input"]').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), [data-testid="login-button"]').first(),
  
  // Home Screen Elements
  homeScreen: (page) => page.locator('[data-testid="home-screen"], .home-container, .dashboard').first(),
  homeScreenTitle: (page) => page.locator('h1, .home-title, [data-testid="home-title"]').first(),
  
  // Card Management Section
  cardManagementMenu: (page) => page.locator('a:has-text("Card Management"), [data-testid="card-management-menu"]').first(),
  cardManagementScreen: (page) => page.locator('[data-testid="card-management-screen"], .card-management-container').first(),
  cardManagementTitle: (page) => page.locator('h1:has-text("Card Management"), [data-testid="card-management-title"]').first(),
  
  // Card List Elements
  cardList: (page) => page.locator('[data-testid="card-list"], .card-list, ul.cards').first(),
  cardItem: (page) => page.locator('[data-testid="card-item"], .card-item, li.card'),
  cardStatusIndicator: (page) => page.locator('[data-testid="card-status"], .card-status, .status-badge'),
  lockedStatusIndicator: (page) => page.locator('[data-testid="locked-status"], .status-locked, .badge-locked, span:has-text("Locked")'),
  
  // Card Details Screen
  cardDetailsScreen: (page) => page.locator('[data-testid="card-details-screen"], .card-details-container').first(),
  cardDetailsTitle: (page) => page.locator('h1, .card-details-title, [data-testid="card-details-title"]').first(),
  lockedCardStatus: (page) => page.locator('[data-testid="locked-status"], .status-locked, span:has-text("Locked")').first(),
  
  // Card Action Buttons
  unlockCardButton: (page) => page.locator('button:has-text("Unlock Card"), [data-testid="unlock-card-button"]').first(),
  transactionLimitsButton: (page) => page.locator('button:has-text("Transaction Limits"), [data-testid="transaction-limits-button"]').first(),
  
  // Unlock Prompt/Dialog
  unlockPrompt: (page) => page.locator('[role="dialog"], .modal, .prompt, [data-testid="unlock-prompt"]').first(),
  unlockPromptMessage: (page) => page.locator('.prompt-message, .modal-body, [data-testid="prompt-message"]').first(),
  unlockPromptOkButton: (page) => page.locator('button:has-text("OK"), [data-testid="prompt-ok-button"]').first(),
  
  // Transaction Elements
  transactionErrorMessage: (page) => page.locator('[data-testid="transaction-error"], .error-message, .transaction-declined').first(),
  
  // Generic Elements
  errorMessage: (page) => page.locator('[role="alert"], .error-message, .alert-error').first(),
  loadingSpinner: (page) => page.locator('[data-testid="loading"], .spinner, .loading').first()
};

module.exports = locators;