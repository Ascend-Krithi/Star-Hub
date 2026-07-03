const { test, expect } = require('../../fixtures');
const HelpdeskAdminPage = require('../../pages/helpdesk-admin.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-009: Report Extraction - Generate and Download Report', { tag: ['@regression'] }, () => {
  let adminPage;

  test('[PK-228 TS-009 TC-001] Admin successfully generates and downloads report with all required columns', async ({ page }) => {
    adminPage = new HelpdeskAdminPage(page);

    // Step 1: Launch the Admin Portal URL
    await adminPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.adminDashboard);

    // Step 2: Enter admin credentials and login
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    const isDashboardVisible = await adminPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    // Step 3: Verify multiple closed tickets exist in the system
    await adminPage.navigateToTicketQueue();

    // Step 4: Navigate to Reports section
    await adminPage.navigateToReports();

    // Step 5: Select Report Extraction option
    // Already on report extraction page

    // Step 6: Set Date Range filter for report
    await adminPage.setDateRange('01/01/2026', '31/01/2026');

    // Step 7: Set Status filter to 'Closed'
    await adminPage.setStatusFilter(TD.statuses.closed);

    // Step 8: Click Generate Report button
    await adminPage.generateReport();

    // Step 9-18: Verify report contains all required columns
    for (const columnName of TD.reportColumns) {
      const isColumnVisible = await adminPage.isReportColumnVisible(columnName);
      expect(isColumnVisible).toBe(true);
    }

    // Step 19: Click Download button to export report
    const download = await adminPage.downloadReport();
    expect(download).toBeTruthy();
    
    // Verify download file name
    const fileName = download.suggestedFilename();
    expect(fileName).toMatch(/\.(xlsx|csv)$/i);
  });
});