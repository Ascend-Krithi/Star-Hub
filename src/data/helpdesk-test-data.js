/**
 * Helpdesk Portal Test Data Module
 * All hardcoded assertion values and URLs must come from this module
 */

const helpdeskTestData = {
  urls: {
    helpdeskPortal: 'https://helpdesk.ccbbs.com',
    adminPortal: 'https://helpdesk-admin.ccbbs.com'
  },

  urlPatterns: {
    helpdeskHome: /helpdesk\.ccbbs\.com/,
    adminDashboard: /helpdesk-admin\.ccbbs\.com.*dashboard/,
    ticketQueue: /helpdesk-admin\.ccbbs\.com.*ticket.*queue/
  },

  credentials: {
    admin: {
      username: 'admin@ccbbs.com',
      password: 'Admin@123'
    },
    actionOwner: {
      username: 'john.doe@ccbbs.com',
      password: 'ActionOwner@123'
    }
  },

  ticketData: {
    vendor: {
      fullName: 'John Vendor',
      phoneNumber: '+639190875791',
      email: 'vendor@test.com',
      companyName: 'Test Vendor Inc',
      titleMessage: 'Payment Query',
      question: 'When will invoice be paid?'
    },
    vendor2: {
      fullName: 'John Vendor',
      email: 'vendor@test.com',
      companyName: 'Test Vendor Inc',
      titleMessage: 'Payment Query',
      question: 'Invoice status?'
    },
    vendorCode: '2000456',
    vendorName: 'John Store'
  },

  classification: {
    level1: {
      inquiry: 'INQUIRY',
      request: 'REQUEST',
      ncr: 'NCR',
      freights: 'FREIGHTS',
      dispute: 'DISPUTE'
    },
    level2: {
      generalInquiry: 'General Inquiry',
      soaUpdate: 'SOA Update',
      documentRetrieval: 'Document Retrieval',
      checkRequest: 'Check Request'
    },
    level3: {
      recallOnly: 'Recall only'
    }
  },

  statuses: {
    new: 'New',
    ongoing: 'On-going',
    closed: 'Closed',
    reject: 'Reject',
    assignedToActionOwner: 'Assigned to Action Owner'
  },

  sla: {
    generalInquiry: { days: 1, hours: 24 },
    soaUpdate: { days: 2, hours: 48 },
    documentRetrieval: { days: 3, hours: 72 },
    checkRequest: { days: 5, hours: 120 }
  },

  errors: {
    emailRequired: 'Email Address is required',
    companyNameRequired: 'Company Name is required',
    vendorCodeRequired: 'Vendor Code is required',
    vendorNameRequired: 'Vendor Name is required',
    invalidStatusTransition: 'Invalid status transition. Ticket must be in On-going status before closing'
  },

  pageTitles: {
    helpdeskPortal: /Helpdesk Portal/i,
    adminPortal: /Admin Portal/i,
    submitTicket: /Submit Ticket/i,
    ticketQueue: /Ticket Queue/i
  },

  ticketReferenceFormat: /^\d{13}$/,

  responses: {
    actionOwner: 'Invoice payment processed on 15th May 2026'
  },

  email: {
    subject: 'Re: Ticket {ticketRef} - Payment Query',
    body: 'Your invoice payment is being processed',
    vendorReplySubject: 'Re: Ticket {ticketRef} - Payment Query',
    vendorReplyBody: 'Thank you for the update'
  },

  reportColumns: [
    'Ticket Reference',
    'Full Name',
    'Phone Number',
    'Email Address',
    'Company Name',
    'Status',
    'Resolved at First Contact',
    'Date Submitted',
    'Date Closed',
    'Processor'
  ]
};

module.exports = helpdeskTestData;