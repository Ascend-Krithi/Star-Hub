const { test, expect } = require('../../fixtures');
const GCashLoginPage = require('../../pages/gcash-login.page');
const GCashHomePage = require('../../pages/gcash-home.page');
const GCashProfilePage = require('../../pages/gcash-profile.page');
const GCashQRGenerationPage = require('../../pages/gcash-qr-generation.page');
const GCashSendMoneyPage = require('../../pages/gcash-send-money.page');
const TD = require('../../data/gcash-test-data');

test.describe('[Mobile] AD-66 TS-010: Complete Send Money Transaction Using Valid QR Code', { tag: ['@e2e', '@regression', '@gcash'] }, () => {
  let loginPage;
  let homePage;
  let profilePage;
  let qrGenerationPage;
  let sendMoneyPage;

  test('[AD-66 TS-010 TC-001] Verify complete money transfer using valid QR code with preset amount', async ({ page, context }) => {
    // Recipient Device Setup
    loginPage = new GCashLoginPage(page);
    homePage = new GCashHomePage(page);
    profilePage = new GCashProfilePage(page);
    qrGenerationPage = new GCashQRGenerationPage(page);

    // Step 1-2: Launch and login as recipient
    await loginPage.goto();
    await loginPage.loginAsRecipient();
    await expect(homePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Step 3: Navigate to Profile and generate QR
    await homePage.navigateToProfileTab();
    await profilePage.selectGenerateQROption();
    await expect(qrGenerationPage.isQRGenerationScreenDisplayed()).resolves.toBe(true);

    // Step 4: Generate QR code with preset amount ₱500
    await qrGenerationPage.generateQRWithAmount(TD.amounts.preset500);
    await expect(qrGenerationPage.isQRCodeDisplayed()).resolves.toBe(true);

    // Sender Device Setup
    const senderPage = await context.newPage();
    const senderLoginPage = new GCashLoginPage(senderPage);
    const senderHomePage = new GCashHomePage(senderPage);
    sendMoneyPage = new GCashSendMoneyPage(senderPage);

    // Step 5: Launch and login as sender with sufficient balance
    await senderLoginPage.goto();
    await senderLoginPage.loginAsSender();
    await expect(senderHomePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Verify initial balance
    const initialBalance = await senderHomePage.getBalance();
    await expect(initialBalance).toBe(TD.amounts.balance1000);

    // Step 6-7: Navigate to Send Money and scan QR
    await senderHomePage.navigateToHomeTab();
    await senderHomePage.selectSendMoneyOption();
    await sendMoneyPage.clickScanQRButton();
    await expect(sendMoneyPage.isCameraOpen()).resolves.toBe(true);
    await sendMoneyPage.scanQRCode();

    // Verify recipient mobile and amount are populated
    const recipientMobile = await sendMoneyPage.getRecipientMobile();
    await expect(recipientMobile).toBe(TD.qrCodeData.validRecipientMobile);
    const amount = await sendMoneyPage.getAmountField();
    await expect(amount).toBe(TD.amounts.preset500);

    // Step 8: Confirm transaction
    await sendMoneyPage.clickConfirmButton();

    // Step 9: Verify transaction success
    await expect(sendMoneyPage.isTransactionSuccessDisplayed()).resolves.toBe(true);
    const transactionRef = await sendMoneyPage.getTransactionReference();
    await expect(transactionRef).toBeTruthy();

    // Step 10: Verify sender balance is deducted
    await senderHomePage.navigateToHomeTab();
    const newBalance = await senderHomePage.getBalance();
    await expect(newBalance).toBe(TD.amounts.balance500);

    await senderPage.close();
  });
});