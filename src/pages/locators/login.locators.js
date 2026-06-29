const locators = {
  usernameField: (page) => page.locator('[data-testid="username"]').first(),
  passwordField: (page) => page.locator('[data-testid="password"]').first(),
  loginButton: (page) => page.locator('[data-testid="login-button"]').first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"]').first(),
  welcomeMessage: (page) => page.locator('[data-testid="welcome-message"]').first(),
  logoutButton: (page) => page.locator('[data-testid="logout-button"]').first()
};

module.exports = locators;