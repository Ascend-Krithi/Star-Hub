package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC547_TestCase extends BaseTest {
    @Test(testName = "TC547", description = "Test Case - SCRUM-22697 TS-003 TC-002", groups = {"TS003", "Functional", "Regression"}, priority = 6)
    public void verifyConfigurationSelectorsVisibleAndEnabled() {
        // Preconditions
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        driver.get(STARHUB_URL);
        homePage.clickMobilesMenu();
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.clickDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isPageLoaded(), "Device detail page should load");
        Assert.assertTrue(deviceDetailPage.isColourSelectorVisible(), "Colour selector should be visible");
        Assert.assertTrue(deviceDetailPage.isStorageSelectorVisible(), "Storage selector should be visible");
        Assert.assertTrue(deviceDetailPage.isPaymentSelectorVisible(), "Payment selector should be visible");
        Assert.assertTrue(deviceDetailPage.isColourSelectorEnabled(), "Colour selector should be enabled");
        Assert.assertTrue(deviceDetailPage.isStorageSelectorEnabled(), "Storage selector should be enabled");
        Assert.assertTrue(deviceDetailPage.isPaymentSelectorEnabled(), "Payment selector should be enabled");
    }
}
