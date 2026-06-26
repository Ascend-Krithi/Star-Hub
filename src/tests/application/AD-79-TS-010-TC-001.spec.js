const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-010: Multi-Device Login Consistency', { tag: ['@regression', '@e2e'] }, () => {
  let loginPage;

  test('[AD-79 TS-010 TC-001] Verify consistent login behavior across multiple devices', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Login on mobile device (simulated with mobile viewport)
    await page.setViewportSize({ width: 375, height: 667 });
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Verify features accessible on mobile
    const isMobileDashboardVisible = await loginPage.isDashboardVisible();
    expect(isMobileDashboardVisible).toBeTruthy();

    // Step 3-4: Simulate tablet device
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    
    const isTabletDashboardVisible = await loginPage.isDashboardVisible();
    expect(isTabletDashboardVisible).toBeTruthy();

    // Step 5-6: Simulate desktop device
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    
    const isDesktopDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDesktopDashboardVisible).toBeTruthy();

    // Step 7-8: Verify consistency across devices
    await expect(loginPage.page.locator('.dashboard, #dashboard, [data-testid="dashboard"]')).toBeVisible();
  });
});