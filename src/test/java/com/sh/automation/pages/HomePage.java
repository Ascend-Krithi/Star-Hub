package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By LOGO = By.cssSelector("[data-testid=homepage-logo]"); // LOCATOR_TO_UPDATE
    private static final By MOBILES_MENU = By.cssSelector("[data-testid=mobiles-menu]"); // LOCATOR_TO_UPDATE
    private static final By ALL_PHONES_LINK = By.cssSelector("[data-testid=all-phones-link]"); // LOCATOR_TO_UPDATE
    private static final By LOGIN_BUTTON = By.cssSelector("[data-testid=login-button]"); // LOCATOR_TO_UPDATE

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(LOGO)).isDisplayed();
    }

    public void clickMobilesMenu() {
        wait.until(ExpectedConditions.elementToBeClickable(MOBILES_MENU)).click();
    }

    public void clickAllPhones() {
        wait.until(ExpectedConditions.elementToBeClickable(ALL_PHONES_LINK)).click();
    }

    public void login(String username, String password) {
        wait.until(ExpectedConditions.elementToBeClickable(LOGIN_BUTTON)).click();
        // Implement login popup interaction here
        // LOCATOR_TO_UPDATE: Add selectors for username, password, and submit
        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-username]"))); // LOCATOR_TO_UPDATE
        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-password]"))); // LOCATOR_TO_UPDATE
        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=login-submit]"))); // LOCATOR_TO_UPDATE
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        submitButton.click();
    }

    public boolean isLoggedIn() {
        // LOCATOR_TO_UPDATE: Replace with actual locator for logged-in state
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=user-profile]"))).isDisplayed();
    }
}
