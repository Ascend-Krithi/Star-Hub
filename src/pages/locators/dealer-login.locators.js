const locators = {
  emailInput: (page) => page.getByRole('textbox', { name: /email/i }).first(),
  passwordInput: (page) => page.getByRole('textbox', { name: /password/i }).or(page.locator('input[type="password"]')).first(),
  loginButton: (page) => page.getByRole('button', { name: /log in|login|sign in/i }).first(),
  errorMessage: (page) => page.locator('[data-testid="login-error"]').or(page.locator('.error-message')).or(page.locator('[role="alert"]')).first(),
  welcomeMessage: (page) => page.locator('[data-testid="welcome-message"]').or(page.getByText(/welcome to dealer app/i)).first(),
  dashboardContainer: (page) => page.locator('[data-testid="dashboard"]').or(page.locator('.dashboard-container')).first(),
  dealerInfo: (page) => page.locator('[data-testid="dealer-info"]').or(page.locator('.dealer-information')).first()
};

module.exports = locators;