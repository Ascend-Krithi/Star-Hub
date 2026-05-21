package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;
import com.sh.automation.pages.FileAClaimPage;

public class TC1920_ClaimPageInputSectionsTests extends BaseTest {

    /**
     * TestRail Case ID: 1920
     * Test Case - SCRUM-27502 TS-005 TC-001
     */
    @Test(testName = "TC1920", description = "Verify insured and contact details sections are present and ready for input on 'File a Claim' page.", groups = {"TS005", "Functional", "Regression"}, priority = 5)
    public void verifyInsuredAndContactDetailsSections() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load.");
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "'How to file a claim' page did not load.");
        claimPage.clickFileAClaimNowButton();
        FileAClaimPage fileAClaimPage = new FileAClaimPage(driver);
        Assert.assertTrue(fileAClaimPage.isLoaded(), "'File a Claim' page did not load.");
        Assert.assertTrue(fileAClaimPage.isInsuredDetailsSectionPresent(), "Insured details section is not present.");
        Assert.assertTrue(fileAClaimPage.isContactDetailsSectionPresent(), "Contact details section is not present.");
    }
}
