const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-004: First-Time Login - Tips Display', { tag: ['@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-004 TC-001] Verify tips section with correction guidance is displayed', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Launch and login with first-time credentials
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.login(TD.credentials.firstTimeLogin.email, TD.credentials.firstTimeLogin.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Scroll to locate tips section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Step 3: Verify tips section is visible
    const isTipsVisible = await loginPage.isTipsSectionVisible();
    expect(isTipsVisible).toBeTruthy();
    await expect(loginPage.page.locator('.tips-section, [data-testid="tips-section"], .help-text')).toBeVisible();

    const tipsText = await loginPage.getTipsText();
    expect(tipsText.length).toBeGreaterThan(0);
  });
});