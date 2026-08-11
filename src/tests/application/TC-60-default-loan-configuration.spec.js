const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-60: Verify default loan configuration displays correctly on Flexible Personal Loan details page', {
  tag: ['@smoke', '@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-60] Default loan configuration displays correctly', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1-4: Navigate to Flexible Personal Loan details page
    await loansPage.goto();
    await loansPage.navigateToFlexiblePersonalLoanDetails();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 5: Verify that the default loan amount is displayed
    await expect(loansPage.page.locator('[data-testid="loan-amount"]')).toBeVisible();
    const loanAmount = await loansPage.getLoanAmount();
    expect(loanAmount).toBeTruthy();

    // Step 6: Verify that the loan tenure is set to 36 months by default
    await expect(loansPage.page.locator('[data-testid="loan-tenure"]')).toBeVisible();
    const tenure = await loansPage.getLoanTenure();
    expect(tenure).toContain(TD.defaultLoanConfig.tenure);

    // Step 7: Verify that the repayment frequency is set to 'Monthly' by default
    await expect(loansPage.page.locator('[data-testid="repayment-frequency"]')).toBeVisible();
    const frequency = await loansPage.getRepaymentFrequency();
    expect(frequency).toContain(TD.defaultLoanConfig.frequency);

    // Step 8: Verify that the estimated monthly repayment amount is displayed
    await expect(loansPage.page.locator('[data-testid="estimated-monthly-repayment"]')).toBeVisible();
    const monthlyRepayment = await loansPage.getEstimatedMonthlyRepayment();
    expect(monthlyRepayment).toBeTruthy();

    // Step 9: Verify that all selected options are clearly visible on the page
    await expect(loansPage.page.locator('[data-testid="loan-amount"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="loan-tenure"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="repayment-frequency"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="estimated-monthly-repayment"]')).toBeVisible();
  });
});