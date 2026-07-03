const { test, expect } = require('@playwright/test');
const loc = require('./locators/helpdesk-submit-ticket.locators');
const TD = require('../data/helpdesk-test-data');

const URL = TD.urls.helpdeskPortal;

class HelpdeskSubmitTicketPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async navigateToSubmitTicketForm() {
    // Wait for page to be ready
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillFullName(fullName) {
    await loc.fullNameField(this.page).fill(fullName);
  }

  async fillPhoneNumber(phoneNumber) {
    await loc.phoneNumberField(this.page).fill(phoneNumber);
  }

  async fillEmail(email) {
    await loc.emailField(this.page).fill(email);
  }

  async fillCompanyName(companyName) {
    await loc.companyNameField(this.page).fill(companyName);
  }

  async fillTitleMessage(title) {
    await loc.titleMessageField(this.page).fill(title);
  }

  async fillQuestion(question) {
    await loc.questionField(this.page).fill(question);
  }

  async clickSubmit() {
    await loc.submitButton(this.page).click();
  }

  async getConfirmationMessage() {
    return await loc.confirmationMessage(this.page).textContent();
  }

  async getTicketReference() {
    const ticketRefElement = loc.ticketReference(this.page);
    await ticketRefElement.waitFor({ state: 'visible', timeout: 10000 });
    return await ticketRefElement.textContent();
  }

  async isDateSubmittedDisplayed() {
    return await loc.dateSubmitted(this.page).isVisible();
  }

  async getEmailError() {
    return await loc.emailError(this.page).textContent();
  }

  async getCompanyNameError() {
    return await loc.companyNameError(this.page).textContent();
  }

  async getValidationError() {
    return await loc.validationError(this.page).textContent();
  }

  async isValidationErrorVisible() {
    return await loc.validationError(this.page).isVisible();
  }

  async submitCompleteTicket(ticketData) {
    if (ticketData.fullName) await this.fillFullName(ticketData.fullName);
    if (ticketData.phoneNumber) await this.fillPhoneNumber(ticketData.phoneNumber);
    if (ticketData.email) await this.fillEmail(ticketData.email);
    if (ticketData.companyName) await this.fillCompanyName(ticketData.companyName);
    if (ticketData.titleMessage) await this.fillTitleMessage(ticketData.titleMessage);
    if (ticketData.question) await this.fillQuestion(ticketData.question);
    await this.clickSubmit();
  }
}

module.exports = HelpdeskSubmitTicketPage;