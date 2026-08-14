const locators = {
  loansNavLink: (page) => page.getByRole('link', { name: /loans/i }).first(),
  personalLoansLink: (page) => page.getByRole('link', { name: /personal loans/i }).first(),
  flexiblePersonalLoanLink: (page) => page.getByRole('link', { name: /flexible personal loan/i }).first(),
  loanAmountControl: (page) => page.locator('[data-testid="loan-amount"]').first(),
  loanTenureControl: (page) => page.locator('[data-testid="loan-tenure"]').first(),
  repaymentFrequencyControl: (page) => page.locator('[data-testid="repayment-frequency"]').first(),
  estimatedRepaymentDisplay: (page) => page.locator('[data-testid="estimated-repayment"]').first(),
  applyNowButton: (page) => page.getByRole('button', { name: /apply now/i }).first(),
  authenticationPopup: (page) => page.locator('[role="dialog"]').first(),
  authPopupMessage: (page) => page.locator('[role="dialog"] p, [role="dialog"] .message').first(),
  loginButton: (page) => page.getByRole('button', { name: /log in to online banking/i }).first(),
  signUpButton: (page) => page.getByRole('button', { name: /sign up here/i }).first(),
  pageHeading: (page) => page.locator('h1').first(),
  loanDetailsSection: (page) => page.locator('[data-testid="loan-details"], .loan-details').first()
};
module.exports = locators;