import { getRegistry } from "./registry.js";

function parseList(value) {
  if (!value) return [];
  return value.split(",").map(v => v.trim());
}

export function resolveSelection(env) {

  const registry = getRegistry();

  const apiInput = parseList(env.API);
  const pageInput = parseList(env.PAGE);
  const workflowInput = parseList(env.WORKFLOW);

  const selectedAPIs = new Set();

  const warnings = [];

  apiInput.forEach(api => {
    if (registry.apis.has(api))
      selectedAPIs.add(api);
    else
      warnings.push(`API not found: ${api}`);
  });

  pageInput.forEach(page => {
    if (registry.pages.has(page)) {
      registry.pages.get(page).forEach(api =>
        selectedAPIs.add(api)
      );
    }
    else
      warnings.push(`Page not found: ${page}`);
  });

  workflowInput.forEach(workflow => {
    if (registry.workflows.has(workflow)) {
      registry.workflows.get(workflow).forEach(api =>
        selectedAPIs.add(api)
      );
    }
    else
      warnings.push(`Workflow not found: ${workflow}`);
  });

  if (
    apiInput.length === 0 &&
    pageInput.length === 0 &&
    workflowInput.length === 0
  ) {
    registry.apis.forEach((_, name) =>
      selectedAPIs.add(name)
    );
  }

  return {
    apis: [...selectedAPIs],
    warnings,
  };
}
