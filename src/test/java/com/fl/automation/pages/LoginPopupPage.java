package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By popup = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE
    private By popupMessage = By.cssSelector("[data-testid=popup-message]"); // LOCATOR_TO_UPDATE
    private By loginButton = By.cssSelector("[data-testid=login-button]"); // LOCATOR_TO_UPDATE
    private By signUpButton = By.cssSelector("[data-testid=signup-button]"); // LOCATOR_TO_UPDATE

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isPopupDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(popup)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getPopupMessage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(popupMessage)).getText();
    }

    public boolean isLoginButtonVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(loginButton)).isDisplayed();
    }

    public boolean isSignUpButtonVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(signUpButton)).isDisplayed();
    }
}
