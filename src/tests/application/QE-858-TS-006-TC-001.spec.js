const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const AdminPortalPage = require('../../pages/admin-portal.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-006: Loan Cancellation Report - CSV Export', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;
  let adminPage;

  test('[QE-858 TS-006 TC-001] Verify Loan Cancellation report with CSV export and audit trail', async ({ page, context }) => {
    loginPage = new LendingPortalLoginPage(page);
    reportsPage = new LendingPortalReportsPage(page);

    // Step 1: Launch the Lending Portal application
    await loginPage.goto();
    await expect(page).toHaveURL(new RegExp(TD.urls.lendingPortal));

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 3: Navigate to Loan Cancellation report
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickLoanCancellation();

    // Step 4: Apply filters
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.selectLoanType(TD.filters.loanType.udCashLoans);
    await reportsPage.selectStatus(TD.filters.status.cancelled);

    // Step 5: Generate Report
    await reportsPage.clickGenerateReport();
    await expect(page.locator('[data-testid="summary-view"], .summary-view')).toBeVisible();

    // Step 6: View transaction-level details
    await reportsPage.clickTransactionLevelView();
    const isDataGridVisible = await reportsPage.isDataGridVisible();
    expect(isDataGridVisible).toBeTruthy();

    // Step 7-8: Export to CSV
    await reportsPage.clickExportButton();
    await reportsPage.selectCSVFormat();
    const download = await reportsPage.clickDownloadButton();

    const fileName = download.suggestedFilename();
    expect(fileName).toContain('.csv');
    expect(fileName).toMatch(/Loan.*Cancellation.*\.csv/);

    // Step 9: Verify audit trail
    const adminTab = await context.newPage();
    adminPage = new AdminPortalPage(adminTab);
    await adminPage.goto();
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await adminPage.navigateToReportLists();

    const currentDate = new Date().toISOString().split('T')[0];
    await adminPage.searchAuditTrail(TD.reportTypes.loanCancellation, currentDate);

    const auditEntryExists = await adminPage.verifyAuditTrailEntry(
      TD.reportTypes.loanCancellation,
      TD.auditTrailFields.action,
      TD.exportFormats.csv,
      TD.credentials.admin.username
    );
    expect(auditEntryExists).toBeTruthy();

    await adminTab.close();
  });
});