const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const AdminPortalPage = require('../../pages/admin-portal.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-001: Bookings Report - Export CSV and Audit Trail', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;
  let adminPage;

  test('[QE-858 TS-001 TC-003] Verify Bookings report export to CSV and audit trail logging', async ({ page, context }) => {
    loginPage = new LendingPortalLoginPage(page);
    reportsPage = new LendingPortalReportsPage(page);

    // Step 1: Launch the Lending Portal application
    await loginPage.goto();
    await expect(page).toHaveURL(new RegExp(TD.urls.lendingPortal));

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 3: Navigate to Bookings report
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickBookingsReport();

    // Step 4: Apply filters and generate report
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.selectStatus(TD.filters.status.confirmed);
    await reportsPage.selectLoanType(TD.filters.loanType.sssLoanLite);
    await reportsPage.clickGenerateReport();

    // Step 5-6: Export to CSV
    await reportsPage.clickExportButton();
    await reportsPage.selectCSVFormat();

    // Step 7: Download CSV file
    const download = await reportsPage.clickDownloadButton();
    const fileName = download.suggestedFilename();
    expect(fileName).toContain('.csv');
    expect(fileName).toMatch(/Bookings.*\.csv/);

    // Step 8-10: Navigate to Admin Portal in new tab
    const adminTab = await context.newPage();
    adminPage = new AdminPortalPage(adminTab);
    await adminPage.goto();
    await expect(adminTab).toHaveURL(new RegExp(TD.urls.adminPortal));

    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(adminTab.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 11: Navigate to Report Lists
    await adminPage.navigateToReportLists();

    // Step 12: Search for audit trail entry
    const currentDate = new Date().toISOString().split('T')[0];
    await adminPage.searchAuditTrail(TD.reportTypes.bookings, currentDate);

    // Verify audit trail entry
    const auditEntryExists = await adminPage.verifyAuditTrailEntry(
      TD.reportTypes.bookings,
      TD.auditTrailFields.action,
      TD.exportFormats.csv,
      TD.credentials.admin.username
    );
    expect(auditEntryExists).toBeTruthy();

    await adminTab.close();
  });
});