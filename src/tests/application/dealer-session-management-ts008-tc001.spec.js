const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerDashboardPage = require('../../pages/dealer-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-008: Session Management - Active Session', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-008 TC-001] Verify session remains active during normal use', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    dashboardPage = new DealerDashboardPage(page);

    // Step 1-2: Login with valid dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Perform normal activities
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();

    await dashboardPage.performActivity('View Dashboard');
    await dashboardPage.performActivity('Check Orders');
    await dashboardPage.performActivity('Generate Report');

    // Step 4-5: Verify session remains active
    const isDashboardStillVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardStillVisible).toBeTruthy();
  });
});