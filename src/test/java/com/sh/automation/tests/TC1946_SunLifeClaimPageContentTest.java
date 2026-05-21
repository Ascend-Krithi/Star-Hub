package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;

public class TC1946_SunLifeClaimPageContentTest extends BaseTest {

    /**
     * TestRail Case ID: 1946
     * Test Case - SCRUM-27502 TS-003 TC-001
     */
    @Test(testName = "TC1946", description = "Verify claim filing content is visible on 'How to file a claim' page.", groups = {"TS003", "Functional", "Regression"}, priority = 8)
    public void verifyClaimPageContentVisible() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        // Step 1: Launch Sun Life homepage
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");

        // Step 2: Click 'How to file a claim' in navigation menu
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "Claim page did not load");

        // Step 3: Verify claim filing content is visible
        Assert.assertTrue(claimPage.isClaimContentVisible(), "Claim filing content is not visible");
    }
}
