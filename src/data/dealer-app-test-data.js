const dealerAppTestData = {
  urls: {
    dealerApp: 'https://dealerapp.example.com'
  },
  
  urlPatterns: {
    login: /dealerapp\.example\.com.*login/i,
    dashboard: /dealerapp\.example\.com.*dashboard/i,
    firstTimeLogin: /dealerapp\.example\.com.*first-time/i
  },
  
  credentials: {
    validDealer: {
      email: 'dealer@example.com',
      password: 'Test@1234'
    },
    invalidEmail: {
      email: 'invalid@example.com',
      password: 'Test@1234'
    },
    invalidPassword: {
      email: 'dealer@example.com',
      password: 'WrongPass@123'
    },
    firstTimeDealer: {
      email: 'newdealer@example.com',
      password: 'Test@1234'
    },
    adminRole: {
      email: 'admin@dealer.com',
      password: 'Admin@1234'
    },
    managerRole: {
      email: 'manager@dealer.com',
      password: 'Manager@1234'
    },
    salesRole: {
      email: 'sales@dealer.com',
      password: 'Sales@1234'
    }
  },
  
  businessProfile: {
    name: 'ABC Motors Pvt Ltd',
    registrationNumber: 'REG123456789',
    gstNumber: '29ABCDE1234F1Z5'
  },
  
  contactDetails: {
    personName: 'John Doe',
    actualMobile: '9876543210',
    maskedMobile: '****3210',
    actualEmail: 'dealer@example.com',
    maskedEmail: 'd****r@e****e.com'
  },
  
  messages: {
    welcomeMessage: /welcome to dealer app/i,
    invalidCredentials: /invalid credentials/i,
    acknowledgementError: 'Please acknowledge the information on this page.',
    sessionTimeout: /session.*timeout/i,
    securityEvent: /security/i
  },
  
  roles: {
    admin: {
      features: ['User Management', 'System Settings', 'Full Reports Access', 'Dealer Management']
    },
    manager: {
      features: ['Team Reports', 'Inventory Management', 'Limited Settings']
    },
    sales: {
      features: ['Customer Management', 'Sales Orders', 'Basic Reports']
    }
  },
  
  session: {
    validDuration: 23,
    timeoutDuration: 24.017
  }
};

module.exports = dealerAppTestData;