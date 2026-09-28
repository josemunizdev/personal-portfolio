import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { profile } from "@/data/profile";
import "./globals.css";

const description = `${profile.headline}. ${profile.subhead}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://josemuniz.dev"),
  title: `${profile.name} | ${profile.headline}`,
  description,
  openGraph: {
    title: profile.name,
    description,
    url: "https://josemuniz.dev",
    siteName: profile.name,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
