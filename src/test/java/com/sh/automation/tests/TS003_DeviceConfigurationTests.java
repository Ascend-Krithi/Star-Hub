package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;

public class TS003_DeviceConfigurationTests extends BaseTest {

    /**
     * TestRail Case ID: 1880
     * Test Case - SCRUM-22719 TS-006 TC-001
     */
    @Test(testName = "TC1880", description = "Verify default selections on device page", groups = {"TS003", "Functional", "Regression"}, priority = 1)
    public void verifyDefaultSelectionsOnDevicePage() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        com.sh.automation.pages.HomePage homePage = new com.sh.automation.pages.HomePage(driver);
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        com.sh.automation.pages.AllPhonesPage allPhonesPage = new com.sh.automation.pages.AllPhonesPage(driver);
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), "Black", "Default colour is not Black");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), "256 GB", "Default storage is not 256 GB");
        Assert.assertEquals(deviceDetailPage.getSelectedPaymentOption(), "24-month installment", "Default payment option is not 24-month installment");
    }
