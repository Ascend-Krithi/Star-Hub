module.exports = {
  urls: {
    dealerApp: 'https://dealerapp.example.com'
  },
  urlPatterns: {
    dashboard: /dashboard|home/
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
    }
  },
  messages: {
    welcomeMessage: 'Welcome to Dealer App!'
  },
  businessProfile: {
    businessName: 'ABC Dealers',
    registrationNumber: 'REG12345',
    gstNumber: 'GST67890'
  },
  errors: {
    invalidCredentials: /invalid credentials|login failed|authentication failed/i
  }
};