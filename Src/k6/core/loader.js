// This module's sole purpose is to import all page modules and workflows
// so that they register their APIs and workflows with the registry via side-effects.

// Apps - procurement
import "../apps/procurement/procurement_planning.page.js";
import "../apps/procurement/day_wise_coverage.page.js";
import "../apps/procurement/expiditing_rm_suppliers.page.js";
import "../apps/procurement/material_coverage_for_open_sales.page.js";
import "../apps/procurement/material_requirement.page.js";
import "../apps/procurement/rm_pm_buffer_trends.page.js";
import "../apps/procurement/rm_pm_orderwise_coverage.page.js";

// Apps - production
import "../apps/production/due_date_quotation.page.js";
import "../apps/production/enquiry_response.page.js";

// Apps - poogi
import "../apps/poogi/reason_for_delayed_orders.page.js";
import "../apps/poogi/trend_of_failure_reasons.page.js";
import "../apps/poogi/otif_analysis.page.js";
import "../apps/poogi/ot_and_if_analysis.page.js";
import "../apps/poogi/resource_utilization_and_wip_profile.page.js";
import "../apps/poogi/lead_time.page.js";
import "../apps/poogi/top_failure_reasons.page.js";

// Workflows
import "../workflows/procurement.workflow.js";
import "../workflows/production.workflow.js";
import "../workflows/endToEnd.workflow.js";

// Scenarios (if you have scenario files that register themselves)
// import "../scenarios/procurement.scenario.js";

// If you add new apps/pages/workflows, add imports here so they are registered.

export function initLoader() {
  // intentionally empty - imports run on module load
}
