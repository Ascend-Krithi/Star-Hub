const locators = {
  mobileNumberInput: (page) => page.locator('[data-testid="mobile-number-input"]').first(),
  passwordInput: (page) => page.locator('[data-testid="password-input"]').first(),
  loginButton: (page) => page.locator('[data-testid="login-button"]').first(),
  loginScreen: (page) => page.locator('[data-testid="login-screen"]').first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"]').first()
};

module.exports = locators;