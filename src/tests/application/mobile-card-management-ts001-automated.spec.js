const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-001: View Locked Card Status in Mobile App', { tag: ['@smoke', '@regression', '@mobile', '@card-management'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-001 TC-001] Verify locked card status is displayed in mobile app', async ({ page }) => {
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
    
    // Step 4: View the card status that was locked via Admin Portal
    const cardStatus = await cardManagementPage.getCardStatus(TD.cardData.lockedCardId);
    await expect(cardManagementPage.page.locator('[data-testid="locked-status-indicator"]')).toBeVisible();
    expect(cardStatus).toContain(TD.statuses.locked);
  });
});