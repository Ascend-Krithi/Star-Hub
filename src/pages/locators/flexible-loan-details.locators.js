const locators = {
  pageHeading: (page) => page.locator('[data-testid="flexible-loan-heading"], h1:has-text("Flexible Personal Loan"), .page-title').first(),
  loanAmountField: (page) => page.locator('[data-testid="loan-amount"], input[name="loanAmount"], #loanAmount').first(),
  loanTenureField: (page) => page.locator('[data-testid="loan-tenure"], select[name="tenure"], #tenure').first(),
  repaymentFrequencyField: (page) => page.locator('[data-testid="repayment-frequency"], select[name="frequency"], #frequency').first(),
  monthlyRepaymentAmount: (page) => page.locator('[data-testid="monthly-repayment"], .monthly-repayment, .repayment-amount').first(),
  applyNowButton: (page) => page.locator('[data-testid="apply-now-button"], button:has-text("Apply Now"), .apply-now-btn').first(),
  authPopup: (page) => page.locator('[data-testid="auth-popup"], [role="dialog"], .modal, .popup').first(),
  authPopupMessage: (page) => page.locator('[data-testid="auth-popup-message"], .popup-message, .modal-message').first(),
  loginButton: (page) => page.locator('[data-testid="login-button"], button:has-text("Log in to Online Banking"), .login-btn').first(),
  signupButton: (page) => page.locator('[data-testid="signup-button"], button:has-text("Sign up"), a:has-text("Sign up here")').first()
};

module.exports = locators;