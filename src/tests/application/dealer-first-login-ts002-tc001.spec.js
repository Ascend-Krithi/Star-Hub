const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerFirstLoginPage = require('../../pages/dealer-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-002: First-Time Login - Business Profile Display', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-002 TC-001] Verify business profile is displayed on first-time login', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    firstLoginPage = new DealerFirstLoginPage(page);

    // Step 1-2: Launch and navigate to login page
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3-5: Login with first-time dealer credentials
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 6: Verify welcome message is displayed
    const isWelcomeVisible = await firstLoginPage.isWelcomeMessageVisible();
    expect(isWelcomeVisible).toBeTruthy();
    
    const welcomeText = await firstLoginPage.getWelcomeMessageText();
    expect(welcomeText).toContain(TD.messages.welcomeMessage);

    // Step 7: Verify Business Name is displayed
    const businessName = await firstLoginPage.getBusinessName();
    expect(businessName).toContain(TD.businessProfile.businessName);

    // Step 8: Verify Registration number is displayed
    const registrationNumber = await firstLoginPage.getRegistrationNumber();
    expect(registrationNumber).toContain(TD.businessProfile.registrationNumber);

    // Step 9: Verify GST Registration number is displayed
    const gstNumber = await firstLoginPage.getGstNumber();
    expect(gstNumber).toContain(TD.businessProfile.gstNumber);
  });
});