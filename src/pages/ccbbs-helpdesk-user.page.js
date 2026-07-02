const loc = require('./locators/ccbbs-helpdesk.locators');
const { expect } = require('@playwright/test');

const URL = 'https://ccbbs-helpdesk.example.com';

class CCBBSHelpdeskUserPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async fillFullName(fullName) {
    await loc.fullNameField(this.page).fill(fullName);
  }

  async fillPhoneNumber(phoneNumber) {
    await loc.phoneNumberField(this.page).fill(phoneNumber);
  }

  async fillEmailAddress(email) {
    await loc.emailAddressField(this.page).fill(email);
  }

  async fillCompanyName(companyName) {
    await loc.companyNameField(this.page).fill(companyName);
  }

  async fillTitleMessage(title) {
    await loc.titleMessageField(this.page).fill(title);
  }

  async fillQuestions(questions) {
    await loc.questionsField(this.page).fill(questions);
  }

  async uploadAttachment(filePath) {
    await loc.attachmentField(this.page).setInputFiles(filePath);
  }

  async clickSubmit() {
    await loc.submitButton(this.page).click();
  }

  async isFullNameFieldVisible() {
    return await loc.fullNameField(this.page).isVisible();
  }

  async isPhoneNumberFieldVisible() {
    return await loc.phoneNumberField(this.page).isVisible();
  }

  async isEmailAddressFieldVisible() {
    return await loc.emailAddressField(this.page).isVisible();
  }

  async isCompanyNameFieldVisible() {
    return await loc.companyNameField(this.page).isVisible();
  }

  async isTitleMessageFieldVisible() {
    return await loc.titleMessageField(this.page).isVisible();
  }

  async isQuestionsFieldVisible() {
    return await loc.questionsField(this.page).isVisible();
  }

  async isAttachmentFieldVisible() {
    return await loc.attachmentField(this.page).isVisible();
  }

  async isEmailMandatoryIndicatorVisible() {
    return await loc.emailMandatoryIndicator(this.page).isVisible();
  }

  async isCompanyMandatoryIndicatorVisible() {
    return await loc.companyMandatoryIndicator(this.page).isVisible();
  }

  async isTitleMandatoryIndicatorVisible() {
    return await loc.titleMandatoryIndicator(this.page).isVisible();
  }

  async isQuestionsMandatoryIndicatorVisible() {
    return await loc.questionsMandatoryIndicator(this.page).isVisible();
  }

  async isAttachmentOptionalIndicatorVisible() {
    return await loc.attachmentOptionalIndicator(this.page).isVisible();
  }

  async getTicketReferenceId() {
    await loc.ticketReferenceId(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.ticketReferenceId(this.page).textContent();
  }

  async getTimestamp() {
    return await loc.timestamp(this.page).textContent();
  }

  async isSuccessMessageVisible() {
    return await loc.successMessage(this.page).isVisible();
  }

  async getEmailErrorMessage() {
    return await loc.emailErrorMessage(this.page).textContent();
  }

  async getCompanyErrorMessage() {
    return await loc.companyErrorMessage(this.page).textContent();
  }

  async getTitleErrorMessage() {
    return await loc.titleErrorMessage(this.page).textContent();
  }

  async getQuestionsErrorMessage() {
    return await loc.questionsErrorMessage(this.page).textContent();
  }

  async isEmailErrorMessageVisible() {
    return await loc.emailErrorMessage(this.page).isVisible();
  }

  async isCompanyErrorMessageVisible() {
    return await loc.companyErrorMessage(this.page).isVisible();
  }

  async isTitleErrorMessageVisible() {
    return await loc.titleErrorMessage(this.page).isVisible();
  }

  async isQuestionsErrorMessageVisible() {
    return await loc.questionsErrorMessage(this.page).isVisible();
  }
}

module.exports = CCBBSHelpdeskUserPage;