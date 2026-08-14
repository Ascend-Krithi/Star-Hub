const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-122: Verify all loan configuration options are clearly visible on Flexible Personal Loan details page', { tag: ['@smoke', '@regression'] }, () => {
  let loansPage;

  test('[TC-122] Verify all loan configuration options are clearly visible on Flexible Personal Loan details page', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.home);

    // Step 2: Navigate to 'Loans' section
    await loansPage.navigateToLoans();
    await expect(page).toHaveURL(TD.urlPatterns.loans);

    // Step 3: Click on 'Personal Loans' option
    await loansPage.navigateToPersonalLoans();
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 4: Select 'Flexible Personal Loan' from the list
    await loansPage.selectFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 5: Verify loan amount control is visible and accessible
    const loanAmountVisible = await loansPage.isLoanAmountControlVisible();
    expect(loanAmountVisible).toBeTruthy();

    // Step 6: Verify loan tenure control is visible showing 36 months
    const tenureVisible = await loansPage.isLoanTenureControlVisible();
    expect(tenureVisible).toBeTruthy();
    const tenureText = await loansPage.getLoanTenureText();
    expect(tenureText).toContain('36 months');

    // Step 7: Verify repayment frequency control is visible showing Monthly
    const frequencyVisible = await loansPage.isRepaymentFrequencyControlVisible();
    expect(frequencyVisible).toBeTruthy();
    const frequencyText = await loansPage.getRepaymentFrequencyText();
    expect(frequencyText).toContain('Monthly');

    // Step 8: Verify estimated repayment display is visible
    const estimatedRepaymentVisible = await loansPage.isEstimatedRepaymentDisplayVisible();
    expect(estimatedRepaymentVisible).toBeTruthy();
  });
});