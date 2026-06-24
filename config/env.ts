import { z } from "zod";

/**
 * Server-side environment validation. Imported only from server code.
 * Kept lenient so the app still boots in local/placeholder mode without
 * real Stripe / SMTP credentials.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET must be set (>=16 chars)"),
  AUTH_SESSION_DAYS: z.coerce.number().int().positive().default(30),
  ENCRYPTION_KEY: z.string().min(1, "ENCRYPTION_KEY is required"),

  STRIPE_SECRET_KEY: z.string().optional().default(""),
  STRIPE_WEBHOOK_SECRET: z.string().optional().default(""),
  STRIPE_PLACEHOLDER_MODE: z
    .enum(["true", "false"])
    .optional()
    .default("true")
    .transform((v) => v === "true"),

  EMAIL_FROM: z.string().default("ARGANA MEDIA <no-reply@arganamedia.co.uk>"),
  SMTP_HOST: z.string().optional().default("localhost"),
  SMTP_PORT: z.coerce.number().optional().default(1025),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  SMTP_SECURE: z
    .enum(["true", "false"])
    .optional()
    .default("false")
    .transform((v) => v === "true"),
  RESEND_API_KEY: z.string().optional().default(""),

  DEFAULT_CLOUD_PROVIDER: z.string().optional().default("mock"),
  CRON_SECRET: z.string().optional().default("dev-cron-secret"),

  // --- Domain search (registrar lookup) ---
  // Primary registrar provider. "" (default) = not configured: the API returns
  // a clear configuration error instead of fake results. "mock" returns clearly
  // labelled demo data so the UI can be exercised locally without a registrar key.
  DOMAIN_PROVIDER: z
    .enum(["", "dynadot", "namecheap", "mock"])
    .optional()
    .default(""),
  DOMAIN_SEARCH_CURRENCY: z.string().optional().default("USD"),

  // Dynadot (primary)
  DYNADOT_API_KEY: z.string().optional().default(""),
  DYNADOT_API_BASE_URL: z.string().optional().default("https://api.dynadot.com/api3.xml"),

  // Namecheap (alternative)
  NAMECHEAP_API_USER: z.string().optional().default(""),
  NAMECHEAP_API_KEY: z.string().optional().default(""),
  NAMECHEAP_USERNAME: z.string().optional().default(""),
  NAMECHEAP_CLIENT_IP: z.string().optional().default(""),
  NAMECHEAP_API_BASE_URL: z.string().optional().default("https://api.namecheap.com/xml.response"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables — see .env.example");
}

export const env = parsed.data;
export type Env = typeof env;
