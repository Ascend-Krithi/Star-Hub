const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerDashboardPage = require('../../pages/dealer-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-010: Multi-Device Login', { tag: ['@regression', '@dealer-app', '@e2e'] }, () => {
  let loginPageDesktop;
  let loginPageMobile;
  let dashboardPageDesktop;
  let dashboardPageMobile;

  test('[AD-79 TS-010 TC-002] Verify concurrent sessions on multiple devices', async ({ browser }) => {
    // Create Desktop context
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const desktopPage = await desktopContext.newPage();

    // Create Mobile context
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const mobilePage = await mobileContext.newPage();

    loginPageDesktop = new DealerLoginPage(desktopPage);
    dashboardPageDesktop = new DealerDashboardPage(desktopPage);
    loginPageMobile = new DealerLoginPage(mobilePage);
    dashboardPageMobile = new DealerDashboardPage(mobilePage);

    // Step 1-2: Login on Desktop
    await loginPageDesktop.goto();
    await loginPageDesktop.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await desktopPage.waitForLoadState('domcontentloaded');

    const isDesktopDashboardVisible = await dashboardPageDesktop.isDashboardVisible();
    expect(isDesktopDashboardVisible).toBeTruthy();

    // Step 3-4: Login on Mobile with same credentials
    await loginPageMobile.goto();
    await loginPageMobile.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await mobilePage.waitForLoadState('domcontentloaded');

    const isMobileDashboardVisible = await dashboardPageMobile.isDashboardVisible();
    expect(isMobileDashboardVisible).toBeTruthy();

    // Step 5: Verify both sessions are active simultaneously
    const isDesktopStillActive = await dashboardPageDesktop.isDashboardVisible();
    expect(isDesktopStillActive).toBeTruthy();

    // Step 6-7: Perform actions on both devices
    await dashboardPageDesktop.performActivity('Create new order');
    await dashboardPageMobile.performActivity('Update order status');

    // Step 8: Verify consistent behavior across devices
    const isDesktopConsistent = await dashboardPageDesktop.isDashboardVisible();
    const isMobileConsistent = await dashboardPageMobile.isDashboardVisible();
    expect(isDesktopConsistent).toBeTruthy();
    expect(isMobileConsistent).toBeTruthy();

    await desktopContext.close();
    await mobileContext.close();
  });
});