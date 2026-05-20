package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ClaimPage {
    private WebDriver driver;
    private static final By CLAIM_CONTENT_LOCATOR = By.cssSelector("[data-testid=claim-content-section]"); // LOCATOR_TO_UPDATE
    private static final By FILE_A_CLAIM_NOW_BUTTON_LOCATOR = By.cssSelector("[data-testid=file-claim-now-btn]"); // LOCATOR_TO_UPDATE

    public ClaimPage(WebDriver driver) {
        this.driver = driver;
    }

    public By getClaimContentLocator() {
        return CLAIM_CONTENT_LOCATOR;
    }

    public By getFileAClaimNowButtonLocator() {
        return FILE_A_CLAIM_NOW_BUTTON_LOCATOR;
    }

    public boolean isLoaded() {
        return driver.findElements(CLAIM_CONTENT_LOCATOR).size() > 0;
    }

    public boolean isClaimContentVisible() {
        return driver.findElements(CLAIM_CONTENT_LOCATOR).size() > 0;
    }

    public boolean isFileAClaimNowButtonVisible() {
        return driver.findElements(FILE_A_CLAIM_NOW_BUTTON_LOCATOR).size() > 0;
    }

    public boolean isFileAClaimNowButtonEnabled() {
        WebElement btn = driver.findElement(FILE_A_CLAIM_NOW_BUTTON_LOCATOR);
        return btn.isEnabled();
    }

    public String getFileAClaimNowButtonLabel() {
        WebElement btn = driver.findElement(FILE_A_CLAIM_NOW_BUTTON_LOCATOR);
        return btn.getText();
    }

    public void clickFileAClaimNowButton() {
        WebElement btn = driver.findElement(FILE_A_CLAIM_NOW_BUTTON_LOCATOR);
        btn.click();
    }
}
