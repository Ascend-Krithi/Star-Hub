package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.ClaimPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TC1949_SunLifeClaimMandatoryFieldsValidationTest extends BaseTest {

    @Test(testName = "TC1949", description = "Test Case - SCRUM-27502 TS-009 TC-001", groups = {"TS009", "Functional", "Regression"}, priority = 11)
    public void verifyMandatoryFieldsValidationOnSubmit() {
        // TestRail Case ID: TC1949
        // Preconditions: Ensure 'File a Claim' page is loaded
        ClaimPage claimPage = new ClaimPage(driver);
        Assert.assertTrue(claimPage.isLoaded(), "File a Claim page did not load");
        claimPage.leaveMandatoryFieldsEmpty();
        claimPage.clickSubmitButton();
        Assert.assertTrue(claimPage.isValidationMessageDisplayedForMissingFields(), "Validation message not displayed for missing mandatory fields");
        Assert.assertFalse(claimPage.isSubmissionSuccessful(), "Submission should not proceed with missing mandatory fields");
    }
}
