package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC256_TestCaseSCRUM23804TS001TC002 extends BaseTest {
    @Test(testName = "TC256", description = "Test Case - SCRUM-23804 TS-001 TC-002", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void verifyInvalidUDLoansPaymentGuideURL() {
        // Preconditions: Ensure application is launched in browser
        final String INVALID_URL = "https://uniondigitalbank.io/en/ud-loans-payment-guide-invalid";
        driver.get(INVALID_URL);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        // Step 2: Application displays error or redirects to error page
        Assert.assertTrue(wait.until(ExpectedConditions.or(
            ExpectedConditions.titleContains("Error"),
            ExpectedConditions.urlContains("error")
        )), "Application should display error or redirect to error page");
    }
}
