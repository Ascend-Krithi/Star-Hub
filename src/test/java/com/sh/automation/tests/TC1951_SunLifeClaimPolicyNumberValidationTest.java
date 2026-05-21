package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.FileAClaimPage;

public class TC1951_SunLifeClaimPolicyNumberValidationTest extends BaseTest {

    /**
     * TestRail Case ID: 1951
     * Test Case - SCRUM-27502 TS-007 TC-002
     */
    @Test(testName = "TC1951", description = "Verify field-level validation for invalid policy number in insured details.", groups = {"TS007", "Functional", "Regression"}, priority = 13)
    public void verifyInvalidPolicyNumberValidation() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        final String NAME = "John Doe";
        final String POLICY_NO = "ABCDEF";

        // Step 1: Navigate to 'File a Claim' page
        driver.get(BASE_URL + "/file-a-claim");
        FileAClaimPage fileAClaimPage = new FileAClaimPage(driver);
        Assert.assertTrue(fileAClaimPage.isLoaded(), "File a Claim page did not load");

        // Step 2: Enter invalid policy number
        fileAClaimPage.enterInsuredDetails(NAME, POLICY_NO);

        // Step 3: Attempt to proceed
        fileAClaimPage.clickNextOrSubmit();
        Assert.assertTrue(fileAClaimPage.isValidationMessageDisplayedForPolicyNumber(), "Validation message not displayed for invalid policy number");
        Assert.assertTrue(fileAClaimPage.isSubmissionBlocked(), "Submission was not blocked for invalid policy number");
    }
}
