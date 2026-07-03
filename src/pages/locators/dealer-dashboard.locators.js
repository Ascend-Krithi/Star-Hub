const locators = {
  dashboardContainer: (page) => page.locator('[data-testid="dashboard"]').or(page.locator('.dashboard-container')).first(),
  userManagementMenu: (page) => page.getByRole('link', { name: /user management/i }).or(page.locator('[data-testid="user-management"]')).first(),
  reportsMenu: (page) => page.getByRole('link', { name: /reports/i }).or(page.locator('[data-testid="reports"]')).first(),
  settingsMenu: (page) => page.getByRole('link', { name: /settings/i }).or(page.locator('[data-testid="settings"]')).first(),
  allServicesMenu: (page) => page.getByRole('link', { name: /all services/i }).or(page.locator('[data-testid="all-services"]')).first(),
  customerManagementMenu: (page) => page.getByRole('link', { name: /customer management/i }).or(page.locator('[data-testid="customer-management"]')).first(),
  ordersMenu: (page) => page.getByRole('link', { name: /orders/i }).or(page.locator('[data-testid="orders"]')).first(),
  salesDashboard: (page) => page.locator('[data-testid="sales-dashboard"]').or(page.locator('.sales-dashboard')).first(),
  logoutButton: (page) => page.getByRole('button', { name: /log out|logout|sign out/i }).first()
};

module.exports = locators;