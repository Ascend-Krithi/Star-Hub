package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ClaimPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final int TIMEOUT = 10;

    public ClaimPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, TIMEOUT);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=claim-page-title]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isClaimFilingContentVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=claim-filing-content]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isFileAClaimNowButtonVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=file-claim-now-button]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isFileAClaimNowButtonEnabled() {
        WebElement button = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=file-claim-now-button]"))); // LOCATOR_TO_UPDATE
        return button.isEnabled();
    }

    public String getFileAClaimNowButtonLabel() {
        WebElement button = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=file-claim-now-button]"))); // LOCATOR_TO_UPDATE
        return button.getText();
    }

    public void clickFileAClaimNowButton() {
        WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=file-claim-now-button]"))); // LOCATOR_TO_UPDATE
        button.click();
    }

    public boolean isInsuredDetailsSectionPresent() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=insured-details-section]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isContactDetailsSectionPresent() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=contact-details-section]"))) != null; // LOCATOR_TO_UPDATE
    }

    public void leaveMandatoryFieldsEmpty() {
        // Placeholder for leaving fields empty
    }

    public void clickSubmitButton() {
        WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=submit-button]"))); // LOCATOR_TO_UPDATE
        submitBtn.click();
    }

    public boolean isValidationMessageDisplayedForMissingFields() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=validation-message]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isSubmissionSuccessful() {
        // Placeholder for submission success check
        return false;
    }
}
