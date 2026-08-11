const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const FlexibleLoanDetailsPage = require('../../pages/flexible-loan-details.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-65: Verify default loan configuration persists when navigating back and re-selecting Flexible Personal Loan', { tag: ['@regression'] }, () => {
  let homePage;
  let personalLoansPage;
  let loanDetailsPage;

  test('[TC-65] Verify default configuration persistence on re-selection', async ({ page }) => {
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

    // Step 5: Note the default values
    const initialLoanAmount = await loanDetailsPage.getLoanAmount();
    const initialTenure = await loanDetailsPage.getLoanTenure();
    const initialFrequency = await loanDetailsPage.getRepaymentFrequency();
    const initialRepayment = await loanDetailsPage.getMonthlyRepaymentAmount();

    expect(initialTenure).toContain(TD.defaultLoanConfig.tenure);
    expect(initialFrequency).toContain(TD.defaultLoanConfig.frequency);

    // Step 6: Navigate back to Personal Loans listing page
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 7: Re-select 'Flexible Personal Loan'
    await personalLoansPage.clickFlexiblePersonalLoan();
    await page.waitForLoadState('domcontentloaded');

    // Step 8: Verify loan tenure is still 36 months
    const newTenure = await loanDetailsPage.getLoanTenure();
    expect(newTenure).toContain(TD.defaultLoanConfig.tenure);

    // Step 9: Verify repayment frequency is still 'Monthly'
    const newFrequency = await loanDetailsPage.getRepaymentFrequency();
    expect(newFrequency).toContain(TD.defaultLoanConfig.frequency);

    // Step 10: Verify default loan amount remains unchanged
    const newLoanAmount = await loanDetailsPage.getLoanAmount();
    expect(newLoanAmount).toBe(initialLoanAmount);

    // Step 11: Verify estimated monthly repayment amount is unchanged
    const newRepayment = await loanDetailsPage.getMonthlyRepaymentAmount();
    expect(newRepayment).toBe(initialRepayment);
  });
});