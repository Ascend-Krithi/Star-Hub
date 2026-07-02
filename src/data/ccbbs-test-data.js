const testData = {
  urls: {
    base: 'https://ccbbs-helpdesk.example.com',
  },
  
  credentials: {
    admin: {
      username: 'admin@example.com',
      password: 'Admin@123',
    },
  },
  
  userFormData: {
    valid: {
      fullName: 'John Doe',
      phoneNumber: '1234567890',
      emailAddress: 'john@example.com',
      companyName: 'ABC Corp',
      titleMessage: 'Payment Issue',
      askQuestions: 'Need invoice status',
    },
    user2: {
      fullName: 'User2',
      phoneNumber: '2222222222',
      emailAddress: 'user2@test.com',
      companyName: 'Test2',
      titleMessage: 'Test2',
      askQuestions: 'Test2',
    },
    janeSmith: {
      fullName: 'Jane Smith',
      phoneNumber: '9876543210',
      emailAddress: 'jane@example.com',
      companyName: 'XYZ Inc',
      titleMessage: 'Inquiry',
      askQuestions: 'Need help',
    },
  },
  
  adminFormData: {
    vendorCode: 'V001',
    vendorName: 'ABC Vendor',
  },
  
  classificationLevel1Options: [
    'INQUIRY',
    'REQUEST',
    'NCR',
    'FREIGHTS',
    'DISPUTE',
  ],
  
  requestTypeLevel2Options: [
    'General Inquiry',
    'Invoice Payment Status',
    'Vendor Resolution',
    'Employee Claims',
    'SOA Update',
    'Document Retrieval',
    'Check Request',
    'Tax Certificate',
  ],
  
  resolutionStatusOptions: [
    'New',
    'Closed',
    'On-going',
    'Reject',
  ],
  
  resolvedFirstContactOptions: [
    'Yes',
    'No',
  ],
  
  slaTiers: {
    tier1: { days: 1, hours: 24, requestTypes: ['General Inquiry', 'Invoice Payment Status', 'Vendor Resolution', 'Employee Claims'] },
    tier2: { days: 2, hours: 48, requestTypes: ['SOA Update'] },
    tier3: { days: 3, hours: 72, requestTypes: ['Document Retrieval'] },
    tier5: { days: 5, hours: 120, requestTypes: ['Check Request', 'Tax Certificate'] },
  },
  
  reportHeaders: [
    'Ticket Reference',
    'Full Name',
    'Phone Number',
    'Email Address',
    'Company Name',
    'Title Message',
    'Ask your Questions',
    'Status',
    'Resolved at First Contact?',
  ],
  
  validationMessages: {
    emailRequired: /Email.*required/i,
    companyRequired: /Company.*required/i,
    titleRequired: /Title.*required/i,
    questionRequired: /Question.*required/i,
    vendorCodeRequired: /Vendor Code.*required/i,
    vendorNameRequired: /Vendor Name.*required/i,
    resolvedFirstContactRequired: /Resolved.*First Contact.*required/i,
  },
  
  ticketReferenceFormat: /\d{2}\d{2}\d{2}\d{2}\d{2}\d{4}/,
};

module.exports = testData;