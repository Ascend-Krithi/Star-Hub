const loc = require('./locators/helpdesk-dashboard.locators');
const TD = require('../data/helpdesk-test-data');

class HelpdeskDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.application, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(username, password) {
    await loc.usernameInput(this.page).fill(username);
    await loc.passwordInput(this.page).fill(password);
    await loc.loginButton(this.page).click();
  }

  async navigateToDashboard() {
    await loc.dashboardMenuItem(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getNewStatusCount() {
    return await loc.newStatusCount(this.page).textContent();
  }

  async getOngoingStatusCount() {
    return await loc.ongoingStatusCount(this.page).textContent();
  }

  async getRejectStatusCount() {
    return await loc.rejectStatusCount(this.page).textContent();
  }

  async getClosedStatusCount() {
    return await loc.closedStatusCount(this.page).textContent();
  }

  async getInquiryCategoryCount() {
    return await loc.inquiryCategoryCount(this.page).textContent();
  }

  async getRequestCategoryCount() {
    return await loc.requestCategoryCount(this.page).textContent();
  }

  async getDisputeCategoryCount() {
    return await loc.disputeCategoryCount(this.page).textContent();
  }

  async getNuisanceCategoryCount() {
    return await loc.nuisanceCategoryCount(this.page).textContent();
  }

  async getInvalidCategoryCount() {
    return await loc.invalidCategoryCount(this.page).textContent();
  }

  async getBacklogCount() {
    return await loc.backlogCount(this.page).textContent();
  }

  async isResolutionTrendsVisible() {
    return await loc.resolutionTrendsChart(this.page).isVisible();
  }

  async selectCategoryFilter(category) {
    await loc.categoryFilterDropdown(this.page).click();
    await loc.categoryFilterOption(this.page, category).click();
  }

  async selectStatusFilter(status) {
    await loc.statusFilterDropdown(this.page).click();
    await loc.statusFilterOption(this.page, status).click();
  }

  async applyFilters() {
    const applyButton = loc.applyFilterButton(this.page);
    if (await applyButton.isVisible()) {
      await applyButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async clearAllFilters() {
    await loc.clearAllFiltersButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getActiveFilterText() {
    return await loc.activeFilterBadge(this.page).textContent();
  }

  async isCategoryFilterDropdownVisible() {
    return await loc.categoryFilterDropdown(this.page).isVisible();
  }

  async isStatusFilterDropdownVisible() {
    return await loc.statusFilterDropdown(this.page).isVisible();
  }

  async getSLA1DayMetrics() {
    return {
      total: await loc.sla1DayTotal(this.page).textContent(),
      withinSLA: await loc.sla1DayWithinSLA(this.page).textContent(),
      breached: await loc.sla1DayBreached(this.page).textContent()
    };
  }

  async getSLA2DayMetrics() {
    return {
      total: await loc.sla2DayTotal(this.page).textContent(),
      withinSLA: await loc.sla2DayWithinSLA(this.page).textContent(),
      breached: await loc.sla2DayBreached(this.page).textContent()
    };
  }

  async getSLA3DayMetrics() {
    return {
      total: await loc.sla3DayTotal(this.page).textContent(),
      withinSLA: await loc.sla3DayWithinSLA(this.page).textContent(),
      breached: await loc.sla3DayBreached(this.page).textContent()
    };
  }

  async getSLA5DayMetrics() {
    return {
      total: await loc.sla5DayTotal(this.page).textContent(),
      withinSLA: await loc.sla5DayWithinSLA(this.page).textContent(),
      breached: await loc.sla5DayBreached(this.page).textContent()
    };
  }

  async getSLACompliancePercentage(days) {
    return await loc.slaCompliancePercentage(this.page, days).textContent();
  }

  async isSLAResolutionTrendsVisible() {
    return await loc.slaResolutionTrendsChart(this.page).isVisible();
  }

  async isSLAMetricsSectionVisible() {
    return await loc.slaMetricsSection(this.page).isVisible();
  }

  async getNoTicketsMessage() {
    return await loc.noTicketsMessage(this.page).textContent();
  }

  async isNoTicketsMessageVisible() {
    return await loc.noTicketsMessage(this.page).isVisible();
  }

  async isConnectionErrorVisible() {
    return await loc.connectionErrorMessage(this.page).isVisible();
  }

  async getConnectionErrorMessage() {
    return await loc.connectionErrorMessage(this.page).textContent();
  }

  async isSyncWarningVisible() {
    return await loc.syncWarningMessage(this.page).isVisible();
  }

  async getLastSyncTimestamp() {
    return await loc.lastSyncTimestamp(this.page).textContent();
  }

  async isTicketListEmpty() {
    const count = await loc.ticketRecord(this.page).count();
    return count === 0;
  }

  async getTicketRecordCount() {
    return await loc.ticketRecord(this.page).count();
  }
}

module.exports = HelpdeskDashboardPage;