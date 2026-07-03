const dealerAppTestData = {
  urls: {
    login: 'https://dealerapp.example.com',
    dashboard: 'https://dealerapp.example.com/dashboard',
    businessProfile: 'https://dealerapp.example.com/business-profile',
    identityVerification: 'https://dealerapp.example.com/identity-verification'
  },
  urlPatterns: {
    login: /dealerapp\.example\.com\/?$/,
    dashboard: /dealerapp\.example\.com\/dashboard/,
    businessProfile: /dealerapp\.example\.com\/business-profile/,
    identityVerification: /dealerapp\.example\.com\/identity-verification/
  },
  credentials: {
    validDealer: {
      email: 'dealer@example.com',
      password: 'ValidPass123!'
    },
    invalidDealer: {
      email: 'invaliddealer@example.com',
      password: 'ValidPass123!'
    },
    wrongPassword: {
      email: 'dealer@example.com',
      password: 'WrongPass456!'
    },
    firstTimeDealer: {
      email: 'newdealer@example.com',
      password: 'FirstLogin123!'
    },
    adminPremium: {
      email: 'admin@example.com',
      password: 'AdminPass123!'
    },
    salesStandard: {
      email: 'sales@example.com',
      password: 'SalesPass123!'
    }
  },
  businessProfile: {
    businessName: 'ABC Motors',
    registrationNumber: 'REG12345',
    gstNumber: 'GST67890',
    contactPerson: 'John Doe',
    mobileOriginal: '9876541234',
    mobileDisplayed: '******1234',
    emailOriginal: 'john@example.com',
    emailDisplayed: 'j***n@e***e.com'
  },
  messages: {
    welcomeMessage: 'Welcome to Dealer App!',
    invalidCredentials: 'Invalid email or password',
    sessionExpired: 'Your session has expired. Please log in again.',
    sessionInvalidated: 'Your session has been invalidated for security reasons. Please log in again.',
    acknowledgementError: 'Please acknowledge the information on this page.',
    tipsMessage: 'To update your information, please contact support at support@dealerapp.com'
  },
  roles: {
    admin: {
      features: ['User Management', 'Reports', 'Settings', 'All Services']
    },
    sales: {
      features: ['Customer Management', 'Orders', 'Limited Reports'],
      restricted: ['User Management', 'System Settings']
    }
  },
  session: {
    activeTimeout: '23 hours 59 minutes',
    expiredTimeout: '24 hours 1 minute'
  }
};

module.exports = dealerAppTestData;