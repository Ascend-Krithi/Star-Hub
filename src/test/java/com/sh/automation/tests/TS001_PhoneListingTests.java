package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS001_PhoneListingTests extends BaseTest {
    /**
     * TestRail Case ID: TC599
     * Test Name: Test Case - SCRUM-22697 TS-001 TC-001
     */
    @Test(testName = "TC599", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions: Ensure browser is launched and navigated to StarHub homepage
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
    }
}
