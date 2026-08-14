const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-123: Verify clicking Apply Now button initiates next step in loan application journey', { tag: ['@regression'] }, () => {
  let loansPage;

  test('[TC-123] Verify clicking Apply Now button initiates next step in loan application journey', async ({ page }) => {
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

    // Step 5: Review the loan configuration displayed on the page
    const loanAmountVisible = await loansPage.isLoanAmountControlVisible();
    expect(loanAmountVisible).toBeTruthy();
    const tenureVisible = await loansPage.isLoanTenureControlVisible();
    expect(tenureVisible).toBeTruthy();
    const frequencyVisible = await loansPage.isRepaymentFrequencyControlVisible();
    expect(frequencyVisible).toBeTruthy();

    // Step 6: Click on 'Apply Now' button
    const applyNowVisible = await loansPage.isApplyNowButtonVisible();
    expect(applyNowVisible).toBeTruthy();
    await loansPage.clickApplyNow();

    // Verify next step is initiated (authentication popup or application form)
    await page.waitForTimeout(1000);
    const authPopupVisible = await loansPage.isAuthenticationPopupVisible();
    const urlChanged = !page.url().includes(TD.urls.flexiblePersonalLoan);
    expect(authPopupVisible || urlChanged).toBeTruthy();
  });
});