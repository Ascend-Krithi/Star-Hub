const locators = {
  usernameInput: (page) => page.locator('input[name="username"], input[id="username"], input[type="email"]').first(),
  passwordInput: (page) => page.locator('input[name="password"], input[id="password"], input[type="password"]').first(),
  loginButton: (page) => page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first(),
  dashboard: (page) => page.locator('[data-testid="dashboard"], .dashboard, #dashboard').first()
};

module.exports = locators;