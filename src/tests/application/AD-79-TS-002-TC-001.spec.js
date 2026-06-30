const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-002: First-Time Login Business Profile Verification', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-002 TC-001] Verify business profile information is displayed on first-time login', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1: Launch the Dealer App URL in a browser
    await loginPage.goto(TD.urls.dealerApp);
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 2: Enter valid email address for first-time login
    await loginPage.enterEmail(TD.credentials.firstTimeDealer.email);
    const emailField = page.locator('input[type="email"], input[name="email"], #email').first();
    await expect(emailField).toHaveValue(TD.credentials.firstTimeDealer.email);

    // Step 3: Enter valid password
    await loginPage.enterPassword(TD.credentials.firstTimeDealer.password);
    const passwordField = page.locator('input[type="password"], input[name="password"], #password').first();
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click on the Login button
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 5: Verify welcome message is displayed
    const isWelcomeVisible = await loginPage.isWelcomeMessageVisible();
    expect(isWelcomeVisible).toBeTruthy();

    // Step 6: Verify Business Profile section displays Name field
    const businessName = await loginPage.getBusinessName();
    expect(businessName).toContain(TD.businessProfile.name);

    // Step 7: Verify Business Profile section displays Registration number field
    const registrationNumber = await loginPage.getRegistrationNumber();
    expect(registrationNumber).toContain(TD.businessProfile.registrationNumber);

    // Step 8: Verify Business Profile section displays GST Registration number field
    const gstNumber = await loginPage.getGSTNumber();
    expect(gstNumber).toContain(TD.businessProfile.gstNumber);
  });
});