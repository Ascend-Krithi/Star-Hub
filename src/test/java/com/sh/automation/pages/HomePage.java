package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=homepage-banner]"))); // LOCATOR_TO_UPDATE
    }

    public void clickMobilesMenu() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=mobiles-menu]"))).click(); // LOCATOR_TO_UPDATE
    }

    public void clickAllPhones() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=all-phones-link]"))).click(); // LOCATOR_TO_UPDATE
    }

    public void login(String username, String password) {
        // Placeholder for login logic
        // LOCATOR_TO_UPDATE
    }
}
