const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-002: First-Time Login - Business Profile Display', { tag: ['@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-002 TC-001] Verify welcome message and business profile display on first-time login', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Launch the Dealer App
    await loginPage.goto(TD.urls.dealerApp);
    await expect(page).toHaveURL(new RegExp(TD.urls.dealerApp));

    // Step 2-4: Login with first-time credentials
    await loginPage.enterEmail(TD.credentials.firstTimeLogin.email);
    await loginPage.enterPassword(TD.credentials.firstTimeLogin.password);
    await loginPage.clickLoginButton();
    await page.waitForLoadState('domcontentloaded');

    // Step 5: Verify welcome message
    const isWelcomeVisible = await loginPage.isWelcomeMessageVisible();
    expect(isWelcomeVisible).toBeTruthy();
    await expect(loginPage.page.locator('.welcome-message, h1:has-text("Welcome"), [data-testid="welcome-message"]')).toBeVisible();

    // Step 6: Verify Business Name field
    const businessName = await loginPage.getBusinessName();
    expect(businessName).toContain(TD.businessProfile.businessName);

    // Step 7: Verify Registration number field
    const registrationNumber = await loginPage.getRegistrationNumber();
    expect(registrationNumber).toContain(TD.businessProfile.registrationNumber);

    // Step 8: Verify GST Registration number field
    const gstNumber = await loginPage.getGSTNumber();
    expect(gstNumber).toContain(TD.businessProfile.gstNumber);
  });
});