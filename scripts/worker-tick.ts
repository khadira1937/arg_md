import "./_env";
import { processPendingJobs } from "@/lib/provisioning";

async function main() {
  console.log("⚙️  Processing provisioning jobs...");
  const { processed } = await processPendingJobs(100);
  console.log(`✅ Processed ${processed} job(s).`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
