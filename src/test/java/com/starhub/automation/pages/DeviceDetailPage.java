package com.starhub.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class DeviceDetailPage {
    private WebDriver driver;

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
    }

    public void navigateToDeviceDetail(String deviceName) {
        WebElement device = driver.findElement(By.xpath("//div[contains(text(),'" + deviceName + "')]"));
        device.click();
    }

    public WebElement getDeviceDetailElement() {
        return driver.findElement(By.cssSelector("[data-testid=device-detail]")); // LOCATOR_TO_UPDATE — verify in browser
    }

    public boolean isDeviceDetailPageDisplayed() {
        return getDeviceDetailElement().isDisplayed();
    }

    public boolean areDeviceDetailsVisible() {
        WebElement details = driver.findElement(By.cssSelector("[data-testid=device-details]")); // LOCATOR_TO_UPDATE — verify in browser
        return details.isDisplayed();
    }

    public boolean isDeviceConfigurationPageDisplayed() {
        WebElement configPage = driver.findElement(By.cssSelector("[data-testid=device-config-page]")); // LOCATOR_TO_UPDATE — verify in browser
        return configPage.isDisplayed();
    }

    public boolean isDefaultConfigurationDisplayed(String colour, String storage, String paymentOption) {
        WebElement colourElement = driver.findElement(By.xpath("//span[contains(text(),'" + colour + "')]"));
        WebElement storageElement = driver.findElement(By.xpath("//span[contains(text(),'" + storage + "')]"));
        WebElement paymentElement = driver.findElement(By.xpath("//span[contains(text(),'" + paymentOption + "')]"));
        return colourElement.isDisplayed() && storageElement.isDisplayed() && paymentElement.isDisplayed();
    }

    public void changeConfiguration(String option, String value) {
        WebElement configOption = driver.findElement(By.cssSelector("[data-testid=" + option.toLowerCase() + "]")); // LOCATOR_TO_UPDATE — verify in browser
        configOption.click();
        WebElement configValue = driver.findElement(By.xpath("//span[contains(text(),'" + value + "')]"));
        configValue.click();
    }

    public boolean isConfigurationUpdated(String option, String value) {
        WebElement configValue = driver.findElement(By.xpath("//span[contains(text(),'" + value + "')]"));
        return configValue.isDisplayed();
    }

    public void selectConfiguration(String colour, String storage, String paymentOption) {
        changeConfiguration("Colour", colour);
        changeConfiguration("Storage", storage);
        changeConfiguration("Payment Option", paymentOption);
    }

    public boolean isConfigurationCorrect(String colour, String storage, String paymentOption) {
        return isDefaultConfigurationDisplayed(colour, storage, paymentOption);
    }

    public void clickNextButton() {
        WebElement nextButton = driver.findElement(By.cssSelector("[data-testid=next-button]")); // LOCATOR_TO_UPDATE — verify in browser
        nextButton.click();
    }

    public boolean isNextStepDisplayed() {
        WebElement nextStep = driver.findElement(By.cssSelector("[data-testid=next-step]")); // LOCATOR_TO_UPDATE — verify in browser
        return nextStep.isDisplayed();
    }

    public void deselectConfigurationOption(String option) {
        WebElement configOption = driver.findElement(By.cssSelector("[data-testid=" + option.toLowerCase() + "]")); // LOCATOR_TO_UPDATE — verify in browser
        configOption.click();
    }

    public boolean isErrorMessageDisplayed(String option) {
        WebElement errorMsg = driver.findElement(By.cssSelector("[data-testid=error-message]")); // LOCATOR_TO_UPDATE — verify in browser
        return errorMsg.isDisplayed();
    }
}
