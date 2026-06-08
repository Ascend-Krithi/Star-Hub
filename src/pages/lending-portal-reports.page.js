const loc = require('./locators/lending-portal-reports.locators');
const TD = require('../data/lending-portal-test-data');
const path = require('path');
const fs = require('fs');

class LendingPortalReportsPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToReportsDropdown() {
    await loc.reportsDropdown(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.reportsDropdown(this.page).click();
    await this.page.waitForTimeout(1000);
  }

  async clickBookingsReport() {
    await loc.bookingsOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.bookingsOption(this.page).click();
    await this.page.waitForTimeout(2000);
  }

  async clickConsolidatedPaymentTransactions() {
    await loc.consolidatedPaymentOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.consolidatedPaymentOption(this.page).click();
    await this.page.waitForTimeout(2000);
  }

  async clickLoanApplications() {
    await loc.loanApplicationsOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.loanApplicationsOption(this.page).click();
    await this.page.waitForTimeout(2000);
  }

  async clickLoanDisbursement() {
    await loc.loanDisbursementOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.loanDisbursementOption(this.page).click();
    await this.page.waitForTimeout(2000);
  }

  async clickLoanDocuments() {
    await loc.loanDocumentsOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.loanDocumentsOption(this.page).click();
    await this.page.waitForTimeout(2000);
  }

  async clickLoanCancellation() {
    await loc.loanCancellationOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.loanCancellationOption(this.page).click();
    await this.page.waitForTimeout(2000);
  }

  async applyDateFilters(dateFrom, dateTo) {
    await loc.dateFromInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.dateFromInput(this.page).fill(dateFrom);
    await loc.dateToInput(this.page).fill(dateTo);
  }

  async selectStatus(status) {
    await loc.statusDropdown(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.statusDropdown(this.page).selectOption({ label: status });
  }

  async selectLoanType(loanType) {
    await loc.loanTypeDropdown(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.loanTypeDropdown(this.page).selectOption({ label: loanType });
  }

  async enterCustomerName(customerName) {
    await loc.customerNameInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.customerNameInput(this.page).fill(customerName);
  }

  async clickGenerateReport() {
    await loc.generateReportButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.generateReportButton(this.page).click();
    await this.page.waitForTimeout(3000);
  }

  async isSummaryViewVisible() {
    await loc.summaryView(this.page).waitFor({ state: 'visible', timeout: 15000 });
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

  async clickTransactionLevelView() {
    await loc.transactionLevelViewButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.transactionLevelViewButton(this.page).click();
    await this.page.waitForTimeout(2000);
  }

  async isDataGridVisible() {
    await loc.dataGrid(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.dataGrid(this.page).isVisible();
  }

  async verifyTransactionColumns() {
    const columns = [
      loc.bookingIdColumn(this.page),
      loc.customerNameColumn(this.page),
      loc.loanTypeColumn(this.page),
      loc.bookingDateColumn(this.page),
      loc.amountColumn(this.page),
      loc.statusColumn(this.page)
    ];
    
    for (const column of columns) {
      await column.waitFor({ state: 'visible', timeout: 10000 });
    }
    return true;
  }

  async clickExportButton() {
    await loc.exportButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.exportButton(this.page).click();
    await this.page.waitForTimeout(1000);
  }

  async selectCSVFormat() {
    await loc.csvFormatOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.csvFormatOption(this.page).click();
  }

  async selectXLSXFormat() {
    await loc.xlsxFormatOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.xlsxFormatOption(this.page).click();
  }

  async selectZIPFormat() {
    await loc.zipFormatOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.zipFormatOption(this.page).click();
  }

  async isXLSXFormatDisabled() {
    try {
      const isVisible = await loc.xlsxFormatOption(this.page).isVisible({ timeout: 5000 });
      if (!isVisible) return true;
      const isDisabled = await loc.xlsxFormatOption(this.page).isDisabled();
      return isDisabled;
    } catch (error) {
      return true;
    }
  }

  async clickDownloadButton() {
    const downloadPromise = this.page.waitForEvent('download', { timeout: 30000 });
    await loc.downloadButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.downloadButton(this.page).click();
    const download = await downloadPromise;
    return download;
  }

  async downloadFile(format) {
    const downloadPromise = this.page.waitForEvent('download', { timeout: 30000 });
    await this.clickExportButton();
    
    if (format === 'CSV') {
      await this.selectCSVFormat();
    } else if (format === 'XLSX') {
      await this.selectXLSXFormat();
    } else if (format === 'ZIP') {
      await this.selectZIPFormat();
    }
    
    await loc.downloadButton(this.page).click();
    const download = await downloadPromise;
    return download;
  }

  async getValidationMessage() {
    await loc.validationMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.validationMessage(this.page).textContent();
  }

  async isValidationMessageVisible() {
    try {
      await loc.validationMessage(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isNoDataMessageVisible() {
    try {
      await loc.noDataMessage(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getRecordCount() {
    const rows = await this.page.locator('table tbody tr, .ag-row').count();
    return rows;
  }
}

module.exports = LendingPortalReportsPage;