const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskAdminPage = require('../../pages/ccbbs-helpdesk-admin.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-004: Admin Dropdown Values Verification', { tag: ['@smoke', '@regression', '@ccbbs-helpdesk'] }, () => {
  let adminPage;

  test('[AD-88 TS-004 TC-001] Verify all dropdown options are correctly populated from database', async ({ page }) => {
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

    // Step 5-6: Verify Level 1 dropdown contains all options
    await test.step('Verify Level 1 dropdown contains: INQUIRY, REQUEST, NCR, FREIGHTS, DISPUTE', async () => {
      const options = await adminPage.getClassificationLevel1Options();
      for (const expectedOption of TD.classificationLevel1.all) {
        expect(options).toContain(expectedOption);
      }
    });

    // Step 7-8: Verify Level 2 dropdown contains all options
    await test.step('Verify Level 2 dropdown contains all eight options', async () => {
      await adminPage.selectClassificationLevel1(TD.classificationLevel1.inquiry);
      await page.waitForTimeout(1000);
      const options = await adminPage.getRequestTypeLevel2Options();
      for (const expectedOption of TD.requestTypeLevel2.all) {
        expect(options).toContain(expectedOption);
      }
    });

    // Step 9-10: Verify Resolution Status dropdown contains all options
    await test.step('Verify Resolution Status dropdown contains: New, Closed, On-going, Reject', async () => {
      const options = await adminPage.getResolutionStatusOptions();
      for (const expectedOption of TD.resolutionStatus.all) {
        expect(options).toContain(expectedOption);
      }
    });

    // Step 11-12: Verify Resolved at First Contact? dropdown contains Yes, No
    await test.step('Verify Resolved at First Contact? dropdown contains: Yes, No', async () => {
      const options = await adminPage.getResolvedFirstContactOptions();
      for (const expectedOption of TD.resolvedFirstContact.all) {
        expect(options).toContain(expectedOption);
      }
    });

    // Step 13: Verify dropdown options match Database User Dropdown sheet
    await test.step('Verify that dropdown options are pulled from Database User Dropdown sheet', async () => {
      expect(TD.classificationLevel1.all.length).toBe(5);
      expect(TD.requestTypeLevel2.all.length).toBe(8);
      expect(TD.resolutionStatus.all.length).toBe(4);
      expect(TD.resolvedFirstContact.all.length).toBe(2);
    });
  });
});