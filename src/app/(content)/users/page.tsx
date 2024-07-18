"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { UserDocument } from "@/models/User";
import { getUsers } from "@/actions/getUsers";
import { Tabs, useTabs } from "@/stores/sidebar-store";

export default function Home() {
  const { status } = useSession();

  const [users, setUsers] = useState<UserDocument[] | null>(null);
  const router = useRouter();
  const tab = useTabs((state) => state.currentTab);
  const updateTab = useTabs((state) => state.updateTab);

  useEffect(() => {
    if (tab !== Tabs.Users) {
      updateTab(Tabs.Users);
    }
  }, [tab]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users as UserDocument[]);
    };

    fetchUsers().catch(console.error);

    const intervalId = setInterval(fetchUsers, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6">
      {users && <DataTable columns={columns} data={users} />}
    </main>
  );
}
