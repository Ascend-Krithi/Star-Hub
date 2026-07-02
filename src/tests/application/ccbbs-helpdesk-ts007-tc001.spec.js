const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskAdminPage = require('../../pages/ccbbs-helpdesk-admin.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-007: Mandatory Field Validation for Ticket Closure', { tag: ['@regression', '@ccbbs-helpdesk'] }, () => {
  let adminPage;

  test('[AD-88 TS-007 TC-001] Verify ticket cannot be closed without mandatory fields populated', async ({ page }) => {
    adminPage = new CCBBSHelpdeskAdminPage(page);

    // Step 1: Launch the web application
    await test.step('Launch the web application in a browser', async () => {
      await adminPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.adminView);
    });

    // Step 2: Login as Admin user
    await test.step('Login as Admin user', async () => {
      await adminPage.login(TD.adminCredentials.username, TD.adminCredentials.password);
    });

    // Step 3: Access Admin View
    await test.step('Access Admin View', async () => {
      const isDashboardVisible = await adminPage.isAdminDashboardVisible();
      expect(isDashboardVisible).toBeTruthy();
    });

    // Step 4: Open existing ticket with incomplete mandatory fields
    await test.step('Open existing ticket with incomplete mandatory fields', async () => {
      await adminPage.openTicket(TD.ticketData.sampleTicketId);
      await page.waitForLoadState('networkidle');
    });

    // Step 5-7: Verify mandatory fields are empty
    await test.step('Verify that Vendor Code field is empty', async () => {
      const vendorCode = await adminPage.getVendorCodeValue();
      expect(vendorCode).toBe('');
    });

    await test.step('Verify that Vendor Name field is empty', async () => {
      const vendorName = await adminPage.getVendorNameValue();
      expect(vendorName).toBe('');
    });

    await test.step('Verify that Resolution Status field is empty', async () => {
      const status = await adminPage.getResolutionStatusValue();
      expect(status).toBe('');
    });

    // Step 8: Attempt to change ticket status to Closed
    await test.step('Attempt to change ticket status to Closed from Resolution Status dropdown', async () => {
      await adminPage.selectResolutionStatus(TD.resolutionStatus.closed);
      await adminPage.clickSave();
      await page.waitForTimeout(1000);
    });

    // Step 9: Verify validation error message is displayed
    await test.step('Verify that validation error message is displayed', async () => {
      const isErrorVisible = await adminPage.isValidationErrorModalVisible();
      expect(isErrorVisible).toBeTruthy();
      const errorMessage = await adminPage.getValidationErrorMessage();
      expect(errorMessage).toContain(TD.validationErrors.mandatoryFieldsForClosure);
    });

    // Step 10: Verify ticket status remains unchanged
    await test.step('Verify that ticket status remains unchanged', async () => {
      await page.reload();
      const status = await adminPage.getResolutionStatusValue();
      expect(status).not.toBe(TD.resolutionStatus.closed);
    });
  });
});