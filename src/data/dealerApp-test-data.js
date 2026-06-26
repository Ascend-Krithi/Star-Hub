module.exports = {
  urls: {
    dealerAppLogin: 'https://dealerapp.example.com',
    dashboard: 'https://dealerapp.example.com/dashboard',
    identityVerification: 'https://dealerapp.example.com/identity-verification'
  },

  urlPatterns: {
    login: /dealerapp\.example\.com\/?$/,
    dashboard: /\/dashboard/,
    identityVerification: /\/identity-verification/,
    searchResults: /search.*$/
  },

  credentials: {
    validDealer: {
      email: 'dealer@example.com',
      password: 'ValidPass123'
    },
    invalidEmail: {
      email: 'invalid@example.com',
      password: 'ValidPass123'
    },
    invalidPassword: {
      email: 'dealer@example.com',
      password: 'WrongPass456'
    },
    firstTimeUser: {
      email: 'firsttime@example.com',
      password: 'FirstLogin123'
    },
    adminPremium: {
      email: 'admin@premium.com',
      password: 'AdminPremium123',
      role: 'Admin',
      group: 'Premium'
    },
    userStandard: {
      email: 'user@standard.com',
      password: 'UserStandard123',
      role: 'User',
      group: 'Standard'
    },
    updatedPassword: {
      email: 'dealer@example.com',
      password: 'NewValidPass123'
    }
  },

  businessProfile: {
    businessName: 'ABC Dealers',
    registrationNumber: 'REG12345',
    gstNumber: 'GST67890'
  },

  contactDetails: {
    contactPerson: 'John Doe',
    mobile: '9876541234',
    maskedMobile: '******1234',
    email: 'john@example.com',
    maskedEmail: 'j***n@e***e.com'
  },

  identityVerification: {
    ownerName: 'John Doe',
    idNumber: 'ID123456'
  },

  messages: {
    welcomeMessage: 'Welcome to Dealer App!',
    invalidCredentials: 'invalid credentials',
    sessionTimeout: 'session timeout',
    securityInvalidation: 'Your session has been invalidated for security reasons. Please log in again.',
    acknowledgementError: 'Please acknowledge the information on this page.',
    successfulLogin: 'successfully authenticated'
  },

  tips: {
    contactSupport: 'Contact support to update information',
    useSettings: 'Use settings menu to modify details'
  },

  timeouts: {
    sessionTimeout: 24 * 60 * 60 * 1000,
    beforeTimeout: 23 * 60 * 60 * 1000 + 59 * 60 * 1000,
    activityDuration: 2 * 60 * 60 * 1000
  },

  devices: {
    mobile: 'Mobile (iOS/Android)',
    tablet: 'Tablet (iPad/Android Tablet)',
    desktop: 'Desktop (Chrome/Firefox/Safari)'
  }
};