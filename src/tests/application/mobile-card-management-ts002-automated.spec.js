const { test, expect } = require('../../fixtures');
const MobileCardManagementPage = require('../../pages/mobile-card-management.page');
const TD = require('../../data/mobile-card-test-data');

test.describe('[UI] QE-851 TS-002: Unlock Card Prompt Verification', { tag: ['@smoke', '@regression', '@mobile', '@card-management'] }, () => {
  let cardManagementPage;

  test('[QE-851 TS-002 TC-001] Verify unlock card button displays prompt advising to file in-app ticket', async ({ page }) => {
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
    const cardStatus = await cardManagementPage.getCardDetailsStatus();
    expect(cardStatus).toContain(TD.statuses.locked);
    
    // Step 5: Tap on the Unlock Card button
    await cardManagementPage.clickUnlockCardButton();
    await expect(cardManagementPage.page.locator('[data-testid="unlock-card-prompt"]')).toBeVisible();
  });

  test('[QE-851 TS-002 TC-002] Verify unlock prompt message content and OK button presence', async ({ page }) => {
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
    const cardStatus = await cardManagementPage.getCardDetailsStatus();
    expect(cardStatus).toContain(TD.statuses.locked);
    
    // Step 5: Tap on the Unlock Card button
    await cardManagementPage.clickUnlockCardButton();
    await expect(cardManagementPage.page.locator('[data-testid="unlock-card-prompt"]')).toBeVisible();
    
    // Step 6: Verify the prompt message content
    const promptMessage = await cardManagementPage.getUnlockPromptMessage();
    expect(promptMessage).toContain(TD.messages.unlockPromptMessage);
    await expect(cardManagementPage.page.locator('[data-testid="unlock-prompt-ok-button"]')).toBeVisible();
  });
});