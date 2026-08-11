const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-707 TS-010: Verify Authentication Popup Elements Accessibility', { tag: ['@smoke', '@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-707 TS-010 TC-101] Verify all popup elements accessible with timing-sensitive rendering', async ({ page, context }) => {
    store = new StarHubStorePage(page);

    // Step 1: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Step 2: Ensure user is not logged in
    await context.clearCookies();

    // Step 3: Hover over Mobile tab and click 'All Phones'
    await store.navigateToAllPhones();

    // Step 4: Click on Samsung Galaxy A57 5G device card
    await store.clickSamsungGalaxyA57Card();

    // Step 5: Click Next button to trigger popup
    await store.clickNextButton();

    // Step 6: Wait for popup to appear and fully render
    const popupVisible = await store.isAuthPopupVisible();
    expect(popupVisible).toBeTruthy();

    // Step 7: Verify popup message is visible
    const popupMessage = await store.getPopupMessage();
    expect(popupMessage).toContain(TD.messages.loginRequired);

    // Step 8: Verify 'Log in with Hub ID' button is visible and interactable
    const loginButtonVisible = await store.isLoginWithHubIdButtonVisible();
    expect(loginButtonVisible).toBeTruthy();

    // Step 9: Verify 'Sign up' button/link is visible and interactable
    const signupLinkVisible = await store.isSignupLinkVisible();
    expect(signupLinkVisible).toBeTruthy();

    // Step 10: Verify all elements are accessible within timeout
    const allElementsAccessible = loginButtonVisible && signupLinkVisible && popupMessage;
    expect(allElementsAccessible).toBeTruthy();
  });
});