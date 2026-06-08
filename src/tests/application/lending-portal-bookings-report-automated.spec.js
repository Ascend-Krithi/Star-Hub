/**
 * Test Spec — Lending Portal Bookings Report
 * Test Cases: QE-858 TS-001 TC-001, TC-002, TC-003
 * Tests bookings report generation, transaction-level view, and export with audit trail verification
 */

const { test, expect } = require('../../fixtures');
const LendingPortalPage = require('../../pages/lending-portal.page');
const AdminPortalPage = require('../../pages/admin-portal.page');
const TD = require('../../data/lending-portal-test-data');
const path = require('path');
const fs = require('fs');

test.describe('[UI] QE-858: Bookings Report with Summary and Transaction-Level Views', { tag: ['@regression', '@lending-portal'] }, () => {
  let lendingPortal;
  let adminPortal;

  test('[QE-858 TS-001 TC-001] Verify Bookings Report Summary View with Filters', async ({ page }) => {
    lendingPortal = new LendingPortalPage(page);

    // Step 1: Launch the Lending Portal application
    await test.step('Launch Lending Portal application', async () => {
      await lendingPortal.goto();
      await expect(page).toHaveURL(TD.urlPatterns.lendingPortalLogin);
    });

    // Step 2: Login with Admin credentials
    await test.step('Login with valid Admin credentials', async () => {
      await lendingPortal.login(TD.credentials.admin.username, TD.credentials.admin.password);
      const isDashboardVisible = await lendingPortal.isDashboardVisible();
      expect(isDashboardVisible).toBeTruthy();
    });

    // Step 3: Navigate to Reports dropdown menu
    await test.step('Navigate to Reports dropdown menu', async () => {
      await lendingPortal.navigateToReportsMenu();
    });

    // Step 4: Click on Bookings option
    await test.step('Click on Bookings option from Reports dropdown', async () => {
      await lendingPortal.clickBookingsOption();
      const isBookingsPageVisible = await lendingPortal.isBookingsReportPageVisible();
      expect(isBookingsPageVisible).toBeTruthy();
    });

    // Step 5: Select Date From filter
    await test.step('Select Date From filter', async () => {
      await lendingPortal.selectDateFrom(TD.filters.dateFrom);
    });

    // Step 6: Select Date To filter
    await test.step('Select Date To filter', async () => {
      await lendingPortal.selectDateTo(TD.filters.dateTo);
    });

    // Step 7: Select Status filter
    await test.step('Select Status filter', async () => {
      await lendingPortal.selectStatus(TD.filters.status);
    });

    // Step 8: Select Loan Type filter
    await test.step('Select Loan Type filter', async () => {
      await lendingPortal.selectLoanType(TD.filters.loanType);
    });

    // Step 9: Click Generate Report button
    await test.step('Click on Generate Report button', async () => {
      await lendingPortal.clickGenerateReport();
      const isSummaryVisible = await lendingPortal.isSummaryViewVisible();
      expect(isSummaryVisible).toBeTruthy();
    });

    // Step 10: Verify summary view contains key metrics
    await test.step('Verify summary view contains key metrics', async () => {
      const metrics = await lendingPortal.verifySummaryMetrics();
      expect(metrics.length).toBeGreaterThan(0);
      
      // Verify expected metrics are present
      for (const expectedMetric of TD.summaryMetrics) {
        const metricFound = metrics.some(m => m.includes(expectedMetric.split(' ')[0]));
        expect(metricFound).toBeTruthy();
      }
    });
  });

  test('[QE-858 TS-001 TC-002] Verify Bookings Report Transaction-Level View', async ({ page }) => {
    lendingPortal = new LendingPortalPage(page);

    // Step 1: Launch the Lending Portal application
    await test.step('Launch Lending Portal application', async () => {
      await lendingPortal.goto();
      await expect(page).toHaveURL(TD.urlPatterns.lendingPortalLogin);
    });

    // Step 2: Login with Admin credentials
    await test.step('Login with valid Admin credentials', async () => {
      await lendingPortal.login(TD.credentials.admin.username, TD.credentials.admin.password);
      const isDashboardVisible = await lendingPortal.isDashboardVisible();
      expect(isDashboardVisible).toBeTruthy();
    });

    // Step 3: Navigate to Reports dropdown menu
    await test.step('Navigate to Reports dropdown menu', async () => {
      await lendingPortal.navigateToReportsMenu();
    });

    // Step 4: Click on Bookings option
    await test.step('Click on Bookings option from Reports dropdown', async () => {
      await lendingPortal.clickBookingsOption();
      const isBookingsPageVisible = await lendingPortal.isBookingsReportPageVisible();
      expect(isBookingsPageVisible).toBeTruthy();
    });

    // Step 5: Apply all filters
    await test.step('Apply filters - Date From, Date To, Status, and Loan Type', async () => {
      await lendingPortal.applyFilters(
        TD.filters.dateFrom,
        TD.filters.dateTo,
        TD.filters.status,
        TD.filters.loanType
      );
    });

    // Step 6: Click Generate Report button
    await test.step('Click on Generate Report button', async () => {
      await lendingPortal.clickGenerateReport();
      const isSummaryVisible = await lendingPortal.isSummaryViewVisible();
      expect(isSummaryVisible).toBeTruthy();
    });

    // Step 7: Click on Transaction-Level View button
    await test.step('Click on Transaction-Level View or View Details button', async () => {
      await lendingPortal.clickViewDetails();
      const isTransactionViewVisible = await lendingPortal.isTransactionViewVisible();
      expect(isTransactionViewVisible).toBeTruthy();
    });

    // Step 8: Verify transaction-level data includes all relevant columns
    await test.step('Verify transaction-level data includes all relevant columns', async () => {
      const columns = await lendingPortal.getDataGridColumns();
      expect(columns.length).toBeGreaterThan(0);
      
      // Verify expected columns are present
      for (const expectedColumn of TD.transactionColumns) {
        const columnFound = columns.some(col => 
          col.toLowerCase().includes(expectedColumn.toLowerCase().split(' ')[0])
        );
        expect(columnFound).toBeTruthy();
      }
    });
  });

  test('[QE-858 TS-001 TC-003] Verify Bookings Report Export and Audit Trail', async ({ page, context }) => {
    lendingPortal = new LendingPortalPage(page);

    // Step 1: Launch the Lending Portal application
    await test.step('Launch Lending Portal application', async () => {
      await lendingPortal.goto();
      await expect(page).toHaveURL(TD.urlPatterns.lendingPortalLogin);
    });

    // Step 2: Login with Admin credentials
    await test.step('Login with valid Admin credentials', async () => {
      await lendingPortal.login(TD.credentials.admin.username, TD.credentials.admin.password);
      const isDashboardVisible = await lendingPortal.isDashboardVisible();
      expect(isDashboardVisible).toBeTruthy();
    });

    // Step 3: Navigate to Reports dropdown and click Bookings
    await test.step('Navigate to Reports dropdown menu and click Bookings', async () => {
      await lendingPortal.navigateToReportsMenu();
      await lendingPortal.clickBookingsOption();
      const isBookingsPageVisible = await lendingPortal.isBookingsReportPageVisible();
      expect(isBookingsPageVisible).toBeTruthy();
    });

    // Step 4: Apply filters and generate Bookings report
    await test.step('Apply filters and generate Bookings report', async () => {
      await lendingPortal.applyFilters(
        TD.filters.dateFrom,
        TD.filters.dateTo,
        TD.filters.status,
        TD.filters.loanType
      );
      await lendingPortal.clickGenerateReport();
      const isSummaryVisible = await lendingPortal.isSummaryViewVisible();
      expect(isSummaryVisible).toBeTruthy();
    });

    // Step 5: Click on Export button and select CSV format
    await test.step('Click on Export button and select CSV format', async () => {
      await lendingPortal.clickExportButton();
      await lendingPortal.selectExportFormat(TD.exportFormats.csv);
    });

    // Step 6: Click on Download button and verify file download
    await test.step('Click on Download or Confirm Export button', async () => {
      const download = await lendingPortal.clickDownloadButton();
      expect(download).toBeTruthy();
      
      // Verify filename format
      const filename = download.suggestedFilename();
      expect(filename).toContain('Bookings');
      expect(filename).toMatch(/\.(csv|CSV)$/);
      
      // Save the file
      const downloadPath = path.join(__dirname, '../../../test-results/downloads', filename);
      await download.saveAs(downloadPath);
      
      // Verify file exists
      expect(fs.existsSync(downloadPath)).toBeTruthy();
    });

    // Step 8-9: Navigate to Admin Portal in a new tab
    await test.step('Navigate to Admin Portal URL in a new browser tab', async () => {
      const adminPage = await context.newPage();
      adminPortal = new AdminPortalPage(adminPage);
      await adminPortal.goto();
      await expect(adminPage).toHaveURL(TD.urlPatterns.adminPortalLogin);
    });

    // Step 10: Login to Admin Portal
    await test.step('Login to Admin Portal with valid credentials', async () => {
      const isDashboardVisible = await adminPortal.isDashboardVisible();
      if (!isDashboardVisible) {
        await adminPortal.login(TD.credentials.admin.username, TD.credentials.admin.password);
      }
      const dashboardVisible = await adminPortal.isDashboardVisible();
      expect(dashboardVisible).toBeTruthy();
    });

    // Step 11: Navigate to Reports dropdown and click Report Lists
    await test.step('Navigate to Reports dropdown and click Report Lists', async () => {
      await adminPortal.navigateToReportsMenu();
      await adminPortal.clickReportListsOption();
      const isReportListsVisible = await adminPortal.isReportListsPageVisible();
      expect(isReportListsVisible).toBeTruthy();
    });

    // Step 12: Search for the recently exported Bookings report in audit trail
    await test.step('Search for the recently exported Bookings report in the audit trail', async () => {
      const currentDate = new Date().toISOString().split('T')[0];
      await adminPortal.searchReportInAuditTrail(TD.reportTypes.bookings, currentDate);
      
      // Verify audit trail entry
      const auditEntry = await adminPortal.verifyAuditTrailEntry(
        TD.auditTrailFields.reportType,
        TD.auditTrailFields.action,
        TD.auditTrailFields.format,
        TD.auditTrailFields.operatorId
      );
      
      expect(auditEntry.reportTypeFound).toBeTruthy();
      expect(auditEntry.actionFound).toBeTruthy();
      expect(auditEntry.formatFound).toBeTruthy();
      expect(auditEntry.operatorFound).toBeTruthy();
      
      // Verify at least one audit trail entry exists
      const rowCount = await adminPortal.getAuditTrailRowCount();
      expect(rowCount).toBeGreaterThan(0);
    });
  });
});