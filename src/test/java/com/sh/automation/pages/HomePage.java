package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By mobilesMenu = By.cssSelector("[data-testid=mobiles-menu]"); // LOCATOR_TO_UPDATE — verify in browser
    private By allPhonesOption = By.cssSelector("[data-testid=all-phones-option]"); // LOCATOR_TO_UPDATE — verify in browser
    private By mobilesSection = By.cssSelector("[data-testid=mobiles-section]"); // LOCATOR_TO_UPDATE — verify in browser

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public void clickMobilesMenu() {
        wait.until(ExpectedConditions.elementToBeClickable(mobilesMenu)).click();
    }

    public void clickAllPhonesOption() {
        wait.until(ExpectedConditions.elementToBeClickable(allPhonesOption)).click();
    }

    public boolean isMobilesSectionDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(mobilesSection)).isDisplayed();
    }
}
