const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const FlexibleLoanDetailsPage = require('../../pages/flexible-loan-details.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-62: Verify authentication popup displays when unauthenticated user clicks Apply Now', { tag: ['@regression'] }, () => {
  let homePage;
  let personalLoansPage;
  let loanDetailsPage;

  test('[TC-62] Display authentication popup for unauthenticated user', async ({ page }) => {
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

    // Step 5: Click on 'Apply Now' button without being logged in
    await loanDetailsPage.clickApplyNowButton();
    await page.waitForTimeout(2000);

    // Step 6: Verify the popup contains the expected message
    await expect(loanDetailsPage.isAuthPopupVisible()).resolves.toBeTruthy();
    const popupMessage = await loanDetailsPage.getAuthPopupMessage();
    expect(popupMessage).toContain(TD.authPopup.message);

    // Step 7: Verify 'Log in to Online Banking' button is visible
    await expect(loanDetailsPage.isLoginButtonVisible()).resolves.toBeTruthy();

    // Step 8: Verify 'Don't have an account? Sign up here' button is visible
    await expect(loanDetailsPage.isSignupButtonVisible()).resolves.toBeTruthy();

    // Step 9: Verify both buttons are clickable and functional
    await expect(loanDetailsPage.isLoginButtonEnabled()).resolves.toBeTruthy();
    await expect(loanDetailsPage.isSignupButtonEnabled()).resolves.toBeTruthy();
  });
});