import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { getSession } from "@/lib/auth";
import { getCartCount } from "@/lib/cart";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const cartCount = await getCartCount();
  return (
    <div className="flex min-h-screen flex-col">
      <Link
        href="/book-a-call"
        className="group flex items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground sm:text-sm"
      >
        <span>Digital media, marketing &amp; web development for growing businesses — book a free discovery call</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <Navbar user={session ? { name: session.name, role: session.role } : null} cartCount={cartCount} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
