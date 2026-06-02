package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By MOBILES_MENU = By.cssSelector("[data-testid=mobiles-menu]"); // LOCATOR_TO_UPDATE
    private static final By ALL_PHONES_LINK = By.cssSelector("[data-testid=all-phones-link]"); // LOCATOR_TO_UPDATE
    private static final By HOME_PAGE_INDICATOR = By.cssSelector("[data-testid=home-page-indicator]"); // LOCATOR_TO_UPDATE

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(20));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(HOME_PAGE_INDICATOR)) != null;
    }

    public void clickMobilesMenu() {
        wait.until(ExpectedConditions.elementToBeClickable(MOBILES_MENU)).click();
    }

    public void clickAllPhones() {
        wait.until(ExpectedConditions.elementToBeClickable(ALL_PHONES_LINK)).click();
    }
}
