const locators = {
  profileScreen: (page) => page.locator('[data-testid="profile-screen"]').first(),
  generateQROption: (page) => page.locator('[data-testid="generate-qr-option"]').first(),
  userProfileOptions: (page) => page.locator('[data-testid="profile-options"]').first()
};

module.exports = locators;