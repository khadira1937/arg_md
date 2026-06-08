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

  EMAIL_FROM: z.string().default("CloudynHost <no-reply@cloudynhost.com>"),
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
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables — see .env.example");
}

export const env = parsed.data;
export type Env = typeof env;
