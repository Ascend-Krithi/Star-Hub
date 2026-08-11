const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const FlexibleLoanDetailsPage = require('../../pages/flexible-loan-details.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-60: Verify default loan configuration displays correctly on Flexible Personal Loan details page', { tag: ['@smoke', '@regression'] }, () => {
  let homePage;
  let personalLoansPage;
  let loanDetailsPage;

  test('[TC-60] Verify default loan configuration on details page', async ({ page }) => {
    homePage = new BankHomePage(page);
    personalLoansPage = new PersonalLoansPage(page);
    loanDetailsPage = new FlexibleLoanDetailsPage(page);

    // Step 1: Launch the bank's website
    await homePage.goto(TD.urls.bankHome);
    await expect(page).toHaveURL(TD.urls.bankHome);

    // Step 2: Navigate to 'Loans' section
    await homePage.clickLoansMenu();
    await page.waitForTimeout(1000);

    // Step 3: Click on 'Personal Loans' option
    await homePage.clickPersonalLoansSubmenu();
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Select 'Flexible Personal Loan'
    await personalLoansPage.clickFlexiblePersonalLoan();
    await page.waitForLoadState('domcontentloaded');

    // Step 5: Verify that the default loan amount is displayed
    await expect(loanDetailsPage.isLoanAmountVisible()).resolves.toBeTruthy();
    const loanAmount = await loanDetailsPage.getLoanAmount();
    expect(loanAmount).toBeTruthy();

    // Step 6: Verify that the loan tenure is set to 36 months by default
    const tenure = await loanDetailsPage.getLoanTenure();
    expect(tenure).toContain(TD.defaultLoanConfig.tenure);

    // Step 7: Verify that the repayment frequency is set to 'Monthly' by default
    const frequency = await loanDetailsPage.getRepaymentFrequency();
    expect(frequency).toContain(TD.defaultLoanConfig.frequency);

    // Step 8: Verify that the estimated monthly repayment amount is displayed
    await expect(loanDetailsPage.isMonthlyRepaymentVisible()).resolves.toBeTruthy();
    const monthlyRepayment = await loanDetailsPage.getMonthlyRepaymentAmount();
    expect(monthlyRepayment).toBeTruthy();

    // Step 9: Verify that all selected options are clearly visible
    await expect(loanDetailsPage.areAllConfigurationOptionsVisible()).resolves.toBeTruthy();
  });
});