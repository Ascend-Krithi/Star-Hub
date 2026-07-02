const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskAdminPage = require('../../pages/ccbbs-helpdesk-admin.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-008: Successful Ticket Closure with All Mandatory Fields', { tag: ['@regression', '@ccbbs-helpdesk'] }, () => {
  let adminPage;

  test('[AD-88 TS-008 TC-001] Verify ticket can be closed when all mandatory fields are populated', async ({ page }) => {
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

    // Step 4: Open existing ticket
    await test.step('Open existing ticket', async () => {
      await adminPage.openTicket(TD.ticketData.sampleTicketId);
      await page.waitForLoadState('networkidle');
    });

    // Step 5: Enter Vendor Code
    await test.step('Enter Vendor Code', async () => {
      await adminPage.fillVendorCode(TD.vendorData.vendorCode);
    });

    // Step 6: Enter Vendor Name
    await test.step('Enter Vendor Name', async () => {
      await adminPage.fillVendorName(TD.vendorData.vendorName);
    });

    // Step 7: Select Resolution Status as Closed
    await test.step('Select Resolution Status as Closed', async () => {
      await adminPage.selectResolutionStatus(TD.resolutionStatus.closed);
    });

    // Step 8: Select Resolved at First Contact? as Yes
    await test.step('Select Resolved at First Contact? as Yes', async () => {
      await adminPage.selectResolvedFirstContact(TD.resolvedFirstContact.yes);
    });

    // Step 9: Verify all mandatory fields are populated
    await test.step('Verify that all mandatory fields are populated', async () => {
      const vendorCode = await adminPage.getVendorCodeValue();
      const vendorName = await adminPage.getVendorNameValue();
      expect(vendorCode).toBe(TD.vendorData.vendorCode);
      expect(vendorName).toBe(TD.vendorData.vendorName);
    });

    // Step 10: Click Save or Update button
    await test.step('Click Save or Update button', async () => {
      await adminPage.clickSave();
      await page.waitForLoadState('networkidle');
    });

    // Step 11: Verify ticket status is changed to Closed
    await test.step('Verify that ticket status is changed to Closed', async () => {
      const status = await adminPage.getResolutionStatusValue();
      expect(status).toBe(TD.resolutionStatus.closed);
    });

    // Step 12: Verify ticket closure timestamp is recorded
    await test.step('Verify that ticket closure timestamp is recorded', async () => {
      const closureTimestamp = await adminPage.getClosureTimestamp();
      expect(closureTimestamp).toBeTruthy();
      expect(closureTimestamp.length).toBeGreaterThan(0);
    });
  });
});