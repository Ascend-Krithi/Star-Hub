const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-008: Session Management - Active Session', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-008 TC-001] Verify session remains active during normal use', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1: Launch and login
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Perform normal activities
    await expect(await dashboardPage.isDashboardVisible()).toBe(true);

    // Navigate between pages
    if (await dashboardPage.isOrdersVisible()) {
      await dashboardPage.navigateToMenu('Orders');
      await page.waitForTimeout(2000);
    }

    if (await dashboardPage.isReportsVisible()) {
      await dashboardPage.navigateToMenu('Reports');
      await page.waitForTimeout(2000);
    }

    // Step 4-5: Verify session remains active
    await page.goto(TD.urls.dashboard);
    await expect(await dashboardPage.isDashboardVisible()).toBe(true);
  });
});