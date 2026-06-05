import crypto from "node:crypto";
import { env } from "@/config/env";

/**
 * AES-256-GCM credential encryption abstraction.
 * Used to encrypt service credentials (root passwords, API keys) at rest.
 * In production, ENCRYPTION_KEY should come from a secrets manager / KMS.
 */

const ALGO = "aes-256-gcm";

function getKey(): Buffer {
  const raw = env.ENCRYPTION_KEY;
  // Accept base64 (preferred) or utf8; normalize to 32 bytes.
  let key: Buffer;
  try {
    key = Buffer.from(raw, "base64");
  } catch {
    key = Buffer.from(raw);
  }
  if (key.length !== 32) {
    // Derive a stable 32-byte key from whatever was provided.
    key = crypto.createHash("sha256").update(raw).digest();
  }
  return key;
}

export function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  // format: iv.tag.ciphertext (all base64)
  return [iv.toString("base64"), tag.toString("base64"), enc.toString("base64")].join(".");
}

export function decrypt(payload: string): string {
  const [ivB64, tagB64, dataB64] = payload.split(".");
  if (!ivB64 || !tagB64 || !dataB64) throw new Error("Invalid ciphertext format");
  const decipher = crypto.createDecipheriv(ALGO, getKey(), Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  const dec = Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]);
  return dec.toString("utf8");
}

/** Encrypt a JSON-serializable credentials object. */
export function encryptJson(value: unknown): string {
  return encrypt(JSON.stringify(value));
}

export function decryptJson<T = unknown>(payload: string): T {
  return JSON.parse(decrypt(payload)) as T;
}
