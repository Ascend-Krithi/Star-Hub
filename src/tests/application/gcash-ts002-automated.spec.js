const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-002: Exponential Backoff Pattern Verification', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-002 TC-001] Verify exponential backoff pattern (2s, 4s, 8s) is correctly implemented', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials
    await gcash.login(TD.credentials.fullyVerifiedUser1000.username, TD.credentials.fullyVerifiedUser1000.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 4: Enter recipient mobile number
    await gcash.enterRecipientMobile(TD.recipients.validMobile);

    // Step 5: Enter transfer amount
    await gcash.enterTransferAmount(TD.amounts.amount500);

    // Step 6: Simulate persistent network timeout and confirm with MPIN
    await gcash.simulatePersistentNetworkTimeout(page);
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser1000.mpin);

    // Step 7: Monitor first retry attempt (~2 seconds)
    const startTime1 = Date.now();
    await gcash.waitForRetryAttempt(TD.retryIntervals.firstRetry);
    const interval1 = await gcash.measureRetryInterval(startTime1);
    expect(interval1).toBeGreaterThanOrEqual(1.8);
    expect(interval1).toBeLessThanOrEqual(2.5);

    // Step 8: Monitor second retry attempt (~4 seconds)
    const startTime2 = Date.now();
    await gcash.waitForRetryAttempt(TD.retryIntervals.secondRetry);
    const interval2 = await gcash.measureRetryInterval(startTime2);
    expect(interval2).toBeGreaterThanOrEqual(3.5);
    expect(interval2).toBeLessThanOrEqual(4.5);

    // Step 9: Monitor third retry attempt (~8 seconds)
    const startTime3 = Date.now();
    await gcash.waitForRetryAttempt(TD.retryIntervals.thirdRetry);
    const interval3 = await gcash.measureRetryInterval(startTime3);
    expect(interval3).toBeGreaterThanOrEqual(7.5);
    expect(interval3).toBeLessThanOrEqual(8.5);

    // Step 10: Verify exponential backoff pattern
    expect(interval1).toBeLessThan(interval2);
    expect(interval2).toBeLessThan(interval3);
  });
});