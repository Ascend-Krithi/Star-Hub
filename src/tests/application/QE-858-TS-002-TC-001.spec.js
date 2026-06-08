const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const AdminPortalPage = require('../../pages/admin-portal.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-002: Consolidated Payment Transactions Report', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;
  let adminPage;

  test('[QE-858 TS-002 TC-001] Verify Consolidated Payment Transactions report with XLSX export and audit trail', async ({ page, context }) => {
    loginPage = new LendingPortalLoginPage(page);
    reportsPage = new LendingPortalReportsPage(page);

    // Step 1: Launch the Lending Portal application
    await loginPage.goto();
    await expect(page).toHaveURL(new RegExp(TD.urls.lendingPortal));

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 3: Navigate to Reports dropdown
    await reportsPage.navigateToReportsDropdown();

    // Step 4: Click on Consolidated Payment Transactions
    await reportsPage.clickConsolidatedPaymentTransactions();

    // Step 5: Apply filters
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.selectStatus(TD.filters.status.completed);
    await reportsPage.selectLoanType(TD.filters.loanType.udQuickLoans);

    // Step 6: Generate Report
    await reportsPage.clickGenerateReport();
    await expect(page.locator('[data-testid="summary-view"], .summary-view')).toBeVisible();

    // Step 7: Switch to Transaction-Level View
    await reportsPage.clickTransactionLevelView();
    const isDataGridVisible = await reportsPage.isDataGridVisible();
    expect(isDataGridVisible).toBeTruthy();

    // Step 8-9: Export to XLSX
    await reportsPage.clickExportButton();
    await reportsPage.selectXLSXFormat();
    const download = await reportsPage.clickDownloadButton();

    // Step 10: Verify XLSX file download
    const fileName = download.suggestedFilename();
    expect(fileName).toContain('.xlsx');
    expect(fileName).toMatch(/Payment.*Transactions.*\.xlsx/);

    // Step 11: Verify audit trail in Admin Portal
    const adminTab = await context.newPage();
    adminPage = new AdminPortalPage(adminTab);
    await adminPage.goto();
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await adminPage.navigateToReportLists();

    const currentDate = new Date().toISOString().split('T')[0];
    await adminPage.searchAuditTrail(TD.reportTypes.paymentTransactions, currentDate);

    const auditEntryExists = await adminPage.verifyAuditTrailEntry(
      TD.reportTypes.paymentTransactions,
      TD.auditTrailFields.action,
      TD.exportFormats.xlsx,
      TD.credentials.admin.username
    );
    expect(auditEntryExists).toBeTruthy();

    await adminTab.close();
  });
});