package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS006_ValidationTests extends BaseTest {

    /**
     * TestRail Case ID: 1889
     * Test Case - SCRUM-22719 TS-015 TC-001
     */
    @Test(testName = "TC1889", description = "Verify Next button is disabled when storage is missing.", groups = {"TS006", "Functional", "Regression"}, priority = 1)
    public void verifyNextButtonDisabledWhenStorageMissing() {
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
        deviceDetailPage.deselectStorage();
        Assert.assertFalse(deviceDetailPage.isNextButtonEnabled(), "Next button should be disabled when storage is missing");
    }

    /**
     * TestRail Case ID: 1890
     * Test Case - SCRUM-22719 TS-016 TC-001
     */
    @Test(testName = "TC1890", description = "Verify error message when required options are incomplete.", groups = {"TS006", "Functional", "Regression"}, priority = 2)
    public void verifyErrorMessageWhenRequiredOptionsIncomplete() {
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
        deviceDetailPage.deselectStorage();
        deviceDetailPage.clickNextButton();
        Assert.assertTrue(deviceDetailPage.isErrorMessageDisplayed(), "Error message not displayed when required options are incomplete");
    }
}
