const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskUserPage = require('../../pages/ccbbs-helpdesk-user.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-001: User View Form Field Display Verification', { tag: ['@smoke', '@regression', '@ccbbs-helpdesk'] }, () => {
  let userPage;

  test('[AD-88 TS-001 TC-001] Verify all User View form fields are displayed with correct mandatory indicators', async ({ page }) => {
    userPage = new CCBBSHelpdeskUserPage(page);

    // Step 1: Launch the web application
    await test.step('Launch the web application in a browser', async () => {
      await userPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.userView);
    });

    // Step 2: Access the User View submission form
    await test.step('Access the User View submission form', async () => {
      await expect(page).toHaveTitle(TD.pageTitles.userView);
    });

    // Step 3: Verify Full Name field is displayed
    await test.step('Verify that Full Name field is displayed', async () => {
      const isVisible = await userPage.isFullNameFieldVisible();
      expect(isVisible).toBeTruthy();
    });

    // Step 4: Verify Phone Number field is displayed
    await test.step('Verify that Phone Number field is displayed', async () => {
      const isVisible = await userPage.isPhoneNumberFieldVisible();
      expect(isVisible).toBeTruthy();
    });

    // Step 5: Verify Email Address field with mandatory indicator
    await test.step('Verify that Email Address field is displayed with mandatory indicator (*)', async () => {
      const isFieldVisible = await userPage.isEmailAddressFieldVisible();
      const isMandatoryVisible = await userPage.isEmailMandatoryIndicatorVisible();
      expect(isFieldVisible).toBeTruthy();
      expect(isMandatoryVisible).toBeTruthy();
    });

    // Step 6: Verify Company Name field with mandatory indicator
    await test.step('Verify that Company Name field is displayed with mandatory indicator (*)', async () => {
      const isFieldVisible = await userPage.isCompanyNameFieldVisible();
      const isMandatoryVisible = await userPage.isCompanyMandatoryIndicatorVisible();
      expect(isFieldVisible).toBeTruthy();
      expect(isMandatoryVisible).toBeTruthy();
    });

    // Step 7: Verify Title Message field with mandatory indicator
    await test.step('Verify that Title Message field is displayed with mandatory indicator (*) and accepts free text', async () => {
      const isFieldVisible = await userPage.isTitleMessageFieldVisible();
      const isMandatoryVisible = await userPage.isTitleMandatoryIndicatorVisible();
      expect(isFieldVisible).toBeTruthy();
      expect(isMandatoryVisible).toBeTruthy();
    });

    // Step 8: Verify Ask your Questions field with mandatory indicator
    await test.step('Verify that Ask your Questions field is displayed with mandatory indicator (*) and accepts free text', async () => {
      const isFieldVisible = await userPage.isQuestionsFieldVisible();
      const isMandatoryVisible = await userPage.isQuestionsMandatoryIndicatorVisible();
      expect(isFieldVisible).toBeTruthy();
      expect(isMandatoryVisible).toBeTruthy();
    });

    // Step 9: Verify Attachment field with As needed indicator
    await test.step('Verify that Attachment field is displayed with As needed indicator', async () => {
      const isFieldVisible = await userPage.isAttachmentFieldVisible();
      const isOptionalVisible = await userPage.isAttachmentOptionalIndicatorVisible();
      expect(isFieldVisible).toBeTruthy();
      expect(isOptionalVisible).toBeTruthy();
    });
  });
});