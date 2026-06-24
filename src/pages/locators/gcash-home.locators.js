const locators = {
  homeScreen: (page) => page.locator('[data-testid="home-screen"]').first(),
  bottomNavigation: (page) => page.locator('[data-testid="bottom-navigation"]').first(),
  homeTab: (page) => page.locator('[data-testid="nav-home"]').first(),
  profileTab: (page) => page.locator('[data-testid="nav-profile"]').first(),
  sendMoneyOption: (page) => page.locator('[data-testid="send-money-option"]').first(),
  balanceDisplay: (page) => page.locator('[data-testid="balance-display"]').first()
};

module.exports = locators;