/**
 * Company facts shown on the About page. These are real, verifiable details for
 * ARGANA MEDIA LTD — keep them accurate and in sync with Companies House and the
 * footer (config/brand.ts).
 */
export const company = {
  foundingYear: "2025",
  headquarters: "London, United Kingdom",
  legalEntity: "ARGANA MEDIA LTD",
  companyNumber: "17296255",
  jurisdiction: "England and Wales",
  registeredOffice: "2nd Floor College House, 17 King Edwards Road, Ruislip, London",
  teamSize: "Small specialist team",
} as const;

/** True while a value is still an unfilled {{PLACEHOLDER}}. */
export function isPlaceholder(value: string): boolean {
  return /^\{\{.*\}\}$/.test(value);
}
