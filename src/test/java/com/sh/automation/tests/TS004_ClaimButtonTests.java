package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS004_ClaimButtonTests extends BaseTest {

    /**
     * TestRail Case ID: 1919
     * Test Case - SCRUM-27502 TS-004 TC-001
     */
    @Test(testName = "TC1919", description = "Verify 'File a claim now' button is visible, enabled, and labeled correctly.", groups = {"TS004", "Functional", "Regression"}, priority = 4)
    public void verifyClaimButtonVisibleAndLabeled() {
        // Preconditions
        // Ensure browser is launched and navigated to Sun Life Application URL
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        wait.until(ExpectedConditions.visibilityOfElementLocated(claimPage.getFileAClaimNowButtonLocator()));
        Assert.assertTrue(claimPage.isFileAClaimNowButtonVisible(), "'File a claim now' button is not visible");
        Assert.assertTrue(claimPage.isFileAClaimNowButtonEnabled(), "'File a claim now' button is not enabled");
        Assert.assertEquals(claimPage.getFileAClaimNowButtonLabel(), "File a claim now", "Button label is incorrect");
    }
}
