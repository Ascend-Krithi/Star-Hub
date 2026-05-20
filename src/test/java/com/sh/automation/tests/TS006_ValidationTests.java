package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;

public class TS006_ValidationTests extends BaseTest {

    /**
     * TestRail Case ID: 1883
     * Test Case - SCRUM-22719 TS-009 TC-001
     */
    @Test(testName = "TC1883", description = "Verify Next button disabled when storage missing", groups = {"TS006", "Functional", "Regression"}, priority = 1)
    public void verifyNextButtonDisabledWhenStorageMissing() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        com.sh.automation.pages.HomePage homePage = new com.sh.automation.pages.HomePage(driver);
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        com.sh.automation.pages.AllPhonesPage allPhonesPage = new com.sh.automation.pages.AllPhonesPage(driver);
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.selectColour("Black");
        deviceDetailPage.selectPayment("24-month installment");
        Assert.assertFalse(deviceDetailPage.isNextButtonEnabled(), "Next button should be disabled when storage is missing");
    }
