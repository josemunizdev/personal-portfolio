import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { profile } from "@/data/profile";
import "./globals.css";

const description = `${profile.headline}. ${profile.subhead}`;

// Applies a saved "2 a.m. mode" choice before first paint so the page never
// flashes the wrong theme. Storage can throw in private windows; fall back to
// the OS setting silently.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
