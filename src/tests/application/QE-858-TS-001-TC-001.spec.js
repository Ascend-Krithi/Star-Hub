const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-001: Bookings Report - Summary View', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;

  test('[QE-858 TS-001 TC-001] Verify Bookings report displays summary view with aggregated data', async ({ page }) => {
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

    // Step 5: Select Date From filter
    await reportsPage.applyDateFilters(TD.filters.dateFrom, '');

    // Step 6: Select Date To filter
    await reportsPage.applyDateFilters('', TD.filters.dateTo);

    // Step 7: Select Status filter
    await reportsPage.selectStatus(TD.filters.status.confirmed);

    // Step 8: Select Loan Type filter
    await reportsPage.selectLoanType(TD.filters.loanType.sssLoanLite);

    // Step 9: Click Generate Report button
    await reportsPage.clickGenerateReport();

    // Step 10: Verify summary view contains key metrics
    await expect(page.locator('[data-testid="summary-view"], .summary-view')).toBeVisible();
    const isTotalBookingsVisible = await reportsPage.isTotalBookingsVisible();
    const isTotalAmountVisible = await reportsPage.isTotalAmountVisible();
    const isConfirmedBookingsVisible = await reportsPage.isConfirmedBookingsVisible();
    const isPendingBookingsVisible = await reportsPage.isPendingBookingsVisible();

    expect(isTotalBookingsVisible).toBeTruthy();
    expect(isTotalAmountVisible).toBeTruthy();
    expect(isConfirmedBookingsVisible).toBeTruthy();
    expect(isPendingBookingsVisible).toBeTruthy();
  });
});