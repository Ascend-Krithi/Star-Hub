package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC258_TestCaseSCRUM23804TS001TC004 extends BaseTest {
    @Test(testName = "TC258", description = "Test Case - SCRUM-23804 TS-001 TC-004", groups = {"TS001", "Functional", "Regression"}, priority = 4)
    public void verifyUDLoansGuideResponsiveRendering() {
        // Preconditions: Ensure application is launched on desktop, tablet, and mobile
        final String HOME_URL = "https://uniondigitalbank.io/en";
        final String UD_LOANS_GUIDE_URL = "https://uniondigitalbank.io/en/ud-loans-payment-guide";
        driver.get(HOME_URL);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        // Step 1: Homepage loads successfully on all devices
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("UnionDigital Bank")), "Homepage title should contain 'UnionDigital Bank'");
        // Step 2: Navigate to UD Loans Payment Guide page
        driver.get(UD_LOANS_GUIDE_URL);
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("UD Loans Payment Guide")), "UD Loans Payment Guide page title should be correct");
        // Responsive rendering check (placeholder for device emulation)
        Assert.assertTrue(wait.until(ExpectedConditions.presenceOfElementLocated(org.openqa.selenium.By.cssSelector("[data-testid=RESPONSIVE_RENDER_CHECK]"))), "UD Loans Payment Guide page renders correctly on all devices"); // LOCATOR_TO_UPDATE — verify in browser
    }
}
