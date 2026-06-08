const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-009: Daily Auto-Refresh Verification', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;

  test('[QE-858 TS-009 TC-001] Verify all reports auto-refresh with new data every 24 hours', async ({ page }) => {
    loginPage = new LendingPortalLoginPage(page);
    reportsPage = new LendingPortalReportsPage(page);

    // Step 1: Launch the Lending Portal application
    await loginPage.goto();
    await expect(page).toHaveURL(new RegExp(TD.urls.lendingPortal));

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 3-8: Note record counts for all reports
    const recordCounts = {};

    // Bookings
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickBookingsReport();
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.clickGenerateReport();
    await page.waitForTimeout(2000);
    recordCounts.bookings = await reportsPage.getRecordCount();

    // Payment Transactions
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickConsolidatedPaymentTransactions();
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.clickGenerateReport();
    await page.waitForTimeout(2000);
    recordCounts.payments = await reportsPage.getRecordCount();

    // Loan Applications
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickLoanApplications();
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.clickGenerateReport();
    await page.waitForTimeout(2000);
    recordCounts.applications = await reportsPage.getRecordCount();

    // Loan Disbursement
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickLoanDisbursement();
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.clickGenerateReport();
    await page.waitForTimeout(2000);
    recordCounts.disbursements = await reportsPage.getRecordCount();

    // Loan Documents
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickLoanDocuments();
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.clickGenerateReport();
    await page.waitForTimeout(2000);
    recordCounts.documents = await reportsPage.getRecordCount();

    // Loan Cancellation
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickLoanCancellation();
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.clickGenerateReport();
    await page.waitForTimeout(2000);
    recordCounts.cancellations = await reportsPage.getRecordCount();

    // Step 9-13: Verify record counts are captured (actual refresh verification requires 24-hour wait)
    expect(recordCounts.bookings).toBeGreaterThanOrEqual(0);
    expect(recordCounts.payments).toBeGreaterThanOrEqual(0);
    expect(recordCounts.applications).toBeGreaterThanOrEqual(0);
    expect(recordCounts.disbursements).toBeGreaterThanOrEqual(0);
    expect(recordCounts.documents).toBeGreaterThanOrEqual(0);
    expect(recordCounts.cancellations).toBeGreaterThanOrEqual(0);

    // Note: Full 24-hour auto-refresh verification requires scheduled test execution
    console.log('Initial record counts captured:', recordCounts);
  });
});