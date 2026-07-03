const locators = {
  dashboardContainer: (page) => page.locator('[data-testid="dashboard-container"]').first(),
  userManagementMenu: (page) => page.getByRole('link', { name: 'User Management' }).first(),
  reportsMenu: (page) => page.getByRole('link', { name: 'Reports' }).first(),
  settingsMenu: (page) => page.getByRole('link', { name: 'Settings' }).first(),
  servicesMenu: (page) => page.getByRole('link', { name: 'Services' }).first(),
  customerManagementMenu: (page) => page.getByRole('link', { name: 'Customer Management' }).first(),
  ordersMenu: (page) => page.getByRole('link', { name: 'Orders' }).first(),
  logoutButton: (page) => page.getByRole('button', { name: 'Logout' }).first(),
  sessionExpiredMessage: (page) => page.locator('[data-testid="session-expired-message"]').first()
};

module.exports = locators;