const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-005: Verify SLA Metrics Display', { tag: ['@smoke', '@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-005 TC-001] Verify SLA metrics for all timeframes', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();

    // Step 4: Locate and navigate to the SLA Metrics Section
    const slaVisible = await dashboard.isSLAMetricsSectionVisible();
    expect(slaVisible).toBeTruthy();

    // Step 5: Verify the 1-Day SLA metrics
    const oneDaySLA = await dashboard.getOneDaySLAMetrics();
    expect(oneDaySLA.total).toBe(TD.slaMetrics.oneDay.total);
    expect(oneDaySLA.within).toBe(TD.slaMetrics.oneDay.withinSLA);
    expect(oneDaySLA.breached).toBe(TD.slaMetrics.oneDay.breached);

    // Step 6: Verify the 2-Day SLA metrics
    const twoDaySLA = await dashboard.getTwoDaySLAMetrics();
    expect(twoDaySLA.total).toBe(TD.slaMetrics.twoDay.total);
    expect(twoDaySLA.within).toBe(TD.slaMetrics.twoDay.withinSLA);
    expect(twoDaySLA.breached).toBe(TD.slaMetrics.twoDay.breached);

    // Step 7: Verify the 3-Day SLA metrics
    const threeDaySLA = await dashboard.getThreeDaySLAMetrics();
    expect(threeDaySLA.total).toBe(TD.slaMetrics.threeDay.total);
    expect(threeDaySLA.within).toBe(TD.slaMetrics.threeDay.withinSLA);
    expect(threeDaySLA.breached).toBe(TD.slaMetrics.threeDay.breached);

    // Step 8: Verify the 5-Day SLA metrics
    const fiveDaySLA = await dashboard.getFiveDaySLAMetrics();
    expect(fiveDaySLA.total).toBe(TD.slaMetrics.fiveDay.total);
    expect(fiveDaySLA.within).toBe(TD.slaMetrics.fiveDay.withinSLA);
    expect(fiveDaySLA.breached).toBe(TD.slaMetrics.fiveDay.breached);

    // Step 10: Verify that resolution trends for SLA performance are displayed
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();

    // Step 11: Verify total SLA tracked tickets
    const totalSLATickets = oneDaySLA.total + twoDaySLA.total + threeDaySLA.total + fiveDaySLA.total;
    expect(totalSLATickets).toBe(TD.slaMetrics.totalSLATickets);
  });
});