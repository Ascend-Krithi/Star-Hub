package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class FileAClaimPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public FileAClaimPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=file-claim-page-header]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isInsuredDetailsSectionPresent() {
        return driver.findElement(By.cssSelector("[data-testid=insured-details-section]")) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isContactDetailsSectionPresent() {
        return driver.findElement(By.cssSelector("[data-testid=contact-details-section]")) != null; // LOCATOR_TO_UPDATE
    }
}
