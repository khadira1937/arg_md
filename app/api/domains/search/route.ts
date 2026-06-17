import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { searchDomains, DomainSearchError } from "@/lib/domains";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// TLD values are filtered server-side against the supported allowlist in the
// domains lib, so we only need a light shape check here.
const searchSchema = z.object({
  query: z.string().min(1, "Enter a domain name").max(63),
  tlds: z.array(z.string().max(8)).max(20).optional(),
});

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

async function handle(req: Request) {
  // Simple per-IP request protection (in-memory; swap for Redis in prod).
  const ip = clientIp(req);
  const limited = rateLimit(`domain-search:${ip}`, 20, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { error: "Too many searches. Please wait a moment and try again.", code: "rate_limited" },
      { status: 429, headers: { "Retry-After": "30" } },
    );
  }

  // Accept POST JSON body or GET query params (?q=&tld=.com&tld=.net).
  let raw: { query?: unknown; tlds?: unknown };
  if (req.method === "GET") {
    const url = new URL(req.url);
    raw = { query: url.searchParams.get("q") ?? url.searchParams.get("query") ?? undefined };
    const tlds = url.searchParams.getAll("tld");
    if (tlds.length) raw.tlds = tlds;
  } else {
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body.", code: "invalid_input" }, { status: 400 });
    }
  }

  const parsed = searchSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid input.", code: "invalid_input" },
      { status: 400 },
    );
  }

  try {
    const result = await searchDomains({ query: parsed.data.query, tlds: parsed.data.tlds });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof DomainSearchError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    return NextResponse.json(
      { error: "Domain search failed unexpectedly.", code: "provider_error" },
      { status: 500 },
    );
  }
}

export const GET = handle;
export const POST = handle;
