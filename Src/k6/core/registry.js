const registry = {
  apis: new Map(),        // name -> { name, fn, page, app, module }
  pages: new Map(),       // page -> [apiName]
  workflows: new Map(),   // workflowName -> [apiName]
  workflowFns: new Map(), // workflowName -> function
  scenarios: new Map(),   // scenarioName -> options
};

export function registerAPI(def) {
  // def: { name, page, app, fn, module }
  const { name, page, app, fn, module } = def;
  if (!name || typeof fn !== "function") {
    throw new Error("registerAPI requires {name, fn}");
  }

  registry.apis.set(name, { name, fn, page, app, module });

  if (page) {
    if (!registry.pages.has(page)) registry.pages.set(page, []);
    registry.pages.get(page).push(name);
  }
}

export function registerWorkflow(def) {
  // def: { name, fn, apis }
  const { name, fn, apis } = def;
  if (!name) throw new Error("registerWorkflow requires {name}");
  if (Array.isArray(apis)) registry.workflows.set(name, apis.slice());
  if (typeof fn === "function") registry.workflowFns.set(name, fn);
}

export function registerScenario(name, options) {
  registry.scenarios.set(name, options);
}

export function getApi(name) {
  return registry.apis.get(name)?.fn;
}

export function getApiMeta(name) {
  return registry.apis.get(name);
}

export function getPageApis(page) {
  return registry.pages.get(page) || [];
}

export function getWorkflowApis(name) {
  return registry.workflows.get(name) || [];
}

export function getWorkflowsForApi(apiName) {
  const result = [];
  for (const [wfName, apis] of registry.workflows.entries()) {
    if (Array.isArray(apis) && apis.includes(apiName)) result.push(wfName);
  }
  return result;
}

export function getWorkflowFn(name) {
  return registry.workflowFns.get(name);
}

export function getAllWorkflows() {
  return Array.from(registry.workflows.keys());
}

export function getAllAPIs() {
  return Array.from(registry.apis.keys());
}

export function getScenario(name) {
  return registry.scenarios.get(name);
}

export function getAllScenarios() {
  return Array.from(registry.scenarios.keys());
}

export function getRegistry() {
  return registry;
}
