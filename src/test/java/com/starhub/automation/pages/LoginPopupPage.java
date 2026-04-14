package com.starhub.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By popup = By.cssSelector("[data-testid=login-popup]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By popupMsg = By.cssSelector("[data-testid=login-popup-msg]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(popup)) != null;
    }

    public boolean isLoginMessageCorrect() {
        WebElement msgElem = wait.until(ExpectedConditions.visibilityOfElementLocated(popupMsg));
        String msg = msgElem.getText();
        return msg.contains("Please log in or create an account to continue with your purchase");
    }
}
