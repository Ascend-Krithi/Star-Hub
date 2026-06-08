/**
 * Test Spec: QE-851 TS-004 - Transaction Limits Button Disabled for Locked Card
 * Test Case: QE-851 TS-004 TC-001
 * Description: Verify Transaction Limits button is disabled/greyed out for locked card
 */
const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-004: Transaction Limits Button State for Locked Card', { tag: ['@smoke', '@regression', '@qe-851'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-004 TC-001] Verify Transaction Limits button is disabled for locked card', async ({ page }) => {
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

    // Step 4: Select and view the locked card details
    await test.step('Step 4: Select and view locked card details', async () => {
      await cardManagementPage.selectLockedCard(TD.lockedCard.cardId);
      const isCardDetailsScreenDisplayed = await cardManagementPage.isCardDetailsScreenDisplayed();
      expect(isCardDetailsScreenDisplayed).toBeTruthy();
    });

    // Step 5: Check the state of Transaction Limits button
    await test.step('Step 5: Verify Transaction Limits button is disabled and not clickable', async () => {
      const isButtonVisible = await cardManagementPage.isTransactionLimitsButtonVisible();
      expect(isButtonVisible).toBeTruthy();
      
      const isButtonDisabled = await cardManagementPage.isTransactionLimitsButtonDisabled();
      expect(isButtonDisabled).toBeTruthy();
      
      const isButtonClickable = await cardManagementPage.isTransactionLimitsButtonClickable();
      expect(isButtonClickable).toBeFalsy();
    });
  });
});