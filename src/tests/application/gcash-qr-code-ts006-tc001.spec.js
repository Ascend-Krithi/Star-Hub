const { test, expect } = require('../../fixtures');
const GCashLoginPage = require('../../pages/gcash-login.page');
const GCashHomePage = require('../../pages/gcash-home.page');
const GCashSendMoneyPage = require('../../pages/gcash-send-money.page');
const TD = require('../../data/gcash-test-data');

test.describe('[Mobile] AD-66 TS-006: Amount Adjustment for Basic Account Limit', { tag: ['@regression', '@gcash'] }, () => {
  let loginPage;
  let homePage;
  let sendMoneyPage;

  test('[AD-66 TS-006 TC-001] Verify system provides amount adjustment when QR amount exceeds Basic Account limit', async ({ page }) => {
    loginPage = new GCashLoginPage(page);
    homePage = new GCashHomePage(page);
    sendMoneyPage = new GCashSendMoneyPage(page);

    // Step 1: Launch the GCash application
    await loginPage.goto();
    await expect(loginPage.isLoginScreenDisplayed()).resolves.toBe(true);

    // Step 2: Login with Basic Account having ₱2,000 remaining limit
    await loginPage.loginAsSender();
    await expect(homePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Step 3: Navigate to Send Money
    await homePage.navigateToHomeTab();
    await homePage.selectSendMoneyOption();
    await expect(sendMoneyPage.isSendMoneyScreenDisplayed()).resolves.toBe(true);

    // Step 4: Click Scan QR Code
    await sendMoneyPage.clickScanQRButton();
    await expect(sendMoneyPage.isCameraOpen()).resolves.toBe(true);

    // Step 5: Scan QR code with preset amount ₱5,000
    await sendMoneyPage.scanQRCode();

    // Step 6-7: Verify amount adjustment screen is displayed
    await expect(sendMoneyPage.isAdjustAmountScreenDisplayed()).resolves.toBe(true);
    const originalAmount = await sendMoneyPage.getOriginalAmount();
    await expect(originalAmount).toBe(TD.amounts.preset5000);
    
    const limitMessage = await sendMoneyPage.getLimitMessage();
    await expect(limitMessage).toContain(TD.limits.basicRemaining);

    // Verify suggested amounts are within limit
    for (const amount of TD.suggestedAmounts.basic) {
      const suggestedAmountElement = await page.locator(`[data-testid="suggested-amount-${amount}"]`);
      await expect(suggestedAmountElement).toBeVisible();
    }
  });
});