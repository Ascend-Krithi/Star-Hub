package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC547_TestCaseSCRUM22697TS003TC002 extends BaseTest {
    @Test(testName = "TC547", description = "Test Case - SCRUM-22697 TS-003 TC-002", groups = {"TS8", "Functional", "Regression"}, priority = 6)
    public void verifyConfigurationSelectorsVisibleAndEnabled() {
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("StarHub")), "Homepage title should contain 'StarHub'");
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenu();
        DeviceDetailPage deviceDetailPage = allPhonesPage.clickDeviceByName(DEVICE_NAME);
        Assert.assertTrue(deviceDetailPage.isAt(DEVICE_NAME), "Device details page for '" + DEVICE_NAME + "' should load");
        Assert.assertTrue(deviceDetailPage.isColourOptionVisibleAndSelectable(), "Colour option should be visible and selectable");
        Assert.assertTrue(deviceDetailPage.isStorageOptionVisibleAndSelectable(), "Storage option should be visible and selectable");
        Assert.assertTrue(deviceDetailPage.isPaymentOptionVisibleAndSelectable(), "Payment option should be visible and selectable");
    }
}
