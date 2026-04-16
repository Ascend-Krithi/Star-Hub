package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By MOBILES_MENU = By.cssSelector("[data-testid=mobiles-menu]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By ALL_PHONES_OPTION = By.cssSelector("[data-testid=all-phones-option]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By HOME_PAGE_INDICATOR = By.cssSelector("[data-testid=homepage-indicator]"); // LOCATOR_TO_UPDATE — verify in browser

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(HOME_PAGE_INDICATOR)).isDisplayed();
    }

    public void clickMobilesMenu() {
        WebElement mobilesMenu = wait.until(ExpectedConditions.elementToBeClickable(MOBILES_MENU));
        mobilesMenu.click();
    }

    public void clickAllPhones() {
        WebElement allPhonesOption = wait.until(ExpectedConditions.elementToBeClickable(ALL_PHONES_OPTION));
        allPhonesOption.click();
    }
}
