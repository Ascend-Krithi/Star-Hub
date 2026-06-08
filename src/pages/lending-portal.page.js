const loc = require('./locators/lending-portal.locators');

class LendingPortalPage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(username, password) {
    await loc.usernameInput(this.page).fill(username);
    await loc.passwordInput(this.page).fill(password);
    await loc.loginButton(this.page).click();
  }

  async isDashboardVisible() {
    return await loc.dashboardContainer(this.page).isVisible();
  }

  async navigateToReportsDropdown() {
    await loc.reportsDropdown(this.page).click();
  }

  async clickBookingsOption() {
    await loc.bookingsOption(this.page).click();
  }

  async isBookingsReportPageLoaded() {
    return await loc.bookingsReportContainer(this.page).isVisible();
  }

  async selectDateFrom(date) {
    await loc.dateFromInput(this.page).fill(date);
  }

  async selectDateTo(date) {
    await loc.dateToInput(this.page).fill(date);
  }

  async selectStatus(status) {
    await loc.statusDropdown(this.page).selectOption({ label: status });
  }

  async selectLoanType(loanType) {
    await loc.loanTypeDropdown(this.page).selectOption({ label: loanType });
  }

  async clickGenerateReport() {
    await loc.generateReportButton(this.page).click();
  }

  async isSummaryViewVisible() {
    return await loc.summaryView(this.page).isVisible();
  }

  async isTotalBookingsVisible() {
    return await loc.totalBookingsMetric(this.page).isVisible();
  }

  async isTotalAmountVisible() {
    return await loc.totalAmountMetric(this.page).isVisible();
  }

  async isConfirmedBookingsVisible() {
    return await loc.confirmedBookingsMetric(this.page).isVisible();
  }

  async isPendingBookingsVisible() {
    return await loc.pendingBookingsMetric(this.page).isVisible();
  }

  async clickTransactionView() {
    await loc.transactionViewButton(this.page).click();
  }

  async isTransactionDataGridVisible() {
    return await loc.transactionDataGrid(this.page).isVisible();
  }

  async isBookingIdColumnVisible() {
    return await loc.bookingIdColumn(this.page).isVisible();
  }

  async isCustomerNameColumnVisible() {
    return await loc.customerNameColumn(this.page).isVisible();
  }

  async isLoanTypeColumnVisible() {
    return await loc.loanTypeColumn(this.page).isVisible();
  }

  async isBookingDateColumnVisible() {
    return await loc.bookingDateColumn(this.page).isVisible();
  }

  async isAmountColumnVisible() {
    return await loc.amountColumn(this.page).isVisible();
  }

  async isStatusColumnVisible() {
    return await loc.statusColumn(this.page).isVisible();
  }

  async clickExportButton() {
    await loc.exportButton(this.page).click();
  }

  async selectCSVFormat() {
    await loc.csvFormatOption(this.page).click();
  }

  async clickDownloadButton() {
    const downloadPromise = this.page.waitForEvent('download');
    await loc.downloadButton(this.page).click();
    const download = await downloadPromise;
    return download;
  }

  async navigateToReportLists() {
    await this.navigateToReportsDropdown();
    await loc.reportListsOption(this.page).click();
  }

  async isReportListsPageLoaded() {
    return await loc.reportListsContainer(this.page).isVisible();
  }

  async searchReport(searchTerm) {
    await loc.searchReportInput(this.page).fill(searchTerm);
  }

  async isAuditTrailVisible() {
    return await loc.auditTrailGrid(this.page).isVisible();
  }

  async isReportTypeInAuditTrail(reportType) {
    return await this.page.locator(`td:has-text("${reportType}")`).isVisible();
  }

  async isActionInAuditTrail(action) {
    return await this.page.locator(`td:has-text("${action}")`).isVisible();
  }

  async isFormatInAuditTrail(format) {
    return await this.page.locator(`td:has-text("${format}")`).isVisible();
  }

  async isOperatorIdInAuditTrail(operatorId) {
    return await this.page.locator(`td:has-text("${operatorId}")`).isVisible();
  }
}

module.exports = LendingPortalPage;