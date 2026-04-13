package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class TS002_DeviceNavigationTests extends BaseTest {

    @Test(testName = "TC544", description = "Test Case - SCRUM-22697 TS-002 TC-001", groups = {"TS002", "Functional", "Regression"}, priority = 1)
    public void verifyDeviceDetailPageLoads() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isPageLoaded(), "StarHub homepage did not load successfully.");
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenuItem();
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "Mobile Devices Listing page did not load.");
        Assert.assertTrue(allPhonesPage.isDeviceVisible(DEVICE_NAME), DEVICE_NAME + " is not visible in the device list.");
        DeviceDetailPage deviceDetailPage = allPhonesPage.clickDeviceByName(DEVICE_NAME);
        Assert.assertTrue(deviceDetailPage.isPageLoadedForDevice(DEVICE_NAME), "Device details page for '" + DEVICE_NAME + "' did not load.");
    }

    @Test(testName = "TC545", description = "Test Case - SCRUM-22697 TS-002 TC-002", groups = {"TS002", "Functional", "Regression"}, priority = 2)
    public void verifyDeviceDetailPageShowsCorrectInfo() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isPageLoaded(), "StarHub homepage did not load successfully.");
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenuItem();
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "Mobile Devices Listing page did not load.");
        DeviceDetailPage deviceDetailPage = allPhonesPage.clickDeviceByName(DEVICE_NAME);
        Assert.assertTrue(deviceDetailPage.isPageLoadedForDevice(DEVICE_NAME), "Device details page for '" + DEVICE_NAME + "' did not load.");
        Assert.assertEquals(deviceDetailPage.getDeviceName(), DEVICE_NAME, "Device name does not match.");
        Assert.assertTrue(deviceDetailPage.isDeviceImageDisplayed(), "Device image is not displayed or does not match the model.");
    }
}
