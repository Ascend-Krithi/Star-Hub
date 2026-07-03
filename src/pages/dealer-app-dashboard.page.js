const loc = require('./locators/dealer-app-dashboard.locators');
const TD = require('../data/dealer-app-test-data');

class DealerAppDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async isDashboardVisible() {
    return await loc.dashboardContainer(this.page).isVisible();
  }

  async isUserManagementVisible() {
    return await loc.userManagementMenu(this.page).isVisible();
  }

  async isReportsVisible() {
    return await loc.reportsMenu(this.page).isVisible();
  }

  async isSettingsVisible() {
    return await loc.settingsMenu(this.page).isVisible();
  }

  async isServicesVisible() {
    return await loc.servicesMenu(this.page).isVisible();
  }

  async isCustomerManagementVisible() {
    return await loc.customerManagementMenu(this.page).isVisible();
  }

  async isOrdersVisible() {
    return await loc.ordersMenu(this.page).isVisible();
  }

  async clickLogout() {
    await loc.logoutButton(this.page).click();
  }

  async navigateToMenu(menuName) {
    const menuMap = {
      'User Management': loc.userManagementMenu,
      'Reports': loc.reportsMenu,
      'Settings': loc.settingsMenu,
      'Services': loc.servicesMenu,
      'Customer Management': loc.customerManagementMenu,
      'Orders': loc.ordersMenu
    };
    const menuLocator = menuMap[menuName];
    if (menuLocator) {
      await menuLocator(this.page).click();
    }
  }

  async getSessionExpiredMessage() {
    return await loc.sessionExpiredMessage(this.page).textContent();
  }

  async isSessionExpiredMessageVisible() {
    return await loc.sessionExpiredMessage(this.page).isVisible();
  }
}

module.exports = DealerAppDashboardPage;