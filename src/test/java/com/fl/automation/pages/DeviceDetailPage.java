package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By deviceName = By.cssSelector("[data-testid=device-detail-name]"); // LOCATOR_TO_UPDATE — verify in browser
    private By deviceImage = By.cssSelector("[data-testid=device-detail-image]"); // LOCATOR_TO_UPDATE — verify in browser
    private By colourOption = By.cssSelector("[data-testid=colour-option]"); // LOCATOR_TO_UPDATE — verify in browser
    private By storageOption = By.cssSelector("[data-testid=storage-option]"); // LOCATOR_TO_UPDATE — verify in browser
    private By paymentOption = By.cssSelector("[data-testid=payment-option]"); // LOCATOR_TO_UPDATE — verify in browser
    private By nextButton = By.cssSelector("[data-testid=next-button]"); // LOCATOR_TO_UPDATE — verify in browser

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isPageLoadedForDevice(String expectedName) {
        WebElement nameElem = wait.until(ExpectedConditions.visibilityOfElementLocated(deviceName));
        return nameElem.getText().trim().equalsIgnoreCase(expectedName);
    }

    public String getDeviceName() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceName)).getText().trim();
    }

    public boolean isDeviceImageDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceImage)).isDisplayed();
    }

    public String getSelectedColour() {
        WebElement colour = wait.until(ExpectedConditions.visibilityOfElementLocated(colourOption));
        return colour.getAttribute("data-selected"); // LOCATOR_TO_UPDATE — verify in browser
    }

    public String getSelectedStorage() {
        WebElement storage = wait.until(ExpectedConditions.visibilityOfElementLocated(storageOption));
        return storage.getAttribute("data-selected"); // LOCATOR_TO_UPDATE — verify in browser
    }

    public String getSelectedPayment() {
        WebElement payment = wait.until(ExpectedConditions.visibilityOfElementLocated(paymentOption));
        return payment.getAttribute("data-selected"); // LOCATOR_TO_UPDATE — verify in browser
    }

    public boolean isColourOptionVisibleAndSelectable() {
        WebElement colour = wait.until(ExpectedConditions.visibilityOfElementLocated(colourOption));
        return colour.isDisplayed() && colour.isEnabled();
    }

    public boolean isStorageOptionVisibleAndSelectable() {
        WebElement storage = wait.until(ExpectedConditions.visibilityOfElementLocated(storageOption));
        return storage.isDisplayed() && storage.isEnabled();
    }

    public boolean isPaymentOptionVisibleAndSelectable() {
        WebElement payment = wait.until(ExpectedConditions.visibilityOfElementLocated(paymentOption));
        return payment.isDisplayed() && payment.isEnabled();
    }

    public boolean isDefaultConfigurationSelected() {
        return getSelectedColour().equals("Black") && getSelectedStorage().equals("256GB") && getSelectedPayment().equals("24-month installment");
    }

    public void clickNextButton() {
        wait.until(ExpectedConditions.elementToBeClickable(nextButton)).click();
    }

    public boolean isNextStepInitiated() {
        // Placeholder: Replace with actual check for next step initiation
        return true;
    }
}
