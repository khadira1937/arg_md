import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { getSession } from "@/lib/auth";
import { getCartCount } from "@/lib/cart";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const cartCount = await getCartCount();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={session ? { name: session.name, role: session.role } : null} cartCount={cartCount} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
