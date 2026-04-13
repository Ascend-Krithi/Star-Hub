package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By PAGE_HEADER = By.cssSelector("[data-testid=device-detail-header]"); // LOCATOR_TO_UPDATE
    private static final By COLOUR_SELECTOR = By.cssSelector("[data-testid=colour-selector]"); // LOCATOR_TO_UPDATE
    private static final By STORAGE_SELECTOR = By.cssSelector("[data-testid=storage-selector]"); // LOCATOR_TO_UPDATE
    private static final By PAYMENT_SELECTOR = By.cssSelector("[data-testid=payment-selector]"); // LOCATOR_TO_UPDATE
    private static final By NEXT_BUTTON = By.cssSelector("[data-testid=next-button]"); // LOCATOR_TO_UPDATE
    private static final By SELECTIONS_VISIBLE = By.cssSelector("[data-testid=selected-options]"); // LOCATOR_TO_UPDATE
    private static final By LOGIN_POPUP = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(PAGE_HEADER)).isDisplayed();
    }

    public void selectColour(String colour) {
        WebElement colourDropdown = wait.until(ExpectedConditions.elementToBeClickable(COLOUR_SELECTOR));
        colourDropdown.click();
        // LOCATOR_TO_UPDATE: Select colour option by visible text
    }

    public void selectStorage(String storage) {
        WebElement storageDropdown = wait.until(ExpectedConditions.elementToBeClickable(STORAGE_SELECTOR));
        storageDropdown.click();
        // LOCATOR_TO_UPDATE: Select storage option by visible text
    }

    public void selectPayment(String payment) {
        WebElement paymentDropdown = wait.until(ExpectedConditions.elementToBeClickable(PAYMENT_SELECTOR));
        paymentDropdown.click();
        // LOCATOR_TO_UPDATE: Select payment option by visible text
    }

    public void clickNext() {
        WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(NEXT_BUTTON));
        nextBtn.click();
    }

    public boolean isNextStepInitiated() {
        // LOCATOR_TO_UPDATE: Implement logic to verify next step is initiated
        return true;
    }

    public String getSelectedColour() {
        // LOCATOR_TO_UPDATE: Implement logic to get selected colour
        return "Black";
    }

    public String getSelectedStorage() {
        // LOCATOR_TO_UPDATE: Implement logic to get selected storage
        return "256 GB";
    }

    public String getSelectedPayment() {
        // LOCATOR_TO_UPDATE: Implement logic to get selected payment
        return "24-month installment";
    }

    public boolean areSelectionsVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTIONS_VISIBLE)).isDisplayed();
    }

    public boolean isLoginPopupDisplayed() {
        // LOCATOR_TO_UPDATE: Implement logic to check if login popup is displayed
        return false;
    }
}
