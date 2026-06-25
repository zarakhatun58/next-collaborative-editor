import StatsCard from "@/components/dashboard/stats-card";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentDocuments from "@/components/dashboard/recent-documents";

import {
  FileText,
  History,
  Users,
  Wifi,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage documents and collaboration.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Documents"
          value="24"
          description="Active documents"
          icon={<FileText />}
        />

        <StatsCard
          title="Collaborators"
          value="12"
          description="Team members"
          icon={<Users />}
        />

        <StatsCard
          title="Versions"
          value="148"
          description="Saved snapshots"
          icon={<History />}
        />

        <StatsCard
          title="Sync"
          value="Online"
          description="Connected"
          icon={<Wifi />}
        />
      </div>

      <QuickActions />

      <RecentDocuments />
    </div>
  );
}