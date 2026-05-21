package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=homepage-logo]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isLogoVisible() {
        return driver.findElement(By.cssSelector("[data-testid=homepage-logo]")) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isNavigationMenuVisible() {
        return driver.findElement(By.cssSelector("[data-testid=homepage-nav-menu]")) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isMainBannerVisible() {
        return driver.findElement(By.cssSelector("[data-testid=homepage-main-banner]")) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isContentComplete() {
        // Placeholder for content completeness check
        return true;
    }

    public boolean hasBrokenLinks() {
        // Placeholder for broken link check
        return false;
    }

    public boolean hasPageErrors() {
        // Placeholder for page error check
        return false;
    }

    public void clickHowToFileAClaim() {
        driver.findElement(By.cssSelector("[data-testid=how-to-file-claim-menu]")) // LOCATOR_TO_UPDATE
            .click();
    }
}
