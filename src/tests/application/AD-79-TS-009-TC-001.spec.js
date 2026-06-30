const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-009: Explicit Logout Functionality', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-009 TC-001] Verify user can logout and cannot access dashboard after logout', async ({ page }) => {
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

    // Step 5-6: Navigate to user profile and click Logout
    await loginPage.clickLogout();
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Verify user is redirected to login page
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 7: Attempt to navigate back to dashboard using browser back button
    await page.goBack();
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Verify user remains on login page or is redirected back
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 8: Enter valid credentials to log in again
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    const isReauthenticated = await loginPage.isDashboardVisible();
    expect(isReauthenticated).toBeTruthy();
  });
});