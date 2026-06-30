const { test, expect } = require('../../fixtures');
const WorkdayLoginPage = require('../../pages/workday-login.page');
const TD = require('../../data/workday-test-data');

test.describe('[UI] Login Valid Workflow', { tag: ['@smoke', '@regression', '@capital-one'] }, () => {
  let loginPage;

  test('[TC-5] Test Case 5: Login Valid Workflow - Verify successful login with valid credentials', async ({ page }) => {
    try {
      loginPage = new WorkdayLoginPage(page);

      // Step 1: Navigate to login page
      await loginPage.goto();

      // Step 2: Verify login form is visible
      await expect(page).toHaveURL(TD.urlPatterns.login);
      await expect(page).toHaveTitle(TD.pageTitles.login);

      // Step 3: Enter valid username
      await loginPage.fillUsername(TD.credentials.validUser);

      // Step 4: Verify username field is populated
      const usernameField = page.locator('[data-testid="username"]').first();
      await expect(usernameField).toHaveValue(TD.credentials.validUser);

      // Step 5: Enter valid password
      await loginPage.fillPassword(TD.credentials.validPassword);

      // Step 6: Verify password field is populated (masked)
      const passwordField = page.locator('[data-testid="password"]').first();
      await expect(passwordField).toHaveValue(TD.credentials.validPassword);

      // Step 7: Click login button
      await loginPage.clickLoginButton();

      // Step 8: Wait for navigation to complete
      await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

      // Step 9: Verify successful login - URL should change to home/dashboard
      await expect(page).toHaveURL(TD.urlPatterns.home);

      // Step 10: Verify user profile icon is visible
      const userProfileIcon = page.locator('[data-testid="user-profile"]').first();
      await expect(userProfileIcon).toBeVisible();

      // Step 11: Verify welcome message or page title
      await expect(page).toHaveTitle(TD.pageTitles.home);

      // Step 12: Verify no error messages are displayed
      const errorMessage = page.locator('[data-testid="error-message"]').first();
      await expect(errorMessage).not.toBeVisible();

    } catch (error) {
      throw new Error(`Login Valid Workflow test failed: ${error.message}`);
    }
  });
});