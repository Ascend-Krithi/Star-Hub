const locators = {
  loansMenu: (page) => page.locator('[data-testid="loans-menu"], a:has-text("Loans"), nav a:text-is("Loans")').first(),
  personalLoansSubmenu: (page) => page.locator('[data-testid="personal-loans-submenu"], a:has-text("Personal Loans"), [role="menuitem"]:has-text("Personal Loans")').first()
};

module.exports = locators;