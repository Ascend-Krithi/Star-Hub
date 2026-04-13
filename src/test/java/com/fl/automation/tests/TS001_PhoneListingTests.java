package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class TS001_PhoneListingTests extends BaseTest {

    @Test(testName = "TC542", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        HomePage homePage = new HomePage(driver);
        // Step 1: Assert homepage loads
        Assert.assertTrue(homePage.isPageLoaded(), "StarHub homepage did not load successfully.");
        // Step 2: Click 'Mobiles' menu
        homePage.clickMobilesMenu();
        // Step 3: Click 'All Phones' under 'Mobiles'
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenuItem();
        // Assert navigation to Mobile Devices Listing page
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "Mobile Devices Listing page did not load.");
    }

    @Test(testName = "TC543", description = "Test Case - SCRUM-22697 TS-001 TC-002", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void verifyAtLeastOneDeviceListed() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isPageLoaded(), "StarHub homepage did not load successfully.");
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenuItem();
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "Mobile Devices Listing page did not load.");
        // Assert at least one device is listed
        Assert.assertTrue(allPhonesPage.isAnyDeviceListed(), "No mobile devices are listed on the page.");
        Assert.assertTrue(allPhonesPage.areDeviceImagesDisplayed(), "Device images are not displayed.");
        Assert.assertTrue(allPhonesPage.areDeviceNamesDisplayed(), "Device names are not displayed.");
        Assert.assertTrue(allPhonesPage.areDevicePricesDisplayed(), "Device prices are not displayed.");
    }
}
