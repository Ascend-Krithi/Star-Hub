const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-001: Bookings Report - Transaction-Level View', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;

  test('[QE-858 TS-001 TC-002] Verify Bookings report displays transaction-level view with individual records', async ({ page }) => {
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

    // Step 4: Click on Bookings option
    await reportsPage.clickBookingsReport();

    // Step 5: Apply all filters
    await reportsPage.applyDateFilters(TD.filters.dateFrom, TD.filters.dateTo);
    await reportsPage.selectStatus(TD.filters.status.confirmed);
    await reportsPage.selectLoanType(TD.filters.loanType.sssLoanLite);

    // Step 6: Click Generate Report button
    await reportsPage.clickGenerateReport();
    await expect(page.locator('[data-testid="summary-view"], .summary-view')).toBeVisible();

    // Step 7: Click on Transaction-Level View
    await reportsPage.clickTransactionLevelView();

    // Step 8: Verify transaction-level data includes all relevant columns
    const isDataGridVisible = await reportsPage.isDataGridVisible();
    expect(isDataGridVisible).toBeTruthy();

    const columnsVerified = await reportsPage.verifyTransactionColumns();
    expect(columnsVerified).toBeTruthy();
  });
});