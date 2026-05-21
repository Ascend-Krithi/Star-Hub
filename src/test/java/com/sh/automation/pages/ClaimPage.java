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
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=claim-page-header]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isClaimFilingContentVisible() {
        return driver.findElement(By.cssSelector("[data-testid=claim-filing-content]")) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isFileAClaimNowButtonVisible() {
        return driver.findElement(By.cssSelector("[data-testid=file-claim-now-btn]")) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isFileAClaimNowButtonEnabled() {
        return driver.findElement(By.cssSelector("[data-testid=file-claim-now-btn]")) // LOCATOR_TO_UPDATE
            .isEnabled();
    }

    public String getFileAClaimNowButtonLabel() {
        return driver.findElement(By.cssSelector("[data-testid=file-claim-now-btn]")) // LOCATOR_TO_UPDATE
            .getText();
    }

    public void clickFileAClaimNowButton() {
        driver.findElement(By.cssSelector("[data-testid=file-claim-now-btn]")) // LOCATOR_TO_UPDATE
            .click();
    }
}
