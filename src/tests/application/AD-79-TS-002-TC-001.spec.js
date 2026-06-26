const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppFirstLoginPage = require('../../pages/DealerAppFirstLoginPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-002: First-Time Login Information Display', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-002 TC-001] Test Case 1: Verify first-time login displays business profile information', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 1: Launch and login with first-time user credentials
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 2: Enter first-time user email
    await loginPage.fillEmail(TD.credentials.firstTimeUser.email);

    // Step 3: Enter password
    await loginPage.fillPassword(TD.credentials.firstTimeUser.password);

    // Step 4: Click login
    await loginPage.clickLogin();

    // Step 5: Verify welcome message
    const isWelcomeVisible = await firstLoginPage.isWelcomeMessageDisplayed();
    expect(isWelcomeVisible).toBe(true);

    const welcomeMessage = await firstLoginPage.getWelcomeMessage();
    expect(welcomeMessage).toContain(TD.messages.welcomeMessage);

    // Step 6: Verify Business Name field
    const isBusinessProfileVisible = await firstLoginPage.isBusinessProfileSectionVisible();
    expect(isBusinessProfileVisible).toBe(true);

    const businessName = await firstLoginPage.getBusinessName();
    expect(businessName).toBe(TD.businessProfile.businessName);

    // Step 7: Verify Registration number
    const registrationNumber = await firstLoginPage.getRegistrationNumber();
    expect(registrationNumber).toBe(TD.businessProfile.registrationNumber);

    // Step 8: Verify GST Registration number
    const gstNumber = await firstLoginPage.getGSTNumber();
    expect(gstNumber).toBe(TD.businessProfile.gstNumber);
  });
});