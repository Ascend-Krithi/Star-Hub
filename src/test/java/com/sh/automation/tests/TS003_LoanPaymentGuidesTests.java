package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.By;

public class TS003_LoanPaymentGuidesTests extends BaseTest {

    /**
     * TestRail Case ID: TC352
     * Test Name: Test Case - SCRUM-23804 TS-003 TC-001
     */
    @Test(testName = "TC352", description = "Test Case - SCRUM-23804 TS-003 TC-001", groups = {"TS009", "Functional", "Regression"}, priority = 3)
    public void verifyPaymentOptionDetailsDisplayedOnPlusIconClick() {
        // Preconditions
        // Ensure browser is launched and navigated to UnionDigital Bank homepage
        final String BASE_URL = "https://uniondigitalbank.io/en";
        final String HOW_TO_PAY_TEXT = "How To Pay Your UD Loans";

        WebDriverWait wait = new WebDriverWait(driver, 15);
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");

        // Click on 'Loan Payment Guides' link
        By loanPaymentGuidesLink = By.cssSelector("[data-testid=loan-payment-guides-link]"); // LOCATOR_TO_UPDATE — verify in browser
        wait.until(ExpectedConditions.elementToBeClickable(loanPaymentGuidesLink)).click();
        // Assert Loan Payment Guides page is displayed
        By loanPaymentGuidesHeader = By.cssSelector("[data-testid=loan-payment-guides-header]"); // LOCATOR_TO_UPDATE — verify in browser
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(loanPaymentGuidesHeader)).isDisplayed(), "Loan Payment Guides page is not displayed");

        // Click on 'UD Loans' link
        By udLoansLink = By.cssSelector("[data-testid=ud-loans-link]"); // LOCATOR_TO_UPDATE — verify in browser
        wait.until(ExpectedConditions.elementToBeClickable(udLoansLink)).click();
        // Assert UD Loans Payment Guide page is displayed
        By udLoansHeader = By.cssSelector("[data-testid=ud-loans-header]"); // LOCATOR_TO_UPDATE — verify in browser
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(udLoansHeader)).isDisplayed(), "UD Loans Payment Guide page is not displayed");

        // Locate '+' icon next to 'How To Pay Your UD Loans' text
        By plusIcon = By.cssSelector("[data-testid=plus-icon-how-to-pay]"); // LOCATOR_TO_UPDATE — verify in browser
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(plusIcon)).isDisplayed(), "'+' icon is not located");

        // Click on '+' icon
        wait.until(ExpectedConditions.elementToBeClickable(plusIcon)).click();
        // Assert payment option details are displayed below
        By paymentOptionDetails = By.cssSelector("[data-testid=payment-option-details]"); // LOCATOR_TO_UPDATE — verify in browser
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(paymentOptionDetails)).isDisplayed(), "Payment option details are not displayed below");
    }
}
