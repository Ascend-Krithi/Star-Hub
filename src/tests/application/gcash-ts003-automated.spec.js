const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-003: Transaction Failure After All Retry Attempts', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-003 TC-001] Verify failure message after all retry attempts are exhausted', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials
    await gcash.login(TD.credentials.fullyVerifiedUser200.username, TD.credentials.fullyVerifiedUser200.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 4: Enter recipient mobile number
    await gcash.enterRecipientMobile(TD.recipients.validMobile);

    // Step 5: Enter transfer amount
    await gcash.enterTransferAmount(TD.amounts.amount150);

    // Step 6: Simulate persistent network timeout and confirm with MPIN
    await gcash.simulatePersistentNetworkTimeout(page);
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser200.mpin);

    // Step 7: Observe system retry attempts (3 times with exponential backoff)
    await gcash.waitForRetryAttempt(TD.retryIntervals.firstRetry);
    await gcash.waitForRetryAttempt(TD.retryIntervals.secondRetry);
    await gcash.waitForRetryAttempt(TD.retryIntervals.thirdRetry);

    // Step 8: Verify failure message is displayed
    await expect(loc.failureMessage(page)).toBeVisible();
    const failureText = await gcash.getFailureMessageText();
    expect(failureText).toContain(TD.messages.networkTimeoutFailure);

    // Verify wallet balance remains unchanged
    const balance = await gcash.getWalletBalance();
    expect(balance).toContain('200');
  });
});