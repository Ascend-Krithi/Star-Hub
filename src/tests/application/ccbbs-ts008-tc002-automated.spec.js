const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-008: Verify Mandatory Field Validation - Multiple Fields', {
  tag: ['@regression', '@ccbbs', '@validation']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-008 TC-002] Verify validation for Company Name, Title Message, and Ask your Questions', async ({ page }) => {
    helpdeskPage = new CCBBSHelpdeskPage(page);
    
    // Step 1: Launch application
    await test.step('Launch application URL', async () => {
      await helpdeskPage.goto(TD.urls.base);
    });
    
    // Step 2: Access User View
    await test.step('Access User View Submission Form', async () => {
      await page.waitForLoadState('domcontentloaded');
    });
    
    // Step 3: Enter Full Name and Phone Number
    await test.step('Enter Full Name and Phone Number', async () => {
      await helpdeskPage.fillFullName(TD.userFormData.janeSmith.fullName);
      await helpdeskPage.fillPhoneNumber(TD.userFormData.janeSmith.phoneNumber);
    });
    
    // Step 4: Enter Email Address
    await test.step('Enter Email Address', async () => {
      await helpdeskPage.fillEmailAddress(TD.userFormData.janeSmith.emailAddress);
    });
    
    // Step 5: Leave Company Name empty
    await test.step('Leave Company Name field empty', async () => {
      const companyField = page.locator('[name="companyName"], [id="companyName"]').first();
      await expect(companyField).toBeEmpty();
    });
    
    // Step 6: Enter Title Message and Question
    await test.step('Enter Title Message and Ask your Questions', async () => {
      await helpdeskPage.fillTitleMessage(TD.userFormData.janeSmith.titleMessage);
      await helpdeskPage.fillAskQuestions(TD.userFormData.janeSmith.askQuestions);
    });
    
    // Step 7: Submit and verify Company Name validation
    await test.step('Click Submit and verify Company Name validation error', async () => {
      await helpdeskPage.clickSubmit();
      
      const errorMessage = page.locator('[id*="company"][class*="error"], .error-message:has-text("Company")').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(TD.validationMessages.companyRequired);
    });
    
    // Step 8: Enter Company Name and clear Title Message
    await test.step('Enter Company Name and leave Title Message empty', async () => {
      await helpdeskPage.fillCompanyName(TD.userFormData.janeSmith.companyName);
      
      const titleField = page.locator('[name="titleMessage"], [id="titleMessage"]').first();
      await titleField.clear();
      await expect(titleField).toBeEmpty();
    });
    
    // Step 9: Submit and verify Title Message validation
    await test.step('Click Submit and verify Title Message validation error', async () => {
      await helpdeskPage.clickSubmit();
      
      const errorMessage = page.locator('[id*="title"][class*="error"], .error-message:has-text("Title")').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(TD.validationMessages.titleRequired);
    });
    
    // Step 10: Enter Title Message and clear Ask your Questions
    await test.step('Enter Title Message and leave Ask your Questions empty', async () => {
      await helpdeskPage.fillTitleMessage('General Inquiry');
      
      const questionField = page.locator('[name="askQuestions"], [id="askQuestions"]').first();
      await questionField.clear();
      await expect(questionField).toBeEmpty();
    });
    
    // Step 11: Submit and verify Ask your Questions validation
    await test.step('Click Submit and verify Ask your Questions validation error', async () => {
      await helpdeskPage.clickSubmit();
      
      const errorMessage = page.locator('[id*="question"][class*="error"], .error-message:has-text("Question")').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(TD.validationMessages.questionRequired);
    });
    
    // Step 12: Verify all validation messages are clear
    await test.step('Verify all mandatory field validation messages are clear and specific', async () => {
      const allErrors = page.locator('.error-message, [class*="error"]');
      const errorCount = await allErrors.count();
      expect(errorCount).toBeGreaterThan(0);
    });
  });
});