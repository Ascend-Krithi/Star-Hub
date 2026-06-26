const locators = {
  emailInput: (page) => page.locator('input[type="email"], input[name="email"], input[id="email"]').first(),
  passwordInput: (page) => page.locator('input[type="password"], input[name="password"], input[id="password"]').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first(),
  errorMessage: (page) => page.locator('.error-message, .alert-danger, [role="alert"], .error').first()
};

module.exports = locators;