package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By loginPopup = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE — verify in browser
    private By loginMessage = By.cssSelector("[data-testid=login-message]"); // LOCATOR_TO_UPDATE — verify in browser

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isLoginPopupDisplayed() {
        try {
            WebElement popup = wait.until(ExpectedConditions.visibilityOfElementLocated(loginPopup));
            return popup.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isLoginMessageCorrect() {
        WebElement message = wait.until(ExpectedConditions.visibilityOfElementLocated(loginMessage));
        return message.getText().contains("Please log in or create an account to continue with your purchase");
    }
}
