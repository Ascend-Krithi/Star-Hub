const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppFirstLoginPage = require('../../pages/DealerAppFirstLoginPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-003: Contact Details Masking on First Login', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-003 TC-001] Test Case 1: Verify contact details are masked correctly on first login', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 1: Complete first-time login authentication
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeUser.email, TD.credentials.firstTimeUser.password);

    // Step 2: Navigate to Contact Details section
    await firstLoginPage.navigateToContactDetails();
    const isContactDetailsVisible = await firstLoginPage.isContactDetailsSectionVisible();
    expect(isContactDetailsVisible).toBe(true);

    // Step 3: Verify Contact Person name
    const contactPerson = await firstLoginPage.getContactPersonName();
    expect(contactPerson).toBe(TD.contactDetails.contactPerson);

    // Step 4: Verify Mobile number is masked
    const mobileNumber = await firstLoginPage.getMobileNumber();
    expect(mobileNumber).toContain(TD.contactDetails.maskedMobile);
    expect(mobileNumber).toContain('1234');
    expect(mobileNumber).toContain('*');

    // Step 5: Verify Email is masked
    const email = await firstLoginPage.getEmail();
    expect(email).toContain('@');
    expect(email).toContain('.com');
    expect(email).toContain('*');
    expect(email).toMatch(/^[a-z]\*+[a-z]@[a-z]\*+[a-z]\.com$/i);
  });
});