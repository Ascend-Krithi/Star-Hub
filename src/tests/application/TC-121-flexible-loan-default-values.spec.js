const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-121: Verify Flexible Personal Loan details page displays all default loan configuration values', { tag: ['@regression'] }, () => {
  let loansPage;

  test('[TC-121] Verify Flexible Personal Loan details page displays all default loan configuration values', async ({ page }) => {
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

    // Step 5: Verify the default loan amount is displayed
    const loanAmountVisible = await loansPage.isLoanAmountControlVisible();
    expect(loanAmountVisible).toBeTruthy();
    const loanAmount = await loansPage.getLoanAmountValue();
    expect(loanAmount).toBeTruthy();

    // Step 6: Verify the loan tenure is set to 36 months
    const tenureText = await loansPage.getLoanTenureText();
    expect(tenureText).toContain(TD.loanDefaults.tenure);

    // Step 7: Verify the repayment frequency is set to Monthly
    const frequencyText = await loansPage.getRepaymentFrequencyText();
    expect(frequencyText).toContain(TD.loanDefaults.repaymentFrequency);

    // Step 8: Verify the estimated monthly repayment amount is displayed
    const estimatedRepaymentVisible = await loansPage.isEstimatedRepaymentDisplayVisible();
    expect(estimatedRepaymentVisible).toBeTruthy();
    const estimatedRepayment = await loansPage.getEstimatedRepaymentText();
    expect(estimatedRepayment).toBeTruthy();
  });
});