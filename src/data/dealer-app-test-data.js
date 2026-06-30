const dealerAppTestData = {
  urls: {
    base: 'https://dealerapp.example.com',
    login: 'https://dealerapp.example.com',
    dashboard: 'https://dealerapp.example.com/dashboard',
    firstLogin: 'https://dealerapp.example.com/first-login'
  },
  urlPatterns: {
    login: /dealerapp\.example\.com\/?$/,
    dashboard: /dealerapp\.example\.com\/dashboard/,
    firstLogin: /dealerapp\.example\.com\/first-login/
  },
  credentials: {
    validDealer: {
      email: 'dealer@example.com',
      password: 'ValidPass123!'
    },
    invalidEmailDealer: {
      email: 'invaliddealer@example.com',
      password: 'ValidPass123!'
    },
    invalidPasswordDealer: {
      email: 'dealer@example.com',
      password: 'WrongPass456!'
    },
    firstTimeDealer: {
      email: 'newdealer@example.com',
      password: 'FirstLogin123!'
    },
    adminDealer: {
      email: 'admin@example.com',
      password: 'AdminPass123!'
    },
    salesDealer: {
      email: 'sales@example.com',
      password: 'SalesPass123!'
    }
  },
  businessProfile: {
    businessName: 'ABC Motors',
    registrationNumber: 'REG12345',
    gstNumber: 'GST67890'
  },
  contactDetails: {
    contactPerson: 'John Doe',
    mobileOriginal: '9876541234',
    mobileDisplayed: '******1234',
    emailOriginal: 'john@example.com',
    emailDisplayed: 'j***n@e***e.com'
  },
  messages: {
    welcome: 'Welcome to Dealer App!',
    invalidCredentials: 'Invalid email or password',
    acknowledgementError: 'Please acknowledge the information on this page.',
    sessionInvalidated: 'session has been invalidated for security reasons',
    tipsMessage: 'To update your information, please contact support at support@dealerapp.com'
  },
  pageTitles: {
    login: /Dealer App.*Login/i,
    dashboard: /Dashboard/i,
    firstLogin: /Welcome/i
  },
  roles: {
    admin: {
      expectedFeatures: ['User Management', 'Reports', 'Settings', 'All Services']
    },
    sales: {
      expectedFeatures: ['Customer Management', 'Orders', 'Limited Reports'],
      restrictedFeatures: ['User Management', 'System Settings']
    }
  },
  security: {
    newPassword: 'NewSecurePass456!',
    sessionTimeout: 24,
    inactivityDuration: '24+ hours'
  },
  testActivities: {
    actions: ['View Dashboard', 'Check Orders', 'Generate Report'],
    duration: '5 hours of active use',
    orderAction: 'Create new order',
    updateAction: 'Update order status'
  }
};

module.exports = dealerAppTestData;