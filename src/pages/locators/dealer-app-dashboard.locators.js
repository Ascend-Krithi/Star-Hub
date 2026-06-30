const locators = {
  dashboardTitle: (page) => page.locator('h1, .dashboard-title').first(),
  userManagementMenu: (page) => page.locator('a:has-text("User Management"), [data-testid="user-management"]').first(),
  reportsMenu: (page) => page.locator('a:has-text("Reports"), [data-testid="reports"]').first(),
  settingsMenu: (page) => page.locator('a:has-text("Settings"), [data-testid="settings"]').first(),
  allServicesMenu: (page) => page.locator('a:has-text("All Services"), [data-testid="all-services"]').first(),
  customerManagementMenu: (page) => page.locator('a:has-text("Customer Management"), [data-testid="customer-management"]').first(),
  ordersMenu: (page) => page.locator('a:has-text("Orders"), [data-testid="orders"]').first(),
  logoutButton: (page) => page.locator('button:has-text("Logout"), a:has-text("Logout"), [data-testid="logout"]').first(),
  dealerInfo: (page) => page.locator('.dealer-info, [data-testid="dealer-info"]').first()
};

module.exports = locators;