const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-003: Transaction Blocking for Locked Card', { tag: ['@smoke', '@regression', '@mobile', '@card-management', '@transactions'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-003 TC-001] Verify purchase transaction is declined for locked card', async ({ page }) => {
    cardManagementPage = new MobileCardManagementPage(page);

    // Step 1: Launch the mobile application
    await cardManagementPage.launchMobileApp(TD.urls.mobileAppUrl);
    await expect(cardManagementPage.page.locator('[data-testid="login-screen"]')).toBeVisible();
    
    // Step 2: Enter valid credentials and login to the mobile app
    await cardManagementPage.login(TD.credentials.validUsername, TD.credentials.validPassword);
    await expect(cardManagementPage.page.locator('[data-testid="home-screen"]')).toBeVisible();
    
    // Step 3: Navigate to Card Management section
    await cardManagementPage.navigateToCardManagement();
    await expect(cardManagementPage.page.locator('[data-testid="card-management-screen"]')).toBeVisible();
    await expect(cardManagementPage.page.locator('[data-testid="card-list"]')).toBeVisible();
    
    // Step 4: Attempt to make a purchase transaction using the locked card
    await cardManagementPage.attemptPurchaseTransaction(
      TD.cardData.lockedCardId,
      TD.transactionData.merchant,
      TD.transactionData.amount
    );
    
    // Verify transaction is declined/blocked
    const isDeclined = await cardManagementPage.isTransactionDeclined();
    expect(isDeclined).toBeTruthy();
    
    const errorMessage = await cardManagementPage.getTransactionErrorMessage();
    expect(errorMessage).toMatch(/locked|declined|blocked/i);
  });
});