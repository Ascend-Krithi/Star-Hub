package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS003_DeviceConfigurationTests extends BaseTest {

    @Test(testName = "TC171", description = "Test Case - SCRUM-22697 TS-002 TC-002", groups = {"TS003", "Functional", "Regression"}, priority = 3)
    public void verifyDeviceDetailsVisible() {
        // Preconditions: Ensure Mobile Devices Listing page is loaded and device selected
        final String DEVICE_NAME = "Samsung Galaxy S24";
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        deviceDetailPage.selectDevice(DEVICE_NAME);
        wait.until(ExpectedConditions.visibilityOf(deviceDetailPage.getDeviceTitle()));
        Assert.assertTrue(deviceDetailPage.isDeviceDetailPageDisplayed(), "Device details/configuration page is displayed.");
        Assert.assertTrue(deviceDetailPage.areDeviceDetailsVisible(), "Device details and configuration options are visible.");
    }

    @Test(testName = "TC172", description = "Test Case - SCRUM-22697 TS-003 TC-001", groups = {"TS003", "Functional", "Regression"}, priority = 4)
    public void verifyDefaultSelectionsOnDevicePage() {
        // Preconditions: Device configuration page for Samsung Galaxy A57 5G is loaded
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String DEFAULT_COLOUR = "Black";
        final String DEFAULT_STORAGE = "256 GB";
        final String DEFAULT_PAYMENT_OPTION = "24-month installment";
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.selectDevice(DEVICE_NAME);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOf(deviceDetailPage.getDeviceTitle()));
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), DEFAULT_COLOUR, "Default colour is correct.");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), DEFAULT_STORAGE, "Default storage is correct.");
        Assert.assertEquals(deviceDetailPage.getSelectedPaymentOption(), DEFAULT_PAYMENT_OPTION, "Default payment option is correct.");
    }

    @Test(testName = "TC173", description = "Test Case - SCRUM-22697 TS-003 TC-002", groups = {"TS003", "Functional", "Regression"}, priority = 5)
    public void verifyConfigurationResetOnDeviceChange() {
        // Preconditions: Device configuration page is loaded
        final String DEVICE_NAME_1 = "Samsung Galaxy A57 5G";
        final String DEVICE_NAME_2 = "iPhone 15 Pro";
        final String CHANGED_COLOUR = "Blue";
        final String CHANGED_STORAGE = "128 GB";
        final String DEFAULT_COLOUR = "Black";
        final String DEFAULT_STORAGE = "128 GB";
        final String DEFAULT_PAYMENT_OPTION = "SIM Only";
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.selectDevice(DEVICE_NAME_1);
        deviceDetailPage.changeColour(CHANGED_COLOUR);
        deviceDetailPage.changeStorage(CHANGED_STORAGE);
        deviceDetailPage.selectDevice(DEVICE_NAME_2);
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), DEFAULT_COLOUR, "Default colour for new device is correct.");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), DEFAULT_STORAGE, "Default storage for new device is correct.");
        Assert.assertEquals(deviceDetailPage.getSelectedPaymentOption(), DEFAULT_PAYMENT_OPTION, "Default payment option for new device is correct.");
    }
}
