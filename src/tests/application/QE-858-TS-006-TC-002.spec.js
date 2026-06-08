const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const AdminPortalPage = require('../../pages/admin-portal.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-006: Loan Cancellation Report - XLSX Export', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;
  let adminPage;

  test('[QE-858 TS-006 TC-002] Verify Loan Cancellation report with XLSX export and audit trail', async ({ page, context }) => {
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

    // Step 4: Apply filters and generate report
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.selectLoanType(TD.filters.loanType.udCashLoans);
    await reportsPage.selectStatus(TD.filters.status.cancelled);
    await reportsPage.clickGenerateReport();
    await expect(page.locator('[data-testid="summary-view"], .summary-view')).toBeVisible();

    // Step 5-6: Export to XLSX
    await reportsPage.clickExportButton();
    await reportsPage.selectXLSXFormat();
    const download = await reportsPage.clickDownloadButton();

    // Step 7: Verify XLSX file download
    const fileName = download.suggestedFilename();
    expect(fileName).toContain('.xlsx');
    expect(fileName).toMatch(/Loan.*Cancellation.*\.xlsx/);

    // Step 8: Verify audit trail
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
      TD.exportFormats.xlsx,
      TD.credentials.admin.username
    );
    expect(auditEntryExists).toBeTruthy();

    await adminTab.close();
  });
});