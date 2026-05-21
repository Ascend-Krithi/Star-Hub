package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TC1944_SunLifeHomepageLoadTest extends BaseTest {

    @Test(testName = "TC1944", description = "Test Case - SCRUM-27502 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 6)
    public void verifySunLifeHomepageLoads() {
        // TestRail Case ID: TC1944
        // Preconditions: Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load");
        Assert.assertFalse(homePage.hasBrokenLinksOrErrors(), "Homepage has broken links or errors");
    }
}
