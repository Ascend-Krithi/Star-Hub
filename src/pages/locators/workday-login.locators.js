const locators = {
  usernameField: (page) => page.locator('[data-testid="username"]').first(),
  passwordField: (page) => page.locator('[data-testid="password"]').first(),
  signInButton: (page) => page.locator('button[type="submit"]').first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"]').first(),
  dashboardHeader: (page) => page.locator('[data-testid="dashboard-header"]').first(),
  userProfileIcon: (page) => page.locator('[data-testid="user-profile"]').first()
};

module.exports = locators;