package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By LOGO = By.cssSelector("[data-testid=homepage-logo]"); // LOCATOR_TO_UPDATE
    private static final By MOBILES_MENU = By.cssSelector("[data-testid=mobiles-menu]"); // LOCATOR_TO_UPDATE
    private static final By ALL_PHONES_LINK = By.cssSelector("[data-testid=all-phones-link]"); // LOCATOR_TO_UPDATE
    private static final By LOGIN_BUTTON = By.cssSelector("[data-testid=login-button]"); // LOCATOR_TO_UPDATE

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(LOGO)).isDisplayed();
    }

    public void clickMobilesMenu() {
        WebElement mobilesMenu = wait.until(ExpectedConditions.elementToBeClickable(MOBILES_MENU));
        mobilesMenu.click();
    }

    public void clickAllPhones() {
        WebElement allPhonesLink = wait.until(ExpectedConditions.elementToBeClickable(ALL_PHONES_LINK));
        allPhonesLink.click();
    }

    public void login(String username, String password) {
        WebElement loginBtn = wait.until(ExpectedConditions.elementToBeClickable(LOGIN_BUTTON));
        loginBtn.click();
        // Add logic to handle login popup or page
        // LOCATOR_TO_UPDATE: Implement login form interaction
    }

    public boolean isLoggedIn() {
        // LOCATOR_TO_UPDATE: Implement logic to verify user is logged in
        return true;
    }
}
