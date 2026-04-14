package com.starhub.tests;

import com.starhub.automation.base.BaseTest;
import com.starhub.automation.pages.HomePage;
import com.starhub.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS001_PhoneListingTests_TC551 extends BaseTest {
    @Test(testName = "TC551", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
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
    }
}
