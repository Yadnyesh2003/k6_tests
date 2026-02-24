export function getScenarioOptions() {

  const raw = __ENV.SCENARIO || "default";
  const scenario = (raw || "").split(",").map(s => s.trim())[0] || "default";

  switch (scenario) {

    case "constant_load":
      return {
        scenarios: {
          constant_load: {
            executor: "constant-vus",
            vus: 10,
            duration: "1m",
          },
        },
      };

    case "spike":
      return {
        scenarios: {
          spike: {
            executor: "ramping-vus",
            stages: [
              { duration: "10s", target: 100 },
              { duration: "30s", target: 0 },
            ],
          },
        },
      };

    case "longevity_test":
      return {
        scenarios: {
          longevity_test: {
            executor: "constant-vus",
            vus: 10,
            duration: "45m",
          },
        },
      };

    default:
      return {
        scenarios: {
          default: {
            executor: "constant-vus",
            vus: 1,
            duration: "10s",
          },
        },
      };

  }
}
