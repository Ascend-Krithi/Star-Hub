package com.fl.automation.tests;

import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS001_PhoneListingTests extends BaseTest {

    /**
     * TestRail Case ID: C483
     * Title: Test Case - SCRUM-22697 TS-001 TC-001
     * Steps:
     * 1. Launch the StarHub website in a supported browser.
     * 2. Locate and click on the 'Mobiles' menu item.
     * 3. Click on 'All Phones' under the 'Mobiles' menu.
     */
    @Test(
        testName = "C483",
        description = "Test Case - SCRUM-22697 TS-001 TC-001",
        groups = {"TS001", "Functional"},
        priority = 1
    )
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        // Step 1: Launch homepage
        HomePage homePage = new HomePage(driver);
        driver.get(BASE_URL);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        // Step 2: Click Mobiles menu
        homePage.clickMobilesMenu();
        // Step 3: Click All Phones
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
    }
}