const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { DashboardPage } = require('../../../pages/dealer-app/dashboard-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-010 - Multi-Device Login Tests', () => {
  test('TC-001: Multi-device simultaneous login with consistent behavior', async ({ browser }) => {
    // Create contexts for different devices
    const mobileContext = await browser.newContext({
      ...test.devices['iPhone 12'],
    });
    const tabletContext = await browser.newContext({
      ...test.devices['iPad Pro'],
    });
    const desktopContext = await browser.newContext();

    // Step 1-2: Login on mobile
    const mobilePage = await mobileContext.newPage();
    const mobileLogin = new LoginPage(mobilePage);
    const mobileDashboard = new DashboardPage(mobilePage);
    await mobileLogin.navigate();
    await mobileLogin.login(testData.validCredentials.email, testData.validCredentials.password);
    await expect(mobilePage).toHaveURL(/dashboard/);
    await expect(mobileDashboard.servicesSection).toBeVisible();

    // Step 3-4: Login on tablet
    const tabletPage = await tabletContext.newPage();
    const tabletLogin = new LoginPage(tabletPage);
    const tabletDashboard = new DashboardPage(tabletPage);
    await tabletLogin.navigate();
    await tabletLogin.login(testData.validCredentials.email, testData.validCredentials.password);
    await expect(tabletPage).toHaveURL(/dashboard/);
    await expect(tabletDashboard.servicesSection).toBeVisible();

    // Step 5-6: Login on desktop
    const desktopPage = await desktopContext.newPage();
    const desktopLogin = new LoginPage(desktopPage);
    const desktopDashboard = new DashboardPage(desktopPage);
    await desktopLogin.navigate();
    await desktopLogin.login(testData.validCredentials.email, testData.validCredentials.password);
    await expect(desktopPage).toHaveURL(/dashboard/);
    await expect(desktopDashboard.servicesSection).toBeVisible();

    // Step 7: Perform action on mobile and verify sync
    await mobileDashboard.updateProfile('Updated Name');
    await tabletPage.reload();
    await desktopPage.reload();
    await expect(tabletDashboard.profileName).toContainText('Updated Name');
    await expect(desktopDashboard.profileName).toContainText('Updated Name');

    // Step 8: Verify consistency
    const mobileFeatures = await mobileDashboard.getVisibleFeatures();
    const tabletFeatures = await tabletDashboard.getVisibleFeatures();
    const desktopFeatures = await desktopDashboard.getVisibleFeatures();
    expect(mobileFeatures).toEqual(tabletFeatures);
    expect(tabletFeatures).toEqual(desktopFeatures);

    // Cleanup
    await mobileContext.close();
    await tabletContext.close();
    await desktopContext.close();
  });
});