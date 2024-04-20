"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/market");

  return <main>DexRamp</main>;
}
