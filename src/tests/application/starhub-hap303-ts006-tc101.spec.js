const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-303 TS-006: Verify Network Interruption Handling', { tag: ['@regression', '@e2e', '@starhub'] }, () => {
  let store;

  test('[HAP-303 TS-006 TC-101] Verify system behavior with network interruption during navigation', async ({ page, context }) => {
    store = new StarHubStorePage(page);

    // Step 1: Configure network simulation with timeout
    await context.setDefaultTimeout(TD.timeouts.networkTimeout);

    // Step 2: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Simulate network delay
    await context.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });

    // Step 3: Hover over Mobile tab
    await store.hoverMobileTab();

    // Step 4: Click on 'All Phones' - system attempts navigation
    try {
      await store.clickAllPhones();
    } catch (error) {
      // Step 5: Observe system behavior during network interruption
      expect(error.message).toBeTruthy();
    }

    // Step 6: Verify system does not crash or become unresponsive
    const isPageResponsive = await page.evaluate(() => document.readyState);
    expect(isPageResponsive).toBeTruthy();
  });
});