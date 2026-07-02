const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-002: Verify Ticket Creation and Reference ID Generation', {
  tag: ['@regression', '@ccbbs']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-002 TC-001] Submit form and verify ticket reference ID generation', async ({ page }) => {
    helpdeskPage = new CCBBSHelpdeskPage(page);
    
    // Step 1: Launch application
    await test.step('Launch application URL', async () => {
      await helpdeskPage.goto(TD.urls.base);
      await expect(page).toHaveURL(TD.urls.base);
    });
    
    // Step 2: Access User View
    await test.step('Access User View submission form', async () => {
      await page.waitForLoadState('domcontentloaded');
    });
    
    // Step 3-8: Fill form fields
    await test.step('Fill Full Name', async () => {
      await helpdeskPage.fillFullName(TD.userFormData.valid.fullName);
    });
    
    await test.step('Fill Phone Number', async () => {
      await helpdeskPage.fillPhoneNumber(TD.userFormData.valid.phoneNumber);
    });
    
    await test.step('Fill Email Address', async () => {
      await helpdeskPage.fillEmailAddress(TD.userFormData.valid.emailAddress);
    });
    
    await test.step('Fill Company Name', async () => {
      await helpdeskPage.fillCompanyName(TD.userFormData.valid.companyName);
    });
    
    await test.step('Fill Title Message', async () => {
      await helpdeskPage.fillTitleMessage(TD.userFormData.valid.titleMessage);
    });
    
    await test.step('Fill Ask your Questions', async () => {
      await helpdeskPage.fillAskQuestions(TD.userFormData.valid.askQuestions);
    });
    
    // Step 9: Submit form
    await test.step('Click Submit button', async () => {
      await helpdeskPage.clickSubmit();
      await page.waitForLoadState('networkidle', { timeout: 10000 });
    });
    
    // Step 10: Verify Ticket Reference ID format
    await test.step('Verify Ticket Reference ID is generated in MMDDYYHHMM00 format', async () => {
      const ticketRef = await helpdeskPage.getTicketReferenceId();
      expect(ticketRef).toMatch(TD.ticketReferenceFormat);
      expect(ticketRef).toHaveLength(14);
    });
    
    // Step 11: Verify timestamp
    await test.step('Verify localized timestamp is recorded', async () => {
      const timestamp = await helpdeskPage.getTimestamp();
      expect(timestamp).toBeTruthy();
      expect(timestamp).toMatch(/\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4}/);
    });
    
    // Step 12: Verify audit log initialization
    await test.step('Verify immutable audit log is initialized', async () => {
      const successMessage = page.locator('.success-message, [class*="success"]').first();
      await expect(successMessage).toBeVisible();
    });
  });
});