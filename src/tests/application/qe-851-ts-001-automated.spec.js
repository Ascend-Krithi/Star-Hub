/**
 * Test Spec: QE-851 TS-001 - View Locked Card Status
 * Test Case: QE-851 TS-001 TC-001
 * Description: Verify that card locked via Admin Portal displays 'Locked' status in mobile app
 */
const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-001: View Locked Card Status in Mobile App', { tag: ['@smoke', '@regression', '@qe-851'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-001 TC-001] Verify locked card status is displayed in Card Management section', async ({ page }) => {
    cardManagementPage = new MobileCardManagementPage(page);

    // Step 1: Launch the mobile application
    await test.step('Step 1: Launch the mobile application', async () => {
      await cardManagementPage.launchApp(TD.mobileAppUrl);
      const isLoginScreenDisplayed = await cardManagementPage.isLoginScreenDisplayed();
      expect(isLoginScreenDisplayed).toBeTruthy();
    });

    // Step 2: Enter valid credentials and login to the mobile app
    await test.step('Step 2: Login with valid credentials', async () => {
      await cardManagementPage.login(TD.validUser.username, TD.validUser.password);
      const isHomeScreenDisplayed = await cardManagementPage.isHomeScreenDisplayed();
      expect(isHomeScreenDisplayed).toBeTruthy();
    });

    // Step 3: Navigate to Card Management section
    await test.step('Step 3: Navigate to Card Management section', async () => {
      await cardManagementPage.navigateToCardManagement();
      const isCardManagementScreenDisplayed = await cardManagementPage.isCardManagementScreenDisplayed();
      expect(isCardManagementScreenDisplayed).toBeTruthy();
      
      const isCardListDisplayed = await cardManagementPage.isCardListDisplayed();
      expect(isCardListDisplayed).toBeTruthy();
    });

    // Step 4: View the card status that was locked via Admin Portal
    await test.step('Step 4: Verify locked card status is clearly visible', async () => {
      const isLockedStatusVisible = await cardManagementPage.isLockedStatusVisible();
      expect(isLockedStatusVisible).toBeTruthy();
    });
  });
});