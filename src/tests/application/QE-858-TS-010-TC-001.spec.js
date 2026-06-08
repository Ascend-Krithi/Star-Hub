const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-010: Invalid Date Range Validation', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;

  test('[QE-858 TS-010 TC-001] Verify validation error when Date From is greater than Date To', async ({ page }) => {
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

    // Step 4: Enter invalid date range (Date From > Date To)
    await reportsPage.applyDateFilters(TD.invalidFilters.dateFrom, TD.invalidFilters.dateTo);

    // Step 5: Click Generate Report
    await reportsPage.clickGenerateReport();

    // Step 6: Verify validation message is displayed
    const isValidationVisible = await reportsPage.isValidationMessageVisible();
    expect(isValidationVisible).toBeTruthy();

    const validationMessage = await reportsPage.getValidationMessage();
    expect(validationMessage).toContain('Date From cannot be greater than Date To');
  });
});