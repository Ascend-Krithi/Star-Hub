const locators = {
  usernameField: (page) => page.locator('[data-testid="username"]').first(),
  passwordField: (page) => page.locator('[data-testid="password"]').first(),
  loginButton: (page) => page.getByRole('button', { name: /sign in/i }).first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"]').first(),
  loginForm: (page) => page.locator('[data-testid="login-form"]').first(),
  forgotPasswordLink: (page) => page.getByRole('link', { name: /forgot password/i }).first(),
  rememberMeCheckbox: (page) => page.locator('[data-testid="remember-me"]').first(),
  welcomeMessage: (page) => page.locator('[data-testid="welcome-message"]').first(),
  userProfileIcon: (page) => page.locator('[data-testid="user-profile"]').first()
};
module.exports = locators;