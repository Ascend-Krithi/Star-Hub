const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerFirstLoginPage = require('../../pages/dealer-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-003: First-Time Login - Contact Details Masking', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-003 TC-001] Verify contact details are properly masked', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    firstLoginPage = new DealerFirstLoginPage(page);

    // Step 1-3: Login with first-time dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Navigate to Contact Details section
    await firstLoginPage.scrollToSection('contact');

    // Step 5: Verify Contact Person name is displayed
    const contactPerson = await firstLoginPage.getContactPersonName();
    expect(contactPerson).toContain(TD.contactDetails.contactPerson);

    // Step 6: Verify Mobile number is masked showing only last four digits
    const mobileNumber = await firstLoginPage.getMobileNumber();
    expect(mobileNumber).toContain(TD.contactDetails.mobileDisplayed);

    // Step 7: Verify Email is masked properly
    const emailAddress = await firstLoginPage.getEmailAddress();
    expect(emailAddress).toMatch(/[a-z]\*+[a-z]@[a-z]\*+[a-z]\.com/i);
  });
});