package com.starhub.tests;

import com.starhub.automation.base.BaseTest;
import com.starhub.automation.pages.AllPhonesPage;
import com.starhub.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS002_DeviceNavigationTests extends BaseTest {

    @Test(testName = "TC171", description = "Test Case - SCRUM-22697 TS-002 TC-002", groups = {"TS002", "Functional", "Regression"}, priority = 3)
    public void verifyDeviceDetailPageShowsDetails() {
        // Preconditions: Ensure Mobile Devices Listing page is loaded
        final String DEVICE_NAME = "Samsung Galaxy S24";

        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.navigateToDeviceListing();
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOf(deviceDetailPage.getDeviceDetailElement()));
        Assert.assertTrue(deviceDetailPage.isDeviceDetailPageDisplayed(), "Device detail/configuration page is not displayed.");
        Assert.assertTrue(deviceDetailPage.areDeviceDetailsVisible(), "Device details and configuration options are not visible.");
    }
}
