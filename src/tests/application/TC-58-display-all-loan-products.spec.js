const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-58: Verify Personal Loans listing page displays all available personal loan products', { tag: ['@smoke', '@regression'] }, () => {
  let homePage;
  let personalLoansPage;

  test('[TC-58] Display all available personal loan products on listing page', async ({ page }) => {
    homePage = new BankHomePage(page);
    personalLoansPage = new PersonalLoansPage(page);

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

    // Step 4: Verify that a list of personal loan products is displayed
    const productsCount = await personalLoansPage.getLoanProductsCount();
    expect(productsCount).toBeGreaterThan(0);
    await expect(personalLoansPage.isFlexiblePersonalLoanVisible()).resolves.toBeTruthy();

    // Step 5: Verify that each loan product displays relevant information
    await expect(personalLoansPage.areLoanProductDetailsVisible()).resolves.toBeTruthy();
    const productNames = await personalLoansPage.getLoanProductNames();
    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames.some(name => name.includes('Flexible Personal Loan'))).toBeTruthy();
  });
});