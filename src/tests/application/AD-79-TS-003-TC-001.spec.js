const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppFirstLoginPage = require('../../pages/dealer-app-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-003: First Login - Contact Details Masking', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-003 TC-001] Verify contact details are properly masked', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 2: Launch the Dealer App URL
    await loginPage.goto();

    // Step 3: Login with first-time dealer credentials
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForURL(TD.urlPatterns.firstLogin, { timeout: 10000 });

    // Step 4: Navigate to Contact Details section
    await expect(await firstLoginPage.isContactDetailsSectionVisible()).toBe(true);

    // Step 5: Verify Contact Person name
    const contactPerson = await firstLoginPage.getContactPerson();
    expect(contactPerson).toContain(TD.contactDetails.contactPerson);

    // Step 6: Verify Mobile number masking
    const mobileNumber = await firstLoginPage.getMobileNumber();
    expect(mobileNumber).toContain(TD.contactDetails.mobileDisplayed);

    // Step 7: Verify Email masking
    const email = await firstLoginPage.getEmail();
    expect(email).toMatch(/j\*+n@e\*+e\.com/);
  });
});