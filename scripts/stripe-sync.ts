import "./_env";
import { syncCatalogToStripe } from "@/lib/stripe/sync";

async function main() {
  console.log("🔄 Syncing catalog to Stripe...");
  const report = await syncCatalogToStripe();
  console.log(`  Products: ${report.productsSynced}`);
  console.log(`  Prices:   ${report.pricesSynced}`);
  console.log(`  Mode:     ${report.placeholder ? "PLACEHOLDER" : "LIVE"}`);
  report.messages.forEach((m) => console.log(`  • ${m}`));
  console.log("✅ Done.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
