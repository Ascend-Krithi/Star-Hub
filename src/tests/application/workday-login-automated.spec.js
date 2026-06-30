const { test, expect } = require('../../fixtures');
const WorkdayLoginPage = require('../../pages/workday-login.page');
const TD = require('../../data/workday-test-data');

test.describe('[UI] TC-5: Login Valid Workflow', {
  tag: ['@smoke', '@regression', '@capital-one']
}, () => {
  let loginPage;

  test('[TC-5] Test Case 5: Verify successful login with valid credentials', async ({ page }) => {
    try {
      // Arrange
      loginPage = new WorkdayLoginPage(page);
      await loginPage.goto();

      // Assert: Login page is loaded
      await expect(page).toHaveURL(TD.urlPatterns.loginPage);
      await expect(page).toHaveTitle(TD.pageTitles.login);

      // Act: Enter valid credentials
      await loginPage.enterUsername(TD.credentials.validUser.username);
      await loginPage.enterPassword(TD.credentials.validUser.password);

      // Assert: Username field is filled
      const usernameField = page.locator('[data-testid="username"]').first();
      await expect(usernameField).toHaveValue(TD.credentials.validUser.username);

      // Act: Click Sign In button
      await loginPage.clickSignIn();

      // Assert: Successful navigation to dashboard
      await expect(page).toHaveURL(TD.urlPatterns.loginSuccess);
      await expect(page).toHaveTitle(TD.pageTitles.dashboard);

      // Assert: Dashboard elements are visible
      const dashboardHeader = page.locator('[data-testid="dashboard-header"]').first();
      await expect(dashboardHeader).toBeVisible();

      const userProfileIcon = page.locator('[data-testid="user-profile"]').first();
      await expect(userProfileIcon).toBeVisible();

    } catch (error) {
      throw new Error(`[TC-5] Login Valid Workflow failed: ${error.message}`);
    }
  });

  test('[TC-5-Negative] Test Case 5: Verify error message with invalid credentials', async ({ page }) => {
    try {
      // Arrange
      loginPage = new WorkdayLoginPage(page);
      await loginPage.goto();

      // Assert: Login page is loaded
      await expect(page).toHaveURL(TD.urlPatterns.loginPage);

      // Act: Enter invalid credentials
      await loginPage.enterUsername(TD.credentials.invalidUser.username);
      await loginPage.enterPassword(TD.credentials.invalidUser.password);
      await loginPage.clickSignIn();

      // Assert: Error message is displayed
      const errorMessage = page.locator('[data-testid="error-message"]').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(TD.errors.invalidCredentials);

      // Assert: User remains on login page
      await expect(page).toHaveURL(TD.urlPatterns.loginPage);

    } catch (error) {
      throw new Error(`[TC-5-Negative] Login Invalid Workflow failed: ${error.message}`);
    }
  });
});