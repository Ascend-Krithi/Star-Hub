const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppDashboardPage = require('../../pages/DealerAppDashboardPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-009: Logout Functionality', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-009 TC-001] Test Case 1: Verify manual logout functionality', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1: Login with valid credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);

    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    const isDashboardDisplayed = await dashboardPage.isDashboardDisplayed();
    expect(isDashboardDisplayed).toBe(true);

    // Step 2-3: Navigate to logout and click
    await loginPage.logout();

    // Verify redirected to login screen
    await expect(page).toHaveURL(TD.urlPatterns.login);
    const isLoginScreenDisplayed = await loginPage.isLoginScreenDisplayed();
    expect(isLoginScreenDisplayed).toBe(true);

    // Step 4: Attempt to access protected feature
    await page.goto(TD.urls.dashboard);
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Should be redirected back to login or remain on login
    const currentUrl = page.url();
    const isOnLoginPage = currentUrl.includes('dealerapp.example.com') && !currentUrl.includes('dashboard');
    expect(isOnLoginPage).toBe(true);

    // Step 5: Re-login successfully
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    const reLoginSuccess = await dashboardPage.isDashboardDisplayed();
    expect(reLoginSuccess).toBe(true);
  });
});