package com.starhub.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPopupPage {
    private WebDriver driver;

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
    }

    public WebElement getPopupElement() {
        return driver.findElement(By.cssSelector("[data-testid=login-popup]")); // LOCATOR_TO_UPDATE — verify in browser
    }

    public boolean isLoginPopupDisplayed() {
        return getPopupElement().isDisplayed();
    }

    public boolean areLoginAndSignUpOptionsVisible() {
        WebElement loginBtn = driver.findElement(By.cssSelector("[data-testid=login-hub-id]")); // LOCATOR_TO_UPDATE — verify in browser
        WebElement signUpBtn = driver.findElement(By.cssSelector("[data-testid=sign-up-here]")); // LOCATOR_TO_UPDATE — verify in browser
        return loginBtn.isDisplayed() && signUpBtn.isDisplayed();
    }

    public void clickLoginWithHubId() {
        WebElement loginBtn = driver.findElement(By.cssSelector("[data-testid=login-hub-id]")); // LOCATOR_TO_UPDATE — verify in browser
        loginBtn.click();
    }

    public void enterCredentials(String username, String password) {
        WebElement usernameField = driver.findElement(By.cssSelector("[data-testid=username-field]")); // LOCATOR_TO_UPDATE — verify in browser
        WebElement passwordField = driver.findElement(By.cssSelector("[data-testid=password-field]")); // LOCATOR_TO_UPDATE — verify in browser
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
    }

    public void submitLogin() {
        WebElement submitBtn = driver.findElement(By.cssSelector("[data-testid=login-submit]")); // LOCATOR_TO_UPDATE — verify in browser
        submitBtn.click();
    }

    public boolean isAuthenticated() {
        WebElement authenticatedIndicator = driver.findElement(By.cssSelector("[data-testid=authenticated-indicator]")); // LOCATOR_TO_UPDATE — verify in browser
        return authenticatedIndicator.isDisplayed();
    }

    public boolean isRedirectedToNextStep() {
        WebElement nextStep = driver.findElement(By.cssSelector("[data-testid=next-step]")); // LOCATOR_TO_UPDATE — verify in browser
        return nextStep.isDisplayed();
    }

    public void clickSignUpHere() {
        WebElement signUpBtn = driver.findElement(By.cssSelector("[data-testid=sign-up-here]")); // LOCATOR_TO_UPDATE — verify in browser
        signUpBtn.click();
    }

    public void enterSignUpDetails(String email, String password, String mobile) {
        WebElement emailField = driver.findElement(By.cssSelector("[data-testid=signup-email-field]")); // LOCATOR_TO_UPDATE — verify in browser
        WebElement passwordField = driver.findElement(By.cssSelector("[data-testid=signup-password-field]")); // LOCATOR_TO_UPDATE — verify in browser
        WebElement mobileField = driver.findElement(By.cssSelector("[data-testid=signup-mobile-field]")); // LOCATOR_TO_UPDATE — verify in browser
        emailField.sendKeys(email);
        passwordField.sendKeys(password);
        mobileField.sendKeys(mobile);
    }

    public void submitSignUp() {
        WebElement submitBtn = driver.findElement(By.cssSelector("[data-testid=signup-submit]")); // LOCATOR_TO_UPDATE — verify in browser
        submitBtn.click();
    }

    public boolean isAccountCreated() {
        WebElement accountCreatedIndicator = driver.findElement(By.cssSelector("[data-testid=account-created-indicator]")); // LOCATOR_TO_UPDATE — verify in browser
        return accountCreatedIndicator.isDisplayed();
    }
}
