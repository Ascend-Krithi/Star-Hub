const locators = {
  emailField: (page) => page.locator('input[type="email"], input[name="email"], #email').first(),
  passwordField: (page) => page.locator('input[type="password"], input[name="password"], #password').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), input[type="submit"]').first(),
  errorMessage: (page) => page.locator('.error-message, .alert-danger, [role="alert"]').first(),
  pageTitle: (page) => page.locator('h1, .page-title').first()
};

module.exports = locators;