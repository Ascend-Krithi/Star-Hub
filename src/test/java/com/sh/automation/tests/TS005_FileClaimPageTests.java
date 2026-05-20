package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.ClaimPage;
import com.sh.automation.pages.FileClaimPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS005_FileClaimPageTests extends BaseTest {

    /**
     * TestRail Case ID: 1920
     * Test Case - SCRUM-27502 TS-005 TC-001
     */
    @Test(testName = "TC1920", description = "Verify 'File a Claim' page displays insured and contact details sections for input.", groups = {"TS005", "Functional", "Regression"}, priority = 5)
    public void verifyFileClaimPageSectionsPresent() {
        // Preconditions
        // Ensure browser is launched and navigated to Sun Life Application URL
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        homePage.clickHowToFileAClaim();
        ClaimPage claimPage = new ClaimPage(driver);
        claimPage.clickFileAClaimNowButton();
        FileClaimPage fileClaimPage = new FileClaimPage(driver);
        wait.until(ExpectedConditions.visibilityOfElementLocated(fileClaimPage.getInsuredDetailsSectionLocator()));
        Assert.assertTrue(fileClaimPage.isInsuredDetailsSectionPresent(), "Insured details section is not present");
        Assert.assertTrue(fileClaimPage.isContactDetailsSectionPresent(), "Contact details section is not present");
        Assert.assertTrue(fileClaimPage.isInsuredDetailsSectionReadyForInput(), "Insured details section is not ready for input");
        Assert.assertTrue(fileClaimPage.isContactDetailsSectionReadyForInput(), "Contact details section is not ready for input");
    }
}
