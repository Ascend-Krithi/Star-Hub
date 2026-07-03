const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-005: Verify SLA Metrics Display', { tag: ['@smoke', '@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-005 TC-001] Verify SLA metrics for all timeframes are displayed correctly', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();
    await expect(page).toHaveURL(TD.urls.application);

    // Step 2: Login with manager credentials
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Navigate to Dashboard
    await dashboard.navigateToDashboard();
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Locate and verify SLA Metrics Section
    const slaVisible = await dashboard.isSLAMetricsSectionVisible();
    await expect(page.locator('[data-testid="sla-metrics-section"]')).toBeVisible();
    expect(slaVisible).toBe(true);

    // Step 5: Verify 1-Day SLA metrics
    const sla1Day = await dashboard.getSLA1DayMetrics();
    expect(sla1Day.total).toBe(String(TD.slaMetrics.sla1Day.total));
    expect(sla1Day.withinSLA).toBe(String(TD.slaMetrics.sla1Day.withinSLA));
    expect(sla1Day.breached).toBe(String(TD.slaMetrics.sla1Day.breached));

    // Step 6: Verify 2-Day SLA metrics
    const sla2Day = await dashboard.getSLA2DayMetrics();
    expect(sla2Day.total).toBe(String(TD.slaMetrics.sla2Day.total));
    expect(sla2Day.withinSLA).toBe(String(TD.slaMetrics.sla2Day.withinSLA));
    expect(sla2Day.breached).toBe(String(TD.slaMetrics.sla2Day.breached));

    // Step 7: Verify 3-Day SLA metrics
    const sla3Day = await dashboard.getSLA3DayMetrics();
    expect(sla3Day.total).toBe(String(TD.slaMetrics.sla3Day.total));
    expect(sla3Day.withinSLA).toBe(String(TD.slaMetrics.sla3Day.withinSLA));
    expect(sla3Day.breached).toBe(String(TD.slaMetrics.sla3Day.breached));

    // Step 8: Verify 5-Day SLA metrics
    const sla5Day = await dashboard.getSLA5DayMetrics();
    expect(sla5Day.total).toBe(String(TD.slaMetrics.sla5Day.total));
    expect(sla5Day.withinSLA).toBe(String(TD.slaMetrics.sla5Day.withinSLA));
    expect(sla5Day.breached).toBe(String(TD.slaMetrics.sla5Day.breached));

    // Step 9: Verify compliance percentages
    const compliance1Day = await dashboard.getSLACompliancePercentage('1');
    expect(compliance1Day).toBe(TD.slaMetrics.sla1Day.compliance);
    
    const compliance2Day = await dashboard.getSLACompliancePercentage('2');
    expect(compliance2Day).toBe(TD.slaMetrics.sla2Day.compliance);
    
    const compliance3Day = await dashboard.getSLACompliancePercentage('3');
    expect(compliance3Day).toBe(TD.slaMetrics.sla3Day.compliance);
    
    const compliance5Day = await dashboard.getSLACompliancePercentage('5');
    expect(compliance5Day).toBe(TD.slaMetrics.sla5Day.compliance);

    // Step 10: Verify SLA resolution trends chart
    const slaTrendsVisible = await dashboard.isSLAResolutionTrendsVisible();
    await expect(page.locator('[data-testid="sla-resolution-trends-chart"]')).toBeVisible();
    expect(slaTrendsVisible).toBe(true);

    // Step 11: Verify real-time accuracy
    const totalSLATickets = TD.slaMetrics.sla1Day.total + TD.slaMetrics.sla2Day.total + TD.slaMetrics.sla3Day.total + TD.slaMetrics.sla5Day.total;
    expect(totalSLATickets).toBe(TD.slaMetrics.totalSLATickets);
  });
});