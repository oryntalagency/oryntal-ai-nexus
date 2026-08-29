const OFFERING_TYPE_TO_DB = {
  saas: "SaaS Product",
  automation: "AI Automation",
  model: "AI Model/Agent"
};
const DB_TO_OFFERING_TYPE = {
  "SaaS Product": "saas",
  "AI Automation": "automation",
  "AI Model/Agent": "model"
};
const STATUS_TO_DB = {
  live: "Live",
  beta: "Beta",
  coming: "Coming soon"
};
const DB_TO_STATUS = {
  Live: "live",
  Beta: "beta",
  "Coming soon": "coming"
};
function kebab(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function omitUndefined(value) {
  const out = { ...value };
  for (const key of Object.keys(out)) {
    if (out[key] === void 0) delete out[key];
  }
  return out;
}
export {
  DB_TO_STATUS as D,
  OFFERING_TYPE_TO_DB as O,
  STATUS_TO_DB as S,
  DB_TO_OFFERING_TYPE as a,
  kebab as k,
  omitUndefined as o
};
