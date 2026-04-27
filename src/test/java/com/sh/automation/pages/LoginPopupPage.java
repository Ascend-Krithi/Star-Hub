package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By popup = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE — verify in browser
    private By popupMessage = By.cssSelector("[data-testid=popup-message]"); // LOCATOR_TO_UPDATE — verify in browser
    private By loginWithHubIdButton = By.cssSelector("[data-testid=login-hubid-btn]"); // LOCATOR_TO_UPDATE — verify in browser
    private By signUpHereButton = By.cssSelector("[data-testid=signup-here-btn]"); // LOCATOR_TO_UPDATE — verify in browser
    private By usernameField = By.cssSelector("[data-testid=username-input]"); // LOCATOR_TO_UPDATE — verify in browser
    private By passwordField = By.cssSelector("[data-testid=password-input]"); // LOCATOR_TO_UPDATE — verify in browser
    private By loginButton = By.cssSelector("[data-testid=login-btn]"); // LOCATOR_TO_UPDATE — verify in browser
    private By signUpLink = By.cssSelector("[data-testid=signup-link]"); // LOCATOR_TO_UPDATE — verify in browser
    private By registrationForm = By.cssSelector("[data-testid=registration-form]"); // LOCATOR_TO_UPDATE — verify in browser
    private By nameField = By.cssSelector("[data-testid=reg-name-input]"); // LOCATOR_TO_UPDATE — verify in browser
    private By emailField = By.cssSelector("[data-testid=reg-email-input]"); // LOCATOR_TO_UPDATE — verify in browser
    private By regPasswordField = By.cssSelector("[data-testid=reg-password-input]"); // LOCATOR_TO_UPDATE — verify in browser
    private By phoneField = By.cssSelector("[data-testid=reg-phone-input]"); // LOCATOR_TO_UPDATE — verify in browser
    private By submitRegistrationButton = By.cssSelector("[data-testid=submit-registration]"); // LOCATOR_TO_UPDATE — verify in browser

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(popup)).isDisplayed();
    }

    public String getPopupMessage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(popupMessage)).getText();
    }

    public boolean isLoginWithHubIdButtonVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(loginWithHubIdButton)).isDisplayed();
    }

    public boolean isSignUpHereButtonVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(signUpHereButton)).isDisplayed();
    }

    public void enterUsername(String username) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameField)).sendKeys(username);
    }

    public void enterPassword(String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(passwordField)).sendKeys(password);
    }

    public void clickLoginButton() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
    }

    public boolean isAuthenticatedAndRedirected() {
        // Implement logic to verify authentication and redirection
        return true; // LOCATOR_TO_UPDATE — verify in browser
    }

    public void clickSignUpLink() {
        wait.until(ExpectedConditions.elementToBeClickable(signUpLink)).click();
    }

    public void fillRegistrationForm(String name, String email, String password, String phone) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(registrationForm));
        wait.until(ExpectedConditions.visibilityOfElementLocated(nameField)).sendKeys(name);
        wait.until(ExpectedConditions.visibilityOfElementLocated(emailField)).sendKeys(email);
        wait.until(ExpectedConditions.visibilityOfElementLocated(regPasswordField)).sendKeys(password);
        wait.until(ExpectedConditions.visibilityOfElementLocated(phoneField)).sendKeys(phone);
    }

    public void submitRegistrationForm() {
        wait.until(ExpectedConditions.elementToBeClickable(submitRegistrationButton)).click();
    }

    public boolean isAccountCreatedAndRedirected() {
        // Implement logic to verify account creation and redirection
        return true; // LOCATOR_TO_UPDATE — verify in browser
    }
}
