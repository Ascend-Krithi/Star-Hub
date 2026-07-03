const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-008: Session Management - Active Session', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-008 TC-001] Verify session remains active with regular activity', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Login with valid credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Perform normal activities
    const dashboardVisible = await dashboardPage.isDashboardVisible();
    expect(dashboardVisible).toBe(true);
    await dashboardPage.navigateToMenu('Orders');
    await page.waitForTimeout(2000);
    await dashboardPage.navigateToMenu('Reports');
    await page.waitForTimeout(2000);

    // Step 4: Continue using the application (simulated with shorter duration)
    await page.waitForTimeout(5000);

    // Step 5: Verify dealer remains logged in
    await page.goto(TD.urls.dashboard);
    const stillLoggedIn = await dashboardPage.isDashboardVisible();
    expect(stillLoggedIn).toBe(true);
  });
});