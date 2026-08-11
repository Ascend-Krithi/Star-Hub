module.exports = {
  urls: {
    personalHome: 'https://www.starhub.com/personal.html',
    allPhones: 'https://consumer.starhub.com/personal/store/mobile/devices',
    samsungGalaxyA57: 'https://consumer.starhub.com/personal/store/mobile/devices/samsung/galaxy-a57-5g'
  },
  devices: {
    samsungGalaxyA57: {
      name: 'Samsung Galaxy A57 5G',
      defaultColour: 'Awesome Navy',
      defaultStorage: '256 GB',
      defaultPayment: '24-month installment'
    }
  },
  messages: {
    loginRequired: 'Please log in or create an account to continue with your purchase',
    loginButton: 'Log in with Hub ID',
    signupButton: "Don't have an account? Sign up here"
  },
  patterns: {
    deviceCount: /\d+ items/,
    mobileDevicesHeading: 'Mobile Devices'
  },
  timeouts: {
    pageLoad: 60000,
    elementWait: 15000,
    networkTimeout: 60000
  }
};