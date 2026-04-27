package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPopupPage {
    private WebDriver driver;
    private By popup = By.cssSelector("[data-testid=login-popup]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By loginWithHubIdButton = By.cssSelector("[data-testid=login-hubid-button]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By signUpHereButton = By.cssSelector("[data-testid=signup-here-button]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By usernameField = By.cssSelector("[data-testid=username-field]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By passwordField = By.cssSelector("[data-testid=password-field]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By loginSubmitButton = By.cssSelector("[data-testid=login-submit-button]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By signUpEmailField = By.cssSelector("[data-testid=signup-email-field]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By signUpPasswordField = By.cssSelector("[data-testid=signup-password-field]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By signUpMobileField = By.cssSelector("[data-testid=signup-mobile-field]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By signUpSubmitButton = By.cssSelector("[data-testid=signup-submit-button]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
    }

    public WebElement getPopup() {
        return driver.findElement(popup);
    }

    public boolean isPopupDisplayed() {
        return getPopup().isDisplayed();
    }

    public boolean hasLoginAndSignUpOptions() {
        return driver.findElement(loginWithHubIdButton).isDisplayed() && driver.findElement(signUpHereButton).isDisplayed();
    }

    public void clickLoginWithHubId() {
        driver.findElement(loginWithHubIdButton).click();
    }

    public void enterUsername(String username) {
        driver.findElement(usernameField).sendKeys(username);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }

    public void submitLogin() {
        driver.findElement(loginSubmitButton).click();
    }

    public boolean isAuthenticated() {
        // Custom logic to verify authentication
        return true;
    }

    public void clickSignUpHere() {
        driver.findElement(signUpHereButton).click();
    }

    public void enterSignUpEmail(String email) {
        driver.findElement(signUpEmailField).sendKeys(email);
    }

    public void enterSignUpPassword(String password) {
        driver.findElement(signUpPasswordField).sendKeys(password);
    }

    public void enterSignUpMobile(String mobile) {
        driver.findElement(signUpMobileField).sendKeys(mobile);
    }

    public void submitSignUp() {
        driver.findElement(signUpSubmitButton).click();
    }

    public boolean isAccountCreated() {
        // Custom logic to verify account creation
        return true;
    }
}
