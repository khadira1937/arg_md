import {
  type CloudProvider,
  type ProvisionInput,
  type ProvisionResult,
  type ProviderStatus,
  ProviderNotImplementedError,
} from "./types";

/**
 * Placeholder providers. Each throws ProviderNotImplementedError until you wire
 * in the real API client + credentials. They document the integration surface so
 * the platform can later connect to real infrastructure without refactoring.
 */
abstract class PlaceholderProvider implements CloudProvider {
  abstract readonly id: string;
  abstract readonly label: string;

  async provision(_input: ProvisionInput): Promise<ProvisionResult> {
    throw new ProviderNotImplementedError(this.id, "provision");
  }
  async suspend(_ref: string): Promise<void> {
    throw new ProviderNotImplementedError(this.id, "suspend");
  }
  async resume(_ref: string): Promise<void> {
    throw new ProviderNotImplementedError(this.id, "resume");
  }
  async cancel(_ref: string): Promise<void> {
    throw new ProviderNotImplementedError(this.id, "cancel");
  }
  async upgrade(_ref: string, _planSlug: string): Promise<void> {
    throw new ProviderNotImplementedError(this.id, "upgrade");
  }
  async status(ref: string): Promise<ProviderStatus> {
    return { ref, state: "unknown", detail: `${this.label} not configured` };
  }
}

// TODO: implement with https://docs.hetzner.cloud/ (HCLOUD_TOKEN)
export class HetznerProvider extends PlaceholderProvider {
  readonly id = "hetzner";
  readonly label = "Hetzner Cloud";
}

// TODO: implement with https://docs.digitalocean.com/reference/api/ (DO token)
export class DigitalOceanProvider extends PlaceholderProvider {
  readonly id = "digitalocean";
  readonly label = "DigitalOcean";
}

// TODO: implement with https://www.vultr.com/api/ (VULTR_API_KEY)
export class VultrProvider extends PlaceholderProvider {
  readonly id = "vultr";
  readonly label = "Vultr";
}

// TODO: implement with WHM/cPanel API (createacct / suspendacct)
export class WhmCpanelProvider extends PlaceholderProvider {
  readonly id = "whm";
  readonly label = "cPanel / WHM";
}

// TODO: implement with a registrar API (e.g. Namecheap, OpenSRS, Gandi)
export class DomainRegistrarProvider extends PlaceholderProvider {
  readonly id = "registrar";
  readonly label = "Domain Registrar";
}

// TODO: implement with an email hosting API (e.g. mailcow, Migadu, Google Workspace)
export class EmailHostingProvider extends PlaceholderProvider {
  readonly id = "email";
  readonly label = "Email Hosting";
}
