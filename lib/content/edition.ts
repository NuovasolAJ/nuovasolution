/**
 * The edition of the public pages (master order 2026-10-10 §11).
 *
 * The site is built as the unpublished TARGET version of the planned product: the menu, the ladder and the
 * story describe the whole product and carry no "in preparation" labels. Every line that still needs its proof
 * is listed in docs/website_redesign/ACCEPTANCE_LIST_1010.md, and the publication gate is that list, not a
 * label on the page.
 *
 * For Audit and the Reviewer the states stay in the data (platform-map.ts, package-matrix.ts) and can be shown
 * on any preview with NEXT_PUBLIC_PROOF_STATES=1: then every entry prints its proof state next to its name.
 */
export function proofStatesShown(): boolean {
  return process.env.NEXT_PUBLIC_PROOF_STATES === "1";
}
