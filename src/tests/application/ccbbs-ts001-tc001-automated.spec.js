const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-001: Verify User View Form Fields Display', {
  tag: ['@smoke', '@regression', '@ccbbs']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-001 TC-001] Verify all form fields are displayed correctly', async ({ page }) => {
    helpdeskPage = new CCBBSHelpdeskPage(page);
    
    // Step 1: Launch the application
    await test.step('Launch application URL', async () => {
      await helpdeskPage.goto(TD.urls.base);
      await expect(page).toHaveURL(TD.urls.base);
    });
    
    // Step 2: Access User View Submission Form
    await test.step('Access User View submission form', async () => {
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(new RegExp(TD.urls.base));
    });
    
    // Step 3: Verify Full Name field
    await test.step('Verify Full Name field is displayed', async () => {
      const fullNameField = page.locator('[name="fullName"], [id="fullName"], input[placeholder*="Full Name"]').first();
      await expect(fullNameField).toBeVisible();
      await expect(fullNameField).toHaveAttribute('type', /text|input/);
    });
    
    // Step 4: Verify Phone Number field
    await test.step('Verify Phone Number field is displayed', async () => {
      const phoneField = page.locator('[name="phoneNumber"], [id="phoneNumber"], input[placeholder*="Phone"]').first();
      await expect(phoneField).toBeVisible();
    });
    
    // Step 5: Verify Email Address field with mandatory indicator
    await test.step('Verify Email Address field with mandatory indicator', async () => {
      const emailField = page.locator('[name="emailAddress"], [id="emailAddress"], input[placeholder*="Email"]').first();
      await expect(emailField).toBeVisible();
      const emailLabel = page.locator('label:has-text("Email"), [for*="email"]').first();
      await expect(emailLabel).toContainText('*');
    });
    
    // Step 6: Verify Company Name field with mandatory indicator
    await test.step('Verify Company Name field with mandatory indicator', async () => {
      const companyField = page.locator('[name="companyName"], [id="companyName"], input[placeholder*="Company"]').first();
      await expect(companyField).toBeVisible();
      const companyLabel = page.locator('label:has-text("Company"), [for*="company"]').first();
      await expect(companyLabel).toContainText('*');
    });
    
    // Step 7: Verify Title Message field with mandatory indicator
    await test.step('Verify Title Message field with mandatory indicator', async () => {
      const titleField = page.locator('[name="titleMessage"], [id="titleMessage"], input[placeholder*="Title"]').first();
      await expect(titleField).toBeVisible();
      const titleLabel = page.locator('label:has-text("Title"), [for*="title"]').first();
      await expect(titleLabel).toContainText('*');
    });
    
    // Step 8: Verify Ask your Questions field with mandatory indicator
    await test.step('Verify Ask your Questions field with mandatory indicator', async () => {
      const questionField = page.locator('[name="askQuestions"], [id="askQuestions"], textarea[placeholder*="Question"]').first();
      await expect(questionField).toBeVisible();
      const questionLabel = page.locator('label:has-text("Question"), [for*="question"]').first();
      await expect(questionLabel).toContainText('*');
    });
    
    // Step 9: Verify Attachment field
    await test.step('Verify Attachment field is displayed as optional', async () => {
      const attachmentField = page.locator('[name="attachment"], [id="attachment"], input[type="file"]').first();
      await expect(attachmentField).toBeVisible();
      const attachmentLabel = page.locator('label:has-text("Attachment"), [for*="attachment"]').first();
      await expect(attachmentLabel).toContainText(/optional|as needed/i);
    });
  });
});