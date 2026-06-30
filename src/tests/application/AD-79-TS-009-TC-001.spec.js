const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-009: Session Expiry - 24+ Hour Timeout', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test.skip('[AD-79 TS-009 TC-001] Verify session expires after 24+ hours of inactivity', async ({ page }) => {
    // This test is skipped as it requires 24+ hours of wait time
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Launch and login
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Leave idle for 24+ hours (simulated)
    // In production, this would manipulate session expiry time

    // Step 4-5: Verify session timeout and re-authentication required
    await page.goto(TD.urls.dashboard);
    await expect(page).toHaveURL(TD.urlPatterns.login);
  });
});