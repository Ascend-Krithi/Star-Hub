package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ClaimPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public ClaimPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=claim-page-main]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isClaimContentVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=claim-content]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isFileAClaimNowButtonVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=file-claim-now-btn]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isFileAClaimNowButtonEnabled() {
        return wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=file-claim-now-btn]"))); // LOCATOR_TO_UPDATE
    }

    public String getFileAClaimNowButtonLabel() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=file-claim-now-btn]"))).getText(); // LOCATOR_TO_UPDATE
    }

    public void clickFileAClaimNowButton() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=file-claim-now-btn]"))).click(); // LOCATOR_TO_UPDATE
    }
}
