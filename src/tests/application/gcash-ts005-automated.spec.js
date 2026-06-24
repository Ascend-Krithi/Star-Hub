const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-005: Transaction Details Preservation After Insufficient Balance', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-005 TC-001] Verify transaction details are preserved after insufficient balance error', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials (balance = ₱30)
    await gcash.login(TD.credentials.fullyVerifiedUser30.username, TD.credentials.fullyVerifiedUser30.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 4: Enter recipient mobile number
    await gcash.enterRecipientMobile(TD.recipients.validMobile);

    // Step 5: Enter transfer amount greater than wallet balance
    await gcash.enterTransferAmount(TD.amounts.amount200);

    // Step 6: Confirm transaction with MPIN
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser30.mpin);

    // Step 7: Verify error message with preserved transaction details
    await expect(loc.insufficientBalanceError(page)).toBeVisible();
    
    // Verify recipient mobile number is preserved
    const recipientValue = await loc.recipientInput(page).inputValue();
    expect(recipientValue).toBe(TD.recipients.validMobile);
    
    // Verify transfer amount is preserved
    const amountValue = await loc.amountInput(page).inputValue();
    expect(amountValue).toBe(TD.amounts.amount200);

    // Step 8: Verify user can retry without re-entering details
    await expect(loc.recipientInput(page)).toHaveValue(TD.recipients.validMobile);
    await expect(loc.amountInput(page)).toHaveValue(TD.amounts.amount200);
  });
});