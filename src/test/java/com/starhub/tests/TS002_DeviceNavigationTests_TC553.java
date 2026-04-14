package com.starhub.tests;

import com.starhub.automation.base.BaseTest;
import com.starhub.automation.pages.HomePage;
import com.starhub.automation.pages.AllPhonesPage;
import com.starhub.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS002_DeviceNavigationTests_TC553 extends BaseTest {
    @Test(testName = "TC553", description = "Test Case - SCRUM-22697 TS-003 TC-001", groups = {"TS002", "Functional", "Regression"}, priority = 3)
    public void verifyDeviceDetailPageLoads() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        driver.get(STARHUB_URL);
        // Step 1: Launch StarHub homepage
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(homePage.isPageLoaded(), "StarHub homepage did not load successfully");
        // Step 2: Click 'Mobiles' menu
        homePage.clickMobilesMenu();
        Assert.assertTrue(homePage.isMobilesMenuExpanded(), "Mobiles menu did not expand");
        // Step 3: Click 'All Phones' link
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "All Phones listing page is not displayed");
        // Step 4: Locate device in list
        Assert.assertTrue(allPhonesPage.isDeviceVisible(DEVICE_NAME), DEVICE_NAME + " is not visible in the list");
        // Step 5: Click device
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isPageLoaded(DEVICE_NAME), "Device details page for " + DEVICE_NAME + " is not displayed");
    }
}
