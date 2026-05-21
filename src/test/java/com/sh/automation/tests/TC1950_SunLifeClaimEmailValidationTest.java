package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.FileAClaimPage;

public class TC1950_SunLifeClaimEmailValidationTest extends BaseTest {

    /**
     * TestRail Case ID: 1950
     * Test Case - SCRUM-27502 TS-007 TC-001
     */
    @Test(testName = "TC1950", description = "Verify field-level validation for invalid email format in contact details.", groups = {"TS007", "Functional", "Regression"}, priority = 12)
    public void verifyInvalidEmailValidation() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        final String EMAIL = "john.doe[at]email.com";
        final String PHONE = "09171234567";

        // Step 1: Navigate to 'File a Claim' page
        driver.get(BASE_URL + "/file-a-claim");
        FileAClaimPage fileAClaimPage = new FileAClaimPage(driver);
        Assert.assertTrue(fileAClaimPage.isLoaded(), "File a Claim page did not load");

        // Step 2: Enter invalid email format
        fileAClaimPage.enterContactDetails(EMAIL, PHONE);

        // Step 3: Attempt to proceed
        fileAClaimPage.clickNextOrSubmit();
        Assert.assertTrue(fileAClaimPage.isValidationMessageDisplayedForEmail(), "Validation message not displayed for invalid email");
        Assert.assertTrue(fileAClaimPage.isSubmissionBlocked(), "Submission was not blocked for invalid email");
    }
}
