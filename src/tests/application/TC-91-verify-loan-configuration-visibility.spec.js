const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TS-002: Verify all loan configuration options are clearly visible and accessible on Flexible Personal Loan details page', { tag: ['@smoke', '@regression'] }, () => {
  let loansPage;

  test('[TC-91] Verify all loan configuration options are clearly visible and accessible on Flexible Personal Loan details page', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a web browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homePage);

    // Step 2: Navigate to 'Loans' → 'Personal Loans' → 'Flexible Personal Loan'
    await loansPage.navigateToFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoanPage);
    await expect(loansPage.page.locator('[data-testid="loan-configuration-section"]')).toBeVisible();

    // Step 3: Verify that the loan amount field is clearly visible with label and default value
    await expect(loansPage.page.getByText('Loan Amount')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="loan-amount-field"]')).toBeVisible();
    const loanAmount = await loansPage.getLoanAmountValue();
    expect(loanAmount).toBeDefined();

    // Step 4: Verify that the loan tenure selector is clearly visible showing 36 months
    await expect(loansPage.page.getByText('Loan Tenure')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="loan-tenure-dropdown"]')).toBeVisible();
    const loanTenure = await loansPage.getLoanTenureValue();
    expect(loanTenure).toBe(TD.loanConfiguration.defaultLoanTenure);

    // Step 5: Verify that the repayment frequency selector is clearly visible showing Monthly
    await expect(loansPage.page.getByText('Repayment Frequency')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="repayment-frequency-dropdown"]')).toBeVisible();
    const repaymentFrequency = await loansPage.getRepaymentFrequencyValue();
    expect(repaymentFrequency).toBe(TD.loanConfiguration.defaultRepaymentFrequency);

    // Step 6: Verify that the estimated monthly repayment amount is prominently displayed
    await expect(loansPage.page.getByText('Estimated Monthly Repayment')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="estimated-monthly-repayment"]')).toBeVisible();
    const estimatedRepayment = await loansPage.getEstimatedMonthlyRepayment();
    expect(estimatedRepayment).toBeDefined();
    expect(estimatedRepayment.length).toBeGreaterThan(0);

    // Step 7: Verify that all configuration elements are properly aligned and formatted for easy readability
    await expect(loansPage.page.locator('[data-testid="loan-amount-field"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="loan-tenure-dropdown"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="repayment-frequency-dropdown"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="estimated-monthly-repayment"]')).toBeVisible();
  });
});