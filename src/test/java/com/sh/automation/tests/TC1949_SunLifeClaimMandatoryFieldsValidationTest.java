package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.FileAClaimPage;

public class TC1949_SunLifeClaimMandatoryFieldsValidationTest extends BaseTest {

    /**
     * TestRail Case ID: 1949
     * Test Case - SCRUM-27502 TS-006 TC-001
     */
    @Test(testName = "TC1949", description = "Verify field-level validation for missing mandatory insured details.", groups = {"TS006", "Functional", "Regression"}, priority = 11)
    public void verifyMandatoryInsuredDetailsValidation() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        final String POLICY_NO = "123456";

        // Step 1: Navigate to 'File a Claim' page
        driver.get(BASE_URL + "/file-a-claim");
        FileAClaimPage fileAClaimPage = new FileAClaimPage(driver);
        Assert.assertTrue(fileAClaimPage.isLoaded(), "File a Claim page did not load");

        // Step 2: Leave mandatory insured details empty
        fileAClaimPage.enterInsuredDetails("", POLICY_NO);

        // Step 3: Attempt to proceed
        fileAClaimPage.clickNextOrSubmit();
        Assert.assertTrue(fileAClaimPage.isValidationMessageDisplayedForInsuredDetails(), "Validation message not displayed for missing insured details");
        Assert.assertTrue(fileAClaimPage.isSubmissionBlocked(), "Submission was not blocked for missing mandatory fields");
    }
}
