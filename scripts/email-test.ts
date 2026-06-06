import "./_env";
import { sendTestEmail, transportLabel } from "@/lib/email";

async function main() {
  const to = process.argv[2] || process.env.EMAIL_TEST_TO || "test@example.com";
  console.log(`📧 Transport: ${transportLabel()}`);
  console.log(`   Sending test email to: ${to}`);
  const res = await sendTestEmail(to);
  if (res.ok) {
    console.log(`✅ Sent via ${res.transport}. ${res.transport === "mailpit" ? "Open http://localhost:8025 to view it." : ""}`);
    process.exit(0);
  }
  console.error(`❌ Failed via ${res.transport}: ${res.error}`);
  process.exit(1);
}
main().catch((e) => { console.error(e); process.exit(1); });
