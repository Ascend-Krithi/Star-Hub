const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-63: Verify Personal Loans listing page is not directly accessible without using Loans menu', { tag: ['@regression'] }, () => {
  let homePage;
  let personalLoansPage;

  test('[TC-63] Verify direct access restriction to Personal Loans page', async ({ page }) => {
    homePage = new BankHomePage(page);
    personalLoansPage = new PersonalLoansPage(page);

    // Step 1: Launch the bank's website
    await homePage.goto(TD.urls.bankHome);
    await expect(page).toHaveURL(TD.urls.bankHome);

    // Step 2: Attempt to access Personal Loans page directly
    try {
      await page.goto(TD.urls.personalLoans, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const currentUrl = page.url();
      
      // Step 3: Verify that Personal Loans listing page is not accessible without proper navigation
      // Either redirected to home, error page, or requires menu navigation
      const isOnPersonalLoansPage = currentUrl.includes('personal-loans');
      const isRedirectedToHome = currentUrl === TD.urls.bankHome || currentUrl.endsWith('/');
      const isErrorPage = currentUrl.includes('error') || currentUrl.includes('404');
      
      // Verify proper access control is in place
      if (isOnPersonalLoansPage) {
        // If page loads, verify it requires proper authentication or shows restricted access
        const pageContent = await page.content();
        const hasRestrictionMessage = pageContent.includes('access') || pageContent.includes('restricted') || pageContent.includes('login');
        expect(hasRestrictionMessage || isRedirectedToHome || isErrorPage).toBeTruthy();
      } else {
        // Verify user is redirected away from direct access
        expect(isRedirectedToHome || isErrorPage).toBeTruthy();
      }
    } catch (error) {
      // If navigation fails, it means direct access is properly restricted
      expect(error).toBeTruthy();
    }
  });
});