import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { PublicShell } from "@/components/marketing/public-shell";
import { getSession } from "@/lib/auth";
import { getCartCount } from "@/lib/cart";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const cartCount = await getCartCount();
  return (
    <>
      <PublicShell
        navbar={<Navbar user={session ? { name: session.name, role: session.role } : null} cartCount={cartCount} />}
        footer={<Footer />}
      >
        {children}
      </PublicShell>
      <CookieConsent />
    </>
  );
}
