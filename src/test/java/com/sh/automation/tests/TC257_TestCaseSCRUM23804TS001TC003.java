package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC257_TestCaseSCRUM23804TS001TC003 extends BaseTest {
    @Test(testName = "TC257", description = "Test Case - SCRUM-23804 TS-001 TC-003", groups = {"TS001", "Functional", "Regression"}, priority = 3)
    public void verifySessionTimeoutOnUDLoansGuide() {
        // Preconditions: Ensure application is launched in browser
        final String HOME_URL = "https://uniondigitalbank.io/en";
        final String UD_LOANS_GUIDE_URL = "https://uniondigitalbank.io/en/ud-loans-payment-guide";
        driver.get(HOME_URL);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        // Step 1: Homepage loads successfully
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("UnionDigital Bank")), "Homepage title should contain 'UnionDigital Bank'");
        // Step 2: Wait for session timeout (simulate by clearing cookies)
        driver.manage().deleteAllCookies();
        // Step 3: Attempt to navigate to UD Loans Payment Guide page
        driver.get(UD_LOANS_GUIDE_URL);
        // Application prompts for login or displays session expired message
        Assert.assertTrue(wait.until(ExpectedConditions.or(
            ExpectedConditions.presenceOfElementLocated(org.openqa.selenium.By.cssSelector("[data-testid=SESSION_EXPIRED_MSG]")), // LOCATOR_TO_UPDATE — verify in browser
            ExpectedConditions.titleContains("Login")
        )), "Application should prompt for login or display session expired message");
    }
}
