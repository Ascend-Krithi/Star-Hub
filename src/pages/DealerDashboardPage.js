const loc = require('./locators/dealer-dashboard.locators');

class DealerDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async isDashboardDisplayed() {
    const dashboard = loc.dashboardContainer(this.page);
    await dashboard.waitFor({ state: 'visible', timeout: 30000 });
    return await dashboard.isVisible();
  }

  async isServicesDisplayed() {
    const services = loc.servicesSection(this.page);
    return await services.isVisible();
  }

  async isManagementOptionsDisplayed() {
    const managementOpts = loc.managementOptions(this.page);
    return await managementOpts.isVisible();
  }

  async canAccessServices() {
    return await this.isServicesDisplayed() && await this.isManagementOptionsDisplayed();
  }
}

module.exports = DealerDashboardPage;