const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-004: Transaction Limits Button State for Locked Card', { tag: ['@smoke', '@regression', '@mobile', '@card-management'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-004 TC-001] Verify Transaction Limits button is disabled for locked card', async ({ page }) => {
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
    
    // Step 4: Select and view the locked card details
    await cardManagementPage.selectCard(TD.cardData.lockedCardId);
    await expect(cardManagementPage.page.locator('[data-testid="card-details-screen"]')).toBeVisible();
    
    // Step 5: Check the state of Transaction Limits button
    await expect(cardManagementPage.page.locator('[data-testid="transaction-limits-button"]')).toBeVisible();
    await expect(cardManagementPage.page.locator('[data-testid="transaction-limits-button"]')).toBeDisabled();
    
    const isDisabled = await cardManagementPage.isTransactionLimitsButtonDisabled();
    expect(isDisabled).toBeTruthy();
  });
});