import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CollabDocs",
  description:
    "Local First Collaborative Document Editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        "dark",
        "h-full"
      )}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen",
          "bg-[#09090b]",
          "text-white",
          "font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}