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
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=file-claim-page-main]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isInsuredDetailsSectionPresent() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=insured-details-section]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isContactDetailsSectionPresent() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=contact-details-section]"))); // LOCATOR_TO_UPDATE
    }

    public void enterInsuredDetails(String name, String policyNo) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=insured-name-input]"))).sendKeys(name); // LOCATOR_TO_UPDATE
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=policy-no-input]"))).sendKeys(policyNo); // LOCATOR_TO_UPDATE
    }

    public void enterContactDetails(String email, String phone) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=contact-email-input]"))).sendKeys(email); // LOCATOR_TO_UPDATE
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=contact-phone-input]"))).sendKeys(phone); // LOCATOR_TO_UPDATE
    }

    public void clickNextOrSubmit() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=next-or-submit-btn]"))).click(); // LOCATOR_TO_UPDATE
    }

    public void clickSubmitButton() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=submit-btn]"))).click(); // LOCATOR_TO_UPDATE
    }

    public boolean isValidationMessageDisplayedForInsuredDetails() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=insured-details-validation-msg]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isValidationMessageDisplayedForEmail() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=email-validation-msg]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isValidationMessageDisplayedForPolicyNumber() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=policy-no-validation-msg]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isValidationMessageDisplayedForMandatoryFields() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=mandatory-fields-validation-msg]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isSubmissionBlocked() {
        // Placeholder: Implement submission blocked check
        return true;
    }

    public boolean isSubmissionSuccessful() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=submission-success-msg]"))) != null; // LOCATOR_TO_UPDATE
    }

    public boolean isConfirmationMessageDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=confirmation-msg]"))) != null; // LOCATOR_TO_UPDATE
    }
}
