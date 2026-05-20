package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class HomePage {
    private WebDriver driver;
    private static final By LOGO_LOCATOR = By.cssSelector("[data-testid=homepage-logo]"); // LOCATOR_TO_UPDATE
    private static final By NAVIGATION_MENU_LOCATOR = By.cssSelector("[data-testid=homepage-nav-menu]"); // LOCATOR_TO_UPDATE
    private static final By MAIN_BANNER_LOCATOR = By.cssSelector("[data-testid=homepage-main-banner]"); // LOCATOR_TO_UPDATE
    private static final By HOW_TO_FILE_A_CLAIM_LOCATOR = By.cssSelector("[data-testid=how-to-file-claim-nav]"); // LOCATOR_TO_UPDATE

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public By getLogoLocator() {
        return LOGO_LOCATOR;
    }

    public By getNavigationMenuLocator() {
        return NAVIGATION_MENU_LOCATOR;
    }

    public By getMainBannerLocator() {
        return MAIN_BANNER_LOCATOR;
    }

    public boolean isLoaded() {
        return driver.findElements(MAIN_BANNER_LOCATOR).size() > 0;
    }

    public boolean isLogoVisible() {
        return driver.findElements(LOGO_LOCATOR).size() > 0;
    }

    public boolean isNavigationMenuVisible() {
        return driver.findElements(NAVIGATION_MENU_LOCATOR).size() > 0;
    }

    public boolean isMainBannerVisible() {
        return driver.findElements(MAIN_BANNER_LOCATOR).size() > 0;
    }

    public boolean isContentComplete() {
        // Placeholder for actual implementation
        return true;
    }

    public boolean hasBrokenLinks() {
        // Placeholder for actual implementation
        return false;
    }

    public boolean hasPageErrors() {
        // Placeholder for actual implementation
        return false;
    }

    public void clickHowToFileAClaim() {
        WebElement nav = driver.findElement(HOW_TO_FILE_A_CLAIM_LOCATOR);
        nav.click();
    }
}
