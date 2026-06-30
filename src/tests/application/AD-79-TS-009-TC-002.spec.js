const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-009: Security Event Session Invalidation', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-009 TC-002] Verify session is invalidated on security event', async ({ page }) => {
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

    // Step 5: Simulate security event (password change from another device)
    // In real scenario, this would be triggered by backend
    // For testing, we simulate by clearing session
    await page.context().clearCookies();
    await page.waitForTimeout(2000);

    // Step 6: Attempt to perform any action in the application
    await page.reload();
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    // Verify user is redirected to login page with security message
    await expect(page).toHaveURL(TD.urlPatterns.login);
    
    const isSecurityMessageVisible = await loginPage.isSecurityMessageVisible();
    expect(isSecurityMessageVisible).toBeTruthy();

    // Step 7: Enter valid credentials to log in again
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    const isReauthenticated = await loginPage.isDashboardVisible();
    expect(isReauthenticated).toBeTruthy();
  });
});