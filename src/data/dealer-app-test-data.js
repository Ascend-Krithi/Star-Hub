const dealerAppTestData = {
  urls: {
    dealerApp: 'https://dealerapp.example.com'
  },
  urlPatterns: {
    login: /dealerapp\.example\.com.*login/i,
    dashboard: /dealerapp\.example\.com.*dashboard/i
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
    firstTimeLogin: {
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
    }
  },
  businessProfile: {
    businessName: 'ABC Dealers',
    registrationNumber: 'REG12345',
    gstNumber: 'GST67890'
  },
  contactDetails: {
    contactPerson: 'John Doe',
    originalMobile: '9876541234',
    maskedMobile: '******1234',
    originalEmail: 'john@example.com',
    maskedEmail: 'j***n@e***e.com'
  },
  identityVerification: {
    ownerName: 'John Doe',
    idNumber: 'ID123456'
  },
  messages: {
    welcomeMessage: 'Welcome to Dealer App!',
    inlineError: 'Please acknowledge the information on this page.',
    sessionTimeout: 'Your session has expired',
    securityInvalidation: 'Your session has been invalidated for security reasons. Please log in again.'
  },
  errors: {
    invalidCredentials: 'invalid credentials',
    loginFailed: 'login is not successful'
  },
  pageTitles: {
    login: /login/i,
    dashboard: /dashboard/i
  },
  sessionTimeout: {
    validDuration: '23 hours 59 minutes',
    timeoutDuration: '24 hours'
  }
};

module.exports = dealerAppTestData;