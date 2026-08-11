const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-64: Verify authentication popup does not appear when viewing loan details without clicking Apply Now', {
  tag: ['@smoke', '@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-64] No authentication popup when viewing loan details', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser without logging in
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homepage);

    // Step 2-4: Navigate to Flexible Personal Loan details page
    await loansPage.navigateToFlexiblePersonalLoanDetails();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 5: View and review the loan details WITHOUT clicking Apply Now button
    await expect(loansPage.page.locator('[data-testid="loan-amount"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="loan-tenure"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="repayment-frequency"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="estimated-monthly-repayment"]')).toBeVisible();

    // Step 6: Verify that no authentication popup appears on the screen
    const isPopupVisible = await loansPage.page.locator('[data-testid="auth-popup"]').isVisible().catch(() => false);
    expect(isPopupVisible).toBeFalsy();

    // User can continue viewing loan details
    await expect(loansPage.page.locator('[data-testid="apply-now-button"]')).toBeVisible();
  });
});