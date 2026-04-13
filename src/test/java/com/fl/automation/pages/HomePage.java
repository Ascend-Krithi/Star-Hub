package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By mobilesMenu = By.cssSelector("[data-testid=mobiles-menu]"); // LOCATOR_TO_UPDATE — verify in browser
    private By allPhonesLink = By.cssSelector("[data-testid=all-phones-link]"); // LOCATOR_TO_UPDATE — verify in browser
    private By loginButton = By.cssSelector("[data-testid=login-button]"); // LOCATOR_TO_UPDATE — verify in browser
    private By userProfileIcon = By.cssSelector("[data-testid=user-profile-icon]"); // LOCATOR_TO_UPDATE — verify in browser

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public void clickMobilesMenu() {
        WebElement menu = wait.until(ExpectedConditions.elementToBeClickable(mobilesMenu));
        menu.click();
    }

    public void clickAllPhonesLink() {
        WebElement link = wait.until(ExpectedConditions.elementToBeClickable(allPhonesLink));
        link.click();
    }

    public void login(String username, String password) {
        WebElement loginBtn = wait.until(ExpectedConditions.elementToBeClickable(loginButton));
        loginBtn.click();
        // Assume LoginPopupPage handles the login form
        // LOCATOR_TO_UPDATE — verify in browser
    }

    public boolean isLoggedIn() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(userProfileIcon));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
