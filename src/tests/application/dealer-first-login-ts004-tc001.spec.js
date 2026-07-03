const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerFirstLoginPage = require('../../pages/dealer-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-004: First-Time Login - Tips Section', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-004 TC-001] Verify tips section is displayed for correcting information', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    firstLoginPage = new DealerFirstLoginPage(page);

    // Step 1-3: Login with first-time dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Scroll through the first login screen
    await firstLoginPage.scrollToSection('tips');

    // Step 5: Verify tips section is displayed
    const isTipsVisible = await firstLoginPage.isTipsSectionVisible();
    expect(isTipsVisible).toBeTruthy();
    
    const tipsText = await firstLoginPage.getTipsSectionText();
    expect(tipsText).toContain('support');
  });
});