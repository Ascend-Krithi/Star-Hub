package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;

public class TC1918_ClaimPageNavigationTests extends BaseTest {

    /**
     * TestRail Case ID: 1918
     * Test Case - SCRUM-27502 TS-003 TC-001
     */
    @Test(testName = "TC1918", description = "Navigate to 'How to file a claim' page and verify claim filing content is visible.", groups = {"TS003", "Functional", "Regression"}, priority = 3)
    public void verifyClaimPageNavigationAndContent() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load.");
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "'How to file a claim' page did not load.");
        Assert.assertTrue(claimPage.isClaimFilingContentVisible(), "Claim filing content is not visible.");
    }
}
