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
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=homepage-main]"))); // LOCATOR_TO_UPDATE
    }

    public boolean hasNoBrokenLinks() {
        // Placeholder: Implement link validation logic
        return true;
    }

    public boolean hasNoPageErrors() {
        // Placeholder: Implement error detection logic
        return true;
    }

    public boolean isLogoVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=sunlife-logo]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isNavigationMenuVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=navigation-menu]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isMainBannerVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=main-banner]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isContentComplete() {
        // Placeholder: Implement content completeness check
        return true;
    }

    public void clickHowToFileAClaim() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=how-to-file-claim-menu]"))).click(); // LOCATOR_TO_UPDATE
    }
}
