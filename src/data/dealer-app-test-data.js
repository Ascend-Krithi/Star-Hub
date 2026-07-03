module.exports = {
  urls: {
    dealerAppLogin: 'https://dealerapp.example.com',
    dashboard: 'https://dealerapp.example.com/dashboard'
  },
  urlPatterns: {
    login: /dealerapp\.example\.com.*login/i,
    dashboard: /dealerapp\.example\.com.*dashboard/i,
    firstLoginScreen: /dealerapp\.example\.com.*(first-login|welcome|profile-review)/i
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
      email: 'admin@premium.com',
      password: 'Admin@1234'
    },
    salesStandard: {
      email: 'sales@standard.com',
      password: 'Sales@1234'
    }
  },
  businessProfile: {
    businessName: 'ABC Motors',
    businessNameFull: 'ABC Motors Pvt Ltd',
    registrationNumber: 'REG12345',
    registrationNumberFull: 'REG123456789',
    gstNumber: 'GST67890',
    gstNumberFull: '29ABCDE1234F1Z5'
  },
  contactDetails: {
    contactPerson: 'John Doe',
    mobileOriginal: '9876541234',
    mobileDisplayed: '******1234',
    mobileActual: '1234567890',
    mobileExpected: '******7890',
    emailOriginal: 'john@example.com',
    emailMasked: 'j***n@e***e.com',
    emailActual: 'dealer@example.com',
    emailMaskedExpected: 'd****r@e****e.com'
  },
  messages: {
    welcomeMessage: 'Welcome to Dealer App!',
    invalidCredentials: 'Invalid email or password',
    sessionExpired: 'Your session has expired. Please log in again.',
    sessionInvalidated: 'Your session has been invalidated for security reasons. Please log in again.',
    acknowledgementError: 'Please acknowledge the information on this page.'
  },
  tips: {
    supportContact: 'To update your information, please contact support at support@dealerapp.com',
    generalTips: 'Contact support to update information'
  },
  features: {
    adminPremium: ['User Management', 'Advanced Reports', 'System Settings', 'Premium Support', 'Reports', 'Settings', 'All Services'],
    salesStandard: ['Sales Dashboard', 'Basic Reports', 'Customer Management', 'Orders', 'Limited Reports']
  },
  durations: {
    activeSession: '5 hours of active use',
    inactivity23Hours: '23 hours',
    inactivity23Hours59Min: '23 hours 59 minutes',
    inactivity24HoursPlus: '24+ hours',
    inactivity24Hours1Min: '24 hours 1 minute'
  },
  activities: {
    normalActivities: ['View Dashboard', 'Check Orders', 'Generate Report'],
    navigationActivities: ['Navigate between pages', 'view reports', 'update data']
  },
  securityEvents: {
    passwordChange: 'Password change from another device',
    newPassword: 'NewSecurePass456!'
  },
  devices: {
    desktop: 'Desktop',
    mobile: 'Mobile',
    tablet: 'Tablet'
  },
  verificationMethods: {
    otp: 'OTP sent to registered mobile',
    document: 'Document verification'
  }
};