package com.starhub.tests;

import com.starhub.automation.base.BaseTest;
import com.starhub.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS004_NextButtonTests extends BaseTest {

    @Test(testName = "TC175", description = "Test Case - SCRUM-22697 TS-004 TC-002", groups = {"TS004", "Functional", "Regression"}, priority = 7)
    public void verifyNextButtonStateWithAndWithoutSelections() {
        // Preconditions: Device configuration page loaded, leave Storage unselected
        final String DEVICE_NAME = "Any Device";

        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.navigateToDeviceDetail(DEVICE_NAME);
        deviceDetailPage.deselectConfigurationOption("Storage");
        deviceDetailPage.clickNextButton();
        WebDriverWait wait = new WebDriverWait(driver, 15);
        Assert.assertTrue(deviceDetailPage.isErrorMessageDisplayed("Storage"), "Error message for missing configuration not displayed.");
    }
}
