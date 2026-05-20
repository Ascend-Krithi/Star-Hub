package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class FileClaimPage {
    private WebDriver driver;
    private static final By INSURED_DETAILS_SECTION_LOCATOR = By.cssSelector("[data-testid=insured-details-section]"); // LOCATOR_TO_UPDATE
    private static final By CONTACT_DETAILS_SECTION_LOCATOR = By.cssSelector("[data-testid=contact-details-section]"); // LOCATOR_TO_UPDATE

    public FileClaimPage(WebDriver driver) {
        this.driver = driver;
    }

    public By getInsuredDetailsSectionLocator() {
        return INSURED_DETAILS_SECTION_LOCATOR;
    }

    public By getContactDetailsSectionLocator() {
        return CONTACT_DETAILS_SECTION_LOCATOR;
    }

    public boolean isInsuredDetailsSectionPresent() {
        return driver.findElements(INSURED_DETAILS_SECTION_LOCATOR).size() > 0;
    }

    public boolean isContactDetailsSectionPresent() {
        return driver.findElements(CONTACT_DETAILS_SECTION_LOCATOR).size() > 0;
    }

    public boolean isInsuredDetailsSectionReadyForInput() {
        // Placeholder for actual implementation
        return true;
    }

    public boolean isContactDetailsSectionReadyForInput() {
        // Placeholder for actual implementation
        return true;
    }
}
