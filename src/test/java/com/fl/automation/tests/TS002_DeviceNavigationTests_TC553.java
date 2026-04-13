package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS002_DeviceNavigationTests_TC553 extends BaseTest {
    @Test(testName = "TC553", description = "Test Case - SCRUM-22697 TS-003 TC-001", groups = {"TS002", "Functional", "Regression"}, priority = 3)
    public void verifyDeviceDetailPageLoads_TC553() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        HomePage homePage = new HomePage(driver);
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        // Step 1: Assert homepage loads
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(driver.getTitle().contains("StarHub"), "Homepage title should contain 'StarHub'");
        // Step 2: Click 'Mobiles' menu
        homePage.clickMobilesMenu();
        // Step 3: Click 'All Phones' link
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        // Step 4: Assert device is visible
        Assert.assertTrue(allPhonesPage.isDeviceVisible(DEVICE_NAME), DEVICE_NAME + " should be visible in the list");
        // Step 5: Click device
        allPhonesPage.clickDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isAt(DEVICE_NAME), "Device details page for " + DEVICE_NAME + " should be displayed");
    }
}
