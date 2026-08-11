const locators = {
  // Navigation elements
  loansMenu: (page) => page.locator('[data-testid="loans-menu"]').first(),
  personalLoansLink: (page) => page.locator('[data-testid="personal-loans-link"]').first(),
  
  // Personal Loans listing page
  loanProductsList: (page) => page.locator('[data-testid="loan-products-list"]').first(),
  flexiblePersonalLoanCard: (page) => page.locator('[data-testid="flexible-personal-loan"]').first(),
  loanProductCards: (page) => page.locator('[data-testid="loan-product-card"]'),
  
  // Flexible Personal Loan details page
  loanAmountField: (page) => page.locator('[data-testid="loan-amount"]').first(),
  loanTenureField: (page) => page.locator('[data-testid="loan-tenure"]').first(),
  repaymentFrequencyField: (page) => page.locator('[data-testid="repayment-frequency"]').first(),
  estimatedMonthlyRepayment: (page) => page.locator('[data-testid="estimated-monthly-repayment"]').first(),
  applyNowButton: (page) => page.locator('[data-testid="apply-now-button"]').first(),
  
  // Authentication popup
  authPopup: (page) => page.locator('[data-testid="auth-popup"]').first(),
  authPopupMessage: (page) => page.locator('[data-testid="auth-popup-message"]').first(),
  loginButton: (page) => page.locator('[data-testid="login-button"]').first(),
  signUpButton: (page) => page.locator('[data-testid="signup-button"]').first(),
  popupOverlay: (page) => page.locator('[data-testid="popup-overlay"]').first()
};

module.exports = locators;