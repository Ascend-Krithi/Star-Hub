const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-009: Manual Logout', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-009 TC-001] Verify manual logout functionality', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Login with valid credentials
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Navigate to logout option
    await expect(loginPage.page.locator('button:has-text("Logout"), a:has-text("Logout"), [data-testid="logout-button"]')).toBeVisible();

    // Step 3: Click on Logout button
    await loginPage.clickLogout();
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Verify redirected to login screen
    await expect(page).toHaveURL(new RegExp(TD.urls.dealerApp));
    await expect(loginPage.page.locator('input[type="email"]')).toBeVisible();

    // Step 5: Re-login with valid credentials
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForLoadState('domcontentloaded');
    
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
  });
});