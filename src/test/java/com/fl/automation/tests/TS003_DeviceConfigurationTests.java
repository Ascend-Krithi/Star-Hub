package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class TS003_DeviceConfigurationTests extends BaseTest {

    @Test(testName = "TC546", description = "Test Case - SCRUM-22697 TS-003 TC-001", groups = {"TS003", "Functional", "Regression"}, priority = 1)
    public void verifyDefaultSelectionsOnDevicePage() {
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
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), "Black", "Default colour is not 'Black'.");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), "256GB", "Default storage is not '256GB'.");
        Assert.assertEquals(deviceDetailPage.getSelectedPayment(), "24-month installment", "Default payment is not '24-month installment'.");
    }

    @Test(testName = "TC547", description = "Test Case - SCRUM-22697 TS-003 TC-002", groups = {"TS003", "Functional", "Regression"}, priority = 2)
    public void verifyConfigurationSelectorsVisibleAndEnabled() {
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
        Assert.assertTrue(deviceDetailPage.isColourOptionVisibleAndSelectable(), "Colour option is not visible or selectable.");
        Assert.assertTrue(deviceDetailPage.isStorageOptionVisibleAndSelectable(), "Storage option is not visible or selectable.");
        Assert.assertTrue(deviceDetailPage.isPaymentOptionVisibleAndSelectable(), "Payment option is not visible or selectable.");
    }
}
