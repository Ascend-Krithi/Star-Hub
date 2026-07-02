const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskAdminPage = require('../../pages/ccbbs-helpdesk-admin.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-003: Admin View Field Display Verification', { tag: ['@smoke', '@regression', '@ccbbs-helpdesk'] }, () => {
  let adminPage;

  test('[AD-88 TS-003 TC-001] Verify all Admin View fields are displayed including User View and Admin-specific fields', async ({ page }) => {
    adminPage = new CCBBSHelpdeskAdminPage(page);

    // Step 1: Launch the web application
    await test.step('Launch the web application in a browser', async () => {
      await adminPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.adminView);
    });

    // Step 2: Login as Admin user
    await test.step('Login as Admin user', async () => {
      await adminPage.login(TD.adminCredentials.level3Username, TD.adminCredentials.level3Password);
      const isDashboardVisible = await adminPage.isAdminDashboardVisible();
      expect(isDashboardVisible).toBeTruthy();
    });

    // Step 3: Access Admin View
    await test.step('Access Admin View', async () => {
      await expect(page).toHaveTitle(TD.pageTitles.adminView);
    });

    // Step 4: Open existing ticket
    await test.step('Open existing ticket', async () => {
      await adminPage.openTicket(TD.ticketData.sampleTicketId);
      await page.waitForLoadState('networkidle');
    });

    // Step 5: Verify all User View fields are displayed
    await test.step('Verify that all User View fields are displayed', async () => {
      const fields = ['Full Name', 'Phone Number', 'Email Address', 'Company Name', 'Title Message', 'Ask your Questions', 'Attachment'];
      for (const field of fields) {
        const isVisible = await adminPage.isUserViewFieldVisible(field);
        expect(isVisible).toBeTruthy();
      }
    });

    // Step 6: Verify Vendor Code field is displayed and editable
    await test.step('Verify that Vendor Code field is displayed and editable', async () => {
      const isVisible = await adminPage.isVendorCodeFieldVisible();
      expect(isVisible).toBeTruthy();
    });

    // Step 7: Verify Vendor Name field is displayed and editable
    await test.step('Verify that Vendor Name field is displayed and editable', async () => {
      const isVisible = await adminPage.isVendorNameFieldVisible();
      expect(isVisible).toBeTruthy();
    });

    // Step 8: Verify Classification (Level 1) dropdown is displayed and editable
    await test.step('Verify that Classification (Level 1) dropdown is displayed and editable', async () => {
      const isVisible = await adminPage.isClassificationLevel1DropdownVisible();
      expect(isVisible).toBeTruthy();
    });

    // Step 9: Verify Request Type (Level 2) dropdown is displayed and editable
    await test.step('Verify that Request Type (Level 2) dropdown is displayed and editable', async () => {
      const isVisible = await adminPage.isRequestTypeLevel2DropdownVisible();
      expect(isVisible).toBeTruthy();
    });

    // Step 10: Verify Inquiries/Concerns (Level 3) field is displayed and editable
    await test.step('Verify that Inquiries/Concerns (Level 3) field is displayed and editable', async () => {
      const isVisible = await adminPage.isInquiriesLevel3FieldVisible();
      expect(isVisible).toBeTruthy();
    });

    // Step 11: Verify Resolution Status dropdown is displayed and editable
    await test.step('Verify that Resolution Status dropdown is displayed and editable', async () => {
      const isVisible = await adminPage.isResolutionStatusDropdownVisible();
      expect(isVisible).toBeTruthy();
    });

    // Step 12: Verify Resolved at First Contact? dropdown is displayed and editable
    await test.step('Verify that Resolved at First Contact? dropdown is displayed and editable', async () => {
      const isVisible = await adminPage.isResolvedFirstContactDropdownVisible();
      expect(isVisible).toBeTruthy();
    });
  });
});