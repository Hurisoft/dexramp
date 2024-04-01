import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DexRamp",
  description: "Revolutionizing P2P Crypto Trading with Decentralization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={inter.style}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
