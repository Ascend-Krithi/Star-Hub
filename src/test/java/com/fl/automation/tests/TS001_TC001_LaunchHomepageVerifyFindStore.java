package com.fl.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.base.BaseTest;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class TS001_PhoneListingTests extends BaseTest {

    /**
     * TestRail Case ID: C483
     * Title: Test Case - SCRUM-22697 TS-001 TC-001
     * Description: Launch StarHub homepage and verify navigation to All Phones via Mobiles menu.
     */
    @Test(testName = "C483", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS001", "Functional"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions
        // Ensure browser is launched and user is not logged in
        final String BASE_URL = "https://www.starhub.com";
        WebDriver driver = getDriver();
        WebDriverWait wait = new WebDriverWait(driver, 20);

        // Step 1: Launch the StarHub website
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");

        // Step 2: Locate and click on the 'Mobiles' menu item
        wait.until(ExpectedConditions.visibilityOfElementLocated(homePage.getMobilesMenuLocator()));
        homePage.clickMobilesMenu();

        // Step 3: Click on 'All Phones' under the 'Mobiles' menu
        wait.until(ExpectedConditions.visibilityOfElementLocated(homePage.getAllPhonesMenuLocator()));
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
    }
}