const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-009: Session Management - Logout', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-009 TC-002] Verify dealer must re-authenticate after logout', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Launch and login
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Click on Logout
    await dashboardPage.clickLogout();
    await page.waitForURL(TD.urlPatterns.login, { timeout: 5000 });

    // Step 4: Attempt to access dashboard directly
    await page.goto(TD.urls.dashboard);
    await page.waitForTimeout(2000);

    // Step 5: Verify redirected to login page
    await expect(page).toHaveURL(TD.urlPatterns.login);
  });
});