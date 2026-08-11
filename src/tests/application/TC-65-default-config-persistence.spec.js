const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-65: Verify default loan configuration persists when navigating back and re-selecting Flexible Personal Loan', {
  tag: ['@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-65] Default loan configuration persists on re-selection', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1-4: Navigate to Flexible Personal Loan details page
    await loansPage.goto();
    await loansPage.navigateToFlexiblePersonalLoanDetails();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 5: Note the default values
    const initialLoanAmount = await loansPage.getLoanAmount();
    const initialTenure = await loansPage.getLoanTenure();
    const initialFrequency = await loansPage.getRepaymentFrequency();
    const initialMonthlyRepayment = await loansPage.getEstimatedMonthlyRepayment();

    expect(initialTenure).toContain(TD.defaultLoanConfig.tenure);
    expect(initialFrequency).toContain(TD.defaultLoanConfig.frequency);

    // Step 6: Navigate back to Personal Loans listing page
    await page.goBack();
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 7: Re-select 'Flexible Personal Loan'
    await loansPage.clickFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 8: Verify that the loan tenure is still set to 36 months
    const newTenure = await loansPage.getLoanTenure();
    expect(newTenure).toContain(TD.defaultLoanConfig.tenure);

    // Step 9: Verify that the repayment frequency is still set to 'Monthly'
    const newFrequency = await loansPage.getRepaymentFrequency();
    expect(newFrequency).toContain(TD.defaultLoanConfig.frequency);

    // Step 10: Verify that the default loan amount remains unchanged
    const newLoanAmount = await loansPage.getLoanAmount();
    expect(newLoanAmount).toBe(initialLoanAmount);

    // Step 11: Verify that the estimated monthly repayment amount is unchanged
    const newMonthlyRepayment = await loansPage.getEstimatedMonthlyRepayment();
    expect(newMonthlyRepayment).toBe(initialMonthlyRepayment);
  });
});