import { Sidebar } from "@/components/layout/Sidebar";
import { getCurrentUserProfile } from "@/lib/auth";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentUserProfile();

  return (
    <div className="min-h-screen flex">
      <Sidebar
        userEmail={profile?.email}
        userName={profile?.nome_visualizzato}
        userRole={profile?.ruolo}
      />
      <main className="flex-1 bg-cream overflow-auto">{children}</main>
    </div>
  );
}
