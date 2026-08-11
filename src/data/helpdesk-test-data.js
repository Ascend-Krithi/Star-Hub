module.exports = {
  urls: {
    helpdeskHome: 'https://helpdesk.example.com',
    dashboard: 'https://helpdesk.example.com/dashboard'
  },
  credentials: {
    manager: {
      username: 'manager@helpdesk.com',
      password: 'Manager@123'
    }
  },
  ticketStatus: {
    new: 'New',
    ongoing: 'On-going',
    reject: 'Reject',
    closed: 'Closed'
  },
  ticketCategories: {
    inquiry: 'Inquiry',
    request: 'Request',
    dispute: 'Dispute',
    nuisance: 'Nuisance',
    invalid: 'Invalid'
  },
  expectedCounts: {
    newTickets: 5,
    ongoingTickets: 10,
    rejectTickets: 2,
    closedTickets: 15,
    totalTickets: 32,
    inquiryTickets: 20,
    requestTickets: 15,
    disputeTickets: 8,
    nuisanceTickets: 3,
    invalidTickets: 2,
    backlog: 25,
    totalCategoryTickets: 48
  },
  slaMetrics: {
    oneDay: { total: 30, withinSLA: 25, breached: 5, compliance: 83.33 },
    twoDay: { total: 20, withinSLA: 18, breached: 2, compliance: 90 },
    threeDay: { total: 10, withinSLA: 10, breached: 0, compliance: 100 },
    fiveDay: { total: 5, withinSLA: 5, breached: 0, compliance: 100 },
    totalSLATickets: 65
  },
  messages: {
    noTicketsFound: 'No tickets found matching the selected filters',
    connectionLost: 'Connection lost',
    unableToSync: 'Unable to sync data',
    displayingCachedData: 'Displaying cached data'
  },
  timeouts: {
    pageLoad: 60000,
    elementWait: 15000,
    networkTimeout: 60000
  }
};