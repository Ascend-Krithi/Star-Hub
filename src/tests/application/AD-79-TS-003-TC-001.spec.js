const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppBusinessProfilePage = require('../../pages/dealer-app-business-profile.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-003: Contact Details Masking', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let businessProfilePage;

  test('[AD-79 TS-003 TC-001] Verify contact details are properly masked', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    businessProfilePage = new DealerAppBusinessProfilePage(page);

    // Step 1-2: Launch the Dealer App URL
    await loginPage.goto();

    // Step 3: Login with first-time dealer credentials
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForURL(TD.urlPatterns.businessProfile, { timeout: 10000 });

    // Step 4: Navigate to Contact Details section (already on screen)
    // Step 5: Verify Contact Person name
    const contactPerson = await businessProfilePage.getContactPerson();
    expect(contactPerson).toContain(TD.businessProfile.contactPerson);

    // Step 6: Verify Mobile number is masked
    const maskedMobile = await businessProfilePage.getMaskedMobileNumber();
    expect(maskedMobile).toContain(TD.businessProfile.mobileDisplayed);

    // Step 7: Verify Email is masked
    const maskedEmail = await businessProfilePage.getMaskedEmail();
    expect(maskedEmail).toContain(TD.businessProfile.emailDisplayed);
  });
});