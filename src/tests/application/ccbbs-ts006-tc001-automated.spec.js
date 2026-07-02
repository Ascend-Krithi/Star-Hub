const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-006: Verify Mandatory Field Validation Before Closing Ticket', {
  tag: ['@regression', '@ccbbs', '@admin', '@validation']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-006 TC-001] Verify mandatory fields validation when closing ticket', async ({ page }) => {
    helpdeskPage = new CCBBSHelpdeskPage(page);
    
    // Step 1: Launch application
    await test.step('Launch application URL', async () => {
      await helpdeskPage.goto(TD.urls.base);
    });
    
    // Step 2: Login with Admin credentials
    await test.step('Login with Admin credentials', async () => {
      await helpdeskPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
      await page.waitForLoadState('networkidle');
    });
    
    // Step 3: Access Admin View
    await test.step('Access Admin View dashboard', async () => {
      await helpdeskPage.navigateToAdminView();
    });
    
    // Step 4-6: Test missing Vendor Code validation
    await test.step('Select ticket with missing Vendor Code and attempt to close', async () => {
      const ticketId = 'TICKET_WITHOUT_VENDOR_CODE';
      await helpdeskPage.searchTicket(ticketId);
      await helpdeskPage.selectTicket(ticketId);
      
      await helpdeskPage.selectResolutionStatus('Closed');
      
      const errorMessage = page.locator('.error-message, [class*="error"]').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(TD.validationMessages.vendorCodeRequired);
    });
    
    // Step 7-8: Test missing Vendor Name validation
    await test.step('Select ticket with missing Vendor Name and attempt to close', async () => {
      const ticketId = 'TICKET_WITHOUT_VENDOR_NAME';
      await helpdeskPage.searchTicket(ticketId);
      await helpdeskPage.selectTicket(ticketId);
      
      await helpdeskPage.selectResolutionStatus('Closed');
      
      const errorMessage = page.locator('.error-message, [class*="error"]').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(TD.validationMessages.vendorNameRequired);
    });
    
    // Step 9-10: Test missing Resolved at First Contact validation
    await test.step('Select ticket with missing Resolved at First Contact and attempt to close', async () => {
      const ticketId = 'TICKET_WITHOUT_FIRST_CONTACT';
      await helpdeskPage.searchTicket(ticketId);
      await helpdeskPage.selectTicket(ticketId);
      
      await helpdeskPage.selectResolutionStatus('Closed');
      
      const errorMessage = page.locator('.error-message, [class*="error"]').first();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(TD.validationMessages.resolvedFirstContactRequired);
    });
    
    // Step 11-12: Populate all fields and successfully close
    await test.step('Populate all mandatory fields and close ticket successfully', async () => {
      await helpdeskPage.fillVendorCode(TD.adminFormData.vendorCode);
      await helpdeskPage.fillVendorName(TD.adminFormData.vendorName);
      await helpdeskPage.selectResolvedFirstContact('Yes');
      await helpdeskPage.selectResolutionStatus('Closed');
      
      const saveButton = page.getByRole('button', { name: /save|update/i }).first();
      await saveButton.click();
      
      const successMessage = page.locator('.success-message, [class*="success"]').first();
      await expect(successMessage).toBeVisible();
    });
  });
});