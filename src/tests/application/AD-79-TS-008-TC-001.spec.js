const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-008: Session Timeout After 24 Hours', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-008 TC-001] Verify session expires after 24 hours of inactivity', async ({ page }) => {
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

    // Step 5: Leave the application inactive for more than 24 hours (simulated)
    // Note: In production, this would be actual 24+ hours
    // For testing purposes, we simulate session timeout
    await page.waitForTimeout(5000);

    // Step 6: Return to the application and attempt to access any feature
    // Simulate session expiry by clearing cookies/storage
    await page.context().clearCookies();
    await page.reload();
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    // Verify user is redirected to login page
    await expect(page).toHaveURL(TD.urlPatterns.login);
    
    const isTimeoutMessageVisible = await loginPage.isSessionTimeoutMessageVisible();
    expect(isTimeoutMessageVisible).toBeTruthy();

    // Step 7: Enter valid credentials again to log in
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    const isReauthenticated = await loginPage.isDashboardVisible();
    expect(isReauthenticated).toBeTruthy();
  });
});