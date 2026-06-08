const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-007: Loan Disbursement Report - Export Format Restriction', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;

  test('[QE-858 TS-007 TC-001] Verify Loan Disbursement report restricts export to CSV only', async ({ page }) => {
    loginPage = new LendingPortalLoginPage(page);
    reportsPage = new LendingPortalReportsPage(page);

    // Step 1: Launch the Lending Portal application
    await loginPage.goto();
    await expect(page).toHaveURL(new RegExp(TD.urls.lendingPortal));

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 3: Navigate to Loan Disbursement report
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickLoanDisbursement();

    // Step 4: Apply filters and generate report
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.selectLoanType(TD.filters.loanType.sssLoanLite);
    await reportsPage.clickGenerateReport();
    await expect(page.locator('[data-testid="summary-view"], .summary-view')).toBeVisible();

    // Step 5-6: Verify export format options
    await reportsPage.clickExportButton();
    const isXLSXDisabled = await reportsPage.isXLSXFormatDisabled();
    expect(isXLSXDisabled).toBeTruthy();

    // Step 7: Download CSV
    await reportsPage.selectCSVFormat();
    const download = await reportsPage.clickDownloadButton();
    const fileName = download.suggestedFilename();
    expect(fileName).toContain('.csv');

    // Step 8: Verify XLSX cannot be selected
    expect(isXLSXDisabled).toBeTruthy();
  });
});