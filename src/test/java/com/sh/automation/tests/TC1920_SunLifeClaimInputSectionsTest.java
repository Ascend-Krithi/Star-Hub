package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;
import com.sh.automation.pages.FileAClaimPage;

public class TC1920_SunLifeClaimInputSectionsTest extends BaseTest {

    /**
     * TestRail Case ID: 1920
     * Test Case - SCRUM-27502 TS-005 TC-001
     */
    @Test(testName = "TC1920", description = "Verify insured and contact details sections are present for input on 'File a Claim' page.", groups = {"TS005", "Functional", "Regression"}, priority = 5)
    public void verifyClaimInputSectionsPresent() {
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

        // Step 3: Click 'File a claim now' button
        claimPage.clickFileAClaimNowButton();
        FileAClaimPage fileAClaimPage = new FileAClaimPage(driver);
        Assert.assertTrue(fileAClaimPage.isLoaded(), "File a Claim page did not load");

        // Step 4: Verify insured and contact details sections
        Assert.assertTrue(fileAClaimPage.isInsuredDetailsSectionPresent(), "Insured details section is not present");
        Assert.assertTrue(fileAClaimPage.isContactDetailsSectionPresent(), "Contact details section is not present");
    }
}
