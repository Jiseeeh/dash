"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (true) {
      router.push("/auth/register");
    }
  }, []);

  return <main className="grid place-content-center ">HELLO</main>;
}
