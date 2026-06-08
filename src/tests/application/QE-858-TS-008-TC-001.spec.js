const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const AdminPortalPage = require('../../pages/admin-portal.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-008: Audit Trail Verification', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;
  let adminPage;

  test('[QE-858 TS-008 TC-001] Verify audit trail captures all required fields for report export', async ({ page, context }) => {
    loginPage = new LendingPortalLoginPage(page);
    reportsPage = new LendingPortalReportsPage(page);

    // Step 1: Launch the Lending Portal application
    await loginPage.goto();
    await expect(page).toHaveURL(new RegExp(TD.urls.lendingPortal));

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 3: Export Bookings report
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickBookingsReport();
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.selectStatus(TD.filters.status.confirmed);
    await reportsPage.selectLoanType(TD.filters.loanType.sssLoanLite);
    await reportsPage.clickGenerateReport();

    // Step 4: Note timestamp
    const exportTimestamp = new Date();

    await reportsPage.clickExportButton();
    await reportsPage.selectCSVFormat();
    const download = await reportsPage.clickDownloadButton();
    expect(download.suggestedFilename()).toContain('.csv');

    // Step 5-7: Navigate to Admin Portal
    const adminTab = await context.newPage();
    adminPage = new AdminPortalPage(adminTab);
    await adminPage.goto();
    await expect(adminTab).toHaveURL(new RegExp(TD.urls.adminPortal));

    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(adminTab.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    await adminPage.navigateToReportLists();

    // Step 8: Search for audit trail
    const currentDate = new Date().toISOString().split('T')[0];
    await adminPage.searchAuditTrail(TD.reportTypes.bookings, currentDate);

    // Step 9-13: Verify all audit trail fields
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