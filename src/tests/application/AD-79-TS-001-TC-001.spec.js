const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login - Valid Credentials', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-001 TC-001] Verify successful login with valid credentials', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3: Enter valid email address
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    await expect(await loginPage.isEmailDisplayed()).toBe(true);

    // Step 4: Enter valid password
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    await expect(await loginPage.isPasswordMasked()).toBe(true);

    // Step 5: Click on Login button
    await loginPage.clickLoginButton();

    // Step 6: Verify successful login
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    await expect(await dashboardPage.isDashboardVisible()).toBe(true);
    await expect(await dashboardPage.isDealerInfoVisible()).toBe(true);
  });
});