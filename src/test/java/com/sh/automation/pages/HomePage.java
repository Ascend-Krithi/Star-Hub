package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By MOBILES_MENU = By.cssSelector("[data-testid=mobiles-menu]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By ALL_PHONES_LINK = By.cssSelector("[data-testid=all-phones-link]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By LOGIN_BUTTON = By.cssSelector("[data-testid=login-button]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.titleContains("StarHub"));
    }

    public void clickMobilesMenu() {
        wait.until(ExpectedConditions.elementToBeClickable(MOBILES_MENU)).click();
    }

    public void clickAllPhones() {
        wait.until(ExpectedConditions.elementToBeClickable(ALL_PHONES_LINK)).click();
    }

    public void login(String username, String password) {
        wait.until(ExpectedConditions.elementToBeClickable(LOGIN_BUTTON)).click();
        // Add login popup handling here
        // Placeholder for login fields
        // By USERNAME_FIELD = By.cssSelector("[data-testid=username-field]" /* LOCATOR_TO_UPDATE - verify in browser */);
        // By PASSWORD_FIELD = By.cssSelector("[data-testid=password-field]" /* LOCATOR_TO_UPDATE - verify in browser */);
        // By SUBMIT_BUTTON = By.cssSelector("[data-testid=submit-login]" /* LOCATOR_TO_UPDATE - verify in browser */);
        // driver.findElement(USERNAME_FIELD).sendKeys(username);
        // driver.findElement(PASSWORD_FIELD).sendKeys(password);
        // driver.findElement(SUBMIT_BUTTON).click();
    }

    public boolean isLoggedIn() {
        // Placeholder for logged-in check
        // By LOGGED_IN_INDICATOR = By.cssSelector("[data-testid=logged-in-indicator]" /* LOCATOR_TO_UPDATE - verify in browser */);
        // return wait.until(ExpectedConditions.visibilityOfElementLocated(LOGGED_IN_INDICATOR)) != null;
        return true;
    }
}
