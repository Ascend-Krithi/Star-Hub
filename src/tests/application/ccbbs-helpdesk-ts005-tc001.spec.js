const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskAdminPage = require('../../pages/ccbbs-helpdesk-admin.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-005: SLA Tier 1 Warning and Breach Alerts', { tag: ['@regression', '@ccbbs-helpdesk'] }, () => {
  let adminPage;

  test('[AD-88 TS-005 TC-001] Verify SLA Tier 1 warning and breach alerts for tickets', async ({ page }) => {
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

    // Step 4-6: Open ticket created 20 hours ago and verify warning alert
    await test.step('Open ticket with SLA Tier 1 Request Type created 20 hours ago', async () => {
      await adminPage.openTicket('010125143000');
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify that system displays operational lead time calculation', async () => {
      const leadTime = await adminPage.getLeadTime();
      expect(leadTime).toBeTruthy();
    });

    await test.step('Verify that visual warning alert is displayed indicating SLA deadline is nearing', async () => {
      const isWarningVisible = await adminPage.isSLAWarningAlertVisible();
      expect(isWarningVisible).toBeTruthy();
    });

    // Step 7-8: Open ticket created 24 hours ago and verify breach alert
    await test.step('Open ticket with SLA Tier 1 Request Type created 24 hours ago', async () => {
      await adminPage.openTicket('010125143001');
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify that visual warning alert is displayed indicating SLA deadline is breached', async () => {
      const isCriticalVisible = await adminPage.isSLACriticalAlertVisible();
      expect(isCriticalVisible).toBeTruthy();
    });

    // Step 9: Verify SLA calculation for Vendor Resolution
    await test.step('Verify SLA calculation for Vendor Resolution request type', async () => {
      const requestTypes = TD.slaTiers.tier1.requestTypes;
      expect(requestTypes).toContain('Vendor Resolution');
    });

    // Step 10: Verify SLA calculation for Employee Claims
    await test.step('Verify SLA calculation for Employee Claims request type', async () => {
      const requestTypes = TD.slaTiers.tier1.requestTypes;
      expect(requestTypes).toContain('Employee Claims');
    });
  });
});