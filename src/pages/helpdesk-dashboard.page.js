const loc = require('./locators/helpdesk-dashboard.locators');

class HelpdeskDashboardPage {
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

  async navigateToDashboard() {
    await loc.dashboardMenuItem(this.page).click();
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
    await loc.categoryFilterDropdown(this.page).selectOption(category);
  }

  async selectStatusFilter(status) {
    await loc.statusFilterDropdown(this.page).selectOption(status);
  }

  async applyFilters() {
    const applyButton = loc.applyFilterButton(this.page);
    if (await applyButton.isVisible()) {
      await applyButton.click();
    }
  }

  async clearAllFilters() {
    await loc.clearFiltersButton(this.page).click();
  }

  async getActiveFilterText() {
    return await loc.activeFilterBadge(this.page).textContent();
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

  async isNoDataMessageVisible() {
    return await loc.noDataMessage(this.page).isVisible();
  }

  async isSyncErrorVisible() {
    return await loc.syncErrorIndicator(this.page).isVisible();
  }

  async getLastUpdatedTimestamp() {
    return await loc.lastUpdatedTimestamp(this.page).textContent();
  }
}

module.exports = HelpdeskDashboardPage;