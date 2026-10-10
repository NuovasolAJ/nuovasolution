import "server-only";
import { integrationMode } from "./mode";
import { sessionToken } from "./server";
import { BackendRefusal, tenantApi, type Json } from "./supabase";

/**
 * The weekly agency report (master order 2026-10-10 §8), read side.
 *
 *   browser → this server (session cookie) → tenant-api op `reports.weekly` with the user's own JWT
 *
 * No report contract exists yet on the backend (this repository, searched 2026-10-10: no route, no fixture, no
 * read model; reports.nuovasolution.com is not in any repository the website can see). This module names the
 * fields the page needs, in the shape proposed to API/Reporting in docs/website_redesign/REPORTS_CONTRACT_REQUEST_1010.md,
 * and reduces the backend's answer to exactly those. Until the op exists, a staging build renders the
 * "awaiting contract" state; nothing is ever shown as zero when it is simply not there.
 *
 * Every figure is a count of records Nuova itself keeps. Nothing here is a revenue, a time saving or a
 * "best source": those claims need a measurement first (CLAIMS_MATRIX R-13, R-14 rejected).
 */
export type ReportChannel = "whatsapp" | "email" | "webform" | "phone";

export interface WeeklyReport {
  period: { from: string; to: string; timezone: string; label: string | null };
  generated_at: string | null;
  basis: { channels: ReportChannel[]; source: string };
  counts: {
    received: number;
    answered: number;
    by_channel: Partial<Record<ReportChannel, number>>;
    viewings_requested: number | null;
    viewings_confirmed: number | null;
    valuations_requested: number | null;
    tasks_closed: number | null;
    tasks_open: number | null;
    proposals_sent: number | null;
  };
  previous: { received: number; answered: number; tasks_closed: number | null } | null;
  open_actions: { who: string; what: string; since: string | null }[];
  /** The plan the figures are scoped to: a trial shows only what the trial package can produce. */
  plan: { code: string; trial: boolean };
  stub: boolean;
}

export type WeeklyReportResult = { kind: "report"; report: WeeklyReport } | { kind: "awaiting_contract" } | { kind: "not_entitled" };

const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const iso = (v: unknown): string | null => (typeof v === "string" && !Number.isNaN(Date.parse(v)) ? v : null);
const str = (v: unknown, max = 200): string | null => (typeof v === "string" && v.trim() ? v.slice(0, max) : null);
const CHANNELS: ReportChannel[] = ["whatsapp", "email", "webform", "phone"];

function reduce(raw: Json, stub: boolean): WeeklyReport {
  const p = (raw.period ?? {}) as Json;
  const c = (raw.counts ?? {}) as Json;
  const bc = (c.by_channel ?? {}) as Json;
  const by: Partial<Record<ReportChannel, number>> = {};
  for (const k of CHANNELS) { const n = num(bc[k]); if (n !== null) by[k] = n; }
  const prev = raw.previous && typeof raw.previous === "object" ? (raw.previous as Json) : null;
  const plan = (raw.plan ?? {}) as Json;
  return {
    period: { from: iso(p.from) ?? "", to: iso(p.to) ?? "", timezone: str(p.timezone, 40) ?? "Europe/Madrid", label: str(p.label, 60) },
    generated_at: iso(raw.generated_at),
    basis: { channels: (Array.isArray((raw.basis as Json)?.channels) ? ((raw.basis as Json).channels as unknown[]) : []).filter((x): x is ReportChannel => CHANNELS.includes(x as ReportChannel)), source: str((raw.basis as Json)?.source, 80) ?? "nuova_records" },
    counts: {
      received: num(c.received) ?? 0,
      answered: num(c.answered) ?? 0,
      by_channel: by,
      viewings_requested: num(c.viewings_requested),
      viewings_confirmed: num(c.viewings_confirmed),
      valuations_requested: num(c.valuations_requested),
      tasks_closed: num(c.tasks_closed),
      tasks_open: num(c.tasks_open),
      proposals_sent: num(c.proposals_sent),
    },
    previous: prev ? { received: num(prev.received) ?? 0, answered: num(prev.answered) ?? 0, tasks_closed: num(prev.tasks_closed) } : null,
    open_actions: (Array.isArray(raw.open_actions) ? (raw.open_actions as Json[]) : []).slice(0, 12).map((o) => ({ who: str(o.who, 80) ?? "", what: str(o.what, 160) ?? "", since: iso(o.since) })).filter((o) => o.who || o.what),
    plan: { code: str(plan.code, 20) ?? "essential", trial: plan.trial === true },
    stub,
  };
}

/** LOCAL STUB for the design preview: the week of the home page story, labelled on the page. */
function stubReport(): WeeklyReport {
  const monday = new Date(Date.UTC(2026, 9, 5, 0, 0, 0));
  const sunday = new Date(Date.UTC(2026, 9, 11, 23, 59, 59));
  return reduce(
    {
      period: { from: monday.toISOString(), to: sunday.toISOString(), timezone: "Europe/Madrid", label: null },
      generated_at: new Date(Date.UTC(2026, 9, 12, 6, 0, 0)).toISOString(),
      basis: { channels: ["whatsapp", "email", "webform", "phone"], source: "nuova_records" },
      counts: { received: 23, answered: 23, by_channel: { whatsapp: 11, email: 7, webform: 3, phone: 2 }, viewings_requested: 6, viewings_confirmed: 4, valuations_requested: 2, tasks_closed: 11, tasks_open: 2, proposals_sent: 4 },
      previous: { received: 19, answered: 19, tasks_closed: 9 },
      open_actions: [
        { who: "Peter y Anna Keller", what: "Valoración de una villa en Elviria · falta fijar la cita", since: new Date(Date.UTC(2026, 9, 6, 9, 24)).toISOString() },
        { who: "Sofía Lamas", what: "Alquiler de larga temporada en Fuengirola · esperando su respuesta", since: new Date(Date.UTC(2026, 9, 6, 9, 31)).toISOString() },
      ],
      plan: { code: "growth", trial: false },
    },
    true,
  );
}

/** Read the signed-in agency's weekly report. The session decides the tenant; no client id is sent. */
export async function getWeeklyReport(): Promise<WeeklyReportResult> {
  if (integrationMode() === "stub") return { kind: "report", report: stubReport() };
  try {
    const raw = await tenantApi<Json>(sessionToken(), "reports.weekly");
    if (!raw || raw.ok === false) {
      const reason = typeof raw?.reason === "string" ? raw.reason : "";
      if (reason === "not_entitled") return { kind: "not_entitled" };
      if (reason === "unknown_op" || reason === "invalid_input" || reason === "") return { kind: "awaiting_contract" };
      throw new BackendRefusal("server_error", 502);
    }
    return { kind: "report", report: reduce(raw, false) };
  } catch (e) {
    // An op the backend does not know yet is the expected state until the contract lands.
    if (e instanceof BackendRefusal && (e.code === "invalid_input" || e.code === "not_found" || e.status === 404 || e.status === 400)) return { kind: "awaiting_contract" };
    throw e;
  }
}
