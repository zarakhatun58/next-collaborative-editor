
"use client";

import { api } from "@/src/lib/api";
import QuickActions from "@/src/components/layout/dashboard/quick-actions";
import RecentDocuments from "@/src/components/layout/dashboard/recent-documents";
import StatsCard from "@/src/components/layout/dashboard/stats-card";
import { useEffect, useState } from "react";
import {
  FileText,
  FolderOpen,
  History,
  Share2,
  Users,
  Wifi,
} from "lucide-react";

interface DashboardData {
  stats: {
    documents: number;
    owned: number;
    shared: number;
    collaborators: number;
    versions: number;
  };

  recentDocuments: {
    id: string;
    title: string;
    version: number;
    updatedAt: string;
    owner: {
      id: string;
      name: string | null;
    };
  }[];
}

export default function DashboardPage() {

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res =
          await api.get("/dashboard");
        setData(res.data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading Dashboard...
      </div>
    );
  }

  if (!data) return null;

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
          value={String(data.stats.documents)}
          description="Total documents"
          icon={<FileText />}
        />

        <StatsCard
          title="Owned"
          value={String(data.stats.owned)}
          description="Owned by you"
          icon={<FolderOpen />}
        />

        <StatsCard
          title="Shared"
          value={String(data.stats.shared)}
          description="Shared with you"
          icon={<Share2 />}
        />

        <StatsCard
          title="Collaborators"
          value={String(data.stats.collaborators)}
          description="Across all docs"
          icon={<Users />}
        />

        <StatsCard
          title="Versions"
          value={String(data.stats.versions)}
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

      <RecentDocuments documents={data.recentDocuments} />
    </div>
  );
}