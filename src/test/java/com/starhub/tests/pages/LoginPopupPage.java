package com.starhub.tests.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By LOGIN_POPUP = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE
    private static final By POPUP_MSG = By.cssSelector("[data-testid=popup-msg]"); // LOCATOR_TO_UPDATE

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(15));
    }

    public boolean isPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(LOGIN_POPUP)) != null;
    }

    public String getPopupMessageText() {
        WebElement popupMsg = wait.until(ExpectedConditions.visibilityOfElementLocated(POPUP_MSG));
        return popupMsg.getText();
    }
}
