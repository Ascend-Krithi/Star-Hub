module.exports = {
  urls: {
    base: 'https://dealerapp.example.com',
    login: 'https://dealerapp.example.com/login',
    dashboard: 'https://dealerapp.example.com/dashboard',
  },

  validCredentials: {
    email: 'dealer@example.com',
    password: 'ValidPass123',
  },

  invalidCredentials: {
    email: 'invalid@example.com',
    password: 'WrongPass456',
  },

  firstTimeCredentials: {
    email: 'firsttime@example.com',
    password: 'FirstLogin123',
  },

  adminPremium: {
    email: 'admin@premium.com',
    password: 'AdminPremium123',
    role: 'Admin',
    group: 'Premium',
  },

  userStandard: {
    email: 'user@standard.com',
    password: 'UserStandard123',
    role: 'User',
    group: 'Standard',
  },

  businessProfile: {
    businessName: 'ABC Dealers',
    registrationNumber: 'REG12345',
    gstNumber: 'GST67890',
  },

  contactDetails: {
    contactPerson: 'John Doe',
    mobile: '9876541234',
    maskedMobile: '******1234',
    email: 'john@example.com',
    maskedEmail: 'j***n@e***e.com',
  },

  messages: {
    welcome: 'Welcome to Dealer App!',
    invalidCredentials: 'invalid credentials',
    sessionTimeout: 'Your session has expired. Please log in again.',
    securityInvalidation: 'Your session has been invalidated for security reasons. Please log in again.',
    acknowledgementError: 'Please acknowledge the information on this page.',
  },

  identityVerification: {
    ownerName: 'John Doe',
    idNumber: 'ID123456',
  },
};