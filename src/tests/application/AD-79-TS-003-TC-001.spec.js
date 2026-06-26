const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-003: First-Time Login - Masked Contact Details', { tag: ['@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-003 TC-001] Verify masked display of contact person, mobile, and email', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Launch and login with first-time credentials
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.login(TD.credentials.firstTimeLogin.email, TD.credentials.firstTimeLogin.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Navigate to Contact Details section
    await page.waitForSelector('[data-testid="contact-person"], .contact-person, #contactPerson', { timeout: 10000 });

    // Step 3: Verify Contact Person name
    const contactPerson = await loginPage.getContactPerson();
    expect(contactPerson).toContain(TD.contactDetails.contactPerson);

    // Step 4: Verify masked mobile number
    const maskedMobile = await loginPage.getMaskedMobile();
    expect(maskedMobile).toContain(TD.contactDetails.maskedMobile);
    expect(maskedMobile).toContain('1234');

    // Step 5: Verify masked email
    const maskedEmail = await loginPage.getMaskedEmail();
    expect(maskedEmail).toMatch(/j.*@e.*\.com/);
  });
});