"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Register } from "@/components/auth/Register";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/users");
    }
  }, [status]);

  return (
    <main className="grid place-content-center p-10">
      <Register />
    </main>
  );
}
