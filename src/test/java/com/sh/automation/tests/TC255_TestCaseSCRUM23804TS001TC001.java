package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC255_TestCaseSCRUM23804TS001TC001 extends BaseTest {
    @Test(testName = "TC255", description = "Test Case - SCRUM-23804 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyLoanPaymentGuideNavigation() {
        // Preconditions: Ensure application is launched in browser
        final String HOME_URL = "https://uniondigitalbank.io/en";
        final String LOAN_GUIDES_LINK_TEXT = "Loan Payment Guides";
        final String UD_LOANS_LINK_TEXT = "UD Loans";
        driver.get(HOME_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        // Step 1: Homepage loads successfully
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("UnionDigital Bank")), "Homepage title should contain 'UnionDigital Bank'");
        // Step 2: Click on 'Loan Payment Guides' link
        homePage.clickLoanPaymentGuides();
        Assert.assertTrue(wait.until(ExpectedConditions.urlContains("loan-payment-guides")), "URL should contain 'loan-payment-guides'");
        // Step 3: Click on 'UD Loans' link
        homePage.clickUDLoansGuide();
        Assert.assertTrue(wait.until(ExpectedConditions.urlContains("ud-loans-payment-guide")), "URL should contain 'ud-loans-payment-guide'");
    }
}
