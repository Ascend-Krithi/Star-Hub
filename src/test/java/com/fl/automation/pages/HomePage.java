package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By mobilesMenu = By.cssSelector("[data-testid=mobiles-menu]"); // LOCATOR_TO_UPDATE
    private By allPhonesMenu = By.cssSelector("[data-testid=all-phones-menu]"); // LOCATOR_TO_UPDATE
    private By loginButton = By.cssSelector("[data-testid=login-button]"); // LOCATOR_TO_UPDATE
    private By logoutButton = By.cssSelector("[data-testid=logout-button]"); // LOCATOR_TO_UPDATE

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public void clickMobilesMenu() {
        WebElement mobiles = wait.until(ExpectedConditions.elementToBeClickable(mobilesMenu));
        mobiles.click();
    }

    public AllPhonesPage clickAllPhonesMenu() {
        WebElement allPhones = wait.until(ExpectedConditions.elementToBeClickable(allPhonesMenu));
        allPhones.click();
        return new AllPhonesPage(driver);
    }

    public void login(String username, String password) {
        WebElement loginBtn = wait.until(ExpectedConditions.elementToBeClickable(loginButton));
        loginBtn.click();
        // Implement login popup interaction here
        // LOCATOR_TO_UPDATE: Add username/password fields and submit
    }

    public void logoutIfLoggedIn() {
        try {
            WebElement logoutBtn = wait.until(ExpectedConditions.visibilityOfElementLocated(logoutButton));
            logoutBtn.click();
        } catch (Exception e) {
            // Already logged out
        }
    }
}
