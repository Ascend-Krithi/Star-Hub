package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC545_TestCaseSCRUM22697TS002TC002 extends BaseTest {
    @Test(testName = "TC545", description = "Test Case - SCRUM-22697 TS-002 TC-002", groups = {"TS8", "Functional", "Regression"}, priority = 4)
    public void verifyDeviceDetailPageAndImage() {
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("StarHub")), "Homepage title should contain 'StarHub'");
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenu();
        Assert.assertTrue(allPhonesPage.isAt(), "Should be at the Mobile Devices Listing page");
        DeviceDetailPage deviceDetailPage = allPhonesPage.clickDeviceByName(DEVICE_NAME);
        Assert.assertTrue(deviceDetailPage.isAt(DEVICE_NAME), "Device details page for '" + DEVICE_NAME + "' should load");
        Assert.assertEquals(deviceDetailPage.getDeviceName(), DEVICE_NAME, "Device name should match");
        Assert.assertTrue(deviceDetailPage.isDeviceImageDisplayed(), "Device image should be displayed");
    }
}
