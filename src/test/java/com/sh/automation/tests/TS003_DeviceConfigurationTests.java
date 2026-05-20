package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS003_DeviceConfigurationTests extends BaseTest {

    /**
     * TestRail Case ID: 1880
     * Test Case - SCRUM-22719 TS-006 TC-001
     */
    @Test(testName = "TC1880", description = "Verify default selections on device detail page.", groups = {"TS003", "Functional", "Regression"}, priority = 1)
    public void verifyDefaultSelectionsOnDevicePage() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        Assert.assertTrue(deviceDetailPage.isColourSelected("Black"), "Default colour is not Black");
        Assert.assertTrue(deviceDetailPage.isStorageSelected("256 GB"), "Default storage is not 256 GB");
        Assert.assertTrue(deviceDetailPage.isPaymentSelected("24-month installment"), "Default payment option is not 24-month installment");
    }

    /**
     * TestRail Case ID: 1881
     * Test Case - SCRUM-22719 TS-007 TC-001
     */
    @Test(testName = "TC1881", description = "Verify configuration selectors are visible and enabled.", groups = {"TS003", "Functional", "Regression"}, priority = 2)
    public void verifyConfigurationSelectorsVisibleAndEnabled() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        Assert.assertTrue(deviceDetailPage.areSelectorsVisibleAndEnabled(), "Selectors are not visible or enabled");
    }

    /**
     * TestRail Case ID: 1882
     * Test Case - SCRUM-22719 TS-008 TC-001
     */
    @Test(testName = "TC1882", description = "Verify selections update on change.", groups = {"TS003", "Functional", "Regression"}, priority = 3)
    public void verifySelectionsUpdateOnChange() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.selectColour("Black");
        deviceDetailPage.selectStorage("256 GB");
        deviceDetailPage.selectPayment("24-month installment");
        Assert.assertTrue(deviceDetailPage.isColourSelected("Black"), "Colour selection did not update");
        Assert.assertTrue(deviceDetailPage.isStorageSelected("256 GB"), "Storage selection did not update");
        Assert.assertTrue(deviceDetailPage.isPaymentSelected("24-month installment"), "Payment selection did not update");
    }
}
