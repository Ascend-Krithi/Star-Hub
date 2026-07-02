const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-008: Verify Mandatory Field Validation - Email', {
  tag: ['@regression', '@ccbbs', '@validation']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-008 TC-001] Verify form submission blocked when Email Address is empty', async ({ page }) => {
    helpdeskPage = new CCBBSHelpdeskPage(page);
    
    // Step 1: Launch application
    await test.step('Launch application URL', async () => {
      await helpdeskPage.goto(TD.urls.base);
    });
    
    // Step 2: Access User View
    await test.step('Access User View Submission Form', async () => {
      await page.waitForLoadState('domcontentloaded');
    });
    
    // Step 3: Enter Full Name
    await test.step('Enter Full Name', async () => {
      await helpdeskPage.fillFullName(TD.userFormData.valid.fullName);
    });
    
    // Step 4: Enter Phone Number
    await test.step('Enter Phone Number', async () => {
      await helpdeskPage.fillPhoneNumber(TD.userFormData.valid.phoneNumber);
    });
    
    // Step 5: Leave Email Address empty
    await test.step('Leave Email Address field empty', async () => {
      const emailField = page.locator('[name="emailAddress"], [id="emailAddress"]').first();
      await expect(emailField).toBeEmpty();
    });
    
    // Step 6: Enter Company Name
    await test.step('Enter Company Name', async () => {
      await helpdeskPage.fillCompanyName(TD.userFormData.valid.companyName);
    });
    
    // Step 7: Enter Title Message
    await test.step('Enter Title Message', async () => {
      await helpdeskPage.fillTitleMessage(TD.userFormData.valid.titleMessage);
    });
    
    // Step 8: Enter Ask your Questions
    await test.step('Enter Ask your Questions', async () => {
      await helpdeskPage.fillAskQuestions(TD.userFormData.valid.askQuestions);
    });
    
    // Step 9: Click Submit button
    await test.step('Click Submit button', async () => {
      await helpdeskPage.clickSubmit();
    });
    
    // Step 10: Verify error message
    await test.step('Verify error message for Email Address field', async () => {
      const errorMessage = page.locator('[id*="email"][class*="error"], .error-message:has-text("Email")').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(TD.validationMessages.emailRequired);
    });
  });
});