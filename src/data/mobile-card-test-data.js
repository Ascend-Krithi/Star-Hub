const TD = {
  urls: {
    mobileAppUrl: 'mobile-app://launch'
  },
  
  credentials: {
    validUsername: 'testuser@example.com',
    validPassword: 'Test@123'
  },
  
  cardData: {
    lockedCardId: 'valid-locked-card-id',
    lockedCardDescription: 'Valid card locked via Admin Portal'
  },
  
  statuses: {
    locked: 'Locked',
    active: 'Active',
    blocked: 'Blocked'
  },
  
  messages: {
    unlockPromptMessage: 'Please file an in-app ticket to unlock your card',
    cardLockedError: 'Card is locked',
    transactionDeclined: 'Transaction declined',
    transactionBlocked: 'Purchase transaction is declined/blocked'
  },
  
  transactionData: {
    merchant: 'Test Merchant',
    amount: '$50.00'
  },
  
  screenTitles: {
    loginScreen: 'Login',
    homeScreen: 'Home',
    cardManagementScreen: 'Card Management',
    cardDetailsScreen: 'Card Details'
  }
};

module.exports = TD;