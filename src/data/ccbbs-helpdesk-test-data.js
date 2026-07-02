const testData = {
  urls: {
    userView: 'https://ccbbs-helpdesk.example.com',
    adminView: 'https://ccbbs-helpdesk.example.com/admin'
  },

  urlPatterns: {
    userView: /ccbbs-helpdesk\.example\.com/,
    adminView: /ccbbs-helpdesk\.example\.com\/admin/,
    ticketSuccess: /ticket|success|confirmation/i
  },

  userData: {
    fullName: 'John Doe',
    phoneNumber: '1234567890',
    email: 'john@vendor.com',
    companyName: 'ABC Corp',
    titleMessage: 'Payment Query',
    questions: 'Invoice status inquiry'
  },

  adminCredentials: {
    username: 'admin',
    password: 'admin123',
    level3Username: 'level3admin',
    level3Password: 'level3pass'
  },

  ticketData: {
    referenceIdPattern: /\d{12}/,
    referenceIdFormat: 'MMDDYYHHMM00',
    sampleTicketId: '010125143000'
  },

  vendorData: {
    vendorCode: 'V12345',
    vendorName: 'ABC Corporation'
  },

  classificationLevel1: {
    inquiry: 'INQUIRY',
    request: 'REQUEST',
    ncr: 'NCR',
    freights: 'FREIGHTS',
    dispute: 'DISPUTE',
    all: ['INQUIRY', 'REQUEST', 'NCR', 'FREIGHTS', 'DISPUTE']
  },

  requestTypeLevel2: {
    generalInquiry: 'General Inquiry',
    invoicePaymentStatus: 'Invoice Payment Status',
    vendorResolution: 'Vendor Resolution',
    employeeClaims: 'Employee Claims',
    soaUpdate: 'SOA Update',
    documentRetrieval: 'Document Retrieval',
    checkRequest: 'Check Request',
    taxCertificate: 'Tax Certificate',
    all: [
      'General Inquiry',
      'Invoice Payment Status',
      'Vendor Resolution',
      'Employee Claims',
      'SOA Update',
      'Document Retrieval',
      'Check Request',
      'Tax Certificate'
    ]
  },

  resolutionStatus: {
    new: 'New',
    closed: 'Closed',
    ongoing: 'On-going',
    reject: 'Reject',
    all: ['New', 'Closed', 'On-going', 'Reject']
  },

  resolvedFirstContact: {
    yes: 'Yes',
    no: 'No',
    all: ['Yes', 'No']
  },

  slaTiers: {
    tier1: {
      name: 'Tier 1',
      duration: '1 Day',
      hours: 24,
      requestTypes: ['General Inquiry', 'Invoice Payment Status', 'Vendor Resolution', 'Employee Claims']
    },
    tier2: {
      name: 'Tier 2',
      duration: '2 Days',
      hours: 48,
      requestTypes: ['SOA Update']
    },
    tier3: {
      name: 'Tier 3',
      duration: '3 Days',
      hours: 72,
      requestTypes: ['Document Retrieval']
    },
    tier5: {
      name: 'Tier 5',
      duration: '5 Days',
      hours: 120,
      requestTypes: ['Check Request', 'Tax Certificate']
    }
  },

  validationErrors: {
    emailRequired: 'Email Address is required',
    companyRequired: 'Company Name is required',
    titleRequired: 'Title Message is required',
    questionsRequired: 'Ask your Questions is required',
    mandatoryFieldsForClosure: 'Vendor Code, Vendor Name, Resolution Status, and Resolved at First Contact? must be populated before closing ticket'
  },

  reportExtraction: {
    columns: [
      'Ticket Reference',
      'Full Name',
      'Phone Number',
      'Email Address',
      'Company Name',
      'Title Message',
      'Ask your Questions',
      'Status',
      'Resolved at First Contact?'
    ],
    schema: 'Report Extraction rev1'
  },

  pageTitles: {
    userView: /Helpdesk|Submit|User View/i,
    adminView: /Admin|Dashboard/i
  }
};

module.exports = testData;