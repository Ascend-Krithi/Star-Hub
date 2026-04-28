package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isPopupDisplayed() {
        By popup = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE — verify in browser
        return wait.until(ExpectedConditions.visibilityOfElementLocated(popup)).isDisplayed();
    }

    public String getPopupMessageText() {
        By popupMsg = By.cssSelector("[data-testid=login-popup-msg]"); // LOCATOR_TO_UPDATE — verify in browser
        return wait.until(ExpectedConditions.visibilityOfElementLocated(popupMsg)).getText();
    }
}
