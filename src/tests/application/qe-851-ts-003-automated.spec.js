/**
 * Test Spec: QE-851 TS-003 - Transaction Declined for Locked Card
 * Test Case: QE-851 TS-003 TC-001
 * Description: Verify that purchase transaction using locked card is declined with appropriate error
 */
const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-003: Transaction Declined for Locked Card', { tag: ['@regression', '@qe-851'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-003 TC-001] Verify purchase transaction is declined for locked card', async ({ page }) => {
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

    // Step 4: Attempt to make a purchase transaction using the locked card
    await test.step('Step 4: Attempt purchase transaction with locked card', async () => {
      const errorMessage = await cardManagementPage.attemptPurchaseTransaction(
        TD.lockedCard.cardId,
        TD.testTransaction.merchant,
        TD.testTransaction.amount
      );
      
      const isTransactionErrorDisplayed = await cardManagementPage.isTransactionErrorDisplayed();
      expect(isTransactionErrorDisplayed).toBeTruthy();
      
      // Verify error message indicates card is locked
      expect(errorMessage.toLowerCase()).toContain(TD.expectedMessages.cardLockedError.toLowerCase());
    });
  });
});