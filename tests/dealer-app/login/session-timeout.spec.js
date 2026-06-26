const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { DashboardPage } = require('../../../pages/dealer-app/dashboard-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-008 - Session Timeout Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validCredentials.email, testData.validCredentials.password);
  });

  test('TC-001: Session timeout behavior at 24 hours of inactivity', async ({ page }) => {
    // Step 2: Perform normal activities
    await dashboardPage.navigateToServices();
    await expect(dashboardPage.servicesSection).toBeVisible();

    // Step 3: Simulate 23 hours 59 minutes inactivity
    // Note: In real scenario, this would use time manipulation
    await page.evaluate(() => {
      const now = Date.now();
      localStorage.setItem('lastActivity', now - (23 * 60 * 60 * 1000 + 59 * 60 * 1000));
    });

    // Step 4: Attempt to access feature
    await page.reload();
    await expect(dashboardPage.servicesSection).toBeVisible();

    // Step 5: Simulate 24 hours inactivity
    await page.evaluate(() => {
      const now = Date.now();
      localStorage.setItem('lastActivity', now - (24 * 60 * 60 * 1000));
    });

    // Step 6: Attempt to access feature after 24 hours
    await page.reload();
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.timeoutMessage).toBeVisible();

    // Step 7: Re-login
    await loginPage.login(testData.validCredentials.email, testData.validCredentials.password);
    await expect(page).toHaveURL(/dashboard/);
  });
});