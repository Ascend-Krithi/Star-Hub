package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;

public class TC1918_SunLifeClaimPageContentTest extends BaseTest {

    /**
     * TestRail Case ID: 1918
     * Test Case - SCRUM-27502 TS-003 TC-001
     */
    @Test(testName = "TC1918", description = "Verify 'How to file a claim' page content is visible.", groups = {"TS003", "Functional", "Regression"}, priority = 3)
    public void verifyClaimPageContentVisible() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        // Step 1: Launch browser and navigate to Sun Life homepage
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");

        // Step 2: Click 'How to file a claim' in navigation
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "Claim page did not load");

        // Step 3: Verify claim filing content is visible
        Assert.assertTrue(claimPage.isClaimContentVisible(), "Claim filing content is not visible");
    }
}
