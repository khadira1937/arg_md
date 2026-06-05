import { NextResponse } from "next/server";
import { env } from "@/config/env";
import { processPendingJobs } from "@/lib/provisioning";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Provisioning worker tick. Protect with CRON_SECRET (Authorization: Bearer ...
 * or ?secret=). Call on a schedule (cron / queue consumer) in production.
 */
async function handle(req: Request) {
  const auth = req.headers.get("authorization");
  const url = new URL(req.url);
  const secret = auth?.replace("Bearer ", "") ?? url.searchParams.get("secret");
  if (secret !== env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await processPendingJobs();
  return NextResponse.json({ ok: true, ...result });
}

export const GET = handle;
export const POST = handle;
