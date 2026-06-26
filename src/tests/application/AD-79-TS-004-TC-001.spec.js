const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppFirstLoginPage = require('../../pages/DealerAppFirstLoginPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-004: Tips for Correcting Information', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-004 TC-001] Test Case 1: Verify tips section displays correction guidance', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 1: Complete first-time login authentication
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeUser.email, TD.credentials.firstTimeUser.password);

    // Step 2: Scroll to tips section
    const tipsScrolled = await firstLoginPage.scrollToTipsSection();
    expect(tipsScrolled).toBe(true);

    const isTipsVisible = await firstLoginPage.isTipsSectionVisible();
    expect(isTipsVisible).toBe(true);

    // Step 3: Verify tips content
    const tipsContent = await firstLoginPage.getTipsContent();
    expect(tipsContent).toBeTruthy();
    expect(tipsContent.length).toBeGreaterThan(0);
  });
});