"use client";

import { ColumnDef } from "@tanstack/react-table";

import { UserDocument } from "@/models/User";
import { Progress } from "@/components/ui/progress";

const columns: ColumnDef<UserDocument>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const value = row.getValue<number>("progress");

      return (
        <div className="flex items-center gap-2">
          <Progress value={value} className="h-2 w-full" />
          <span className="text-sm font-medium">{`${value}`}%</span>
        </div>
      );
    },
  },
];

export { columns };
