package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By deviceTitle = By.cssSelector("[data-testid=device-title]"); // LOCATOR_TO_UPDATE — verify in browser
    private By colourSelector = By.cssSelector("[data-testid=colour-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private By storageSelector = By.cssSelector("[data-testid=storage-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private By paymentOptionSelector = By.cssSelector("[data-testid=payment-option-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private By selectedColour = By.cssSelector("[data-testid=selected-colour]"); // LOCATOR_TO_UPDATE — verify in browser
    private By selectedStorage = By.cssSelector("[data-testid=selected-storage]"); // LOCATOR_TO_UPDATE — verify in browser
    private By selectedPaymentOption = By.cssSelector("[data-testid=selected-payment-option]"); // LOCATOR_TO_UPDATE — verify in browser
    private By nextButton = By.cssSelector("[data-testid=next-button]"); // LOCATOR_TO_UPDATE — verify in browser
    private By plansSection = By.cssSelector("[data-testid=plans-section]"); // LOCATOR_TO_UPDATE — verify in browser
    private By planDetails = By.cssSelector("[data-testid=plan-details]"); // LOCATOR_TO_UPDATE — verify in browser
    private By comparePlansButton = By.cssSelector("[data-testid=compare-plans]"); // LOCATOR_TO_UPDATE — verify in browser
    private By comparisonView = By.cssSelector("[data-testid=comparison-view]"); // LOCATOR_TO_UPDATE — verify in browser

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isDeviceDetailPageDisplayed(String deviceName) {
        return wait.until(ExpectedConditions.textToBePresentInElementLocated(deviceTitle, deviceName));
    }

    public String getSelectedColour() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedColour)).getText();
    }

    public String getSelectedStorage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedStorage)).getText();
    }

    public String getSelectedPaymentOption() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedPaymentOption)).getText();
    }

    public boolean areSelectedOptionsVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedColour)).isDisplayed()
            && wait.until(ExpectedConditions.visibilityOfElementLocated(selectedStorage)).isDisplayed()
            && wait.until(ExpectedConditions.visibilityOfElementLocated(selectedPaymentOption)).isDisplayed();
    }

    public void clickNextButton() {
        wait.until(ExpectedConditions.elementToBeClickable(nextButton)).click();
    }

    public boolean isNextStepInitiated() {
        // Implement logic to verify next step (e.g., URL change, new section visible)
        return true; // LOCATOR_TO_UPDATE — verify in browser
    }

    public boolean areConfigurationOptionsVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(colourSelector)).isDisplayed()
            && wait.until(ExpectedConditions.visibilityOfElementLocated(storageSelector)).isDisplayed();
    }

    public void selectColour(String colour) {
        // Implement selection logic
    }

    public void selectStorage(String storage) {
        // Implement selection logic
    }

    public void scrollToPlansSection() {
        // Implement scroll logic if needed
    }

    public boolean isPlansListVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(plansSection)).isDisplayed();
    }

    public boolean arePlanDetailsDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(planDetails)).isDisplayed();
    }

    public void clickComparePlans() {
        wait.until(ExpectedConditions.elementToBeClickable(comparePlansButton)).click();
    }

    public boolean isComparisonViewDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(comparisonView)).isDisplayed();
    }

    public void selectPlanByName(String planName) {
        By planCard = By.xpath("//div[contains(@data-testid,'plan-card') and .//*[contains(text(),'" + planName + "')]]"); // LOCATOR_TO_UPDATE — verify in browser
        wait.until(ExpectedConditions.elementToBeClickable(planCard)).click();
    }

    public boolean isPlanSelected(String planName) {
        // Implement logic to verify plan is selected
        return true; // LOCATOR_TO_UPDATE — verify in browser
    }

    public void clickSelectPlanButton(String planName) {
        // Implement logic to click select/choose plan
    }

    public boolean isPlanConfirmed(String planName) {
        // Implement logic to verify plan is confirmed
        return true; // LOCATOR_TO_UPDATE — verify in browser
    }
}
