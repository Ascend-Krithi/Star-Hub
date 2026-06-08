const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const AdminPortalPage = require('../../pages/admin-portal.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-005: Loan Documents Report - ZIP Export', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;
  let adminPage;

  test('[QE-858 TS-005 TC-001] Verify Loan Documents report exports as ZIP file with audit trail', async ({ page, context }) => {
    loginPage = new LendingPortalLoginPage(page);
    reportsPage = new LendingPortalReportsPage(page);

    // Step 1: Launch the Lending Portal application
    await loginPage.goto();
    await expect(page).toHaveURL(new RegExp(TD.urls.lendingPortal));

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 3: Navigate to Loan Documents report
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickLoanDocuments();

    // Step 4: Apply filters
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.selectLoanType(TD.filters.loanType.udQuickLoans);
    await reportsPage.enterCustomerName(TD.testData.customerName);

    // Step 5: Generate Report
    await reportsPage.clickGenerateReport();
    await expect(page.locator('[data-testid="summary-view"], .summary-view')).toBeVisible();

    // Step 6: View transaction-level details
    await reportsPage.clickTransactionLevelView();
    const isDataGridVisible = await reportsPage.isDataGridVisible();
    expect(isDataGridVisible).toBeTruthy();

    // Step 7-8: Export to ZIP
    await reportsPage.clickExportButton();
    await reportsPage.selectZIPFormat();
    const download = await reportsPage.clickDownloadButton();

    // Step 9: Verify ZIP file download
    const fileName = download.suggestedFilename();
    expect(fileName).toContain('.zip');
    expect(fileName).toMatch(/Loan.*Documents.*\.zip/);

    // Step 10: Verify audit trail
    const adminTab = await context.newPage();
    adminPage = new AdminPortalPage(adminTab);
    await adminPage.goto();
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await adminPage.navigateToReportLists();

    const currentDate = new Date().toISOString().split('T')[0];
    await adminPage.searchAuditTrail(TD.reportTypes.loanDocuments, currentDate);

    const auditEntryExists = await adminPage.verifyAuditTrailEntry(
      TD.reportTypes.loanDocuments,
      TD.auditTrailFields.action,
      TD.exportFormats.zip,
      TD.credentials.admin.username
    );
    expect(auditEntryExists).toBeTruthy();

    await adminTab.close();
  });
});