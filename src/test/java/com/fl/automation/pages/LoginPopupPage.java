package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isPopupVisible() {
        WebElement popup = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-popup]"))); // LOCATOR_TO_UPDATE
        return popup.isDisplayed();
    }

    public boolean isPopupMessageCorrect() {
        WebElement message = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-popup-message]"))); // LOCATOR_TO_UPDATE
        return message.getText().contains("Please log in or create an account to continue with your purchase");
    }

    public boolean isLoginButtonVisible() {
        WebElement loginButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-popup-login-button]"))); // LOCATOR_TO_UPDATE
        return loginButton.isDisplayed();
    }

    public boolean isSignUpButtonVisible() {
        WebElement signUpButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-popup-signup-button]"))); // LOCATOR_TO_UPDATE
        return signUpButton.isDisplayed();
    }
}
