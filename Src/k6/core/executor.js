import { getApiMeta, getWorkflowsForApi } from "./registry.js";
import { setGlobalTags } from "../lib/httpClient.js";

export function executeSelectedAPIs(apiNames, user, scenarioName) {
  apiNames.forEach(apiName => {
    const meta = getApiMeta(apiName);
    if (!meta) return;

    const workflows = getWorkflowsForApi(meta.name) || [];

    const tags = {
      name: meta.name,
      page: meta.page || "unknown",
      workflow: Array.isArray(workflows) ? workflows.join("|") : "",
      app: meta.app || "",
      scenario: scenarioName || "default",
    };

    // set global tags so httpClient will merge them into every request
    setGlobalTags(tags);
    // execute API function (page functions may still add their own tags)
    meta.fn(user, tags);
  });
}
