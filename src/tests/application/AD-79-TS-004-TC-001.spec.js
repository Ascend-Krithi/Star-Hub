const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppBusinessProfilePage = require('../../pages/dealer-app-business-profile.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-004: Tips Section Display', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let businessProfilePage;

  test('[AD-79 TS-004 TC-001] Verify tips section for correcting information', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    businessProfilePage = new DealerAppBusinessProfilePage(page);

    // Step 1-2: Launch the Dealer App URL
    await loginPage.goto();

    // Step 3: Login with first-time dealer credentials
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForURL(TD.urlPatterns.businessProfile, { timeout: 10000 });

    // Step 4: Scroll through the first login screen
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Step 5: Verify tips section is displayed
    const tipsVisible = await businessProfilePage.isTipsSectionVisible();
    expect(tipsVisible).toBe(true);
    const tipsText = await businessProfilePage.getTipsText();
    expect(tipsText).toContain(TD.messages.tipsMessage);
  });
});