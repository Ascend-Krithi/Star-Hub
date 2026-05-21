package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TC1918_SunLifeClaimFilingContentTest extends BaseTest {

    @Test(testName = "TC1918", description = "Test Case - SCRUM-27502 TS-003 TC-001", groups = {"TS003", "Functional", "Regression"}, priority = 3)
    public void verifyClaimFilingContentVisible() {
        // TestRail Case ID: TC1918
        // Preconditions: Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load");
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "Claim filing page did not load");
        Assert.assertTrue(claimPage.isClaimFilingContentVisible(), "Claim filing content is not visible");
    }
}
