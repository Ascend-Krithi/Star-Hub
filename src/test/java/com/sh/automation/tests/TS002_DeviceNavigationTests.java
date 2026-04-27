package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS002_DeviceNavigationTests extends BaseTest {

    @Test(testName = "TC170", description = "Test Case - SCRUM-22697 TS-002 TC-001", groups = {"TS002", "Functional", "Regression"}, priority = 2)
    public void verifyDeviceDetailPageLoads() {
        // Preconditions: Ensure Mobile Devices Listing page is loaded
        final String STARHUB_URL = "https://www.starhub.com/";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(STARHUB_URL);
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOf(allPhonesPage.getDeviceList()));
        Assert.assertTrue(allPhonesPage.isDeviceVisible(DEVICE_NAME), "Device is visible in the listing.");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        wait.until(ExpectedConditions.visibilityOf(deviceDetailPage.getDeviceTitle()));
        Assert.assertTrue(deviceDetailPage.isDeviceDetailPageDisplayed(), "User is redirected to the device details/configuration page.");
    }
}
