module.exports = {
  emailField: (page) => page.locator('[data-testid="email-input"]').or(page.locator('input[type="email"]')).or(page.locator('input[placeholder*="email" i]')).first(),
  passwordField: (page) => page.locator('[data-testid="password-input"]').or(page.locator('input[type="password"]')).first(),
  loginButton: (page) => page.locator('[data-testid="login-button"]').or(page.locator('button:has-text("Login")')).or(page.locator('button:has-text("Sign In")')).first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"]').or(page.locator('.error-message')).or(page.locator('[role="alert"]')).first(),
  logoutButton: (page) => page.locator('[data-testid="logout-button"]').or(page.locator('button:has-text("Logout")')).or(page.locator('button:has-text("Sign Out")')).first()
};