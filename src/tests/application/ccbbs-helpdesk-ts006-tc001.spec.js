const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskAdminPage = require('../../pages/ccbbs-helpdesk-admin.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-006: SLA Tier 2, 3, and 5 Warning and Breach Alerts', { tag: ['@regression', '@ccbbs-helpdesk'] }, () => {
  let adminPage;

  test('[AD-88 TS-006 TC-001] Verify SLA Tier 2, 3, and 5 warning and breach alerts for tickets', async ({ page }) => {
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

    // Step 4-6: Verify SLA Tier 2 breach (SOA Update - 2 days)
    await test.step('Open ticket with SLA Tier 2 Request Type (SOA Update) created 2 days ago', async () => {
      await adminPage.openTicket('010125143002');
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify that system displays operational lead time as 2 days', async () => {
      const leadTime = await adminPage.getLeadTime();
      expect(leadTime).toContain('2');
    });

    await test.step('Verify that visual warning alert is displayed indicating SLA Tier 2 deadline is breached', async () => {
      const isCriticalVisible = await adminPage.isSLACriticalAlertVisible();
      expect(isCriticalVisible).toBeTruthy();
    });

    // Step 7-9: Verify SLA Tier 3 breach (Document Retrieval - 3 days)
    await test.step('Open ticket with SLA Tier 3 Request Type (Document Retrieval) created 3 days ago', async () => {
      await adminPage.openTicket('010125143003');
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify that system displays operational lead time as 3 days', async () => {
      const leadTime = await adminPage.getLeadTime();
      expect(leadTime).toContain('3');
    });

    await test.step('Verify that visual warning alert is displayed indicating SLA Tier 3 deadline is breached', async () => {
      const isCriticalVisible = await adminPage.isSLACriticalAlertVisible();
      expect(isCriticalVisible).toBeTruthy();
    });

    // Step 10-12: Verify SLA Tier 5 breach (Check Request - 5 days)
    await test.step('Open ticket with SLA Tier 5 Request Type (Check Request) created 5 days ago', async () => {
      await adminPage.openTicket('010125143004');
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify that system displays operational lead time as 5 days', async () => {
      const leadTime = await adminPage.getLeadTime();
      expect(leadTime).toContain('5');
    });

    await test.step('Verify that visual warning alert is displayed indicating SLA Tier 5 deadline is breached', async () => {
      const isCriticalVisible = await adminPage.isSLACriticalAlertVisible();
      expect(isCriticalVisible).toBeTruthy();
    });

    // Step 13-14: Verify SLA Tier 5 warning (Tax Certificate - 4 days)
    await test.step('Open ticket with SLA Tier 5 Request Type (Tax Certificate) created 4 days ago', async () => {
      await adminPage.openTicket('010125143005');
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify that visual warning alert is displayed indicating SLA deadline is nearing', async () => {
      const isWarningVisible = await adminPage.isSLAWarningAlertVisible();
      expect(isWarningVisible).toBeTruthy();
    });
  });
});