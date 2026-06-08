/**
 * Test Data for Mobile Card Management Tests
 * QE-851 Test Suite
 */

const testData = {
  // Application URLs
  mobileAppUrl: process.env.MOBILE_APP_URL || 'https://mobile-app.example.com',
  mobileAppPackage: process.env.MOBILE_APP_PACKAGE || 'com.example.mobileapp',

  // User Credentials
  validUser: {
    username: 'testuser@example.com',
    password: 'Test@123'
  },

  // Card Test Data
  lockedCard: {
    cardId: 'CARD-LOCKED-001',
    status: 'Locked',
    description: 'Valid card locked via Admin Portal'
  },

  // Transaction Test Data
  testTransaction: {
    merchant: 'Test Merchant',
    amount: '$50.00',
    expectedError: 'Transaction declined',
    expectedErrorDetail: 'card is locked'
  },

  // Expected Messages
  expectedMessages: {
    unlockPromptMessage: 'Please file an in-app ticket to unlock your card',
    transactionDeclinedMessage: 'Purchase transaction is declined/blocked',
    cardLockedError: 'card is locked'
  },

  // Screen Titles
  screenTitles: {
    login: 'Login',
    home: 'Home',
    cardManagement: 'Card Management',
    cardDetails: 'Card Details'
  },

  // Status Values
  cardStatus: {
    locked: 'Locked',
    active: 'Active',
    blocked: 'Blocked'
  },

  // Timeouts
  timeouts: {
    standard: 15000,
    navigation: 60000,
    transaction: 30000
  }
};

module.exports = testData;