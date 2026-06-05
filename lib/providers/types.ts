/** Cloud provider abstraction — see docs/02-architecture.md §7. */

export type ProvisionInput = {
  serviceInstanceId: string;
  productType: string;
  planName: string;
  planSlug: string;
  hostnameHint: string;
  locationSlug?: string | null;
  specs?: Record<string, unknown> | null;
  addons?: string[];
};

export type ServiceCredentials = {
  username: string;
  password: string;
  sshPort?: number;
  panelUrl?: string;
  notes?: string;
  [key: string]: unknown;
};

export type ProvisionResult = {
  providerRef: string;
  hostname: string;
  primaryIp: string;
  credentials: ServiceCredentials;
  raw?: Record<string, unknown>;
};

export type ProviderStatus = {
  ref: string;
  state: "running" | "stopped" | "provisioning" | "error" | "unknown";
  detail?: string;
};

export interface CloudProvider {
  /** Stable key matching Product.providerKey / DEFAULT_CLOUD_PROVIDER. */
  readonly id: string;
  readonly label: string;
  provision(input: ProvisionInput): Promise<ProvisionResult>;
  suspend(ref: string): Promise<void>;
  resume(ref: string): Promise<void>;
  cancel(ref: string): Promise<void>;
  upgrade(ref: string, planSlug: string): Promise<void>;
  status(ref: string): Promise<ProviderStatus>;
}

export class ProviderNotImplementedError extends Error {
  constructor(provider: string, method: string) {
    super(
      `${provider}.${method}() is not implemented. This is a placeholder provider — ` +
        `wire up the real API client and credentials to enable it.`,
    );
    this.name = "ProviderNotImplementedError";
  }
}
