const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const FlexibleLoanDetailsPage = require('../../pages/flexible-loan-details.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-64: Verify authentication popup does not appear when viewing loan details without clicking Apply Now', { tag: ['@regression'] }, () => {
  let homePage;
  let personalLoansPage;
  let loanDetailsPage;

  test('[TC-64] No authentication popup when viewing loan details', async ({ page }) => {
    homePage = new BankHomePage(page);
    personalLoansPage = new PersonalLoansPage(page);
    loanDetailsPage = new FlexibleLoanDetailsPage(page);

    // Step 1: Launch the bank's website without logging in
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

    // Step 5: View and review loan details WITHOUT clicking Apply Now
    await expect(loanDetailsPage.isPageHeadingVisible()).resolves.toBeTruthy();
    await expect(loanDetailsPage.areAllConfigurationOptionsVisible()).resolves.toBeTruthy();
    await page.waitForTimeout(2000);

    // Step 6: Verify that no authentication popup appears
    const isPopupVisible = await loanDetailsPage.isAuthPopupVisible();
    expect(isPopupVisible).toBeFalsy();
  });
});