package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10);
    }

    public boolean isPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-popup]"))).isDisplayed(); // LOCATOR_TO_UPDATE
    }

    public String getPopupMessageText() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-popup-message]"))).getText(); // LOCATOR_TO_UPDATE
    }

    public void clickLoginWithHubId() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=login-hubid-button]"))).click(); // LOCATOR_TO_UPDATE
    }

    public boolean isLoginPageLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=login-page-banner]"))).isDisplayed(); // LOCATOR_TO_UPDATE
    }

    public void clickSignUpLink() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=signup-link]"))).click(); // LOCATOR_TO_UPDATE
    }

    public boolean isSignUpPageLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=signup-page-banner]"))).isDisplayed(); // LOCATOR_TO_UPDATE
    }
}
