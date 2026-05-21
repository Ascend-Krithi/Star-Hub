package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;

public class TC1944_SunLifeHomepageLoadTest extends BaseTest {

    /**
     * TestRail Case ID: 1944
     * Test Case - SCRUM-27502 TS-001 TC-001
     */
    @Test(testName = "TC1944", description = "Verify Sun Life homepage loads without broken links or errors.", groups = {"TS001", "Functional", "Regression"}, priority = 6)
    public void verifySunLifeHomepageLoadsWithoutErrors() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        // Step 1: Open browser and enter Sun Life URL
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");

        // Step 2: Observe homepage for broken links or errors
        Assert.assertTrue(homePage.hasNoBrokenLinks(), "Homepage has broken links");
        Assert.assertTrue(homePage.hasNoPageErrors(), "Homepage has page errors");
    }
}
