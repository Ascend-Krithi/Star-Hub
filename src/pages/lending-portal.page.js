/**
 * Page Object — Lending Portal
 * Handles all interactions with Lending Portal application
 */

const loc = require('./locators/lending-portal.locators');
const TD = require('../data/lending-portal-test-data');

class LendingPortalPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.lendingPortal, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(username, password) {
    await loc.usernameField(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.usernameField(this.page).fill(username);
    await loc.passwordField(this.page).fill(password);
    await loc.loginButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  async isDashboardVisible() {
    await loc.dashboard(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.dashboard(this.page).isVisible();
  }

  async navigateToReportsMenu() {
    await loc.reportsDropdown(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.reportsDropdown(this.page).click();
  }

  async clickBookingsOption() {
    await loc.bookingsOption(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.bookingsOption(this.page).click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  async isBookingsReportPageVisible() {
    await loc.bookingsReportPage(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.bookingsReportPage(this.page).isVisible();
  }

  async selectDateFrom(date) {
    await loc.dateFromField(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.dateFromField(this.page).fill(date);
  }

  async selectDateTo(date) {
    await loc.dateToField(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.dateToField(this.page).fill(date);
  }

  async selectStatus(status) {
    await loc.statusDropdown(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.statusDropdown(this.page).selectOption(status);
  }

  async selectLoanType(loanType) {
    await loc.loanTypeDropdown(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.loanTypeDropdown(this.page).selectOption(loanType);
  }

  async applyFilters(dateFrom, dateTo, status, loanType) {
    await this.selectDateFrom(dateFrom);
    await this.selectDateTo(dateTo);
    await this.selectStatus(status);
    await this.selectLoanType(loanType);
  }

  async clickGenerateReport() {
    await loc.generateReportButton(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.generateReportButton(this.page).click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
  }

  async isSummaryViewVisible() {
    await loc.summaryView(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.summaryView(this.page).isVisible();
  }

  async verifySummaryMetrics() {
    const metrics = [];
    if (await loc.totalBookings(this.page).isVisible()) metrics.push('Total Bookings');
    if (await loc.totalAmount(this.page).isVisible()) metrics.push('Total Amount');
    if (await loc.confirmedBookings(this.page).isVisible()) metrics.push('Confirmed Bookings');
    if (await loc.pendingBookings(this.page).isVisible()) metrics.push('Pending Bookings');
    return metrics;
  }

  async clickViewDetails() {
    await loc.viewDetailsButton(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.viewDetailsButton(this.page).click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
  }

  async isTransactionViewVisible() {
    await loc.transactionView(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.transactionView(this.page).isVisible();
  }

  async getDataGridColumns() {
    await loc.dataGrid(this.page).waitFor({ state: 'visible', timeout: 15000 });
    const headers = await loc.gridHeaders(this.page).allTextContents();
    return headers;
  }

  async clickExportButton() {
    await loc.exportButton(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.exportButton(this.page).click();
  }

  async selectExportFormat(format) {
    await loc.exportFormatDropdown(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.exportFormatDropdown(this.page).selectOption(format);
  }

  async clickDownloadButton() {
    const downloadPromise = this.page.waitForEvent('download', { timeout: 60000 });
    await loc.downloadButton(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.downloadButton(this.page).click();
    const download = await downloadPromise;
    return download;
  }

  async exportReport(format) {
    await this.clickExportButton();
    await this.selectExportFormat(format);
    const download = await this.clickDownloadButton();
    return download;
  }
}

module.exports = LendingPortalPage;