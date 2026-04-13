package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By mobilesMenu = By.cssSelector("[data-testid=mobiles-menu]"); // LOCATOR_TO_UPDATE — verify in browser
    private By allPhonesMenuItem = By.cssSelector("[data-testid=all-phones-menu-item]"); // LOCATOR_TO_UPDATE — verify in browser
    private By loginButton = By.cssSelector("[data-testid=login-button]"); // LOCATOR_TO_UPDATE — verify in browser
    private By logoutButton = By.cssSelector("[data-testid=logout-button]"); // LOCATOR_TO_UPDATE — verify in browser

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isPageLoaded() {
        return wait.until(ExpectedConditions.titleContains("StarHub"));
    }

    public void clickMobilesMenu() {
        wait.until(ExpectedConditions.elementToBeClickable(mobilesMenu)).click();
    }

    public AllPhonesPage clickAllPhonesMenuItem() {
        wait.until(ExpectedConditions.elementToBeClickable(allPhonesMenuItem)).click();
        return new AllPhonesPage(driver);
    }

    public void ensureLoggedOut() {
        try {
            WebElement logout = wait.until(ExpectedConditions.visibilityOfElementLocated(logoutButton));
            if (logout.isDisplayed()) {
                logout.click();
                wait.until(ExpectedConditions.visibilityOfElementLocated(loginButton));
            }
        } catch (Exception e) {
            // Already logged out
        }
    }

    public void login(String username, String password) {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
        // Assume LoginPopupPage handles the login popup
        LoginPopupPage loginPopup = new LoginPopupPage(driver);
        loginPopup.loginWithCredentials(username, password);
    }
}
