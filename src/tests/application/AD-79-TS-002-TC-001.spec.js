const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppFirstLoginPage = require('../../pages/dealer-app-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-002: First Login - Business Profile Display', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-002 TC-001] Verify business profile is displayed on first login', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3-5: Login with first-time dealer credentials
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForURL(TD.urlPatterns.firstLogin, { timeout: 10000 });

    // Step 6: Verify welcome message
    await expect(await firstLoginPage.isWelcomeMessageVisible()).toBe(true);
    const welcomeText = await firstLoginPage.getWelcomeMessageText();
    expect(welcomeText).toContain(TD.messages.welcome);

    // Step 7: Verify Business Name
    await expect(await firstLoginPage.isBusinessProfileSectionVisible()).toBe(true);
    const businessName = await firstLoginPage.getBusinessName();
    expect(businessName).toContain(TD.businessProfile.businessName);

    // Step 8: Verify Registration Number
    const regNumber = await firstLoginPage.getRegistrationNumber();
    expect(regNumber).toContain(TD.businessProfile.registrationNumber);

    // Step 9: Verify GST Number
    const gstNumber = await firstLoginPage.getGSTNumber();
    expect(gstNumber).toContain(TD.businessProfile.gstNumber);
  });
});