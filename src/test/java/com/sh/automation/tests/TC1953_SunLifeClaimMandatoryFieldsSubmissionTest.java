package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.FileAClaimPage;

public class TC1953_SunLifeClaimMandatoryFieldsSubmissionTest extends BaseTest {

    /**
     * TestRail Case ID: 1953
     * Test Case - SCRUM-27502 TS-008 TC-001
     */
    @Test(testName = "TC1953", description = "Verify validation messages for missing mandatory fields on claim submission.", groups = {"TS008", "Functional", "Regression"}, priority = 15)
    public void verifyMandatoryFieldsValidationOnSubmission() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        final String POLICY_NO = "123456";

        // Step 1: Navigate to 'File a Claim' page
        driver.get(BASE_URL + "/file-a-claim");
        FileAClaimPage fileAClaimPage = new FileAClaimPage(driver);
        Assert.assertTrue(fileAClaimPage.isLoaded(), "File a Claim page did not load");

        // Step 2: Leave mandatory fields empty
        fileAClaimPage.enterInsuredDetails("", POLICY_NO);

        // Step 3: Click 'Submit' button
        fileAClaimPage.clickSubmitButton();
        Assert.assertTrue(fileAClaimPage.isValidationMessageDisplayedForMandatoryFields(), "Validation messages not displayed for missing mandatory fields");
        Assert.assertTrue(fileAClaimPage.isSubmissionBlocked(), "Submission was not blocked for missing mandatory fields");
    }
}
