const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-003: Contact Details Masking Verification', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-003 TC-001] Verify contact details are displayed with proper masking', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1: Launch the Dealer App URL in a browser
    await loginPage.goto(TD.urls.dealerApp);
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 2: Enter valid email address for first-time login
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    const emailField = page.locator('input[type="email"], input[name="email"], #email').first();
    await expect(emailField).toHaveValue(TD.credentials.validDealer.email);

    // Step 3: Enter valid password
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    const passwordField = page.locator('input[type="password"], input[name="password"], #password').first();
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click on the Login button
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 5: Verify Contact Details section displays Contact person name
    const contactName = await loginPage.getContactPersonName();
    expect(contactName).toContain(TD.contactDetails.personName);

    // Step 6: Verify Mobile number is masked showing only last four digits
    const maskedMobile = await loginPage.getMaskedMobile();
    expect(maskedMobile).toContain(TD.contactDetails.maskedMobile);

    // Step 7: Verify Email is masked showing first and last character of local part and domain
    const maskedEmail = await loginPage.getMaskedEmail();
    expect(maskedEmail).toMatch(/d\*+r@e\*+e\.com/);

    // Step 8: Verify tips for correcting information are displayed
    const isTipsVisible = await loginPage.isTipsSectionVisible();
    expect(isTipsVisible).toBeTruthy();
  });
});