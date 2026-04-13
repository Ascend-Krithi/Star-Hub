package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC544_TestCase extends BaseTest {
    @Test(testName = "TC544", description = "Test Case - SCRUM-22697 TS-002 TC-001", groups = {"TS002", "Functional", "Regression"}, priority = 3)
    public void verifyDeviceDetailPageLoads() {
        // Preconditions
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        driver.get(STARHUB_URL);
        homePage.clickMobilesMenu();
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "All Phones page should load");
        Assert.assertTrue(allPhonesPage.isDeviceVisible(DEVICE_NAME), "Device should be visible in list");
        allPhonesPage.clickDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isPageLoaded(), "Device detail page should load");
        Assert.assertTrue(deviceDetailPage.isDeviceNameVisible(DEVICE_NAME), "Device name should be visible on detail page");
    }
}
