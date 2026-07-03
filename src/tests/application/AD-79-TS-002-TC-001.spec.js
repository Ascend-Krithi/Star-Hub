const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppBusinessProfilePage = require('../../pages/dealer-app-business-profile.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-002: First Login Business Profile', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let businessProfilePage;

  test('[AD-79 TS-002 TC-001] Verify business profile display on first login', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    businessProfilePage = new DealerAppBusinessProfilePage(page);

    // Step 1-2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3: Enter valid email for first-time login
    await loginPage.enterEmail(TD.credentials.firstTimeDealer.email);

    // Step 4: Enter valid password
    await loginPage.enterPassword(TD.credentials.firstTimeDealer.password);

    // Step 5: Click on the Login button
    await loginPage.clickLogin();
    await page.waitForURL(TD.urlPatterns.businessProfile, { timeout: 10000 });

    // Step 6: Verify welcome message
    const welcomeVisible = await loginPage.isWelcomeMessageVisible();
    expect(welcomeVisible).toBe(true);

    // Step 7: Verify Business Name
    const businessName = await businessProfilePage.getBusinessName();
    expect(businessName).toContain(TD.businessProfile.businessName);

    // Step 8: Verify Registration number
    const regNumber = await businessProfilePage.getRegistrationNumber();
    expect(regNumber).toContain(TD.businessProfile.registrationNumber);

    // Step 9: Verify GST Registration number
    const gstNumber = await businessProfilePage.getGSTNumber();
    expect(gstNumber).toContain(TD.businessProfile.gstNumber);
  });
});