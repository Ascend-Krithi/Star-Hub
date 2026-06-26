const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { DashboardPage } = require('../../../pages/dealer-app/dashboard-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-009 - Logout Behavior Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validCredentials.email, testData.validCredentials.password);
  });

  test('TC-001: Explicit logout terminates session and requires re-authentication', async ({ page }) => {
    // Step 2: Navigate to logout option
    await expect(dashboardPage.logoutButton).toBeVisible();

    // Step 3: Click logout
    await dashboardPage.logout();
    await expect(page).toHaveURL(/login/);

    // Step 4: Attempt to access protected feature
    await page.goto(testData.urls.dashboard);
    await expect(page).toHaveURL(/login/);

    // Step 5: Re-login
    await loginPage.login(testData.validCredentials.email, testData.validCredentials.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('TC-002: Security event invalidates session and forces logout', async ({ page }) => {
    // Step 2: Verify logged in
    await expect(dashboardPage.servicesSection).toBeVisible();

    // Step 3: Trigger security event (simulate password change)
    await page.evaluate(() => {
      localStorage.setItem('securityEvent', 'passwordChanged');
    });

    // Step 4: Attempt to access feature
    await page.reload();
    await expect(page).toHaveURL(/login/);

    // Step 5: Verify security message
    await expect(loginPage.securityMessage).toBeVisible();
    await expect(loginPage.securityMessage).toContainText('session has been invalidated for security reasons');

    // Step 6: Re-login with new credentials
    await loginPage.login(testData.validCredentials.email, 'NewValidPass123');
    await expect(page).toHaveURL(/dashboard/);
  });
});