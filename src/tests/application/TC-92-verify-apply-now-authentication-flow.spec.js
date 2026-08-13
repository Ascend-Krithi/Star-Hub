const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TS-003: Verify Apply Now button initiates authentication flow for unauthenticated user', { tag: ['@smoke', '@regression'] }, () => {
  let loansPage;

  test('[TC-92] Verify Apply Now button initiates authentication flow for unauthenticated user', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a web browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homePage);

    // Step 2: Navigate to 'Loans' → 'Personal Loans' → 'Flexible Personal Loan'
    await loansPage.navigateToFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoanPage);
    await expect(loansPage.page.locator('[data-testid="loan-configuration-section"]')).toBeVisible();

    // Step 3: Review the default loan configuration displayed on the page
    const loanTenure = await loansPage.getLoanTenureValue();
    expect(loanTenure).toBe(TD.loanConfiguration.defaultLoanTenure);
    const repaymentFrequency = await loansPage.getRepaymentFrequencyValue();
    expect(repaymentFrequency).toBe(TD.loanConfiguration.defaultRepaymentFrequency);

    // Step 4: Ensure user is not logged in by verifying the absence of user profile or logout options
    const isLoggedIn = await loansPage.isUserLoggedIn();
    expect(isLoggedIn).toBe(false);

    // Step 5: Locate and click on the 'Apply Now' button
    await expect(loansPage.page.getByRole('button', { name: 'Apply Now' })).toBeVisible();
    await loansPage.clickApplyNow();

    // Step 6: Verify that the system responds by displaying authentication options
    await expect(loansPage.page.locator('[data-testid="authentication-popup"]')).toBeVisible();
  });
});