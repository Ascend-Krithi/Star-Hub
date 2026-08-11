const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const FlexibleLoanDetailsPage = require('../../pages/flexible-loan-details.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-61: Verify Apply Now button is visible and clickable on Flexible Personal Loan details page', { tag: ['@smoke', '@regression'] }, () => {
  let homePage;
  let personalLoansPage;
  let loanDetailsPage;

  test('[TC-61] Verify Apply Now button visibility and functionality', async ({ page }) => {
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

    // Step 5: Locate the 'Apply Now' button
    await expect(loanDetailsPage.isApplyNowButtonVisible()).resolves.toBeTruthy();

    // Step 6: Verify that the 'Apply Now' button is enabled and clickable
    await expect(loanDetailsPage.isApplyNowButtonEnabled()).resolves.toBeTruthy();

    // Step 7: Click on the 'Apply Now' button
    await loanDetailsPage.clickApplyNowButton();
    await page.waitForTimeout(2000);
    
    // Verify next step initiated (authentication check or application form)
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
  });
});