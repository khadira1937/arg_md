import crypto from "node:crypto";
import type {
  CloudProvider,
  ProvisionInput,
  ProvisionResult,
  ProviderStatus,
} from "./types";

function randomIp(): string {
  const oct = () => 1 + Math.floor(Math.random() * 253);
  return `${oct()}.${oct()}.${oct()}.${oct()}`;
}

function randomPassword(len = 18): string {
  return crypto.randomBytes(32).toString("base64url").slice(0, len);
}

/**
 * Fully working local provider. Simulates real provisioning latency and returns
 * realistic-looking credentials/endpoints so the entire platform runs offline.
 */
export class MockProvider implements CloudProvider {
  readonly id = "mock";
  readonly label = "CloudynHost Mock Cloud (local)";

  async provision(input: ProvisionInput): Promise<ProvisionResult> {
    // Simulate brief work without blocking too long in dev.
    await new Promise((r) => setTimeout(r, 400));

    const ref = `mock-${crypto.randomBytes(6).toString("hex")}`;
    const region = input.locationSlug ?? "us-east";
    const hostname = `${input.hostnameHint}.${region}.cloudynhost-mock.com`.toLowerCase();
    const ip = randomIp();

    const isPanel = ["SHARED", "WORDPRESS", "WOOCOMMERCE", "CLOUD", "AGENCY"].includes(
      input.productType,
    );

    return {
      providerRef: ref,
      hostname,
      primaryIp: ip,
      credentials: {
        username: isPanel ? "admin" : "root",
        password: randomPassword(),
        sshPort: isPanel ? undefined : 22,
        panelUrl: isPanel ? `https://${hostname}:8443` : undefined,
        notes: `Mock-provisioned ${input.planName}. Replace with a real provider for production.`,
      },
      raw: { region, simulated: true },
    };
  }

  async suspend(_ref: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 150));
  }

  async resume(_ref: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 150));
  }

  async cancel(_ref: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 150));
  }

  async upgrade(_ref: string, _planSlug: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 150));
  }

  async status(ref: string): Promise<ProviderStatus> {
    return { ref, state: "running", detail: "Simulated healthy instance" };
  }
}
