const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-010: Multi-Device Session Support', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-010 TC-001] Verify concurrent sessions across Desktop, Mobile, and Tablet', async ({ page, browser }) => {
    // Desktop Session
    loginPage = new DealerAppLoginPage(page);

    // Step 1-4: Login on Desktop
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 5: Verify user can access all features on Desktop
    const isDesktopDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDesktopDashboardVisible).toBeTruthy();

    // Step 6-9: Simulate Mobile device login
    const mobileContext = await browser.newContext({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      viewport: { width: 375, height: 667 },
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileContext.newPage();
    const mobileLoginPage = new DealerAppLoginPage(mobilePage);

    await mobileLoginPage.goto(TD.urls.dealerApp);
    await mobileLoginPage.enterEmail(TD.credentials.validDealer.email);
    await mobileLoginPage.enterPassword(TD.credentials.validDealer.password);
    await mobileLoginPage.clickLogin();
    await mobilePage.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 10: Verify user can access all features on Mobile
    const isMobileDashboardVisible = await mobileLoginPage.isDashboardVisible();
    expect(isMobileDashboardVisible).toBeTruthy();

    // Step 11: Verify Desktop session remains active
    await page.reload();
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    const isDesktopStillActive = await loginPage.isDashboardVisible();
    expect(isDesktopStillActive).toBeTruthy();

    // Step 12-15: Simulate Tablet device login
    const tabletContext = await browser.newContext({
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      viewport: { width: 768, height: 1024 },
      isMobile: true,
      hasTouch: true
    });
    const tabletPage = await tabletContext.newPage();
    const tabletLoginPage = new DealerAppLoginPage(tabletPage);

    await tabletLoginPage.goto(TD.urls.dealerApp);
    await tabletLoginPage.enterEmail(TD.credentials.validDealer.email);
    await tabletLoginPage.enterPassword(TD.credentials.validDealer.password);
    await tabletLoginPage.clickLogin();
    await tabletPage.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 16: Verify user can access all features on Tablet
    const isTabletDashboardVisible = await tabletLoginPage.isDashboardVisible();
    expect(isTabletDashboardVisible).toBeTruthy();

    // Step 17: Verify all three sessions remain active simultaneously
    await page.reload();
    await mobilePage.reload();
    await tabletPage.reload();
    
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    await mobilePage.waitForLoadState('networkidle', { timeout: 15000 });
    await tabletPage.waitForLoadState('networkidle', { timeout: 15000 });

    const isDesktopActive = await loginPage.isDashboardVisible();
    const isMobileActive = await mobileLoginPage.isDashboardVisible();
    const isTabletActive = await tabletLoginPage.isDashboardVisible();

    expect(isDesktopActive).toBeTruthy();
    expect(isMobileActive).toBeTruthy();
    expect(isTabletActive).toBeTruthy();

    // Cleanup
    await mobileContext.close();
    await tabletContext.close();
  });
});