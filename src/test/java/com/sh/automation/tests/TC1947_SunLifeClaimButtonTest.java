package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TC1947_SunLifeClaimButtonTest extends BaseTest {

    @Test(testName = "TC1947", description = "Test Case - SCRUM-27502 TS-004 TC-001", groups = {"TS004", "Functional", "Regression"}, priority = 9)
    public void verifyFileAClaimButtonVisibleAndEnabled() {
        // TestRail Case ID: TC1947
        // Preconditions: Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load");
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "Claim filing page did not load");
        Assert.assertTrue(claimPage.isFileAClaimNowButtonVisible(), "'File a claim now' button is not visible");
        Assert.assertTrue(claimPage.isFileAClaimNowButtonEnabled(), "'File a claim now' button is not enabled");
        Assert.assertEquals(claimPage.getFileAClaimNowButtonLabel(), "File a claim now", "Button label is incorrect");
    }
}
