const locators = {
  emailField: (page) => page.locator('[data-testid="email-input"]').first(),
  passwordField: (page) => page.locator('[data-testid="password-input"]').first(),
  loginButton: (page) => page.getByRole('button', { name: 'Login' }).first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"]').first(),
  welcomeMessage: (page) => page.locator('[data-testid="welcome-message"]').first(),
  dashboardContainer: (page) => page.locator('[data-testid="dashboard-container"]').first()
};

module.exports = locators;