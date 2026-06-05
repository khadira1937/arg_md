import { requireUser } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/ui";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default async function ProfilePage() {
  const user = await requireUser();
  const p = user.profile;

  return (
    <div>
      <PageHeader title="Profile & billing" description="Manage your account and billing information." />
      <Card className="max-w-3xl p-6">
        <ProfileForm
          values={{
            name: user.name, email: user.email,
            company: p?.company, phone: p?.phone, address: p?.address,
            city: p?.city, state: p?.state, postalCode: p?.postalCode, country: p?.country, taxId: p?.taxId,
          }}
        />
      </Card>
    </div>
  );
}
