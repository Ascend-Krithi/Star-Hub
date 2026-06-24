const { test, expect } = require('../../fixtures');
const GCashLoginPage = require('../../pages/gcash-login.page');
const GCashHomePage = require('../../pages/gcash-home.page');
const GCashSendMoneyPage = require('../../pages/gcash-send-money.page');
const TD = require('../../data/gcash-test-data');

test.describe('[Mobile] AD-66 TS-007: Amount Adjustment for Fully Verified Account Limit', { tag: ['@regression', '@gcash'] }, () => {
  let loginPage;
  let homePage;
  let sendMoneyPage;

  test('[AD-66 TS-007 TC-001] Verify system restricts amount to Fully Verified Account limit of ₱50,000', async ({ page }) => {
    loginPage = new GCashLoginPage(page);
    homePage = new GCashHomePage(page);
    sendMoneyPage = new GCashSendMoneyPage(page);

    // Step 1: Launch the GCash application
    await loginPage.goto();
    await expect(loginPage.isLoginScreenDisplayed()).resolves.toBe(true);

    // Step 2: Login with Fully Verified Account having ₱50,000 remaining limit
    await loginPage.loginAsSender();
    await expect(homePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Step 3: Navigate to Send Money and scan QR
    await homePage.navigateToHomeTab();
    await homePage.selectSendMoneyOption();
    await sendMoneyPage.clickScanQRButton();
    await expect(sendMoneyPage.isCameraOpen()).resolves.toBe(true);

    // Step 4: Scan QR code with preset amount ₱75,000
    await sendMoneyPage.scanQRCode();

    // Step 5-6: Verify amount adjustment options within ₱50,000 limit
    await expect(sendMoneyPage.isAdjustAmountScreenDisplayed()).resolves.toBe(true);
    const originalAmount = await sendMoneyPage.getOriginalAmount();
    await expect(originalAmount).toBe(TD.amounts.preset75000);

    // Verify suggested amounts are within limit
    for (const amount of TD.suggestedAmounts.fullyVerified) {
      const suggestedAmountElement = await page.locator(`[data-testid="suggested-amount-${amount}"]`);
      await expect(suggestedAmountElement).toBeVisible();
    }

    // Step 7: Verify system rejects amount greater than ₱50,000
    await sendMoneyPage.enterCustomAmount('₱60,000');
    const errorMessage = await sendMoneyPage.getErrorMessage();
    await expect(errorMessage).toContain(TD.errors.limitExceeded);
  });
});