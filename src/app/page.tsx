"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid place-content-center min-h-screen w-full ">
      <h1 className="text-9xl">HI</h1>
      <Button
        variant="default"
        onClick={() => {
          router.push("/auth/login");
        }}
      >
        Login
      </Button>
    </div>
  );
}
