package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TC1920_SunLifeClaimInputSectionsTest extends BaseTest {

    @Test(testName = "TC1920", description = "Test Case - SCRUM-27502 TS-005 TC-001", groups = {"TS005", "Functional", "Regression"}, priority = 5)
    public void verifyClaimInputSectionsPresent() {
        // TestRail Case ID: TC1920
        // Preconditions: Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load");
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "Claim filing page did not load");
        claimPage.clickFileAClaimNowButton();
        Assert.assertTrue(claimPage.isInsuredDetailsSectionPresent(), "Insured details section is not present");
        Assert.assertTrue(claimPage.isContactDetailsSectionPresent(), "Contact details section is not present");
    }
}
