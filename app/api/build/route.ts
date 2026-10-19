import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * The build mark (Social's request 2026-10-12 §2; audit R19 W1): which commit and deployment answer at this origin,
 * so a reviewer measures a named build instead of guessing from behaviour. Vercel sets the variables at build time;
 * a local build answers "unknown". No secret, no internal host, nothing an agency could act on.
 */
export function GET() {
  const body = {
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
    ref: process.env.VERCEL_GIT_COMMIT_REF ?? "unknown",
    deployment: process.env.VERCEL_DEPLOYMENT_ID ?? "unknown",
    env: process.env.VERCEL_ENV ?? "local",
    mode: process.env.NUOVA_INTEGRATION_MODE ?? "stub",
  };
  return NextResponse.json(body, { headers: { "cache-control": "no-store", "x-nuova-build": body.commit } });
}
