package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By popup = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE — verify in browser
    private By popupMessage = By.cssSelector("[data-testid=login-popup-message]"); // LOCATOR_TO_UPDATE — verify in browser
    private By loginButton = By.cssSelector("[data-testid=login-hubid-button]"); // LOCATOR_TO_UPDATE — verify in browser
    private By signUpButton = By.cssSelector("[data-testid=signup-button]"); // LOCATOR_TO_UPDATE — verify in browser
    private By usernameField = By.cssSelector("[data-testid=login-username]"); // LOCATOR_TO_UPDATE — verify in browser
    private By passwordField = By.cssSelector("[data-testid=login-password]"); // LOCATOR_TO_UPDATE — verify in browser
    private By submitButton = By.cssSelector("[data-testid=login-submit]"); // LOCATOR_TO_UPDATE — verify in browser

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isPopupDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(popup)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getPopupMessage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(popupMessage)).getText().trim();
    }

    public boolean isLoginButtonVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(loginButton)).isDisplayed();
    }

    public boolean isSignUpButtonVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(signUpButton)).isDisplayed();
    }

    public void loginWithCredentials(String username, String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameField)).sendKeys(username);
        wait.until(ExpectedConditions.visibilityOfElementLocated(passwordField)).sendKeys(password);
        wait.until(ExpectedConditions.elementToBeClickable(submitButton)).click();
    }
}
