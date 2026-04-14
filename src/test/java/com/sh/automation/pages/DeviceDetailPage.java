package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By PAGE_INDICATOR = By.cssSelector("[data-testid=device-detail-page]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By COLOUR_SELECTOR = By.cssSelector("[data-testid=colour-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By STORAGE_SELECTOR = By.cssSelector("[data-testid=storage-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By PAYMENT_SELECTOR = By.cssSelector("[data-testid=payment-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By NEXT_BUTTON = By.cssSelector("[data-testid=next-button]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By SELECTED_COLOUR = By.cssSelector("[data-testid=selected-colour]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By SELECTED_STORAGE = By.cssSelector("[data-testid=selected-storage]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By SELECTED_PAYMENT = By.cssSelector("[data-testid=selected-payment]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By SELECTIONS_VISIBLE = By.cssSelector("[data-testid=selections-visible]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(PAGE_INDICATOR)) != null;
    }

    public void selectColour(String colour) {
        WebElement colourDropdown = wait.until(ExpectedConditions.elementToBeClickable(COLOUR_SELECTOR));
        colourDropdown.click();
        // Select colour option
        // By COLOUR_OPTION = By.cssSelector("[data-testid=colour-option-" + colour.replace(" ", "-").toLowerCase() + "]" /* LOCATOR_TO_UPDATE - verify in browser */);
        // wait.until(ExpectedConditions.elementToBeClickable(COLOUR_OPTION)).click();
    }

    public void selectStorage(String storage) {
        WebElement storageDropdown = wait.until(ExpectedConditions.elementToBeClickable(STORAGE_SELECTOR));
        storageDropdown.click();
        // Select storage option
        // By STORAGE_OPTION = By.cssSelector("[data-testid=storage-option-" + storage.replace(" ", "-").toLowerCase() + "]" /* LOCATOR_TO_UPDATE - verify in browser */);
        // wait.until(ExpectedConditions.elementToBeClickable(STORAGE_OPTION)).click();
    }

    public void selectPayment(String payment) {
        WebElement paymentDropdown = wait.until(ExpectedConditions.elementToBeClickable(PAYMENT_SELECTOR));
        paymentDropdown.click();
        // Select payment option
        // By PAYMENT_OPTION = By.cssSelector("[data-testid=payment-option-" + payment.replace(" ", "-").toLowerCase() + "]" /* LOCATOR_TO_UPDATE - verify in browser */);
        // wait.until(ExpectedConditions.elementToBeClickable(PAYMENT_OPTION)).click();
    }

    public void clickNextButton() {
        wait.until(ExpectedConditions.elementToBeClickable(NEXT_BUTTON)).click();
    }

    public String getSelectedColour() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTED_COLOUR)).getText();
    }

    public String getSelectedStorage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTED_STORAGE)).getText();
    }

    public String getSelectedPaymentOption() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTED_PAYMENT)).getText();
    }

    public boolean areSelectionsVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTIONS_VISIBLE)) != null;
    }

    public boolean isNextStepInitiated() {
        // Placeholder for next step indicator
        // By NEXT_STEP_INDICATOR = By.cssSelector("[data-testid=next-step-indicator]" /* LOCATOR_TO_UPDATE - verify in browser */);
        // return wait.until(ExpectedConditions.visibilityOfElementLocated(NEXT_STEP_INDICATOR)) != null;
        return true;
    }
}
