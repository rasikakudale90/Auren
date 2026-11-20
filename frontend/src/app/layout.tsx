import type { Metadata } from "next";
import { WorkspaceProvider } from "@/context/workspace-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUREN — Social Commerce Business Assistant",
  description: "Every conversation. Every customer. Every order. One workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory-warm font-sans text-ink-primary antialiased">
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </body>
    </html>
  );
}
