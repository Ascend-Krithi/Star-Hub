/**
 * Test Spec: QE-851 TS-002 TC-002 - Verify Unlock Prompt Message Content
 * Test Case: QE-851 TS-002 TC-002
 * Description: Verify unlock prompt message content and OK button presence
 */
const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-002: Unlock Card Prompt Message Validation', { tag: ['@regression', '@qe-851'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-002 TC-002] Verify unlock prompt message content and OK button', async ({ page }) => {
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
    await test.step('Step 5: Tap Unlock Card button', async () => {
      await cardManagementPage.clickUnlockCardButton();
      const isUnlockPromptDisplayed = await cardManagementPage.isUnlockPromptDisplayed();
      expect(isUnlockPromptDisplayed).toBeTruthy();
    });

    // Step 6: Verify the prompt message content
    await test.step('Step 6: Verify prompt message content and OK button', async () => {
      const promptMessage = await cardManagementPage.getUnlockPromptMessage();
      expect(promptMessage).toContain(TD.expectedMessages.unlockPromptMessage);
      
      const isOkButtonVisible = await cardManagementPage.isPromptOkButtonVisible();
      expect(isOkButtonVisible).toBeTruthy();
    });
  });
});