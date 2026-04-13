package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC542_TestCaseSCRUM22697TS001TC001 extends BaseTest {
    @Test(testName = "TC542", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS8", "Functional", "Regression"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        // Step 1: StarHub homepage loads successfully
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("StarHub")), "Homepage title should contain 'StarHub'");
        // Step 2: Locate and click on the 'Mobiles' menu item
        homePage.clickMobilesMenu();
        // Step 3: Click on 'All Phones' under the 'Mobiles' menu
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenu();
        // Step 4: User is navigated to the Mobile Devices Listing page
        Assert.assertTrue(allPhonesPage.isAt(), "Should be at the Mobile Devices Listing page");
    }
}
