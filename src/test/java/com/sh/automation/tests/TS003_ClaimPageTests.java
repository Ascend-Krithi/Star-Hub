package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS003_ClaimPageTests extends BaseTest {

    /**
     * TestRail Case ID: 1918
     * Test Case - SCRUM-27502 TS-003 TC-001
     */
    @Test(testName = "TC1918", description = "Verify 'How to file a claim' page and content are visible from homepage navigation.", groups = {"TS003", "Functional", "Regression"}, priority = 3)
    public void verifyClaimPageContentVisible() {
        // Preconditions
        // Ensure browser is launched and navigated to Sun Life Application URL
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOfElementLocated(homePage.getNavigationMenuLocator()));
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        wait.until(ExpectedConditions.visibilityOfElementLocated(claimPage.getClaimContentLocator()));
        Assert.assertTrue(claimPage.isLoaded(), "'How to file a claim' page did not load");
        Assert.assertTrue(claimPage.isClaimContentVisible(), "Claim filing content is not visible");
    }
}
