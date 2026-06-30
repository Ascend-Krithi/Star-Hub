const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppFirstLoginPage = require('../../pages/dealer-app-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-004: First Login - Tips Section Display', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-004 TC-001] Verify tips section is displayed with helpful information', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 2: Launch the Dealer App URL
    await loginPage.goto();

    // Step 3: Login with first-time dealer credentials
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForURL(TD.urlPatterns.firstLogin, { timeout: 10000 });

    // Step 4: Scroll through the first login screen
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Step 5: Verify tips section
    await expect(await firstLoginPage.isTipsSectionVisible()).toBe(true);
    const tipsText = await firstLoginPage.getTipsText();
    expect(tipsText).toContain('support@dealerapp.com');
  });
});