const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login - Valid Credentials', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-001] Verify successful login with valid credentials and dashboard access', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 2: Launch the Dealer App
    await loginPage.goto(TD.urls.dealerApp);
    await expect(page).toHaveURL(new RegExp(TD.urls.dealerApp));
    await expect(loginPage.page.locator('input[type="email"]')).toBeVisible();
    await expect(loginPage.page.locator('input[type="password"]')).toBeVisible();

    // Step 3: Enter valid email address
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    await expect(loginPage.page.locator('input[type="email"]')).toHaveValue(TD.credentials.validDealer.email);

    // Step 4: Enter valid password
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    await expect(loginPage.page.locator('input[type="password"]')).toHaveAttribute('type', 'password');

    // Step 5: Click on the Login button
    await loginPage.clickLoginButton();
    await page.waitForLoadState('domcontentloaded');

    // Step 6: Verify dashboard access and service management
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
    await expect(loginPage.page.locator('.dashboard, #dashboard, [data-testid="dashboard"]')).toBeVisible();
  });
});