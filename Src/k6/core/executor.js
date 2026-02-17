import { getApiMeta, getWorkflowsForApi } from "./registry.js";
import { setGlobalTags } from "../lib/httpClient.js";

const TEST_RUN_ID = __ENV.TEST_RUN_ID || `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export function executeSelectedAPIs(apiNames, user, scenarioName) {
  apiNames.forEach(apiName => {
    const meta = getApiMeta(apiName);
    if (!meta) return;

    const workflows = getWorkflowsForApi(meta.name) || [];

    const tags = {
      api: meta.name,
      page: meta.page || "unknown",
      workflow: Array.isArray(workflows) ? workflows.join("|") : "",
      module: meta.module || "",
      app: meta.app || "",
      scenario: scenarioName || "default",
      test_run_id: TEST_RUN_ID,
    };

    // set global tags so httpClient will merge them into every request
    setGlobalTags(tags);
    // execute API function (page functions may still add their own tags)
    meta.fn(user, tags);
  });
}
