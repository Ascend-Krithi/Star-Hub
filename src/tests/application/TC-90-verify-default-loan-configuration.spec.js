const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TS-001: Verify default loan configuration displays correct values on Flexible Personal Loan details page', { tag: ['@smoke', '@regression'] }, () => {
  let loansPage;

  test('[TC-90] Verify default loan configuration displays correct values on Flexible Personal Loan details page', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a web browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homePage);

    // Step 2: Navigate to 'Loans' → 'Personal Loans' → 'Flexible Personal Loan'
    await loansPage.navigateToFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoanPage);

    // Step 3: Verify that the loan amount field displays the default loan amount value
    await expect(loansPage.page.locator('[data-testid="loan-amount-field"]')).toBeVisible();
    const loanAmount = await loansPage.getLoanAmountValue();
    expect(loanAmount).toBeDefined();

    // Step 4: Verify that the loan tenure is set to 36 months by default
    const loanTenure = await loansPage.getLoanTenureValue();
    expect(loanTenure).toBe(TD.loanConfiguration.defaultLoanTenure);

    // Step 5: Verify that the repayment frequency is set to 'Monthly' by default
    const repaymentFrequency = await loansPage.getRepaymentFrequencyValue();
    expect(repaymentFrequency).toBe(TD.loanConfiguration.defaultRepaymentFrequency);

    // Step 6: Verify that the estimated monthly repayment amount is calculated and displayed
    await expect(loansPage.page.locator('[data-testid="estimated-monthly-repayment"]')).toBeVisible();
    const estimatedRepayment = await loansPage.getEstimatedMonthlyRepayment();
    expect(estimatedRepayment).toBeDefined();
    expect(estimatedRepayment.length).toBeGreaterThan(0);

    // Step 7: Verify that all default selections are clearly visible and properly formatted on the page
    await expect(loansPage.page.getByText('Loan Amount')).toBeVisible();
    await expect(loansPage.page.getByText('Loan Tenure')).toBeVisible();
    await expect(loansPage.page.getByText('Repayment Frequency')).toBeVisible();
    await expect(loansPage.page.getByText('Estimated Monthly Repayment')).toBeVisible();
  });
});