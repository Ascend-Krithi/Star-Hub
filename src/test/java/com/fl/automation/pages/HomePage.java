package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public void clickMobilesMenu() {
        WebElement mobilesMenu = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=mobiles-menu]"))); // LOCATOR_TO_UPDATE
        mobilesMenu.click();
    }

    public boolean isMobilesMenuExpanded() {
        WebElement expandedMenu = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=mobiles-menu-expanded]"))); // LOCATOR_TO_UPDATE
        return expandedMenu.isDisplayed();
    }

    public void clickAllPhonesLink() {
        WebElement allPhonesLink = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=all-phones-link]"))); // LOCATOR_TO_UPDATE
        allPhonesLink.click();
    }

    public void login(String username, String password) {
        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=login-button]"))); // LOCATOR_TO_UPDATE
        loginButton.click();
        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=username-field]"))); // LOCATOR_TO_UPDATE
        usernameField.sendKeys(username);
        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=password-field]"))); // LOCATOR_TO_UPDATE
        passwordField.sendKeys(password);
        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=submit-login]"))); // LOCATOR_TO_UPDATE
        submitButton.click();
    }

    public void logoutIfLoggedIn() {
        // Check if logout button is present
        try {
            WebElement logoutButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=logout-button]"))); // LOCATOR_TO_UPDATE
            logoutButton.click();
        } catch (Exception e) {
            // Already logged out
        }
    }
}
