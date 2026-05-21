package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;

public class TC1919_SunLifeClaimButtonTest extends BaseTest {

    /**
     * TestRail Case ID: 1919
     * Test Case - SCRUM-27502 TS-004 TC-001
     */
    @Test(testName = "TC1919", description = "Verify 'File a claim now' button is visible, enabled, and labeled correctly.", groups = {"TS004", "Functional", "Regression"}, priority = 4)
    public void verifyFileAClaimNowButton() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        // Step 1: Launch browser and navigate to Sun Life homepage
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");

        // Step 2: Click 'How to file a claim' option
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "Claim page did not load");

        // Step 3: Check for 'File a claim now' button
        Assert.assertTrue(claimPage.isFileAClaimNowButtonVisible(), "'File a claim now' button is not visible");
        Assert.assertTrue(claimPage.isFileAClaimNowButtonEnabled(), "'File a claim now' button is not enabled");
        Assert.assertEquals(claimPage.getFileAClaimNowButtonLabel(), "File a claim now", "Button label is incorrect");
    }
}
