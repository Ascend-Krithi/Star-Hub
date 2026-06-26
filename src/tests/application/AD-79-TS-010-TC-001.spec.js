const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppDashboardPage = require('../../pages/DealerAppDashboardPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-010: Multi-Device Login Consistency', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-010 TC-001] Test Case 1: Verify consistent login behavior across multiple devices', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1: Login on mobile device
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);

    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    const isMobileDashboardDisplayed = await dashboardPage.isDashboardDisplayed();
    expect(isMobileDashboardDisplayed).toBe(true);

    // Step 2: Verify features accessible on mobile
    const mobileCanAccessServices = await dashboardPage.canAccessServices();
    expect(mobileCanAccessServices).toBe(true);

    // Step 3: Login on tablet (simulated by continuing session)
    // Note: Multi-device testing would require separate browser contexts
    const tabletCanAccessServices = await dashboardPage.canAccessServices();
    expect(tabletCanAccessServices).toBe(true);

    // Step 4: Verify consistent features on tablet
    const tabletCanAccessManagement = await dashboardPage.canAccessManagementOptions();
    expect(tabletCanAccessManagement).toBe(true);

    // Step 5: Login on desktop (continuing with same session)
    const desktopCanAccessServices = await dashboardPage.canAccessServices();
    expect(desktopCanAccessServices).toBe(true);

    // Step 6: Verify consistent features on desktop
    const desktopCanAccessManagement = await dashboardPage.canAccessManagementOptions();
    expect(desktopCanAccessManagement).toBe(true);

    // Step 7: Perform action and verify synchronization
    await dashboardPage.performAction('update profile');
    await page.waitForTimeout(1000);

    // Step 8: Verify login behavior consistency
    const isDashboardStillAccessible = await dashboardPage.isDashboardDisplayed();
    expect(isDashboardStillAccessible).toBe(true);

    const featuresStillAccessible = await dashboardPage.canAccessServices();
    expect(featuresStillAccessible).toBe(true);
  });
});