import { env } from "@/config/env";
import type { CloudProvider } from "./types";
import { MockProvider } from "./mock";
import {
  HetznerProvider,
  DigitalOceanProvider,
  VultrProvider,
  WhmCpanelProvider,
  DomainRegistrarProvider,
  EmailHostingProvider,
} from "./placeholders";

export * from "./types";

const registry = new Map<string, CloudProvider>();

function register(p: CloudProvider) {
  registry.set(p.id, p);
}

register(new MockProvider());
register(new HetznerProvider());
register(new DigitalOceanProvider());
register(new VultrProvider());
register(new WhmCpanelProvider());
register(new DomainRegistrarProvider());
register(new EmailHostingProvider());

/** Resolve a provider by key, falling back to the configured default / mock. */
export function getProvider(key?: string | null): CloudProvider {
  if (key && registry.has(key)) return registry.get(key)!;
  const fallback = env.DEFAULT_CLOUD_PROVIDER;
  return registry.get(fallback) ?? registry.get("mock")!;
}

export function listProviders(): CloudProvider[] {
  return [...registry.values()];
}
