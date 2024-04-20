import React, {Suspense} from "react";
import Navbar from "@/components/custom/Navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Suspense><Navbar /></Suspense>
      <div className="flex-1 p-4 md:p-6">
        {children}
      </div>
    </main>
  );
}

export default AppLayout;
