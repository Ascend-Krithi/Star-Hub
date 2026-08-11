const loc = require('./locators/starhub-store.locators');
const TD = require('../data/starhub-test-data');

class StarHubStorePage {
  constructor(page) {
    this.page = page;
  }

  async gotoPersonalHome() {
    await this.page.goto(TD.urls.personalHome, { waitUntil: 'domcontentloaded', timeout: TD.timeouts.pageLoad });
  }

  async dismissCookieConsent() {
    try {
      const banner = loc.cookieConsentBanner(this.page);
      if (await banner.isVisible({ timeout: 5000 })) {
        await loc.acceptCookiesButton(this.page).click();
      }
    } catch (error) {
      // Cookie banner not present, continue
    }
  }

  async hoverMobileTab() {
    await loc.mobileTab(this.page).hover();
  }

  async clickAllPhones() {
    await loc.allPhonesLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToAllPhones() {
    await this.hoverMobileTab();
    await this.clickAllPhones();
  }

  async getPageHeading() {
    return await loc.pageHeading(this.page).textContent();
  }

  async getDeviceCount() {
    return await loc.deviceCount(this.page).textContent();
  }

  async isDeviceCountDisplayed() {
    return await loc.deviceCount(this.page).isVisible();
  }

  async clickDeviceCard(deviceName) {
    await loc.deviceCard(deviceName)(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSamsungGalaxyA57Card() {
    await loc.samsungGalaxyA57Card(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getProductTitle() {
    return await loc.productTitle(this.page).textContent();
  }

  async getSelectedColour() {
    return await loc.selectedColour(this.page).textContent();
  }

  async getSelectedStorage() {
    return await loc.selectedStorage(this.page).textContent();
  }

  async getSelectedPayment() {
    return await loc.selectedPayment(this.page).textContent();
  }

  async isNextButtonVisible() {
    return await loc.nextButton(this.page).isVisible();
  }

  async clickNextButton() {
    await loc.nextButton(this.page).click();
  }

  async isAuthPopupVisible() {
    return await loc.authPopup(this.page).isVisible({ timeout: TD.timeouts.elementWait });
  }

  async getPopupMessage() {
    return await loc.popupMessage(this.page).textContent();
  }

  async isLoginWithHubIdButtonVisible() {
    return await loc.loginWithHubIdButton(this.page).isVisible();
  }

  async isSignupLinkVisible() {
    return await loc.signupLink(this.page).isVisible();
  }

  async loginWithHubId(hubId, password) {
    await loc.hubIdInput(this.page).fill(hubId);
    await loc.passwordInput(this.page).fill(password);
    await loc.loginSubmitButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = StarHubStorePage;