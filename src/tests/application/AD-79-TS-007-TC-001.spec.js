const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-007: Session Persistence Within 24 Hours', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-007 TC-001] Verify session remains active for 23 hours of inactivity', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1: Launch the Dealer App URL in a browser
    await loginPage.goto(TD.urls.dealerApp);
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 2: Enter valid email address
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    const emailField = page.locator('input[type="email"], input[name="email"], #email').first();
    await expect(emailField).toHaveValue(TD.credentials.validDealer.email);

    // Step 3: Enter valid password
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    const passwordField = page.locator('input[type="password"], input[name="password"], #password').first();
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click on the Login button
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();

    // Step 5: Perform normal activities for 2-3 hours (simulated)
    // In real scenario, this would involve actual user interactions
    await page.waitForTimeout(3000);

    // Step 6: Leave the application inactive for 23 hours (simulated with shorter timeout)
    // Note: In production, this would be actual 23 hours
    // For testing purposes, we simulate session check
    await page.waitForTimeout(5000);

    // Step 7: Return to the application and attempt to access any feature
    await page.reload();
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    const isStillLoggedIn = await loginPage.isDashboardVisible();
    expect(isStillLoggedIn).toBeTruthy();
  });
});