package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.By;

public class TS004_LoanPaymentGuidesTests extends BaseTest {

    /**
     * TestRail Case ID: TC353
     * Test Name: Test Case - SCRUM-23804 TS-004 TC-001
     */
    @Test(testName = "TC353", description = "Test Case - SCRUM-23804 TS-004 TC-001", groups = {"TS009", "Functional", "Regression"}, priority = 4)
    public void verifyClickHereToPayViaUPAYLinkDisplayed() {
        // Preconditions
        // Ensure browser is launched and navigated to UnionDigital Bank homepage
        final String BASE_URL = "https://uniondigitalbank.io/en";
        final String PAY_THROUGH_SECTION_TEXT = "Pay through your other bank accounts or e-wallets via UPAY.";
        final String CLICK_HERE_LINK_TEXT = "Click here to pay via UPAY";

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

        // Click on '+' icon to expand payment options
        By plusIcon = By.cssSelector("[data-testid=plus-icon-how-to-pay]"); // LOCATOR_TO_UPDATE — verify in browser
        wait.until(ExpectedConditions.elementToBeClickable(plusIcon)).click();
        // Assert payment option details are displayed
        By paymentOptionDetails = By.cssSelector("[data-testid=payment-option-details]"); // LOCATOR_TO_UPDATE — verify in browser
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(paymentOptionDetails)).isDisplayed(), "Payment option details are not displayed");

        // Locate 'Pay through your other bank accounts or e-wallets via UPAY.' section
        By payThroughSection = By.xpath("//*[text()='" + PAY_THROUGH_SECTION_TEXT + "']");
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(payThroughSection)).isDisplayed(), "Section is not located");

        // Verify 'Click here to pay via UPAY' link is displayed under this section
        By clickHereLink = By.cssSelector("[data-testid=click-here-pay-upay-link]"); // LOCATOR_TO_UPDATE — verify in browser
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(clickHereLink)).isDisplayed(), "'Click here to pay via UPAY' link is not visible");
    }
}
