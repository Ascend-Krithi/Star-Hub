/**
 * Test Spec: QE-851 TS-002 TC-001 - Unlock Card Prompt
 * Test Case: QE-851 TS-002 TC-001
 * Description: Verify that tapping Unlock Card button displays prompt advising to file in-app ticket
 */
const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-002: Unlock Card Functionality', { tag: ['@smoke', '@regression', '@qe-851'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-002 TC-001] Verify unlock card button displays advisory prompt', async ({ page }) => {
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
      
      const isLockedStatusDisplayed = await cardManagementPage.isLockedStatusDisplayedOnDetails();
      expect(isLockedStatusDisplayed).toBeTruthy();
    });

    // Step 5: Tap on the Unlock Card button
    await test.step('Step 5: Tap Unlock Card button and verify prompt', async () => {
      await cardManagementPage.clickUnlockCardButton();
      const isUnlockPromptDisplayed = await cardManagementPage.isUnlockPromptDisplayed();
      expect(isUnlockPromptDisplayed).toBeTruthy();
    });
  });
});