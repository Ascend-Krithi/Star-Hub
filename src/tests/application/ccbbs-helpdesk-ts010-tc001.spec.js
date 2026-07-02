const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskUserPage = require('../../pages/ccbbs-helpdesk-user.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-010: Mandatory Field Validation on User Submission', { tag: ['@regression', '@ccbbs-helpdesk'] }, () => {
  let userPage;

  test('[AD-88 TS-010 TC-001] Verify form submission is blocked when mandatory fields are empty', async ({ page }) => {
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

    // Step 3: Enter Full Name
    await test.step('Enter Full Name', async () => {
      await userPage.fillFullName(TD.userData.fullName);
    });

    // Step 4: Enter Phone Number
    await test.step('Enter Phone Number', async () => {
      await userPage.fillPhoneNumber(TD.userData.phoneNumber);
    });

    // Step 5-8: Leave mandatory fields empty
    await test.step('Leave Email Address field empty', async () => {
      await userPage.fillEmailAddress('');
    });

    await test.step('Leave Company Name field empty', async () => {
      await userPage.fillCompanyName('');
    });

    await test.step('Leave Title Message field empty', async () => {
      await userPage.fillTitleMessage('');
    });

    await test.step('Leave Ask your Questions field empty', async () => {
      await userPage.fillQuestions('');
    });

    // Step 9: Click Submit button
    await test.step('Click Submit button', async () => {
      await userPage.clickSubmit();
      await page.waitForTimeout(1000);
    });

    // Step 10-13: Verify validation error messages
    await test.step('Verify that validation error messages are displayed for Email Address field', async () => {
      const isErrorVisible = await userPage.isEmailErrorMessageVisible();
      expect(isErrorVisible).toBeTruthy();
      const errorMessage = await userPage.getEmailErrorMessage();
      expect(errorMessage).toContain(TD.validationErrors.emailRequired);
    });

    await test.step('Verify that validation error messages are displayed for Company Name field', async () => {
      const isErrorVisible = await userPage.isCompanyErrorMessageVisible();
      expect(isErrorVisible).toBeTruthy();
      const errorMessage = await userPage.getCompanyErrorMessage();
      expect(errorMessage).toContain(TD.validationErrors.companyRequired);
    });

    await test.step('Verify that validation error messages are displayed for Title Message field', async () => {
      const isErrorVisible = await userPage.isTitleErrorMessageVisible();
      expect(isErrorVisible).toBeTruthy();
      const errorMessage = await userPage.getTitleErrorMessage();
      expect(errorMessage).toContain(TD.validationErrors.titleRequired);
    });

    await test.step('Verify that validation error messages are displayed for Ask your Questions field', async () => {
      const isErrorVisible = await userPage.isQuestionsErrorMessageVisible();
      expect(isErrorVisible).toBeTruthy();
      const errorMessage = await userPage.getQuestionsErrorMessage();
      expect(errorMessage).toContain(TD.validationErrors.questionsRequired);
    });

    // Step 14: Verify form submission is blocked
    await test.step('Verify that form submission is blocked and user remains on the submission page', async () => {
      await expect(page).toHaveURL(TD.urlPatterns.userView);
    });
  });
});