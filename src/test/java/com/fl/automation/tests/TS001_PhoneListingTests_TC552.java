package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS001_PhoneListingTests_TC552 extends BaseTest {
    @Test(testName = "TC552", description = "Test Case - SCRUM-22697 TS-002 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void verifyAtLeastOneDeviceListed_TC552() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
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
        // Step 4: Assert at least one device is listed
        Assert.assertTrue(allPhonesPage.isDeviceListDisplayed(), "At least one mobile device should be displayed");
    }
}
