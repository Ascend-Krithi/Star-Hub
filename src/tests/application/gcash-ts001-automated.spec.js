const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-001: Network Timeout with Successful Retry', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-001 TC-001] Verify automatic retry with exponential backoff succeeds after network timeout', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 2: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 3: Login with valid credentials
    await gcash.login(TD.credentials.fullyVerifiedUser500.username, TD.credentials.fullyVerifiedUser500.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 4: Navigate to Send Money
    await gcash.navigateToSendMoney();
    await expect(loc.sendMoneyScreen(page)).toBeVisible();

    // Step 5: Select Express Send
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 6: Enter recipient mobile number
    await gcash.enterRecipientMobile(TD.recipients.validMobile);

    // Step 7: Enter transfer amount
    await gcash.enterTransferAmount(TD.amounts.amount100);

    // Step 8: Simulate network timeout and confirm with MPIN
    await gcash.simulateNetworkTimeoutWithRetrySuccess(page, 2);
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser500.mpin);

    // Step 9: Observe system retry attempts
    await gcash.waitForRetryAttempt(TD.retryIntervals.firstRetry);
    await expect(loc.retryIndicator(page)).toBeVisible();

    // Step 10: Verify transaction completes successfully
    await expect(loc.successMessage(page)).toBeVisible();
    const successText = await gcash.getSuccessMessageText();
    expect(successText).toContain(TD.messages.successMessage);

    // Verify wallet balance is debited
    const newBalance = await gcash.getWalletBalance();
    expect(newBalance).toContain('400');
  });
});