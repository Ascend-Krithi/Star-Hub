const { test, expect } = require('../../fixtures');
const LendingPortalLoginPage = require('../../pages/lending-portal-login.page');
const LendingPortalReportsPage = require('../../pages/lending-portal-reports.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858 TS-010: Future Date Validation', { tag: ['@regression', '@lending-portal'] }, () => {
  let loginPage;
  let reportsPage;

  test('[QE-858 TS-010 TC-002] Verify report shows no data for future date range', async ({ page }) => {
    loginPage = new LendingPortalLoginPage(page);
    reportsPage = new LendingPortalReportsPage(page);

    // Step 1: Launch the Lending Portal application
    await loginPage.goto();
    await expect(page).toHaveURL(new RegExp(TD.urls.lendingPortal));

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator('[data-testid="dashboard"], .dashboard')).toBeVisible();

    // Step 3: Navigate to Loan Applications report
    await reportsPage.navigateToReportsDropdown();
    await reportsPage.clickLoanApplications();

    // Step 4: Enter future dates
    await reportsPage.applyDateFilters(TD.invalidFilters.futureDateFrom, TD.invalidFilters.futureDateTo);

    // Step 5: Generate Report
    await reportsPage.clickGenerateReport();

    // Step 6-7: Verify no data message or empty results
    const isNoDataVisible = await reportsPage.isNoDataMessageVisible();
    if (isNoDataVisible) {
      expect(isNoDataVisible).toBeTruthy();
    } else {
      // If no explicit message, verify record count is zero
      const recordCount = await reportsPage.getRecordCount();
      expect(recordCount).toBe(0);
    }
  });
});