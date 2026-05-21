package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final int TIMEOUT = 10;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, TIMEOUT);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=homepage-logo]"))); // LOCATOR_TO_UPDATE
    }

    public boolean hasBrokenLinksOrErrors() {
        // Placeholder for broken link/error check
        return false;
    }

    public boolean isLogoVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=homepage-logo]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isNavigationMenuVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=navigation-menu]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isMainBannerVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=main-banner]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isContentComplete() {
        // Placeholder for content completeness check
        return true;
    }

    public void clickHowToFileAClaim() {
        WebElement claimMenu = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=how-to-file-claim-menu]"))); // LOCATOR_TO_UPDATE
        claimMenu.click();
    }
}
