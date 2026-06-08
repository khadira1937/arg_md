/**
 * Company facts shown on the About page.
 *
 * These are intentionally PLACEHOLDERS in the `{{...}}` format. Do not invent
 * founders, dates, addresses or testimonials — replace each value with real,
 * verified information before launch.
 *
 * // TODO: replace with real data source — verified company facts.
 */
export const company = {
  foundingYear: "{{FOUNDING_YEAR}}",
  headquarters: "{{HEADQUARTERS_CITY_COUNTRY}}",
  legalEntity: "{{REGISTERED_LEGAL_ENTITY_NAME}}",
  teamSize: "{{TEAM_SIZE}}",
} as const;

/** True while a value is still an unfilled {{PLACEHOLDER}}. */
export function isPlaceholder(value: string): boolean {
  return /^\{\{.*\}\}$/.test(value);
}
