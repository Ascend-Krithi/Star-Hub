const { test, expect } = require('../../fixtures');
const LendingPortalPage = require('../../pages/lending-portal.page');
const TD = require('../../data/lending-portal-test-data');

test.describe('[UI] QE-858: Bookings Report Tests', { tag: ['@regression', '@lending-portal'] }, () => {
  let lendingPortal;

  test('[QE-858 TS-001 TC-001] Verify Bookings report displays summary view with aggregated data after applying filters', async ({ page }) => {
    lendingPortal = new LendingPortalPage(page);

    // Step 1: Launch the Lending Portal application in a browser
    await lendingPortal.goto(TD.urls.lendingPortal);
    await expect(page).toHaveURL(/lendingportal/);

    // Step 2: Enter valid Admin credentials and login
    await lendingPortal.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').dashboardContainer)).toBeVisible();

    // Step 3: Navigate to Reports dropdown menu
    await lendingPortal.navigateToReportsDropdown();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').reportsDropdown)).toBeVisible();

    // Step 4: Click on Bookings option from the Reports dropdown
    await lendingPortal.clickBookingsOption();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').bookingsReportContainer)).toBeVisible();

    // Step 5: Select Date From filter
    await lendingPortal.selectDateFrom(TD.filters.dateFrom);
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').dateFromInput)).toHaveValue(TD.filters.dateFrom);

    // Step 6: Select Date To filter
    await lendingPortal.selectDateTo(TD.filters.dateTo);
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').dateToInput)).toHaveValue(TD.filters.dateTo);

    // Step 7: Select Status filter
    await lendingPortal.selectStatus(TD.filters.status);
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').statusDropdown)).toBeVisible();

    // Step 8: Select Loan Type filter
    await lendingPortal.selectLoanType(TD.filters.loanType);
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').loanTypeDropdown)).toBeVisible();

    // Step 9: Click on Generate Report or Apply Filter button
    await lendingPortal.clickGenerateReport();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').summaryView)).toBeVisible();

    // Step 10: Verify summary view contains key metrics
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').totalBookingsMetric)).toBeVisible();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').totalAmountMetric)).toBeVisible();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').confirmedBookingsMetric)).toBeVisible();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').pendingBookingsMetric)).toBeVisible();
  });

  test('[QE-858 TS-001 TC-002] Verify transaction-level view displays individual booking records with all relevant columns', async ({ page }) => {
    lendingPortal = new LendingPortalPage(page);

    // Step 1: Launch the Lending Portal application in a browser
    await lendingPortal.goto(TD.urls.lendingPortal);
    await expect(page).toHaveURL(/lendingportal/);

    // Step 2: Enter valid Admin credentials and login
    await lendingPortal.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').dashboardContainer)).toBeVisible();

    // Step 3: Navigate to Reports dropdown menu
    await lendingPortal.navigateToReportsDropdown();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').reportsDropdown)).toBeVisible();

    // Step 4: Click on Bookings option from the Reports dropdown
    await lendingPortal.clickBookingsOption();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').bookingsReportContainer)).toBeVisible();

    // Step 5: Apply filters - Date From, Date To, Status, and Loan Type
    await lendingPortal.selectDateFrom(TD.filters.dateFrom);
    await lendingPortal.selectDateTo(TD.filters.dateTo);
    await lendingPortal.selectStatus(TD.filters.status);
    await lendingPortal.selectLoanType(TD.filters.loanType);
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').dateFromInput)).toHaveValue(TD.filters.dateFrom);

    // Step 6: Click on Generate Report button
    await lendingPortal.clickGenerateReport();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').summaryView)).toBeVisible();

    // Step 7: Click on Transaction-Level View or View Details button/tab
    await lendingPortal.clickTransactionView();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').transactionDataGrid)).toBeVisible();

    // Step 8: Verify transaction-level data includes all relevant columns
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').bookingIdColumn)).toBeVisible();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').customerNameColumn)).toBeVisible();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').loanTypeColumn)).toBeVisible();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').bookingDateColumn)).toBeVisible();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').amountColumn)).toBeVisible();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').statusColumn)).toBeVisible();
  });

  test('[QE-858 TS-001 TC-003] Verify Bookings report can be exported to CSV and audit trail is captured in Admin Portal', async ({ page, context }) => {
    lendingPortal = new LendingPortalPage(page);

    // Step 1: Launch the Lending Portal application in a browser
    await lendingPortal.goto(TD.urls.lendingPortal);
    await expect(page).toHaveURL(/lendingportal/);

    // Step 2: Enter valid Admin credentials and login
    await lendingPortal.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').dashboardContainer)).toBeVisible();

    // Step 3: Navigate to Reports dropdown menu and click Bookings
    await lendingPortal.navigateToReportsDropdown();
    await lendingPortal.clickBookingsOption();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').bookingsReportContainer)).toBeVisible();

    // Step 4: Apply filters and generate Bookings report
    await lendingPortal.selectDateFrom(TD.filters.dateFrom);
    await lendingPortal.selectDateTo(TD.filters.dateTo);
    await lendingPortal.selectStatus(TD.filters.status);
    await lendingPortal.selectLoanType(TD.filters.loanType);
    await lendingPortal.clickGenerateReport();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').summaryView)).toBeVisible();

    // Step 5: Click on Export button and select CSV format
    await lendingPortal.clickExportButton();
    await expect(page.locator(require('../../pages/locators/lending-portal.locators').exportButton)).toBeVisible();
    await lendingPortal.selectCSVFormat();

    // Step 6: Click on Download or Confirm Export button
    const download = await lendingPortal.clickDownloadButton();
    const fileName = download.suggestedFilename();
    await expect(fileName).toMatch(TD.fileNamePattern);

    // Step 7: Open the downloaded CSV file (verify download completed)
    const downloadPath = await download.path();
    await expect(downloadPath).toBeTruthy();

    // Step 8: Navigate to Admin Portal URL in a new browser tab
    const adminPage = await context.newPage();
    const adminPortal = new LendingPortalPage(adminPage);
    await adminPortal.goto(TD.urls.adminPortal);
    await expect(adminPage).toHaveURL(/adminportal/);

    // Step 9: Login to Admin Portal with valid credentials
    await adminPortal.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await expect(adminPage.locator(require('../../pages/locators/lending-portal.locators').dashboardContainer)).toBeVisible();

    // Step 10: Navigate to Reports dropdown and click Report Lists
    await adminPortal.navigateToReportLists();
    await expect(adminPage.locator(require('../../pages/locators/lending-portal.locators').reportListsContainer)).toBeVisible();

    // Step 11: Search for the recently exported Bookings report in the audit trail
    await adminPortal.searchReport(TD.reportTypes.bookings);
    await expect(adminPage.locator(require('../../pages/locators/lending-portal.locators').auditTrailGrid)).toBeVisible();
    
    // Verify audit trail entry contains expected values
    const reportTypeVisible = await adminPortal.isReportTypeInAuditTrail(TD.reportTypes.bookings);
    await expect(reportTypeVisible).toBeTruthy();
    
    const actionVisible = await adminPortal.isActionInAuditTrail(TD.auditTrail.action);
    await expect(actionVisible).toBeTruthy();
    
    const formatVisible = await adminPortal.isFormatInAuditTrail(TD.exportFormats.csv);
    await expect(formatVisible).toBeTruthy();
    
    const operatorVisible = await adminPortal.isOperatorIdInAuditTrail(TD.auditTrail.operatorId);
    await expect(operatorVisible).toBeTruthy();

    // Cleanup: Close admin portal tab
    await adminPage.close();
  });
});