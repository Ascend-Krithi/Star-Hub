const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-010: Multi-Device Login', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-010 TC-002] Verify concurrent sessions on multiple devices', async ({ page, browser }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Login on Device 1 (Desktop)
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    await expect(await dashboardPage.isDashboardVisible()).toBe(true);

    // Step 3-4: Login on Device 2 (Mobile - simulated with new context)
    const mobileContext = await browser.newContext({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      viewport: { width: 375, height: 667 }
    });
    const mobilePage = await mobileContext.newPage();
    const mobileLoginPage = new DealerAppLoginPage(mobilePage);
    const mobileDashboardPage = new DealerAppDashboardPage(mobilePage);

    await mobileLoginPage.goto();
    await mobileLoginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await mobilePage.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 5: Verify both sessions are active
    await expect(await dashboardPage.isDashboardVisible()).toBe(true);
    await expect(await mobileDashboardPage.isDashboardVisible()).toBe(true);

    // Step 6-8: Verify actions on both devices
    if (await dashboardPage.isOrdersVisible()) {
      await dashboardPage.navigateToMenu('Orders');
      await page.waitForTimeout(1000);
    }

    if (await mobileDashboardPage.isOrdersVisible()) {
      await mobileDashboardPage.navigateToMenu('Orders');
      await mobilePage.waitForTimeout(1000);
    }

    // Cleanup
    await mobileContext.close();
  });
});