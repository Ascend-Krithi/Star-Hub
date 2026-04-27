package com.starhub.tests;

import com.starhub.automation.base.BaseTest;
import com.starhub.automation.pages.AllPhonesPage;
import com.starhub.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS003_DeviceConfigurationTests extends BaseTest {

    @Test(testName = "TC173", description = "Test Case - SCRUM-22697 TS-003 TC-002", groups = {"TS003", "Functional", "Regression"}, priority = 5)
    public void verifyConfigurationSelectorsVisibleAndEnabled() {
        // Preconditions: Device configuration page for Samsung Galaxy A57 5G is loaded
        final String DEVICE_NAME_1 = "Samsung Galaxy A57 5G";
        final String DEVICE_NAME_2 = "iPhone 15 Pro";
        final String DEFAULT_COLOUR_2 = "Black";
        final String DEFAULT_STORAGE_2 = "128 GB";
        final String DEFAULT_PAYMENT_OPTION_2 = "SIM Only";

        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.navigateToDeviceDetail(DEVICE_NAME_1);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOf(deviceDetailPage.getDeviceDetailElement()));
        deviceDetailPage.changeConfiguration("Colour", "Blue");
        deviceDetailPage.changeConfiguration("Storage", "128 GB");
        Assert.assertTrue(deviceDetailPage.isConfigurationUpdated("Colour", "Blue"), "Colour not updated.");
        Assert.assertTrue(deviceDetailPage.isConfigurationUpdated("Storage", "128 GB"), "Storage not updated.");

        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.navigateToDeviceListing();
        allPhonesPage.clickDevice(DEVICE_NAME_2);
        DeviceDetailPage deviceDetailPage2 = new DeviceDetailPage(driver);
        wait.until(ExpectedConditions.visibilityOf(deviceDetailPage2.getDeviceDetailElement()));
        Assert.assertTrue(deviceDetailPage2.isDefaultConfigurationDisplayed(DEFAULT_COLOUR_2, DEFAULT_STORAGE_2, DEFAULT_PAYMENT_OPTION_2), "Default configuration for new device is incorrect.");
    }
}
