const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-010: Successful Transaction After Second Retry', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-010 TC-001] Verify transaction succeeds on second retry and appears in history', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials (balance ≥ ₱600)
    await gcash.login(TD.credentials.fullyVerifiedUser600.username, TD.credentials.fullyVerifiedUser600.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 4: Enter recipient mobile number
    await gcash.enterRecipientMobile(TD.recipients.validMobile);

    // Step 5: Enter transfer amount
    await gcash.enterTransferAmount(TD.amounts.amount400);

    // Step 6: Simulate network timeout that resolves on second retry
    await gcash.simulateNetworkTimeoutWithRetrySuccess(page, 2);
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser600.mpin);

    // Step 7: Observe first retry attempt after ~2 seconds
    await gcash.waitForRetryAttempt(TD.retryIntervals.firstRetry);
    await expect(loc.retryIndicator(page)).toBeVisible();

    // Step 8: Observe second retry attempt succeeds
    await gcash.waitForRetryAttempt(TD.retryIntervals.secondRetry);

    // Step 9: Verify transaction success message is displayed
    await expect(loc.successMessage(page)).toBeVisible();
    const successText = await gcash.getSuccessMessageText();
    expect(successText).toContain(TD.messages.successMessage);

    // Step 10: Verify wallet balance is debited correctly
    const newBalance = await gcash.getWalletBalance();
    expect(newBalance).toContain('200');

    // Step 11: Verify transaction appears in transaction history
    await gcash.navigateToTransactionHistory();
    const isInHistory = await gcash.isTransactionInHistory(TD.recipients.validMobile, TD.amounts.amount400);
    expect(isInHistory).toBe(true);
  });
});