import { Nav } from "@/components/home/nav";
import { Footer } from "@/components/marketing/footer";
import { PublicShell } from "@/components/marketing/public-shell";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicShell navbar={<Nav />} footer={<Footer />}>
      {children}
    </PublicShell>
  );
}
