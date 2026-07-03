const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-010: Multi-Device Login', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-010 TC-002] Verify concurrent login on multiple devices', async ({ browser }) => {
    // Device 1: Desktop
    const desktopContext = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const desktopPage = await desktopContext.newPage();
    const desktopLogin = new DealerAppLoginPage(desktopPage);
    const desktopDashboard = new DealerAppDashboardPage(desktopPage);

    // Step 1-2: Login on Desktop
    await desktopLogin.goto();
    await desktopLogin.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await desktopPage.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    const desktopDashboardVisible = await desktopDashboard.isDashboardVisible();
    expect(desktopDashboardVisible).toBe(true);

    // Device 2: Mobile
    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const mobilePage = await mobileContext.newPage();
    const mobileLogin = new DealerAppLoginPage(mobilePage);
    const mobileDashboard = new DealerAppDashboardPage(mobilePage);

    // Step 3-4: Login on Mobile
    await mobileLogin.goto();
    await mobileLogin.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await mobilePage.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    const mobileDashboardVisible = await mobileDashboard.isDashboardVisible();
    expect(mobileDashboardVisible).toBe(true);

    // Step 5: Verify both sessions are active
    await desktopPage.reload();
    const desktopStillActive = await desktopDashboard.isDashboardVisible();
    expect(desktopStillActive).toBe(true);

    // Step 6: Perform actions on Desktop
    await desktopDashboard.navigateToMenu('Orders');
    await desktopPage.waitForTimeout(2000);

    // Step 7: Perform actions on Mobile
    await mobileDashboard.navigateToMenu('Orders');
    await mobilePage.waitForTimeout(2000);

    // Step 8: Verify consistent behavior
    await desktopPage.reload();
    await mobilePage.reload();
    const desktopConsistent = await desktopDashboard.isDashboardVisible();
    const mobileConsistent = await mobileDashboard.isDashboardVisible();
    expect(desktopConsistent).toBe(true);
    expect(mobileConsistent).toBe(true);

    await desktopContext.close();
    await mobileContext.close();
  });
});