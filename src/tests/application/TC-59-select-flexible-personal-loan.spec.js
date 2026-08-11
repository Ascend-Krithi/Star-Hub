const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const FlexibleLoanDetailsPage = require('../../pages/flexible-loan-details.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-59: Verify user can select Flexible Personal Loan and view loan details page', { tag: ['@smoke', '@regression'] }, () => {
  let homePage;
  let personalLoansPage;
  let loanDetailsPage;

  test('[TC-59] Select Flexible Personal Loan and view details page', async ({ page }) => {
    homePage = new BankHomePage(page);
    personalLoansPage = new PersonalLoansPage(page);
    loanDetailsPage = new FlexibleLoanDetailsPage(page);

    // Step 1: Launch the bank's website
    await homePage.goto(TD.urls.bankHome);
    await expect(page).toHaveURL(TD.urls.bankHome);

    // Step 2: Navigate to 'Loans' section from main navigation
    await homePage.clickLoansMenu();
    await page.waitForTimeout(1000);

    // Step 3: Click on 'Personal Loans' option
    await homePage.clickPersonalLoansSubmenu();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 4: Locate 'Flexible Personal Loan' from the list
    await expect(personalLoansPage.isFlexiblePersonalLoanVisible()).resolves.toBeTruthy();

    // Step 5: Click on 'Flexible Personal Loan' to view details
    await personalLoansPage.clickFlexiblePersonalLoan();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(TD.urlPatterns.flexibleLoan);
    await expect(loanDetailsPage.isPageHeadingVisible()).resolves.toBeTruthy();
    await expect(loanDetailsPage.areAllConfigurationOptionsVisible()).resolves.toBeTruthy();
  });
});