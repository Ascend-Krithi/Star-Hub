const locators = {
  // Navigation Menu Locators
  loansMenu: (page) => page.getByRole('link', { name: 'Loans' }).first(),
  personalLoansSubmenu: (page) => page.getByRole('link', { name: 'Personal Loans' }).first(),
  flexiblePersonalLoanOption: (page) => page.getByRole('link', { name: 'Flexible Personal Loan' }).first(),

  // Loan Configuration Fields
  loanAmountField: (page) => page.locator('[data-testid="loan-amount-field"]').first(),
  loanTenureDropdown: (page) => page.locator('[data-testid="loan-tenure-dropdown"]').first(),
  loanTenureSelected: (page) => page.locator('[data-testid="loan-tenure-dropdown"] option:checked').first(),
  repaymentFrequencyDropdown: (page) => page.locator('[data-testid="repayment-frequency-dropdown"]').first(),
  repaymentFrequencySelected: (page) => page.locator('[data-testid="repayment-frequency-dropdown"] option:checked').first(),
  estimatedMonthlyRepayment: (page) => page.locator('[data-testid="estimated-monthly-repayment"]').first(),

  // Configuration Labels
  loanAmountLabel: (page) => page.getByText('Loan Amount').first(),
  loanTenureLabel: (page) => page.getByText('Loan Tenure').first(),
  repaymentFrequencyLabel: (page) => page.getByText('Repayment Frequency').first(),
  estimatedRepaymentLabel: (page) => page.getByText('Estimated Monthly Repayment').first(),

  // Apply Now Button
  applyNowButton: (page) => page.getByRole('button', { name: 'Apply Now' }).first(),

  // Authentication Popup Elements
  authenticationPopup: (page) => page.locator('[data-testid="authentication-popup"]').first(),
  authPopupMessage: (page) => page.locator('[data-testid="auth-popup-message"]').first(),
  loginButton: (page) => page.getByRole('button', { name: 'Log in to Online Banking' }).first(),
  signupButton: (page) => page.getByRole('button', { name: "Don't have an account? Sign up here" }).first(),

  // User Profile Elements
  userProfileIcon: (page) => page.locator('[data-testid="user-profile-icon"]').first(),
  logoutOption: (page) => page.getByRole('button', { name: 'Logout' }).first(),

  // Page Elements
  pageTitle: (page) => page.locator('h1').first(),
  loanConfigurationSection: (page) => page.locator('[data-testid="loan-configuration-section"]').first(),
};

module.exports = locators;