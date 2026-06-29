const { test, expect } = require('../../fixtures');
const LoginPage = require('../../pages/login.page');
const TD = require('../../data/login-test-data');

test.describe('[UI] TC-5: Login Valid Workflow', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;

  test('[TC-5] Test Case 5: Login Valid Workflow - Verify successful login with valid credentials', async ({ page }) => {
    try {
      // Arrange
      loginPage = new LoginPage(page);
      await loginPage.goto();

      // Assert login page is loaded
      await expect(page).toHaveURL(TD.urlPatterns.loginPage);
      await expect(page).toHaveTitle(TD.pageTitles.loginPage);

      // Act - Perform login with valid credentials
      await loginPage.enterUsername(TD.credentials.validUser.username);
      await loginPage.enterPassword(TD.credentials.validUser.password);
      await loginPage.clickLoginButton();

      // Assert - Verify successful login
      await expect(page).toHaveURL(TD.urlPatterns.dashboardPage);
      await expect(page).toHaveTitle(TD.pageTitles.dashboardPage);

      // Verify welcome message is visible
      const welcomeLocator = page.locator('[data-testid="welcome-message"]');
      await expect(welcomeLocator).toBeVisible();
      await expect(welcomeLocator).toContainText(TD.messages.welcomeMessage);

      // Verify logout button is present
      const logoutLocator = page.locator('[data-testid="logout-button"]');
      await expect(logoutLocator).toBeVisible();

    } catch (error) {
      // Re-throw with clear failure message
      throw new Error(`Login Valid Workflow test failed: ${error.message}`);
    }
  });
});