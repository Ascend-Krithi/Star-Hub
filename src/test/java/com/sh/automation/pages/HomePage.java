package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public void clickLoanPaymentGuides() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=LOAN_PAYMENT_GUIDES_LINK]"))).click(); // LOCATOR_TO_UPDATE — verify in browser
    }

    public void clickUDLoansGuide() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=UD_LOANS_LINK]"))).click(); // LOCATOR_TO_UPDATE — verify in browser
    }
}
