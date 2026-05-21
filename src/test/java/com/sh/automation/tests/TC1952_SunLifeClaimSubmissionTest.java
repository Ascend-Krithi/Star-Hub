package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.FileAClaimPage;

public class TC1952_SunLifeClaimSubmissionTest extends BaseTest {

    /**
     * TestRail Case ID: 1952
     * Test Case - SCRUM-27502 TS-007 TC-003
     */
    @Test(testName = "TC1952", description = "Verify claim submission with valid details and confirmation message.", groups = {"TS007", "Functional", "Regression"}, priority = 14)
    public void verifyClaimSubmissionAndConfirmation() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        final String NAME = "John Doe";
        final String POLICY_NO = "123456";
        final String EMAIL = "john.doe@email.com";
        final String PHONE = "09171234567";

        // Step 1: Navigate to 'File a Claim' page
        driver.get(BASE_URL + "/file-a-claim");
        FileAClaimPage fileAClaimPage = new FileAClaimPage(driver);
        Assert.assertTrue(fileAClaimPage.isLoaded(), "File a Claim page did not load");

        // Step 2: Enter all mandatory insured and contact details
        fileAClaimPage.enterInsuredDetails(NAME, POLICY_NO);
        fileAClaimPage.enterContactDetails(EMAIL, PHONE);

        // Step 3: Click 'Submit' button
        fileAClaimPage.clickSubmitButton();
        Assert.assertTrue(fileAClaimPage.isSubmissionSuccessful(), "Claim request was not submitted successfully");
        Assert.assertTrue(fileAClaimPage.isConfirmationMessageDisplayed(), "Confirmation message was not displayed");
    }
}
