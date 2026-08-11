const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-57: Verify user can successfully navigate to Personal Loans listing page from home page', { tag: ['@smoke', '@regression'] }, () => {
  let homePage;
  let personalLoansPage;

  test('[TC-57] Navigate to Personal Loans listing page from home page', async ({ page }) => {
    homePage = new BankHomePage(page);
    personalLoansPage = new PersonalLoansPage(page);

    // Step 1: Launch the bank's website
    await homePage.goto(TD.urls.bankHome);
    await expect(page).toHaveURL(TD.urls.bankHome);
    await expect(homePage.isLoansMenuVisible()).resolves.toBeTruthy();

    // Step 2: Locate and click on 'Loans' in the main navigation menu
    await homePage.clickLoansMenu();
    await page.waitForTimeout(1000);

    // Step 3: Click on 'Personal Loans' option from the Loans menu
    await homePage.clickPersonalLoansSubmenu();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 4: Verify that the Personal Loans listing page contains available loan products
    await expect(personalLoansPage.isPageHeadingVisible()).resolves.toBeTruthy();
    await expect(personalLoansPage.isLoanProductsListVisible()).resolves.toBeTruthy();
  });
});